"use client";
import { Music2, Pause, Play } from "lucide-react";

export function MusicPlayer({ title, available, playing, onToggle }: { title: string; available: boolean; playing: boolean; onToggle: () => void }) {
  return <div className="music-player"><button className="play-button" aria-label={playing ? "Pause music" : "Play music"} onClick={onToggle} disabled={!available}>{playing ? <Pause size={17} fill="currentColor"/> : <Play size={17} fill="currentColor"/>}</button><div className="track-meta"><span className="track-label"><Music2 size={12}/> THE SOUNDTRACK</span><span className="track-title">{title}</span></div><div className={`sound-wave ${playing ? "playing" : ""}`} aria-hidden="true">{[0,1,2,3,4,5,6].map((n)=><i key={n}/>)}</div></div>;
}
