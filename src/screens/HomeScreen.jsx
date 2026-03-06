import { motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { ScreenWrapper } from "../components/layout/ScreenWrapper.jsx";
import { GlitchText }    from "../components/ui/GlitchText.jsx";
import { Button }        from "../components/ui/Button.jsx";
import { GOOGLE_CLIENT_ID } from "../constants/env.js";

export function HomeScreen({ dispatch }) {
  function handleGoogleSuccess(credentialResponse) {
    // Decode JWT payload (base64url → JSON) without a library
    const base64 = credentialResponse.credential.split(".")[1];
    const json   = JSON.parse(atob(base64.replace(/-/g, "+").replace(/_/g, "/")));
    const { name, email, picture } = json;

    dispatch({ type: "SET_GOOGLE_USER",  payload: { name, email, picture } });
    dispatch({ type: "SET_PLAYER_NAME",  payload: name });
    dispatch({ type: "GO_TO_CHARACTER_SELECT" });
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
          <div className="font-mono text-base text-neon-cyan tracking-[0.3em] mb-4 opacity-70">
            奪 旗 作 戰
          </div>

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

        {/* Login card */}
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div
            className="rounded-2xl border p-10 flex flex-col items-center gap-6"
            style={{
              backgroundColor: "rgba(26,26,46,0.85)",
              borderColor:     "rgba(0,245,212,0.25)",
              backdropFilter:  "blur(12px)",
              boxShadow:       "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(0,245,212,0.08)",
            }}
          >
            <p className="font-mono text-base text-gray-400 tracking-widest">
              以 Google 帳號登入開始
            </p>

            {GOOGLE_CLIENT_ID ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => console.error("Google login failed")}
                theme="filled_black"
                shape="pill"
                locale="zh-TW"
              />
            ) : (
              <div
                className="w-full rounded-xl border p-4 text-center"
                style={{ borderColor: "rgba(239,68,68,0.4)", backgroundColor: "rgba(239,68,68,0.08)" }}
              >
                <p className="font-mono text-sm text-red-400 mb-2">尚未設定 Google Client ID</p>
                <p className="font-mono text-xs text-gray-500 leading-relaxed">
                  請在 .env 中設定 VITE_GOOGLE_CLIENT_ID<br />
                  前往 Google Cloud Console 建立 OAuth 2.0 用戶端 ID
                </p>
              </div>
            )}
          </div>

          <motion.p
            className="text-center font-mono text-base text-gray-700 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            4 位帥哥 · CTF 問答 · 解鎖告白結局
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="w-full mt-2"
          >
            <Button
              variant="ghost"
              onClick={() => dispatch({ type: "GO_TO_DASHBOARD" })}
              className="w-full text-center text-gray-600 hover:text-gray-400"
            >
              📊 攻略紀錄
            </Button>
          </motion.div>
        </motion.div>

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
