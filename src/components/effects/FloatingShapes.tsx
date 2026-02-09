import { motion } from "framer-motion";

const shapes = [
  { size: 80, x: "10%", y: "20%", delay: 0, duration: 8, type: "cube" },
  { size: 60, x: "80%", y: "15%", delay: 1, duration: 10, type: "triangle" },
  { size: 100, x: "70%", y: "60%", delay: 2, duration: 7, type: "cube" },
  { size: 50, x: "20%", y: "70%", delay: 0.5, duration: 9, type: "diamond" },
  { size: 70, x: "50%", y: "80%", delay: 1.5, duration: 11, type: "triangle" },
];

const WireframeCube = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="opacity-20">
    <rect x="20" y="20" width="50" height="50" stroke="hsl(var(--neon-cyan))" strokeWidth="1" />
    <rect x="30" y="10" width="50" height="50" stroke="hsl(var(--neon-blue))" strokeWidth="0.5" />
    <line x1="20" y1="20" x2="30" y2="10" stroke="hsl(var(--neon-cyan))" strokeWidth="0.5" />
    <line x1="70" y1="20" x2="80" y2="10" stroke="hsl(var(--neon-cyan))" strokeWidth="0.5" />
    <line x1="70" y1="70" x2="80" y2="60" stroke="hsl(var(--neon-cyan))" strokeWidth="0.5" />
    <line x1="20" y1="70" x2="30" y2="60" stroke="hsl(var(--neon-blue))" strokeWidth="0.5" />
  </svg>
);

const WireframeTriangle = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="opacity-15">
    <polygon points="50,10 90,85 10,85" stroke="hsl(var(--neon-blue))" strokeWidth="1" />
    <polygon points="50,25 78,78 22,78" stroke="hsl(var(--neon-cyan))" strokeWidth="0.5" />
  </svg>
);

const WireframeDiamond = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="opacity-15">
    <polygon points="50,5 95,50 50,95 5,50" stroke="hsl(var(--neon-cyan))" strokeWidth="1" />
    <polygon points="50,20 80,50 50,80 20,50" stroke="hsl(var(--neon-blue))" strokeWidth="0.5" />
  </svg>
);

const ShapeMap = { cube: WireframeCube, triangle: WireframeTriangle, diamond: WireframeDiamond };

const FloatingShapes = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
    {shapes.map((shape, i) => {
      const Shape = ShapeMap[shape.type as keyof typeof ShapeMap];
      return (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
          }}
          transition={{
            y: { duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
            rotate: { duration: shape.duration * 3, repeat: Infinity, ease: "linear", delay: shape.delay },
          }}
        >
          <Shape size={shape.size} />
        </motion.div>
      );
    })}
  </div>
);

export default FloatingShapes;
