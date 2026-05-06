import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { SceneProps } from "./types";

const HeroScene = ({ onNext }: SceneProps) => {

  // 🎵 SAFE MUSIC START
  const handleBegin = async (e: React.MouseEvent) => {
    e.stopPropagation(); // 🛑 extra safety

    const playMusic = (window as any).playMusic;

    if (playMusic) {
      try {
        await playMusic(); // 🎵 start music
      } catch (e) {
        console.log("Music blocked:", e);
      }
    }

    onNext(); // 🎬 move scene
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-10">

      {/* 🌈 background */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* 💖 floating hearts */}
      <FloatingHearts count={12} />

      {/* ✨ content */}
      <div className="relative z-10 text-center w-full max-w-md">

        {/* 🎉 title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-5xl md:text-6xl font-display gradient-text"
        >
          Happy Birthday
        </motion.h1>

        {/* 💕 name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-6xl mt-2 font-script text-pink-500"
        >
          Surbhi 💖
        </motion.div>

        {/* ✨ subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-sm sm:text-base text-gray-600"
        >
          A little surprise made just for you ✨
        </motion.p>

        {/* 🎯 button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Button
            onClick={handleBegin}
            className="rounded-full px-6 py-4 bg-pink-500 text-white shadow-lg hover:scale-105 transition"
          >
            Begin ✨
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroScene;
