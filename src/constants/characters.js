export const CHARACTERS = [
  {
    id: "zero",
    name: "Zero",
    nameJp: "ゼロ",
    specialty: "Binary Exploitation",
    specialtyLabel: "[ pwn ]",
    tagline: "我會攻陷所有漏洞……包括你的心。",
    // 放入圖片後填寫路徑，例如 "/characters/zero.png"，留空則使用 DiceBear
    imagePath: "/characters/zero.png",
    color: {
      primary: "#00f5d4",
      secondary: "#0a2420",
      border: "rgba(0,245,212,0.4)",
      glow: "0 0 20px rgba(0,245,212,0.5)",
      shadow: "shadow-neon-cyan",
    },
    gradient: "from-[#00f5d4]/10 to-transparent",
    dicebear: {
      seed: "zero-ctf-hacker",
      backgroundColor: "0a2420",
      hairColor: "0d0d0d",
      skinColor: "f9c9b6",
    },
    openingDialogue: [
      "……你遲到了。我已經監控你的連線三分鐘。",
      "我叫 Zero。二進制漏洞利用專家。砸東西是我的本業。",
      "你想挑戰我？有意思。讓我看看你值不值得我花時間。",
    ],
    confessionLine: "你的邏輯……出乎意料地無懈可擊。我似乎對你產生了依賴性。",
    confessionTiers: {
      s: "……你拿到了我從不給任何人的東西。我的信任。和——我自己。別讓我後悔說出這句話。",
      a: "你的邏輯……出乎意料地無懈可擊。我似乎對你產生了依賴性。這令我……不舒服。",
    },
    defaultCorrect: [
      "……正確。你的 exploit 有點樣子了。",
      "哼。你找到了 return address。不算太差。",
      "stack 這次沒崩。……做得不錯。",
      "你的 payload 有效。我承認……你讓我有點意外。",
    ],
    defaultWrong: [
      "Segfault。你的 exploit 在哪裡？",
      "你的 payload 被阻斷了。重新構造。",
      "return address 打歪了。再想清楚一點。",
      "記憶體布局搞錯了。這種失誤在實戰中會要你的命。",
    ],
    finalComment: {
      s: "……我必須承認。你讓我重新定義了「對手」這個詞。繼續保持。",
      a: "合格。你的技術讓我沒有理由抱怨。我可能低估你了。",
      b: "還有進步空間。不過至少你比大多數人強一點。",
      c: "勉強。你的知識庫需要大幅度擴充。",
      d: "你的技術需要大幅修補。對自己執行一次 debugger 吧。",
    },
  },
  {
    id: "phantom",
    name: "Phantom",
    nameJp: "ファントム",
    specialty: "Web Security",
    specialtyLabel: "[ web ]",
    tagline: "我不留下任何痕跡……除了在你記憶裡的那一道。",
    imagePath: "/characters/phantom.png",
    color: {
      primary: "#ff2d78",
      secondary: "#2d0014",
      border: "rgba(255,45,120,0.4)",
      glow: "0 0 20px rgba(255,45,120,0.5)",
      shadow: "shadow-neon-pink",
    },
    gradient: "from-[#ff2d78]/10 to-transparent",
    dicebear: {
      seed: "phantom-ctf-charmer",
      backgroundColor: "2d0014",
      hairColor: "3d0829",
      skinColor: "f9c9b6",
    },
    openingDialogue: [
      "喲～新的挑戰者降臨了？真是令人愉悅呢。",
      "我是 Phantom。我已經用 SQL injection 滲透進你今晚的計畫裡了。",
      "別這麼緊張。我只對我覺得……有趣的系統進行滲透測試。♥",
    ],
    confessionLine: "呼呼～你繞過了我所有的防線。我想……就允許你存取我的心吧。",
    confessionTiers: {
      s: "我滲透過那麼多系統……但你是第一個滲透進我心裡的人。好討厭。真的很討厭。♥♥",
      a: "呼呼～你繞過了我所有的防線。我想……就允許你存取我的心吧。別濫用這個權限哦。",
    },
    defaultCorrect: [
      "呼呼～你成功注入了。讓我對你更有興趣了呢。♥",
      "哇哦～你真的找到了那個 endpoint。有點驚喜。",
      "WAF 被你繞過了～我欣賞這種靈活性。",
      "哦～你的 XSS vector 完美穿透了過去。值得獎勵一下呢。♥",
    ],
    defaultWrong: [
      "被我的防火牆擋下了。要換個 payload 嗎～",
      "很可惜。你的 XSS vector 無效了。",
      "500 Internal Error。你的邏輯出了點問題哦。",
      "觸發了我的蜜罐呢。真是丟臉，親愛的～",
    ],
    finalComment: {
      s: "哇哦～你真的讓我大開眼界了。這可不常發生。好好珍惜這個瞬間～♥",
      a: "你讓我刮目相看了。繼續這樣下去，我可能真的會對你著迷～",
      b: "還不錯～你開始懂得我的思路了。多加油哦～",
      c: "嗯……有點進步空間。不過我覺得你還是有潛力的～",
      d: "你需要多讀書。我通常不陪業餘人士玩的……通常啦。",
    },
  },
  {
    id: "cipher",
    name: "Cipher",
    nameJp: "サイファー",
    specialty: "Cryptography",
    specialtyLabel: "[ crypto ]",
    tagline: "每個秘密都有一把鑰匙。你或許就是我的那一把。",
    imagePath: "/characters/cipher.png",
    color: {
      primary: "#b845f5",
      secondary: "#1a0a2e",
      border: "rgba(184,69,245,0.4)",
      glow: "0 0 20px rgba(184,69,245,0.5)",
      shadow: "shadow-neon-purple",
    },
    gradient: "from-[#b845f5]/10 to-transparent",
    dicebear: {
      seed: "cipher-ctf-mystic",
      backgroundColor: "1a0a2e",
      hairColor: "5533cc",
      skinColor: "d08b5b",
    },
    openingDialogue: [
      "啊。又一個方程式中的未知數。",
      "我是 Cipher。我在萬物中看見數學規律——包括你。",
      "我們開始吧？每個密碼都會向正確的鑰匙屈服。你是我的那把嗎？",
    ],
    confessionLine: "你解密了一件我以為無法破解的事。我的私鑰……是你的了。",
    confessionTiers: {
      s: "方程式中最後的未知數——求出來了。那個解……是你。唯一使我的一切收斂的值。",
      a: "你解密了一件我以為無法破解的事。我的私鑰……是你的了。請妥善保管。",
    },
    defaultCorrect: [
      "正確。你找到了那個數學規律。",
      "令人驚訝。你的推理讓我……頗為印象深刻。",
      "密文已解開。你的模運算是準確的。",
      "如我所算。你理解這些數學——這並不容易。",
    ],
    defaultWrong: [
      "解密失敗。鑰匙仍然不在你手中。",
      "這不是正確的質因數分解。重新思考。",
      "你的假設破壞了整個推理鏈。",
      "熵值上升。你的邏輯需要更多迭代。",
    ],
    finalComment: {
      s: "你的思維運作在一個我覺得……完全相容的頻率上。令我印象深刻。",
      a: "你理解了核心規律。更深層的秘密還在等著你。",
      b: "基礎尚可。但密碼學的深度遠不止於此。",
      c: "你的推理鏈有些薄弱。繼續迭代。",
      d: "你的密碼學直覺需要培養。多讀書。",
    },
  },
  {
    id: "glitch",
    name: "Glitch",
    nameJp: "グリッチ",
    specialty: "Reverse Engineering",
    specialtyLabel: "[ rev ]",
    tagline: "我讀懂了組語行間的一切。",
    imagePath: "/characters/glitch.png",
    color: {
      primary: "#f5a623",
      secondary: "#2d1a00",
      border: "rgba(245,166,35,0.4)",
      glow: "0 0 20px rgba(245,166,35,0.5)",
      shadow: "shadow-neon-amber",
    },
    gradient: "from-[#f5a623]/10 to-transparent",
    dicebear: {
      seed: "glitch-ctf-chaos",
      backgroundColor: "2d1a00",
      hairColor: "cc7700",
      skinColor: "ae5d29",
    },
    openingDialogue: [
      "哦！！你真的來了！！我是 Glitch，很高興認識你！！",
      "我可以逆向工程任何東西。二進位、人心、壞心情。",
      "好好好，我們出發！！我為這場對決熱身了一整天！！",
    ],
    confessionLine:
      "老兄……我逆向工程過很多東西，但我真的沒料到會拆解自己的心。這都是你害的。",
    confessionTiers: {
      s: "老兄！！我逆向工程過那麼多東西……但沒有一樣像你這麼難分析！！我喜歡你！！這不是 bug 這是 feature！！",
      a: "老兄……我逆向工程過很多東西，但我真的沒料到會拆解自己的心。這都是你害的。你要負責。",
    },
    defaultCorrect: [
      "哦！！你讀懂了那段組語！！超猛的！！",
      "完美反組譯！！你跟我一樣看得穿機器碼！！",
      "老哥你根本是逆向天才！！繼續衝！！",
      "函式被你完整拆解了！！我們合得來！！",
    ],
    defaultWrong: [
      "跳轉目標不對！！我們一起重新 trace 一遍！！",
      "哥們你的 decompile 跑偏了，再看一眼暫存器！！",
      "Oops！！這個分支猜錯了，別氣餒繼續衝！！",
      "segfault！！你的邏輯跑進了 null pointer，重來！！",
    ],
    finalComment: {
      s: "老哥。你根本是異類！！我們絕對合得來！！讓我們再跑一次！！",
      a: "太猛了！！你看得穿機器碼，我感覺得出來！！繼續衝！！",
      b: "不錯哦！！繼續練習，你的潛力我看得見！！",
      c: "多看看 IDA 吧哥們！！我相信你下次能更好！！",
      d: "哥們你要多讀書啊。但我相信你！！下次一定能更好！！",
    },
  },
];

export const getCharacterById = (id) =>
  CHARACTERS.find((c) => c.id === id) ?? null;

export function buildDiceBearUrl(character, size = 200) {
  const p = character.dicebear;
  const params = new URLSearchParams({
    seed: p.seed,
    backgroundColor: p.backgroundColor,
    radius: "50",
  });
  if (p.hair) params.set("hair", p.hair);
  if (p.hairColor) params.set("hairColor", p.hairColor);
  if (p.eyes) params.set("eyes", p.eyes);
  if (p.skinColor) params.set("skinColor", p.skinColor);
  params.set("size", String(size));
  return `https://api.dicebear.com/9.x/lorelei/svg?${params.toString()}`;
}
