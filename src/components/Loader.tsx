import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Loader = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "var(--gradient-romance)" }}>
    <motion.div
      animate={{ scale: [1, 1.25, 1], rotate: [0, -5, 5, 0] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
    >
      <Heart fill="hsl(340 85% 65%)" stroke="none" className="w-28 h-28" style={{ filter: "drop-shadow(0 0 40px hsl(330 100% 70%))" }} />
    </motion.div>
  </div>
);

export default Loader;
