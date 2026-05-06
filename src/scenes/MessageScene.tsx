import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import FloatingHearts from "@/components/FloatingHearts";
import { useState } from "react";
import { SceneProps } from "./types";

const MESSAGE = `🎉💗 Happy Birthday to the cutest girl ever 💗🎉

You’re honestly one of the most special people in my life.
Being around you makes everything lighter, happier & better.

Your smile, your vibe, your little silly moments…
everything about you feels like magic ✨💕

I hope your day is full of love, cake, laughter & happiness.

And just so you know…
you are kinda my favorite person 😏💘

Happy Birthday again, Surbhi 🎂💞`;

const MessageScene = ({ onNext }: SceneProps) => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-b from-pink-100 via-rose-50 to-pink-200">

      {/* floating hearts */}
      <FloatingHearts count={12} variant="hearts" />

      {/* animated glow blobs */}
      <div className="absolute w-72 h-72 bg-pink-300/30 blur-3xl rounded-full top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-rose-300/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse" />

      {/* card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, rotateX: 20 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8 }}
        onClick={() => setOpened(true)}
        className="relative z-10 w-full max-w-lg cursor-pointer"
      >

        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 shadow-2xl">

          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8">

            {/* title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={opened ? { opacity: 1, y: 0 } : {}}
              className="text-center text-2xl sm:text-3xl text-pink-500 font-semibold mb-4"
            >
              💌 A Special Letter
            </motion.h2>

            {/* message box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={opened ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="max-h-[300px] overflow-y-auto pr-2 space-y-3"
            >
              {MESSAGE.split("\n").map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={opened ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.05 }}
                  className="text-gray-700 text-sm sm:text-base leading-relaxed"
                >
                  {line}
                </motion.p>
              ))}
            </motion.div>

            {/* hint */}
            {!opened && (
              <p className="text-center text-xs text-gray-400 mt-4 animate-pulse">
                Tap to open 💖
              </p>
            )}

            {/* button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={opened ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="mt-6 flex justify-center"
            >
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="rounded-full px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-lg hover:scale-105 transition-transform"
              >
                Continue 💖
              </Button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MessageScene;
