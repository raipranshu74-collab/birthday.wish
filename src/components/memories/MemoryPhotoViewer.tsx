"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Pause, Play, X } from "lucide-react";
import type { PhotoStar } from "@/config/birthday";

export type StarOrigin = { x: number; y: number };

export function MemoryPhotoViewer({ photo, index, total, origin, onClose, onMove, playing, onToggleMusic, volume, onVolumeChange }: { photo: PhotoStar; index: number; total: number; origin: StarOrigin; onClose: () => void; onMove: (step: number) => void; playing: boolean; onToggleMusic: () => void; volume: number; onVolumeChange: (volume: number) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && index > 0) onMove(-1);
      if (event.key === "ArrowRight" && index < total - 1) onMove(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, total, onClose, onMove]);

  const fromStar = reducedMotion ? { opacity: 0 } : { opacity: 0, x: origin.x, y: origin.y, scale: .06, filter: "blur(10px)" };
  const atCenter = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
  return <motion.div className="memory-viewer" role="dialog" aria-modal="true" aria-label={`Photograph ${index + 1} of ${total}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .35 }} onClick={onClose}>
    <button ref={closeRef} className="memory-viewer-close" type="button" onClick={onClose} aria-label="Close photograph"><X size={19}/></button>
    <motion.figure className="memory-viewer-photo" initial={fromStar} animate={atCenter} exit={fromStar} transition={{ duration: reducedMotion ? 0 : .55, ease: [.22, .7, .2, 1] }} onClick={(event) => event.stopPropagation()}>
      <div className="memory-viewer-image"><Image src={photo.src} alt={photo.description} fill unoptimized loading="eager" sizes="(max-width: 700px) 92vw, 80vw" style={{ objectFit: "contain" }}/></div>
      {photo.caption && <figcaption>{photo.caption}</figcaption>}
    </motion.figure>
    <div className="memory-viewer-controls" onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Previous photograph"><ArrowLeft size={18}/></button>
      <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
      <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Next photograph"><ArrowRight size={18}/></button>
    </div>
    <div className="memory-viewer-music" onClick={(event) => event.stopPropagation()}>
      <button type="button" onClick={onToggleMusic} aria-label={playing ? "Pause galaxy soundtrack" : "Play galaxy soundtrack"}>{playing ? <Pause size={14} fill="currentColor"/> : <Play size={14} fill="currentColor"/>}</button>
      <label>VOLUME <input type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={(event) => onVolumeChange(Number(event.target.value) / 100)} aria-label="Galaxy soundtrack volume"/></label>
    </div>
  </motion.div>;
}
