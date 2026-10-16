"use client";

import type { CSSProperties } from "react";
import { palette, type PhotoStar } from "@/config/birthday";

const rgb = { blush: "255,230,230", dustyPink: "225,175,209", lavender: "173,136,198", periwinkle: "116,105,198" };

export function PhotoStarField({ photos, selectedIndex, onOpen }: { photos: PhotoStar[]; selectedIndex: number | null; onOpen: (index: number, star: HTMLButtonElement) => void }) {
  return <div className={`photo-star-field ${photos.length ? "has-photos" : "is-empty"}`} aria-label="Photo stars">
    <div className="photo-field-dust" aria-hidden="true">{Array.from({ length: 7 }, (_, index) => <i key={index}/>)}</div>
    {photos.length ? photos.map((photo, index) => {
      const drift = photo.drift ?? { x: [12, -14, 10, -11][index % 4], y: [-9, 11, 8, -12][index % 4], duration: [13, 16, 18, 15][index % 4], delay: -(index * 2.7) };
      const style = {
        "--photo-x": `${Math.min(90, Math.max(10, photo.position.x))}%`,
        "--photo-y": `${Math.min(85, Math.max(15, photo.position.y))}%`,
        "--photo-rgb": rgb[photo.color],
        "--photo-color": palette[photo.color],
        "--photo-size": `${Math.min(94, Math.max(58, photo.size ?? 70 + index % 3 * 8))}px`,
        "--photo-dx": `${Math.min(20, Math.max(-20, drift.x))}px`,
        "--photo-dy": `${Math.min(20, Math.max(-20, drift.y))}px`,
        "--photo-duration": `${Math.max(9, drift.duration)}s`,
        "--photo-delay": `${drift.delay ?? -(index * 2.7)}s`,
      } as CSSProperties;
      return <button key={photo.id} type="button" className={`photo-star ${selectedIndex === index ? "is-selected" : ""}`} style={style} onClick={(event) => onOpen(index, event.currentTarget)} aria-label={`Open photograph ${index + 1}: ${photo.description}`} aria-pressed={selectedIndex === index}>
        <span className="photo-star-drift"><span className="photo-star-aura"/><svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 1 38 25 63 32 38 39 32 63 26 39 1 32 26 25Z"/><circle cx="32" cy="32" r="3"/></svg><span className="photo-star-burst" aria-hidden="true">{Array.from({ length: 6 }, (_, i) => <i key={i}/>)}</span></span>
        <span className="photo-star-label">0{index + 1}</span>
      </button>;
    }) : <div className="photo-star-empty"><span className="photo-empty-orbit" aria-hidden="true"><i/></span><span>OUR LITTLE GALAXY</span><small>Each photograph will have its own star and song.</small></div>}
  </div>;
}
