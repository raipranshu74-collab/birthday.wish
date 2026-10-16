"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChapterTransition } from "@/components/navigation/ChapterTransition";
import { MusicPlayer } from "@/components/love-letter/MusicPlayer";
import { PhotoStarField } from "@/components/memories/PhotoStarField";
import { MemoryPhotoViewer, type StarOrigin } from "@/components/memories/MemoryPhotoViewer";
import { memories, type PhotoStar } from "@/config/birthday";

type Props = { playing: boolean; onToggle: () => void; onBack: () => void; photos: PhotoStar[]; volume: number; onVolumeChange: (volume: number) => void };

export function MemoriesChapter({ playing, onToggle, onBack, photos, volume, onVolumeChange }: Props) {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [origin, setOrigin] = useState<StarOrigin>({ x: 0, y: 0 });
  const [focusStar, setFocusStar] = useState<HTMLButtonElement | null>(null);
  const focusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photo = photoIndex === null ? null : photos[photoIndex];
  const viewerOpen = photoIndex !== null;

  useEffect(() => () => { if (focusTimer.current) clearTimeout(focusTimer.current); }, []);
  useEffect(() => {
    if (!viewerOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [viewerOpen]);

  const originOf = (star: HTMLButtonElement) => {
    const rect = star.getBoundingClientRect();
    return { x: rect.left + rect.width / 2 - window.innerWidth / 2, y: rect.top + rect.height / 2 - window.innerHeight / 2 };
  };
  const openPhoto = (index: number, star: HTMLButtonElement) => {
    if (photoIndex !== null) return;
    setOrigin(originOf(star));
    setFocusStar(star);
    setPhotoIndex(index);
  };
  const closePhoto = useCallback(() => {
    setPhotoIndex(null);
    focusTimer.current = setTimeout(() => focusStar?.focus(), 550);
  }, [focusStar]);
  const move = useCallback((step: number) => {
    if (photoIndex === null) return;
    const next = Math.min(photos.length - 1, Math.max(0, photoIndex + step));
    if (next === photoIndex) return;
    const star = document.querySelectorAll<HTMLButtonElement>(".photo-star")[next];
    if (star) { setOrigin(originOf(star)); setFocusStar(star); }
    setPhotoIndex(next);
  }, [photoIndex, photos.length]);

  return <><ChapterTransition onBack={onBack} onContinue={onBack} continueLabel="Return to the love letter"><div className="memories-experience photo-universe"><p className="eyebrow">CHAPTER THREE · OUR LITTLE GALAXY</p><h1>Little pieces<br/><em>of our universe.</em></h1><p className="memories-intro">Tap a star to open a photograph.</p><PhotoStarField photos={photos} selectedIndex={photoIndex} onOpen={openPhoto}/><div className="galaxy-music"><MusicPlayer title={memories.song.title} available playing={playing} onToggle={onToggle}/><label className="galaxy-volume">VOLUME <input type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={(event) => onVolumeChange(Number(event.target.value) / 100)} aria-label="Galaxy soundtrack volume"/></label></div></div></ChapterTransition>
    <AnimatePresence>{photo && <MemoryPhotoViewer key={photo.id} photo={photo} index={photoIndex!} total={photos.length} origin={origin} onClose={closePhoto} onMove={move} playing={playing} onToggleMusic={onToggle} volume={volume} onVolumeChange={onVolumeChange}/>}</AnimatePresence>
  </>;
}
