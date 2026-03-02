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
    defaultCorrect: [
      "……尚可接受。你的記憶體定址是正確的。",
      "哼。你居然真的懂 stack frame。",
      "正確。你的技術……比預期的沒那麼糟。",
    ],
    defaultWrong: [
      "Stack smashed。再努力一點。",
      "你的知識出現了 buffer overflow。",
      "Segmentation fault。你的邏輯需要修補。",
    ],
    finalComment: {
      low: "你的技術需要大幅修補。對自己執行一次 debugger 吧。",
      mid: "執行得還算不錯。你還不算是徹底的腳本小鬼。",
      high: "我可能低估你了。別讓這句話衝上頭。",
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
    defaultCorrect: [
      "呼呼～你輕鬆穿過了 WAF 呢。厲害～",
      "哦？你真的懂 XSS 向量啊。倒是讓我有點興趣了。",
      "正確！你完美找到了注入點～",
    ],
    defaultWrong: [
      "你觸發了我的蜜罐。真是丟臉，親愛的。",
      "404: Logic Not Found。換個 payload 試試～",
      "我的過濾器輕易攔下來了。要再試一次嗎？",
    ],
    finalComment: {
      low: "你需要多讀書。我通常不陪業餘人士玩的……通常啦。",
      mid: "還不錯～你開始懂得我的思路了。",
      high: "你讓我刮目相看了。這可不常發生。好好珍惜這個瞬間～",
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
    defaultCorrect: [
      "正確。你找到了鑰匙。",
      "令人驚訝。你的錯誤熵值趨近於零。",
      "如我所算。你理解這些數學。",
    ],
    defaultWrong: [
      "錯誤。鑰匙仍然逃脫了你。",
      "熵值增加。你的邏輯需要更多迭代。",
      "解密失敗。數學是無情的。",
    ],
    finalComment: {
      low: "你的密碼學直覺需要培養。多讀書。",
      mid: "你理解了基礎。更深層的規律在等著你。",
      high: "你的思維運作在一個我覺得……相容的頻率上。",
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
    defaultCorrect: [
      "哦！！你答對了！！這題被你完全拆解了！！",
      "哥們這答得超乾淨。完美反編譯！！",
      "我們衝！！你跟我一樣看得見規律！！",
    ],
    defaultWrong: [
      "Segfault！！你的邏輯剛剛崩潰了，讓我們一起 debug～",
      "唉不對啊。你的 stack trace 需要調整一下哥們。",
      "這是個壞的跳轉目標！讓我帶你走一遍。",
    ],
    finalComment: {
      low: "哥們你要多讀書啊。但我相信你！！",
      mid: "不錯哦！！你看得懂組語，我感覺得出來。",
      high: "老哥。你根本是異類。讓我們再跑一次！！",
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
