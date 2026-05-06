import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import confetti from "canvas-confetti";
import { SceneProps } from "./types";

const CakeScene = ({ onNext }: SceneProps) => {
  const [cut, setCut] = useState(false);

  const handleCut = () => {
    if (cut) return;
    setCut(true);

    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#ff6fa8", "#ffc0e0", "#ffd700", "#c39bff", "#ffffff"],
      });
    }, 800);

    setTimeout(() => onNext(), 2800);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">

      {/* BG */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl sm:text-3xl md:text-5xl gradient-text mb-6 z-10 text-center"
      >
        Make a wish, beautiful
      </motion.h2>

      {/* CAKE AREA (RESPONSIVE FIX) */}
      <div className="relative w-[220px] sm:w-[260px] md:w-[320px] h-[260px] sm:h-[300px] md:h-[340px] z-10">

        {/* Knife */}
        <motion.div
          initial={{ x: 200, y: -120, rotate: 35, opacity: 0 }}
          animate={cut ? { x: 0, y: 0, rotate: 0, opacity: 1 } : { x: 200, y: -120, rotate: 35, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 z-30"
        >
          <div className="w-1.5 sm:w-2 h-28 sm:h-40 bg-gradient-to-b from-gray-200 to-gray-400 rounded shadow-lg" />
          <div className="w-5 sm:w-6 h-8 sm:h-10 bg-gradient-to-b from-amber-700 to-amber-900 rounded mx-auto -mt-1" />
        </motion.div>

        {/* Candle */}
        <div className="absolute left-1/2 -translate-x-1/2 top-2 z-20 flex flex-col items-center">
          <AnimatePresence>
            {!cut && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-2 sm:w-3 h-4 sm:h-5 rounded-full bg-gradient-to-t from-orange-400 to-yellow-200"
                style={{ filter: "drop-shadow(0 0 12px hsl(45 100% 70%))" }}
              />
            )}
          </AnimatePresence>
          <div className="w-1 sm:w-1.5 h-6 sm:h-8 bg-pink-200 rounded-full mt-1" />
        </div>

        {/* Cake Left */}
        <motion.div
          animate={cut ? { x: -40, rotate: -8 } : { x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="absolute left-0 top-12 w-1/2 h-[200px] sm:h-[240px] md:h-[270px] origin-right z-10"
        >
          <CakeHalf side="left" />
        </motion.div>

        {/* Cake Right */}
        <motion.div
          animate={cut ? { x: 40, rotate: 8 } : { x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="absolute right-0 top-12 w-1/2 h-[200px] sm:h-[240px] md:h-[270px] origin-left z-10"
        >
          <CakeHalf side="right" />
        </motion.div>

        {/* Plate */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[260px] sm:w-[300px] md:w-[360px] h-5 sm:h-6 rounded-full bg-white/60 blur-sm" />
      </div>

      {/* BUTTON */}
      {!cut && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 z-10"
        >
          <Button
            size="lg"
            onClick={handleCut}
            className="rounded-full px-6 sm:px-10 py-4 text-base sm:text-lg shadow-glow bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] hover:scale-105 transition-transform"
          >
            🔪 Cut the Cake
          </Button>
        </motion.div>
      )}
    </div>
  );
};

const CakeHalf = ({ side }: { side: "left" | "right" }) => (
  <div className="relative w-full h-full">

    {/* Top */}
    <div
      className={`absolute top-0 ${side === "left" ? "right-0" : "left-0"} w-[100px] sm:w-[120px] md:w-[140px] h-[60px] sm:h-[70px] md:h-[80px]`}
      style={{
        background: "linear-gradient(180deg, hsl(340 80% 92%), hsl(340 70% 80%))",
        borderTopLeftRadius: side === "left" ? 70 : 0,
        borderTopRightRadius: side === "right" ? 70 : 0,
        boxShadow: "inset 0 -8px 0 hsl(340 60% 70%)",
      }}
    />

    {/* Cream drip */}
    <div
      className={`absolute top-[58px] sm:top-[68px] md:top-[78px] ${side === "left" ? "right-0" : "left-0"} w-[100px] sm:w-[120px] md:w-[140px] h-3`}
      style={{
        background: "hsl(340 90% 75%)",
        clipPath:
          side === "left"
            ? "polygon(0 0, 100% 0, 100% 100%, 90% 60%, 75% 100%, 60% 50%, 45% 100%, 30% 60%, 15% 100%, 0 50%)"
            : "polygon(0 0, 100% 0, 100% 50%, 85% 100%, 70% 60%, 55% 100%, 40% 50%, 25% 100%, 10% 60%, 0 100%)",
      }}
    />

    {/* Bottom */}
    <div
      className={`absolute top-[70px] sm:top-[80px] md:top-[88px] ${side === "left" ? "right-0" : "left-0"} w-[120px] sm:w-[150px] md:w-[170px] h-[130px] sm:h-[150px] md:h-[180px]`}
      style={{
        background: "linear-gradient(180deg, hsl(30 80% 90%), hsl(20 60% 75%))",
        borderBottomLeftRadius: side === "left" ? 16 : 0,
        borderBottomRightRadius: side === "right" ? 16 : 0,
      }}
    />

    {/* dots */}
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-white/90"
        style={{
          top: 90 + i * 30,
          [side === "left" ? "right" : "left"]: 15 + (i % 2) * 25,
          boxShadow: "0 0 8px hsl(340 100% 80%)",
        }}
      />
    ))}
  </div>
);

export default CakeScene;
