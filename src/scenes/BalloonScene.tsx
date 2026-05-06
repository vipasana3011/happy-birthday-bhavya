import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { SceneProps } from "./types";

const COLORS = [
  "#e00d42","#e3fb7a","#e644bb","#fb6f92",
  "#ab5c6f","#7d3ea1","#9dbcd7","#4b7543",
];

const playPop = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.frequency.setValueAtTime(900, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.15);

    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.2);
  } catch {}
};

const BalloonScene = ({ onNext }: SceneProps) => {

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const initial = useMemo(
    () =>
      Array.from({ length: isMobile ? 7 : 10 }).map((_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: 5 + (i * 90) / (isMobile ? 7 : 10),
        delay: Math.random() * 1.5,
      })),
    [isMobile]
  );

  const [balloons, setBalloons] = useState(initial);
  const [popping, setPopping] = useState<number[]>([]);

  const allPopped = balloons.length === 0;

  useEffect(() => {
    if (allPopped) {
      confetti({
        particleCount: isMobile ? 100 : 150,
        spread: 120,
        origin: { y: 0.5 },
      });
    }
  }, [allPopped]);

  const pop = (id: number) => {
    if (popping.includes(id)) return;

    playPop();

    confetti({
      particleCount: isMobile ? 40 : 70,
      spread: 80,
      origin: { x: Math.random(), y: Math.random() * 0.5 },
      colors: ["#ff8fab","#ffc2d4","#ffe5ec","#fb6f92"],
    });

    setPopping((p) => [...p, id]);

    setTimeout(() => {
      setBalloons((b) => b.filter((x) => x.id !== id));
      setPopping((p) => p.filter((x) => x !== id));
    }, 250);
  };

  const reset = () => {
    setBalloons(initial);
    setPopping([]);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">

      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-white to-pink-50" />

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-6 sm:top-10 w-full text-center text-xl sm:text-2xl md:text-4xl text-pink-500 z-10"
      >
        Pop the balloons 🎈
      </motion.h2>

      {/* BALLOONS */}
      {balloons.map((b) => {
        const isPopping = popping.includes(b.id);

        return (
          <motion.div
            key={b.id}
            initial={{ y: "110%" }}
            animate={{ y: "-110%" }}
            transition={{
              duration: isMobile ? 5 : 7,
              delay: b.delay,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ left: `${b.left}%` }}
            className="absolute bottom-0 cursor-pointer"
            onClick={() => pop(b.id)}
          >
            <motion.div
              whileTap={{ scale: 0.85 }}
              whileHover={!isMobile ? { scale: 1.15 } : {}}
              animate={
                isPopping ? { scale: 1.6, opacity: 0, rotate: 20 } : {}
              }
              transition={{ duration: 0.2 }}
            >
              <Balloon color={b.color} isMobile={isMobile} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* POPUP */}
      {allPopped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center z-20 px-4"
        >
          <div className="bg-white/60 backdrop-blur-lg p-6 sm:p-10 rounded-2xl text-center shadow-xl w-full max-w-sm">

            <p className="text-xl sm:text-2xl text-pink-500 mb-4">
              You popped them all 💖
            </p>

            <Button
              onClick={reset}
              className="w-full mb-3 rounded-full py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white"
            >
              Send More 💌
            </Button>

            <Button
              onClick={onNext}
              variant="outline"
              className="w-full rounded-full py-4"
            >
              Continue →
            </Button>

          </div>
        </motion.div>
      )}

      {/* HINT */}
      <p className="absolute bottom-4 w-full text-center text-pink-400 text-sm sm:text-base">
        tap them 💕
      </p>
    </div>
  );
};

const Balloon = ({ color, isMobile }: any) => (
  <div className="relative">

    <div
      className={`${isMobile ? "w-12 h-14" : "w-16 h-20"} rounded-full`}
      style={{
        background: `radial-gradient(circle at 30% 30%, white, ${color})`,
        boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
      }}
    />

    <div
      className="mx-auto"
      style={{
        width: 0,
        height: 0,
        borderLeft: "6px solid transparent",
        borderRight: "6px solid transparent",
        borderTop: `8px solid ${color}`,
      }}
    />

    <div className={`${isMobile ? "h-10" : "h-16"} w-px bg-pink-200 mx-auto`} />

  </div>
);

export default BalloonScene;
