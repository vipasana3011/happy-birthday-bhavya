import { useRef, useState } from "react";
import Index from "@/pages/Index";

const App = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  // 🎵 PLAY MUSIC (must be triggered by user click)
  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    try {
      await audio.play();
      setPlaying(true);
    } catch (e) {
      console.log("Music blocked:", e);
    }
  };

  // 🎵 expose globally so HeroScene can trigger it
  (window as any).playMusic = playMusic;

  return (
    <>
      {/* 🎵 GLOBAL AUDIO */}
      <audio
        ref={audioRef}
        src="/assets/TumhoToh.mp3"
        loop
        preload="auto"
      />

      {/* 🎬 MAIN APP */}
      <Index />
    </>
  );
};

export default App;
