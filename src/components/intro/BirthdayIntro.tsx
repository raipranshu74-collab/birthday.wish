"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./BirthdayIntro.css";

export function BirthdayIntro({ onWish, onComplete }: { onWish: () => void; onComplete: () => void }) {
  const [phase, setPhase] = useState<"ready" | "glowing" | "extinguished" | "leaving">("ready");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reducedMotion = useReducedMotion();
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const wish = () => {
    if (phase !== "ready") return;
    onWish();
    setPhase("glowing");
    const stages: [number, () => void][] = reducedMotion
      ? [[180, () => setPhase("extinguished")], [500, () => setPhase("leaving")], [820, onComplete]]
      : [[380, () => setPhase("extinguished")], [1050, () => setPhase("leaving")], [1900, onComplete]];
    timers.current = stages.map(([delay, action]) => setTimeout(action, delay));
  };
  return <motion.div className={`birthday-intro intro-${phase}`} role="dialog" aria-modal="true" aria-label="Birthday wish intro" initial={{ opacity: 1 }} animate={{ opacity: phase === "leaving" ? 0 : 1, scale: phase === "leaving" && !reducedMotion ? 1.035 : 1 }} transition={{ duration: reducedMotion ? .18 : .8, ease: "easeInOut" }}>
    <div className="intro-nebula" aria-hidden="true"/><div className="intro-stars" aria-hidden="true">{Array.from({ length: 42 }, (_, i) => <i key={i} style={{ left: `${(i * 37.7) % 100}%`, top: `${(i * 61.3) % 100}%`, animationDelay: `${-(i * .37) % 5}s`, animationDuration: `${3 + i % 5}s` }}/>)}</div>
    <span className="intro-meteor intro-meteor-one" aria-hidden="true"/><span className="intro-meteor intro-meteor-two" aria-hidden="true"/>
    <div className="intro-content"><motion.p className="intro-eyebrow" initial={{ opacity: 0, y: 12, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reducedMotion ? 0 : .65 }}>A LITTLE UNIVERSE, JUST FOR YOU</motion.p><motion.h1 initial={{ opacity: 0, y: 15, filter: "blur(5px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: reducedMotion ? 0 : .8, delay: reducedMotion ? 0 : .15 }}>A Little Birthday Magic...</motion.h1>
      <button type="button" className="intro-cake-button" onClick={wish} disabled={phase !== "ready"} aria-label="Tap the cake to make a birthday wish">
        <span className="intro-cake-halo" aria-hidden="true"/><span className="intro-cake" aria-hidden="true"><span className="intro-cake-candles">{[0, 1, 2].map((i) => <span className="intro-candle" key={i}><i className="intro-flame"/><i className="intro-smoke"/></span>)}</span><span className="intro-cake-top"/><span className="intro-cake-frosting"/><span className="intro-cake-body"><i/><i/><i/><i/><i/></span><span className="intro-cake-base"/></span>
        <span className="intro-cake-burst" aria-hidden="true">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ "--burst-angle": `${i * 22.5}deg`, "--burst-distance": `${95 + i % 4 * 16}px` } as React.CSSProperties}/>)}</span>
      </button>
      <motion.p className="intro-wish" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : .7, delay: reducedMotion ? 0 : .35 }}>Make a wish, my Rasmalai. 🎀</motion.p><p className="intro-hint">Tap the cake to make a wish</p>
    </div>
  </motion.div>;
}
