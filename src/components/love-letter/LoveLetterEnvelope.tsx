"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function LoveLetterEnvelope({ message }: { message: string }) {
  const paragraphs = message.split(/\n\s*\n/).map((paragraph) => paragraph.replace(/\s*\n\s*/g, " "));
  const [phase, setPhase] = useState<"sealed" | "opening" | "reading">("sealed");
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => () => { if (openingTimer.current) clearTimeout(openingTimer.current); }, []);
  const openLetter = () => {
    if (phase !== "sealed") return;
    if (reducedMotion) { setPhase("reading"); return; }
    setPhase("opening");
    openingTimer.current = setTimeout(() => { setPhase("reading"); openingTimer.current = null; }, 1220);
  };
  const foldLetter = () => setPhase("sealed");
  return <div className={`letter-reveal ${phase !== "sealed" ? "is-open" : ""} ${phase === "reading" ? "is-reading" : ""}`}>
    <button className="envelope-trigger" type="button" aria-label="Open the love letter" aria-expanded={phase !== "sealed"} onClick={openLetter} disabled={phase !== "sealed"}>
      <span className="envelope-paper" aria-hidden="true"><span>✧</span></span>
      <span className="envelope-back" aria-hidden="true"/>
      <span className="envelope-flap" aria-hidden="true"/>
      <span className="envelope-front" aria-hidden="true"/>
      <span className="envelope-seal" aria-hidden="true">✧</span>
    </button>
    {phase === "sealed" && <p className="letter-hint">TAP TO OPEN YOUR LETTER <span aria-hidden="true">✧</span></p>}
    {phase === "reading" && <section className="letter-reading" aria-label="Love letter"><div className="letter-reading-inner"><span className="letter-reading-star" aria-hidden="true">✧</span><div className="letter-copy">{paragraphs.map((paragraph, index) => <p className="letter-placeholder" key={index}>{paragraph}</p>)}</div><button type="button" className="letter-fold" onClick={foldLetter}>Fold the letter</button></div></section>}
  </div>;
}
