import { useState } from "react";
import { motion } from "framer-motion";
import { ScreenWrapper } from "../components/layout/ScreenWrapper.jsx";
import { GlitchText }    from "../components/ui/GlitchText.jsx";
import { Button }        from "../components/ui/Button.jsx";

export function HomeScreen({ dispatch }) {
  const [name, setName] = useState("");

  function handleStart() {
    const trimmed = name.trim();
    if (!trimmed) return;
    dispatch({ type: "SET_PLAYER_NAME", payload: trimmed });
    dispatch({ type: "GO_TO_CHARACTER_SELECT" });
  }

  function handleKey(e) {
    if (e.key === "Enter") handleStart();
  }

  return (
    <ScreenWrapper screenKey="home">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* Logo / title block */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* CTF label */}
          <div className="font-mono text-base text-neon-cyan tracking-[0.3em] mb-4 opacity-70">
            奪 旗 作 戰
          </div>

          {/* Main title */}
          <div className="relative mb-2">
            <GlitchText
              text="帥哥攻略"
              className="font-display text-5xl sm:text-6xl text-white block"
            />
          </div>

          <motion.div
            className="font-mono text-base text-gray-500 tracking-widest mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            「解開 CTF，攻略他的心」
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="flex items-center gap-3 mt-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-neon-cyan" />
            <span className="text-neon-cyan text-base">♥</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-neon-cyan" />
          </motion.div>
        </motion.div>

        {/* Input card */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div
            className="rounded-2xl border p-10"
            style={{
              backgroundColor: "rgba(26,26,46,0.85)",
              borderColor:     "rgba(0,245,212,0.25)",
              backdropFilter:  "blur(12px)",
              boxShadow:       "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,245,212,0.08)",
            }}
          >
            <label className="block font-mono text-base text-gray-500 mb-2 tracking-widest">
              玩家名稱
            </label>

            {/* Terminal prompt input */}
            <div className="flex items-center gap-2 border-b border-neon-cyan/30 pb-2 mb-6">
              <span className="font-mono text-neon-cyan text-base select-none">&gt;</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={handleKey}
                placeholder="輸入你的名字..."
                maxLength={20}
                className="flex-1 bg-transparent font-mono text-base text-white placeholder-gray-600 outline-none caret-neon-cyan"
                autoFocus
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
              />
              {name && (
                <span className="font-mono text-sm text-gray-600">{name.length}/20</span>
              )}
            </div>

            <Button
              onClick={handleStart}
              disabled={!name.trim()}
              className="w-full justify-center text-center"
              charColor="#00f5d4"
            >
              開始遊戲 ▶
            </Button>

            <p className="font-mono text-base text-gray-600 text-center mt-4">
              按 Enter 開始
            </p>
          </div>

          {/* Version/hint */}
          <motion.p
            className="text-center font-mono text-base text-gray-700 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            4 位帥哥 · CTF 問答 · 解鎖告白結局
          </motion.p>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute top-6 left-6 font-mono text-xs text-gray-800 select-none">
          v1.0.0
        </div>
        <div className="absolute top-6 right-6 font-mono text-xs text-gray-800 select-none">
          CTF.LOVE
        </div>
      </div>
    </ScreenWrapper>
  );
}
