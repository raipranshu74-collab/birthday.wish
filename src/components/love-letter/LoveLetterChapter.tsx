"use client";
import { ChapterTransition } from "@/components/navigation/ChapterTransition";
import { MusicPlayer } from "@/components/love-letter/MusicPlayer";
import { LoveLetterEnvelope } from "@/components/love-letter/LoveLetterEnvelope";
import { loveLetter } from "@/config/birthday";

export function LoveLetterChapter({ playing, onToggle, onBack, onContinue }: { playing: boolean; onToggle: () => void; onBack: () => void; onContinue: () => void }) {
  return <ChapterTransition onBack={onBack} onContinue={onContinue} continueLabel="Enter our little galaxy"><div className="letter-experience"><p className="eyebrow">CHAPTER TWO · THE MUSICAL LOVE LETTER</p><div className="letter-ornament" aria-hidden="true"><span/><i>✧</i><span/></div><h1>{loveLetter.title}</h1><LoveLetterEnvelope message={loveLetter.message}/><MusicPlayer title={loveLetter.song.title} available={Boolean(loveLetter.song.src)} playing={playing} onToggle={onToggle}/></div></ChapterTransition>;
}
