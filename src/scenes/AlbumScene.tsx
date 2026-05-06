import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SceneProps } from "./types";
import { useRef, useState } from "react";

// DATA
const photos = [
  { caption: "the prettiest soul 💕", img: "/assets/pic1.jpg" },
  { caption: "my favorite person", img: "/assets/pic2.jpg" },
  { caption: "my sunshine ☀️", img: "/assets/pic3.jpg" },
  { caption: "pure happiness", img: "/assets/pic4.jpg" },
  { caption: "my comfort place", img: "/assets/pic5.jpg" },
  { caption: "my forever girl 💖", img: "/assets/pic6.jpg" },
];

// 💎 POLAROID
const Polaroid = ({ photo, index, onClick }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;

    setTilt({ x: y, y: x });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      onClick={onClick}
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.12 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
      }}
      className="relative bg-white p-2 pb-6 rounded-xl shadow-xl cursor-pointer
                 w-full max-w-[160px] sm:max-w-[180px] md:max-w-[220px]"
    >
      {/* glow */}
      <div className="absolute inset-0 rounded-xl bg-pink-300/20 blur-xl opacity-0 hover:opacity-100 transition" />

      <div className="w-full aspect-[3/4] rounded-md overflow-hidden">
        <img
          src={photo.img}
          alt={photo.caption}
          className="w-full h-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      <p className="text-center mt-2 text-sm sm:text-base text-pink-500 font-script">
        {photo.caption}
      </p>
    </motion.div>
  );
};

// 💎 MAIN
const AlbumScene = ({ onNext }: SceneProps) => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="w-full min-h-screen flex flex-col items-center px-4 py-10 overflow-y-auto bg-gradient-to-br from-pink-100 via-purple-100 to-pink-200">

      {/* TITLE */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl sm:text-3xl md:text-5xl text-center mb-8 text-pink-600 font-display"
      >
        💖 My Girl 💖
      </motion.h2>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl place-items-center mb-12">
        {photos.map((photo, i) => (
          <Polaroid
            key={i}
            photo={photo}
            index={i}
            onClick={() => setSelected(photo)}
          />
        ))}
      </div>

      {/* BUTTON */}
      <Button
        size="lg"
        onClick={onNext}
        className="rounded-full px-8 py-5 bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-xl"
      >
        Continue 💌
      </Button>

      {/* 🔥 ZOOM MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="max-w-[90%] max-h-[80%]"
            >
              <img
                src={selected.img}
                alt=""
                className="rounded-xl shadow-2xl object-contain"
              />

              <p className="text-center mt-4 text-white text-lg font-script">
                {selected.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AlbumScene;
