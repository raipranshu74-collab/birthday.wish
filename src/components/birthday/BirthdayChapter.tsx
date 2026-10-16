"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { birthday } from "@/config/birthday";
import { ProposalMemory } from "@/components/birthday/ProposalMemory";

const stars = [
  { title: "A blush of light", color: "blush", x: 18, y: 24 },
  { title: "A lavender wish", color: "lavender", x: 50, y: 69 },
  { title: "A periwinkle promise", color: "periwinkle", x: 82, y: 28 },
];

function InteractiveStar({ id, star, active, onClick }: { id: number; star: typeof stars[number]; active: boolean; onClick: () => void }) {
  return <motion.button className={`constellation-star ${star.color} ${active ? "is-revealed" : ""}`} style={{ left: `${star.x}%`, top: `${star.y}%` }} onClick={onClick} whileHover={{ scale: 1.12 }} whileTap={{ scale: .94 }} aria-label={`Open message ${id + 1}: ${star.title}`} aria-pressed={active}><span className="star-aura"/><span className="star-sparkle sparkle-a"/><span className="star-sparkle sparkle-b"/><span className="star-sparkle sparkle-c"/>{active && <span className="activation-burst" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ transform: `rotate(${i * 45}deg)` }}/>)}</span>}<svg viewBox="0 0 80 80" aria-hidden="true"><path d="M40 4 47 30 72 18 54 39 77 52 50 51 43 77 34 51 8 62 27 41 4 27 31 30Z"/><circle cx="40" cy="40" r="8"/></svg><span className="star-label">{star.title}</span></motion.button>;
}

export function BirthdayChapter({ revealed, onReveal, onContinue, unlocked }: { revealed: number[]; onReveal: (id: number) => void; onContinue: () => void; unlocked: boolean }) {
  const [showContinue, setShowContinue] = useState(false);
  const [stardust, setStardust] = useState(0);
  useEffect(() => {
    if (!unlocked) return;
    const timer = window.setTimeout(() => setShowContinue(true), 1250);
    return () => window.clearTimeout(timer);
  }, [unlocked]);
  return <section className={`birthday-chapter ${unlocked ? "constellation-complete" : ""}`} aria-labelledby="birthday-title"><div className="birthday-copy"><p className="eyebrow">A SMALL WORLD, MADE JUST FOR YOU</p><h1 id="birthday-title">Happy Birthday,<br/><em>My {birthday.recipient}</em></h1><p className="birthday-caption">Three little stars are waiting to be found.</p></div><div className="constellation" aria-label="Three message stars. Select each to discover its message."><svg className="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="line-base" d="M18 24 Q36 26 50 69 Q68 43 82 28"/><path className={`line-active ${revealed.includes(0) && revealed.includes(1) ? "lit" : revealed.includes(0) || revealed.includes(1) ? "glimmer" : ""}`} d="M18 24 Q36 26 50 69"/><path className={`line-active ${revealed.includes(1) && revealed.includes(2) ? "lit" : revealed.includes(1) || revealed.includes(2) ? "glimmer" : ""}`} d="M50 69 Q68 43 82 28"/>{(revealed.includes(0) || revealed.includes(1)) && <circle className="line-pulse" r=".75" fill="#FFE6E6"><animateMotion dur={unlocked ? "2.4s" : "3.8s"} repeatCount="indefinite" path="M18 24 Q36 26 50 69"/></circle>}{(revealed.includes(1) || revealed.includes(2)) && <circle className="line-pulse" r=".75" fill="#FFE6E6"><animateMotion dur={unlocked ? "2.4s" : "3.8s"} repeatCount="indefinite" path="M50 69 Q68 43 82 28"/></circle>}</svg>{stars.map((star, id) => <InteractiveStar key={star.color} id={id} star={star} active={revealed.includes(id)} onClick={() => onReveal(id)}/>)}</div><ProposalMemory/><div className="birthday-bottom"><div className="unlock-progress" aria-live="polite"><span className="progress-glyph">✧</span><span>{unlocked ? "The constellation is awake" : "Wake the three stars"}</span><span className="progress-fraction">{revealed.length} / 3</span><span className="progress-line"><i style={{ width: `${revealed.length * 33.333}%` }}/></span></div><div className="birthday-bottom-actions"><span className="stardust-discovery"><button onClick={() => setStardust((value) => value + 1)} aria-label="Stir the stardust">✧ <span>Stir the stardust</span></button>{stardust > 0 && <span className="stardust-bloom" key={stardust} aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} style={{rotate:`${i*30}deg`}}/>)}</span>}</span>{showContinue ? <motion.button className="primary-link" onClick={onContinue} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>Follow the constellation <ArrowRight size={15}/></motion.button> : <span className="gesture-hint">{unlocked ? "WATCH THE LIGHT TRAVEL" : "TAP EACH GLOWING STAR"}</span>}</div></div></section>;
}
