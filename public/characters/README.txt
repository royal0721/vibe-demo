把角色圖片放在這個資料夾，然後更新 src/constants/characters.js 中對應角色的 imagePath。

格式建議：
  - 正方形（1:1 比例），最小 400x400px
  - PNG（支援透明背景）或 WebP（檔案較小）
  - 圖片會自動裁切成圓形顯示

命名範例：
  zero.png    →  imagePath: "/characters/zero.png"
  phantom.png →  imagePath: "/characters/phantom.png"
  cipher.png  →  imagePath: "/characters/cipher.png"
  glitch.png  →  imagePath: "/characters/glitch.png"

設定方式（src/constants/characters.js）：
  imagePath: "/characters/zero.png",   ← 填入路徑，啟用自訂圖片
  imagePath: "",                        ← 留空，使用 DiceBear 預設
