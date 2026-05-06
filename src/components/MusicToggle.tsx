import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4;

    try {
      await audio.play();
      setPlaying(true);
    } catch (err) {
      console.log("Blocked:", err);
    }
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setPlaying(false);
  };

  // 👇 expose ONLY functions via window (safe)
  (window as any).playMusic = playMusic;

  return (
    <>
      <audio
        ref={audioRef}
        src="/assets/TumhoToh.mp3"
        loop
        preload="auto"
      />

      <button
        onClick={playing ? pauseMusic : playMusic}
        className="fixed top-5 right-5 z-50 glass rounded-full p-3"
      >
        {playing ? <Volume2 /> : <VolumeX />}
      </button>
    </>
  );
}
