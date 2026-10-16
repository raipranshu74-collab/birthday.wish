"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { starMessages } from "@/config/birthday";

const accents = ["blush", "lavender", "periwinkle"] as const;

export function StarMessageOverlay({ activeMessage, onClose }: { activeMessage: number | null; onClose: () => void }) {
  const reducedMotion = useReducedMotion();
  return <AnimatePresence>{activeMessage !== null && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.section key={activeMessage} className={`reveal-note note-${accents[activeMessage]}`} role="dialog" aria-modal="true" aria-labelledby="star-note-title" initial={reducedMotion ? false : { opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }} transition={{ duration: reducedMotion ? 0 : .38, ease: "easeOut" }} onClick={(event) => event.stopPropagation()}>
      <div className="note-particles" aria-hidden="true">{Array.from({ length: 8 }, (_, i) => <i key={i}/>)}</div>
      <button className="close-note" onClick={onClose} aria-label="Close message"><X size={17}/></button>
      <span className="note-glint" aria-hidden="true">✧</span>
      <p className="eyebrow">A MESSAGE IN THE STARS · 0{activeMessage + 1}</p>
      <h2 id="star-note-title">{starMessages[activeMessage].title}</h2>
      <motion.p className="note-message" initial={reducedMotion ? false : { opacity: 0, y: 9, filter: "blur(3px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: reducedMotion ? 0 : .22, duration: reducedMotion ? 0 : .38 }}>{starMessages[activeMessage].message}</motion.p>
      <button className="text-button" onClick={onClose}>Back to the constellation <ArrowRight size={14}/></button>
    </motion.section>
  </motion.div>}</AnimatePresence>;
}
