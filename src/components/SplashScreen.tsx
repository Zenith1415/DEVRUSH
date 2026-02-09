import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootLine {
  text: string;
  delay: number;
  type: "system" | "progress" | "success" | "header";
}

const bootSequence: BootLine[] = [
  { text: "DEVRUSH Boot Diagnostics v2.0", type: "header", delay: 0 },
  { text: "SYSTEM INITIALIZING...", type: "system", delay: 300 },
  { text: "Checking protocols...", type: "system", delay: 600 },
  { text: "Connecting to mainframe...", type: "system", delay: 900 },
  { text: "Loading innovation modules...", type: "system", delay: 1200 },
  { text: "Establishing secure tunnel...", type: "system", delay: 1500 },
  { text: "Loading DEVRUSH 2.0. Please wait.", type: "system", delay: 1800 },
  { text: "All systems operational ✓", type: "success", delay: 2400 },
];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  const skip = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    // Show boot lines
    bootSequence.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), bootSequence[i].delay);
    });

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 2;
      });
    }, 50);

    // Show logo after boot
    setTimeout(() => setShowLogo(true), 2800);
    setTimeout(() => setShowEnter(true), 3500);

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Skip button */}
      <button
        onClick={skip}
        className="absolute top-6 right-6 font-terminal text-xs text-muted-foreground hover:text-accent transition-colors"
      >
        [SKIP]
      </button>

      <div className="w-full max-w-2xl px-6">
        {/* Boot text */}
        <AnimatePresence>
          {!showLogo && (
            <motion.div
              className="font-terminal text-sm space-y-1"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {bootSequence.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    line.type === "header"
                      ? "text-accent neon-text mb-2"
                      : line.type === "success"
                      ? "text-neon-green"
                      : "text-muted-foreground"
                  }
                >
                  {line.type === "system" && <span className="text-muted-foreground/60">{">"} </span>}
                  {line.text}
                </motion.div>
              ))}

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>[</span>
                  <div className="flex-1 h-2 bg-secondary rounded-sm overflow-hidden">
                    <motion.div
                      className="h-full rounded-sm"
                      style={{ background: "linear-gradient(90deg, hsl(var(--neon-blue)), hsl(var(--neon-cyan)))" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                  <span>] {progress}%</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Logo reveal */}
        <AnimatePresence>
          {showLogo && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="font-heading text-6xl sm:text-8xl font-bold tracking-tight gradient-text mb-4">
                DEV RUSH
              </h1>
              <p className="font-terminal text-accent text-lg neon-text mb-2">2.0</p>
              <p className="font-terminal text-sm text-muted-foreground">
                24HR HACKATHON | MARCH 13-14, 2026
              </p>

              {showEnter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-10"
                >
                  <button
                    onClick={onComplete}
                    className="font-terminal text-sm px-8 py-3 border border-accent/50 text-accent rounded-md neon-glow-cyan animate-pulse-glow hover:bg-accent/10 transition-colors"
                  >
                    {">"} ENTER SYSTEM
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
