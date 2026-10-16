"use client";

import { useEffect, useRef, type CSSProperties } from "react";

const stars = Array.from({ length: 112 }, (_, i) => ({
  x: (i * 73.91 + (i % 7) * 17) % 100,
  y: (i * 41.37 + (i % 9) * 13) % 100,
  delay: -(i % 17) * .67,
  duration: 2.8 + (i % 9) * .57,
  size: i % 13 === 0 ? 3 : i % 5 === 0 ? 2 : 1,
  hue: i % 4,
}));

const meteors = [
  { x: -8, y: 79, dx: 83, dy: -48, delay: -2, duration: 12, length: 100, color: "pink" },
  { x: 105, y: 13, dx: -76, dy: 49, delay: -8, duration: 17, length: 74, color: "lavender" },
  { x: 19, y: 85, dx: 60, dy: -54, delay: -13, duration: 21, length: 156, color: "periwinkle" },
  { x: 103, y: 29, dx: -68, dy: 29, delay: -5, duration: 27, length: 122, color: "blush" },
  { x: -13, y: 78, dx: 96, dy: -57, delay: -20, duration: 34, length: 210, color: "rare" },
];

export function UniverseBackground({ energized = false, chapter = 0 }: { energized?: boolean; chapter?: number }) {
  const sky = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = sky.current;
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = ((event.clientX / innerWidth) - .5) * 2;
        const y = ((event.clientY / innerHeight) - .5) * 2;
        const root = document.documentElement.style;
        root.setProperty("--distant-x", `${-x * 2}px`); root.setProperty("--distant-y", `${-y * 2}px`);
        root.setProperty("--middle-x", `${-x * 5}px`); root.setProperty("--middle-y", `${-y * 5}px`);
        root.setProperty("--near-x", `${-x * 9}px`); root.setProperty("--near-y", `${-y * 9}px`);
        root.setProperty("--constellation-x", `${x * 3}px`); root.setProperty("--constellation-y", `${y * 3}px`);
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);

  return <div ref={sky} className={`sky sky-chapter-${chapter} ${energized ? "sky-energized" : ""}`} aria-hidden="true">
    <div className="nebula nebula-one"/><div className="nebula nebula-two"/><div className="nebula nebula-three"/><div className="nebula-wisp wisp-one"/><div className="nebula-wisp wisp-two"/>
    <div className="star-depth distant">{stars.slice(0, 55).map((star, i) => <i key={i} className={`hue-${star.hue}`} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size, height: star.size, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }}/>)}</div>
    <div className="star-depth middle">{stars.slice(55, 91).map((star, i) => <i key={i} className={`hue-${star.hue}`} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size + 1, height: star.size + 1, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }}/>)}</div>
    <div className="star-depth near">{stars.slice(91).map((star, i) => <i key={i} className={`hue-${star.hue}`} style={{ left: `${star.x}%`, top: `${star.y}%`, width: star.size + 1, height: star.size + 1, animationDelay: `${star.delay}s`, animationDuration: `${star.duration}s` }}/>)}</div>
    <div className="dust-cluster cluster-one"/><div className="dust-cluster cluster-two"/>
    <svg className="distant-constellation distant-constellation-one" viewBox="0 0 170 100"><path d="M8 72 47 32 91 55 139 13 163 54"/><circle cx="8" cy="72" r="2"/><circle cx="47" cy="32" r="2"/><circle cx="91" cy="55" r="2"/><circle cx="139" cy="13" r="2"/><circle cx="163" cy="54" r="2"/></svg>
    <svg className="distant-constellation distant-constellation-two" viewBox="0 0 130 95"><path d="M7 20 43 64 76 35 121 78"/><circle cx="7" cy="20" r="2"/><circle cx="43" cy="64" r="2"/><circle cx="76" cy="35" r="2"/><circle cx="121" cy="78" r="2"/></svg>
    {meteors.map((meteor, i) => {
      const angle = (Math.atan2(meteor.dy, meteor.dx) * 180 / Math.PI).toFixed(3);
      const style = { left: `${meteor.x}%`, top: `${meteor.y}%`, width: meteor.length, animationDelay: `${meteor.delay}s`, animationDuration: `${meteor.duration}s`, "--meteor-dx": `${meteor.dx}vw`, "--meteor-dy": `${meteor.dy}vw`, "--meteor-angle": `${angle}deg` } as CSSProperties;
      return <span key={i} className={`celestial-meteor meteor-${meteor.color}`} style={style}><i/></span>;
    })}
    <span className="rare-burst"/>
  </div>;
}
