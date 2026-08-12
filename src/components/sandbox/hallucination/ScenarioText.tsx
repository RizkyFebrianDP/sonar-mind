"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Sentence {
  id: number;
  text: string;
  isHallucination: boolean;
  explanation: string;
}

interface ScenarioTextProps {
  sentences: Sentence[];
  selectedIds: Set<number>;
  onToggle: (id: number) => void;
  isSubmitted: boolean;
}

export function ScenarioText({
  sentences,
  selectedIds,
  onToggle,
  isSubmitted,
}: ScenarioTextProps) {
  const getState = (sentence: Sentence) => {
    const isSelected = selectedIds.has(sentence.id);
    if (!isSubmitted) return isSelected ? "selected" : "default";
    if (sentence.isHallucination && isSelected) return "true-positive";
    if (!sentence.isHallucination && isSelected) return "false-positive";
    if (sentence.isHallucination && !isSelected) return "missed";
    return "correct";
  };

  const stateStyles: Record<string, string> = {
    default:
      "cursor-pointer hover:bg-accent-blue/10 hover:text-text-strong rounded-lg px-1 py-0.5 transition-all duration-150",
    selected:
      "cursor-pointer bg-amber-300/80 dark:bg-amber-900/60 text-slate-950 dark:text-amber-100 font-semibold rounded-lg px-1.5 py-0.5 border-b-2 border-amber-600 shadow-xs transition-all duration-150",
    "true-positive":
      "bg-emerald-200/80 dark:bg-emerald-900/60 text-emerald-950 dark:text-emerald-100 font-semibold rounded-lg px-1.5 py-0.5 border-b-2 border-emerald-600",
    "false-positive":
      "bg-rose-200/80 dark:bg-rose-900/60 text-rose-950 dark:text-rose-100 font-semibold rounded-lg px-1.5 py-0.5 border-b-2 border-rose-600",
    missed:
      "bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 font-semibold rounded-lg px-1.5 py-0.5 border-b-2 border-amber-600 animate-pulse",
    correct: "rounded-lg px-1 py-0.5",
  };

  const stateIcons: Record<string, React.ReactNode> = {
    "true-positive": <CheckCircle className="inline w-3.5 h-3.5 ml-1 text-green-500" />,
    "false-positive": <XCircle className="inline w-3.5 h-3.5 ml-1 text-red-500" />,
    missed: <AlertCircle className="inline w-3.5 h-3.5 ml-1 text-orange-500" />,
  };

  return (
    <div className="bg-panel rounded-2xl p-6 border border-sidebar-border">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
          Teks Artikel AI
        </span>
        {!isSubmitted && (
          <span className="text-xs bg-accent-blue/10 text-accent-blue px-2 py-0.5 rounded-full font-medium">
            Klik kalimat untuk menandai
          </span>
        )}
      </div>

      <p className="text-sm leading-loose text-text-body">
        {sentences.map((sentence) => {
          const state = getState(sentence);
          return (
            <span key={sentence.id}>
              <span
                className={stateStyles[state]}
                onClick={() => !isSubmitted && onToggle(sentence.id)}
                title={
                  !isSubmitted
                    ? "Klik untuk menandai sebagai halusinasi"
                    : undefined
                }
              >
                {sentence.text}
                {stateIcons[state]}
              </span>{" "}
            </span>
          );
        })}
      </p>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 pt-4 border-t border-sidebar-border"
          >
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                <CheckCircle className="w-3.5 h-3.5" />
                Benar Ditandai (True Positive)
              </span>
              <span className="flex items-center gap-1.5 text-red-500">
                <XCircle className="w-3.5 h-3.5" />
                Salah Ditandai (False Positive)
              </span>
              <span className="flex items-center gap-1.5 text-orange-500">
                <AlertCircle className="w-3.5 h-3.5" />
                Terlewat (Missed)
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
