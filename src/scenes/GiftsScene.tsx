import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";

const gifts = [
  { id: 1, word: "you", img: "/assets/gifts/bouquet.png" },
  { id: 2, word: "are", img: "/assets/gifts/chocolate.png" },
  { id: 3, word: "my", img: "/assets/gifts/teddy.png" },
  { id: 4, word: "gift", img: "/assets/gifts/cards.png" },
];

// 🔊 POP SOUND
const playPop = () => {
  try {
    const ctx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();

    const o = ctx.createOscillator();
    const g = ctx.createGain();

    o.frequency.setValueAtTime(800, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.2);

    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    o.connect(g);
    g.connect(ctx.destination);

    o.start();
    o.stop(ctx.currentTime + 0.25);
  } catch {}
};

export default function GiftsScene({ onNext }: any) {
  const [opened, setOpened] = useState<number[]>([]);

  const openGift = (id: number) => {
    if (opened.includes(id)) return;

    playPop();

    // 🎉 mini confetti burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff8fab", "#ffc2d4", "#fb6f92", "#ffffff"],
    });

    setOpened([...opened, id]);
  };

  const allOpened = opened.length === gifts.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 gap-10 overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200">

      {/* ✨ FLOATING BG */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "-10%", opacity: [0, 1, 0] }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            className="absolute text-pink-300 text-xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            ✨
          </motion.div>
        ))}
      </div>

      {/* 💖 TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl text-pink-500 font-bold text-center z-10"
      >
        Open Your Gifts 🎁
      </motion.h2>

      {/* 🎁 GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 z-10">

        {gifts.map((g, i) => {
          const isOpen = opened.includes(g.id);

          return (
            <motion.div
              key={g.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openGift(g.id)}
              className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 cursor-pointer perspective"
            >

              {/* 💎 3D TILT */}
              <motion.div
                whileHover={{ rotateX: 8, rotateY: -8 }}
                className="relative w-full h-full [transform-style:preserve-3d]"
              >

                {/* 🎁 BOX BASE (DECORATED) */}
                <div className="absolute bottom-0 w-full h-3/4 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-400 to-pink-500 shadow-2xl flex items-center justify-center overflow-hidden">

                  {/* ribbon vertical */}
                  <div className="absolute w-3 bg-white/70 h-full left-1/2 -translate-x-1/2" />

                  {/* ribbon horizontal */}
                  <div className="absolute h-3 bg-white/70 w-full top-1/2 -translate-y-1/2" />

                  {/* glow */}
                  <div className="absolute inset-0 bg-white/10 blur-md" />

                  <div className="px-3 py-1 bg-white text-pink-500 text-xs sm:text-sm rounded-full shadow font-semibold z-10">
                    {g.word}
                  </div>
                </div>

                {/* 🎀 LID */}
                <motion.div
                  animate={
                    isOpen
                      ? { rotateX: -140, y: -25 }
                      : { rotateX: 0, y: 0 }
                  }
                  transition={{ duration: 0.7 }}
                  className="absolute top-0 w-full h-1/3 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-600 origin-top shadow-xl"
                >
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-2xl">
                    🎀
                  </div>
                </motion.div>

                {/* 🎁 ITEM */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.img
                      src={g.img}
                      initial={{ y: 40, scale: 0, opacity: 0 }}
                      animate={{ y: -100, scale: 1.2, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 120 }}
                      className="absolute left-1/2 -translate-x-1/2 top-6 w-20 sm:w-24 z-20 drop-shadow-2xl"
                    />
                  )}
                </AnimatePresence>

                {/* ✨ SPARKLES */}
                {isOpen &&
                  [...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1.5,
                        x: Math.random() * 120 - 60,
                        y: Math.random() * -120,
                      }}
                      transition={{ duration: 1 }}
                      className="absolute left-1/2 top-1/2 text-yellow-300 text-lg"
                    >
                      ✨
                    </motion.div>
                  ))}

                {/* 💖 HEART BURST */}
                {isOpen &&
                  [...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1, scale: 0 }}
                      animate={{
                        opacity: 0,
                        scale: 1.3,
                        x: Math.random() * 80 - 40,
                        y: Math.random() * -100,
                      }}
                      transition={{ duration: 1.2 }}
                      className="absolute left-1/2 top-1/2 text-pink-400 text-lg"
                    >
                      💖
                    </motion.div>
                  ))}

              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* 🚀 BUTTON */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        disabled={!allOpened}
        onClick={() => {
          // 🎉 FINAL CONFETTI
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.5 },
          });
          onNext();
        }}
        className={`mt-6 px-8 py-4 rounded-full text-white transition z-10 ${
          allOpened
            ? "bg-pink-500 hover:scale-105 shadow-xl"
            : "bg-gray-300"
        }`}
      >
        {allOpened ? "Next 💌" : "Open all gifts"}
      </motion.button>

    </div>
  );
}
