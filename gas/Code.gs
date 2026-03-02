// ============================================================
// CTF 帥哥攻略遊戲 — Google Apps Script Backend
// ============================================================
// Deploy as: Web App
//   Execute as:  Me
//   Who has access: Anyone
// After deploying, paste the Web App URL into VITE_GAS_URL
// ============================================================

var SPREADSHEET_ID  = "YOUR_SPREADSHEET_ID_HERE"; // <-- replace this
var SHEET_QUESTIONS = "題目";
var SHEET_ANSWERS   = "回答";

// ── Router ──────────────────────────────────────────────────

function doGet(e) {
  var result;
  try {
    var action = e.parameter.action;
    if (action === "getQuestions") {
      result = handleGetQuestions(e.parameter);
    } else if (action === "getHistory") {
      result = handleGetHistory(e.parameter);
    } else {
      result = { error: "Unknown action: " + action };
    }
  } catch (err) {
    result = { error: err.message };
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var result;
  try {
    // Use text/plain Content-Type on frontend to avoid CORS preflight
    var data   = JSON.parse(e.postData.contents);
    var action = data.action;
    if (action === "submitResult") {
      result = handleSubmitResult(data);
    } else {
      result = { error: "Unknown action: " + action };
    }
  } catch (err) {
    result = { error: err.message };
  }
  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── Question Fetching ────────────────────────────────────────

function handleGetQuestions(params) {
  var characterId = params.character;
  var count       = parseInt(params.count) || 10;

  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_QUESTIONS);
  var rows  = sheet.getDataRange().getValues();

  var questions = [];
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    // Skip empty rows
    if (!row[0]) continue;
    // Column B (index 1) is character ID
    if (String(row[1]).toLowerCase() === String(characterId).toLowerCase()) {
      questions.push({
        id:              row[0],
        character:       row[1],
        difficulty:      row[2],
        text:            row[3],
        options: {
          A: row[4],
          B: row[5],
          C: row[6],
          D: row[7],
        },
        correct:         String(row[8]).toUpperCase().trim(),
        correctDialogue: row[9]  || "",
        wrongDialogue:   row[10] || "",
      });
    }
  }

  var shuffled = shuffleArray(questions);
  return { questions: shuffled.slice(0, count) };
}

// ── History Fetching ─────────────────────────────────────────

function handleGetHistory(params) {
  var playerName = params.player;

  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_ANSWERS);
  var rows  = sheet.getDataRange().getValues();

  var history = {};
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    if (!row[0]) continue;
    if (String(row[0]) === String(playerName)) {
      var charId = String(row[1]);
      history[charId] = {
        playCount:           row[2] || 0,
        totalScore:          row[3] || 0,
        highScore:           row[4] || 0,
        firstPassScore:      row[5] || null,
        attemptsToFirstPass: row[6] || null,
        affection:           row[7] || 0,
        confessionUnlocked:  row[8] === "Y",
        lastPlayed:          row[9]  || null,
      };
    }
  }

  return { history: history };
}

// ── Result Submission ─────────────────────────────────────────

function handleSubmitResult(data) {
  var playerName          = String(data.playerName);
  var characterId         = String(data.characterId);
  var score               = Number(data.score) || 0;
  var affection           = Number(data.affection) || 0;
  var confessionUnlocked  = data.confessionUnlocked === true;
  var passThreshold       = Number(data.passThreshold) || 5;
  var now                 = new Date();

  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_ANSWERS);
  var rows  = sheet.getDataRange().getValues();

  var existingRowIndex = -1;
  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === playerName && String(rows[i][1]) === characterId) {
      existingRowIndex = i + 1; // 1-indexed for Sheets API
      break;
    }
  }

  var passed = score >= passThreshold;

  if (existingRowIndex === -1) {
    // New record
    sheet.appendRow([
      playerName,                        // A
      characterId,                       // B
      1,                                 // C: playCount
      score,                             // D: totalScore
      score,                             // E: highScore
      passed ? score : "",               // F: firstPassScore
      passed ? 1    : "",                // G: attemptsToFirstPass
      affection,                         // H
      confessionUnlocked ? "Y" : "N",   // I
      now,                               // J
    ]);
  } else {
    var existing        = rows[existingRowIndex - 1];
    var oldPlayCount    = Number(existing[2]) || 0;
    var oldTotalScore   = Number(existing[3]) || 0;
    var oldHighScore    = Number(existing[4]) || 0;
    var oldFirstPass    = existing[5];
    var oldAttempts     = existing[6];
    var oldConfession   = existing[8] === "Y";

    var newPlayCount    = oldPlayCount + 1;
    var newTotalScore   = oldTotalScore + score;
    var newHighScore    = Math.max(oldHighScore, score);

    // Only record first pass once
    var newFirstPass  = (oldFirstPass !== "" && oldFirstPass != null) ? oldFirstPass : (passed ? score : "");
    var newAttempts   = (oldAttempts  !== "" && oldAttempts  != null) ? oldAttempts  : (passed ? newPlayCount : "");

    sheet.getRange(existingRowIndex, 1, 1, 10).setValues([[
      playerName,
      characterId,
      newPlayCount,
      newTotalScore,
      newHighScore,
      newFirstPass,
      newAttempts,
      affection,
      (oldConfession || confessionUnlocked) ? "Y" : "N",
      now,
    ]]);
  }

  return { success: true, timestamp: now.toISOString() };
}

// ── Utilities ────────────────────────────────────────────────

function shuffleArray(array) {
  var arr = array.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }
  return arr;
}
