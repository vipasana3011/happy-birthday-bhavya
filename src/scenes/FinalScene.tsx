import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import { Button } from "@/components/ui/button";
import { SceneProps } from "./types";

const FinalScene = ({ onNext }: SceneProps) => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4">

      {/* background glow */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-glow)" }}
      />

      {/* hearts */}
      <FloatingHearts count={32} />

      {/* content */}
      <div className="relative z-10 text-center">

        {/* title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="font-script text-4xl sm:text-6xl md:text-8xl gradient-text text-glow"
        >
          Forever & Always 💖
        </motion.h1>

        {/* floating heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          transition={{
            delay: 1,
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-4xl sm:text-5xl mt-4"
        >
          💕
        </motion.div>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-6 text-sm sm:text-base text-foreground/70 italic"
        >
          Made BY GAUTAM with all the love, just for you surbhi ✨
        </motion.p>

        {/* button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-6"
        >
          <Button
            onClick={() => onNext()}
            className="rounded-full px-6 sm:px-8 py-3 sm:py-4 bg-pink-500 text-white shadow-lg hover:scale-105 transition-transform"
          >
            Replay the magic ✨
          </Button>
        </motion.div>

      </div>
    </div>
  );
};

export default FinalScene;
