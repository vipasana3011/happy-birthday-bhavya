import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useMemo } from "react";

interface Props {
  count?: number;
  variant?: "hearts" | "sparkles" | "mixed";
}

const FloatingHearts = ({ count = 18, variant = "mixed" }: Props) => {
  const items = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 8 + Math.random() * 8,
    size: 14 + Math.random() * 28,
    type: variant === "mixed" ? (Math.random() > 0.5 ? "heart" : "spark") : variant === "hearts" ? "heart" : "spark",
  })), [count, variant]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute"
          style={{ left: `${it.left}%`, bottom: -40 }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -window.innerHeight - 100, opacity: [0, 1, 1, 0], rotate: [0, 20, -10, 0] }}
          transition={{ duration: it.duration, delay: it.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {it.type === "heart" ? (
            <Heart fill="hsl(340 85% 70%)" stroke="none" style={{ width: it.size, height: it.size, filter: "drop-shadow(0 0 12px hsl(330 100% 75% / 0.8))" }} />
          ) : (
            <Sparkles style={{ width: it.size, height: it.size, color: "hsl(45 100% 75%)", filter: "drop-shadow(0 0 10px hsl(45 100% 75%))" }} />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
