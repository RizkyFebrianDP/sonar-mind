"use client";

import React from "react";
import { motion } from "framer-motion";
import type { DilemmaCategory } from "@/types/assessment";

const CATEGORIES: {
  id: DilemmaCategory;
  label: string;
  emoji: string;
  description: string;
  colors: string;
  activeColors: string;
}[] = [
  {
    id: "ethical",
    label: "Ethical Co-pilot",
    emoji: "🟢",
    description: "Pemanfaatan AI yang etis & mandiri",
    colors: "border-sidebar-border hover:border-green-500 hover:bg-green-500/8 text-text-body",
    activeColors: "border-green-500 bg-green-500/12 text-green-700 dark:text-green-300",
  },
  {
    id: "offloading",
    label: "Cognitive Offloading",
    emoji: "🔴",
    description: "Ketergantungan / plagiarisme",
    colors: "border-sidebar-border hover:border-red-500 hover:bg-red-500/8 text-text-body",
    activeColors: "border-red-500 bg-red-500/12 text-red-700 dark:text-red-300",
  },
  {
    id: "grey",
    label: "Grey Area",
    emoji: "🟡",
    description: "Ambigu, perlu pertimbangan konteks",
    colors: "border-sidebar-border hover:border-yellow-500 hover:bg-yellow-500/8 text-text-body",
    activeColors: "border-yellow-500 bg-yellow-500/12 text-yellow-700 dark:text-yellow-300",
  },
];

interface ClassificationButtonsProps {
  selected: DilemmaCategory | null;
  onSelect: (category: DilemmaCategory) => void;
  disabled?: boolean;
}

export function ClassificationButtons({
  selected,
  onSelect,
  disabled,
}: ClassificationButtonsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {CATEGORIES.map((cat) => {
        const isSelected = selected === cat.id;
        return (
          <motion.button
            key={cat.id}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={() => !disabled && onSelect(cat.id)}
            disabled={disabled}
            className={`flex flex-col items-center gap-1 md:gap-2 p-2 md:p-4 rounded-2xl border-2 transition-all duration-200 ${
              disabled ? "cursor-default opacity-80" : "cursor-pointer"
            } ${isSelected ? cat.activeColors : cat.colors}`}
          >
            <span className="text-xl md:text-2xl">{cat.emoji}</span>
            <span className="text-xs md:text-sm font-bold font-heading">{cat.label}</span>
            <span className="text-[10px] md:text-xs opacity-70 text-center leading-relaxed">
              {cat.description}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
