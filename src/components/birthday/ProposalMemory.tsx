"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import { proposalMemory } from "@/config/birthday";

export function ProposalMemory() {
  const [available, setAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const marker = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const preview = new window.Image();
    preview.onload = () => setAvailable(true);
    preview.onerror = () => setAvailable(false);
    preview.src = proposalMemory.src;
    return () => { preview.onload = null; preview.onerror = null; };
  }, []);

  useEffect(() => {
    if (!open) return;
    const markerNode = marker.current;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key === "Tab") {
        event.preventDefault();
        close.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", handleKey);
      markerNode?.focus();
    };
  }, [open]);

  if (!available) return null;
  return <>
    <button ref={marker} className="proposal-marker" onClick={() => setOpen(true)} aria-label="Open proposal place photograph"><span className="proposal-marker-orbit"/><span className="proposal-marker-core"/><span className="proposal-marker-label">THE PLACE</span></button>
    {typeof document !== "undefined" && createPortal(<AnimatePresence>{open && <motion.div className="proposal-overlay" role="presentation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}><motion.section className="proposal-scene" role="dialog" aria-modal="true" aria-label="Photograph of the proposal place" initial={{ opacity: 0, scale: .96, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .98, y: 8 }} transition={{ duration: .45, ease: "easeOut" }} onClick={(event) => event.stopPropagation()}><button ref={close} className="proposal-close" onClick={() => setOpen(false)} aria-label="Close photograph"><X size={20}/></button><div className="proposal-image"><Image src={proposalMemory.src} alt="Pink-purple sunset over water at the proposal place" fill sizes="(max-width: 700px) 94vw, 84vw" priority style={{ objectFit: "contain" }}/></div>{proposalMemory.caption && <p className="proposal-caption">{proposalMemory.caption}</p>}</motion.section></motion.div>}</AnimatePresence>, document.body)}
  </>;
}
