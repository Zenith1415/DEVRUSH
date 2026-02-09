import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  glitchOnHover?: boolean;
}

const GlitchText = ({ text, className = "", as: Tag = "span", glitchOnHover = false }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (glitchOnHover) return;
    // Periodic glitch
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 500 + Math.random() * 1000 );
    return () => clearInterval(interval);
  }, [glitchOnHover]);

  return (
    <Tag
      className={`relative inline-block ${className}`}
      onMouseEnter={glitchOnHover ? () => setIsGlitching(true) : undefined}
      onMouseLeave={glitchOnHover ? () => setIsGlitching(false) : undefined}
    >
      {text}
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 z-20 opacity-80"
            style={{
              color: "hsl(var(--neon-cyan))",
              WebkitTextFillColor: "initial",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              transform: "translate(-2px, -1px)",
              animation: "glitch 0.3s ease-in-out",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
          <span
            className="absolute inset-0 z-20 opacity-80"
            style={{
              color: "hsl(var(--neon-blue))",
              WebkitTextFillColor: "initial",
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
              transform: "translate(2px, 1px)",
              animation: "glitch 0.3s ease-in-out reverse",
            }}
            aria-hidden="true"
          >
            {text}
          </span>
        </>
      )}
    </Tag>
  );
};

export default GlitchText;
