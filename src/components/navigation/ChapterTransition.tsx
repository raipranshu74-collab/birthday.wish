"use client";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function ChapterTransition({ children, onBack, onContinue, continueLabel = "Continue" }: { children: ReactNode; onBack: () => void; onContinue: () => void; continueLabel?: string }) {
  return <section className="chapter-content secondary-chapter"><div className="chapter-utility"><button className="quiet-link" onClick={onBack}><ArrowLeft size={14}/> Previous chapter</button><span>A LITTLE UNIVERSE CALLED YOU</span></div>{children}<motion.div className="chapter-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}><button className="primary-link" onClick={onContinue}>{continueLabel}<ArrowRight size={15}/></button></motion.div></section>;
}
