"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music2, Pause, Play } from "lucide-react";
import { chapters, loveLetter, memories } from "@/config/birthday";
import { BirthdayChapter } from "@/components/birthday/BirthdayChapter";
import { StarMessageOverlay } from "@/components/birthday/StarMessageOverlay";
import { LoveLetterChapter } from "@/components/love-letter/LoveLetterChapter";
import { MemoriesChapter } from "@/components/memories/MemoriesChapter";
import { UniverseBackground } from "@/components/universe/UniverseBackground";
import { BirthdayIntro } from "@/components/intro/BirthdayIntro";

export default function Home() {
  const [chapter, setChapter] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [musicPrompt, setMusicPrompt] = useState(false);
  const [galaxyVolume, setGalaxyVolume] = useState(0.45);
  const [introComplete, setIntroComplete] = useState<boolean | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const galaxyAudioRef = useRef<HTMLAudioElement>(null);
  const miAmorWasPlaying = useRef(false);
  const playbackRequest = useRef(0);
  const unlocked = revealed.length === 3;
  useEffect(() => {
    const checkSession = setTimeout(() => {
      try { setIntroComplete(sessionStorage.getItem("rasmalai-birthday-intro-complete") === "yes"); }
      catch { setIntroComplete(false); }
    }, 0);
    return () => clearTimeout(checkSession);
  }, []);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !introComplete || !audio.paused) return;
    const request = ++playbackRequest.current;
    void audio.play().then(() => { if (request === playbackRequest.current) { setPlaying(true); setMusicPrompt(false); } }).catch(() => { if (request === playbackRequest.current) { setPlaying(false); setMusicPrompt(true); } });
  }, [introComplete]);
  useEffect(() => { if (galaxyAudioRef.current) galaxyAudioRef.current.volume = galaxyVolume; }, [galaxyVolume]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMessage(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const startMusic = () => {
    const audio = chapter === 2 ? galaxyAudioRef.current : audioRef.current;
    if (!audio || !audio.src) return;
    const request = ++playbackRequest.current;
    void audio.play().then(() => { if (request === playbackRequest.current) { setPlaying(true); setMusicPrompt(false); } }).catch(() => { if (request === playbackRequest.current) { setPlaying(false); setMusicPrompt(true); } });
  };
  const toggleMusic = () => {
    const audio = chapter === 2 ? galaxyAudioRef.current : audioRef.current;
    if (audio && !audio.paused) { playbackRequest.current++; audio.pause(); setPlaying(false); setMusicPrompt(false); }
    else startMusic();
  };
  const changeChapter = (next: number) => {
    if (next === chapter) return;
    playbackRequest.current++;
    if (next === 2) {
      miAmorWasPlaying.current = Boolean(audioRef.current && !audioRef.current.paused);
      audioRef.current?.pause();
      setPlaying(false);
      const galaxyAudio = galaxyAudioRef.current;
      if (galaxyAudio) {
        const request = ++playbackRequest.current;
        void galaxyAudio.play().then(() => { if (request === playbackRequest.current) { setPlaying(true); setMusicPrompt(false); } }).catch(() => { if (request === playbackRequest.current) { setPlaying(false); setMusicPrompt(true); } });
      }
    } else if (chapter === 2) {
      const galaxyAudio = galaxyAudioRef.current;
      galaxyAudio?.pause();
      if (galaxyAudio) galaxyAudio.currentTime = 0;
      setPlaying(false);
      if (miAmorWasPlaying.current && audioRef.current) {
        const request = ++playbackRequest.current;
        void audioRef.current.play().then(() => { if (request === playbackRequest.current) { setPlaying(true); setMusicPrompt(false); } }).catch(() => { if (request === playbackRequest.current) { setPlaying(false); setMusicPrompt(true); } });
      }
    }
    setChapter(next);
    setActiveMessage(null);
  };
  const revealStar = (id: number) => {
    setRevealed((current) => current.includes(id) ? current : [...current, id]);
    setActiveMessage(id);
  };
  const finishIntro = () => {
    try { sessionStorage.setItem("rasmalai-birthday-intro-complete", "yes"); } catch { /* Storage may be unavailable. */ }
    setIntroComplete(true);
  };

  return <main className={`experience experience-chapter-${chapter} ${introComplete !== true ? "intro-active" : ""}`} onPointerDownCapture={() => { if (musicPrompt && chapter < 2 && introComplete) startMusic(); }}>
    <audio ref={audioRef} src={loveLetter.song.src} preload="auto" onEnded={() => { if (chapter !== 2) setPlaying(false); }} aria-hidden="true"/>
    <audio ref={galaxyAudioRef} src={memories.song.src} preload="none" onEnded={() => { if (chapter === 2) setPlaying(false); }} onError={() => { if (chapter === 2) { setPlaying(false); setMusicPrompt(true); } }} aria-hidden="true"/>
    <UniverseBackground energized={unlocked} chapter={chapter}/>
    <header className="chapter-nav"><button className="wordmark" onClick={() => changeChapter(0)} aria-label="Return to birthday universe"><span className="wordmark-star">✳</span> A LITTLE UNIVERSE</button><div className="chapter-indicator" aria-label={`Chapter ${chapter + 1} of 3`}>{chapters.map((label, i) => <button key={label} onClick={() => i === 0 || unlocked ? changeChapter(i) : undefined} disabled={i > 0 && !unlocked} className={chapter === i ? "current" : i < chapter ? "past" : ""} aria-label={`${i + 1}. ${label}`} aria-current={chapter === i ? "step" : undefined}><span>0{i + 1}</span><i/></button>)}</div><div className="header-end"><span className="date-mark">OCTOBER 17</span><button className={`header-music ${playing ? "is-playing" : ""}`} onClick={toggleMusic} aria-label={`${playing ? "Pause" : "Play"} ${chapter === 2 ? memories.song.title : loveLetter.song.title}`}>{playing ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor"/>}<Music2 size={13}/></button></div></header>
    <AnimatePresence mode="wait"><motion.div key={chapter} className="chapter-frame" initial={{ opacity: 0, y: 12, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -10, filter: "blur(4px)" }} transition={{ duration: .55, ease: "easeOut" }}>
      {chapter === 0 && <BirthdayChapter revealed={revealed} onReveal={revealStar} onContinue={() => changeChapter(1)} unlocked={unlocked}/>}
      {chapter === 1 && <LoveLetterChapter playing={playing} onToggle={toggleMusic} onBack={() => changeChapter(0)} onContinue={() => changeChapter(2)}/>}
      {chapter === 2 && <MemoriesChapter playing={playing} onToggle={toggleMusic} onBack={() => changeChapter(1)} photos={memories.photos} volume={galaxyVolume} onVolumeChange={setGalaxyVolume}/>}
    </motion.div></AnimatePresence>
    <AnimatePresence>{musicPrompt && chapter < 2 && introComplete && <motion.button className="music-prompt" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} onClick={startMusic}><Music2 size={15}/> A little music for your universe — tap to begin <Play size={13}/></motion.button>}</AnimatePresence>
    <footer className="experience-foot"><span>MADE OF STARDUST & SOMETHING TRUE</span><span>{String(chapter + 1).padStart(2, "0")} <i/> 03</span></footer>
    <StarMessageOverlay activeMessage={activeMessage} onClose={() => setActiveMessage(null)}/>
    {introComplete === false && <BirthdayIntro onWish={startMusic} onComplete={finishIntro}/>}
  </main>;
}
