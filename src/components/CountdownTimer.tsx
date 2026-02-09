import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-03-13T09:00:00+05:30").getTime();

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer = ({ compact = false }: { compact?: boolean }) => {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([]);

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const diff = Math.max(0, TARGET_DATE - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft([
        { value: days, label: "DAYS" },
        { value: hours, label: "HRS" },
        { value: minutes, label: "MIN" },
        { value: seconds, label: "SEC" },
      ]);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (compact) {
    return (
      <div className="font-terminal text-xs text-accent flex gap-1">
        {timeLeft.map((unit, i) => (
          <span key={unit.label}>
            {String(unit.value).padStart(2, "0")}
            {i < timeLeft.length - 1 && <span className="text-muted-foreground">:</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="font-terminal">
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {timeLeft.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2 sm:gap-4">
            <div className="text-center">
              <div className="relative">
                <div className="bg-secondary/80 border border-border rounded-lg px-3 py-2 sm:px-5 sm:py-4 min-w-[60px] sm:min-w-[80px]">
                  <span className="text-2xl sm:text-4xl font-bold text-accent neon-text tabular-nums">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-muted-foreground mt-1 block">{unit.label}</span>
            </div>
            {i < timeLeft.length - 1 && (
              <span className="text-2xl sm:text-4xl text-primary font-bold animate-blink mb-4">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
