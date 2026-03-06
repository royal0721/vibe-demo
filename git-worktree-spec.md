# Feature Spec: 角色問答專區

> 此文件由 Git Worktree Design Skill 自動產生，供 AI Agent 作為開發指引。

## 分支資訊

| 項目 | 值 |
|------|-----|
| 分支名稱 | `feature/character-qa` |
| 基於分支 | `main` |
| Worktree 路徑 | `/Users/clemmy.liao/vibe-demo-character-qa` |
| 建立時間 | 2026-03-06 |

## 目標

新增「角色問答專區」畫面，讓玩家可在正式 Quiz 前依角色瀏覽題目預覽、查看歷史作答統計，以及角色個人檔案，增加角色代入感。

## 實作範圍

- [ ] **State 擴充**：在 `src/hooks/useGameState.js` 新增 `CHARACTER_QA` 畫面狀態，加入 action：`GO_TO_CHARACTER_QA`（payload: characterId）/ `BACK_FROM_CHARACTER_QA`（回到 CHARACTER_SELECT）
- [ ] **新畫面**：新增 `src/screens/CharacterQAScreen.jsx`，包含：
  - 角色頭像（`CharacterAvatar`）+ 名稱 + 專長領域 tag（來自 `characters.js` 的 `specialty` 或現有描述）
  - 歷史作答統計區塊：從 `useHistory(playerName)` 取得該角色的 affection、最高分、上次遊玩時間（無歷史時顯示「尚未挑戰過」）
  - 題目預覽列表：顯示前 3 題題目文字（不顯示答案選項，來自 `fetchQuestions` 或 demoQuestions）
  - 底部兩個按鈕：「返回」→ `BACK_FROM_CHARACTER_QA`、「開始挑戰！」→ `SELECT_CHARACTER`
- [ ] **App.jsx**：在 `screens` map 加入 `CHARACTER_QA: <CharacterQAScreen state={state} dispatch={dispatch} />`
- [ ] **CharacterSelectScreen**：每張角色卡加入「查看專區」次要按鈕，dispatch `GO_TO_CHARACTER_QA`
- [ ] **DashboardScreen**：角色列加入「查看專區」icon 按鈕或連結

## 驗收標準

- 點擊角色卡上「查看專區」→ 進入 `CharacterQAScreen`，角色資訊正確對應
- 有 localStorage 歷史時顯示 affection 數值與上次遊玩日期；無歷史時顯示提示文字
- 題目預覽顯示 3 題（demo mode 下從 `demoQuestions` 取；連線模式同理）
- 點「開始挑戰！」→ dispatch `SELECT_CHARACTER` → 進入原有 STORY → QUIZ flow
- 點「返回」→ 回到 `CHARACTER_SELECT` 畫面
- 畫面使用 `ScreenWrapper` 包裹，有 Framer Motion 進出場動畫
- `--char-color` CSS 變數正確傳入，顏色隨角色變化

## 技術約束

- 不得引入新 npm 依賴
- 所有檔案為 `.jsx` / `.js`，不使用 TypeScript
- 新畫面需用 `ScreenWrapper` 包裹
- 歷史資料透過既有 `useHistory` hook 取得，不新增 localStorage key
- 題目預覽為靜態展示，不新增 loading state（可複用 `loadingQuestions` 現有流程）

## 跨分支備註

- 改動 `src/hooks/useGameState.js` 與 `src/App.jsx`（character-qa 獨有）
- `feature/quiz-optimization` 不碰這兩個檔案，無衝突
- 建議在 `feature/quiz-optimization` 合併後再開發此分支，避免 merge 時處理 App.jsx 差異
