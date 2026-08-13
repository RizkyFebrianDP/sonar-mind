"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { Lightbulb } from "lucide-react";
import { ClassificationButtons } from "@/components/sandbox/ethical/ClassificationButtons";
import type { DilemmaCategory } from "@/types/assessment";

interface DilemmaCardProps {
  situationId: number;
  situationText: string;
  selectedCategory: DilemmaCategory | null;
  onSelect: (category: DilemmaCategory) => void;
  isLast: boolean;
  onNext: () => void;
}

export function DilemmaCard({
  situationId,
  situationText,
  selectedCategory,
  onSelect,
  isLast,
  onNext,
}: DilemmaCardProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={situationId}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="bg-panel rounded-3xl p-5 md:p-8 border border-sidebar-border shadow-sm"
      >
        {/* Ikon & Label */}
        <div className="flex items-center gap-2 mb-3 md:mb-6">
          <div className="w-8 h-8 rounded-xl bg-accent-blue/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-accent-blue" />
          </div>
          <span className="text-xs font-semibold text-accent-blue uppercase tracking-wider">
            Situasi {situationId}
          </span>
        </div>

        {/* Situasi Teks */}
        <p className="text-base md:text-lg font-medium text-text-strong leading-relaxed mb-4 md:mb-8 min-h-[50px] md:min-h-[60px]">
          &ldquo;{situationText}&rdquo;
        </p>

        {/* Pertanyaan */}
        <p className="text-sm text-text-muted mb-4 font-medium">
          Menurut kamu, situasi ini termasuk kategori:
        </p>

        {/* Tombol Klasifikasi */}
        <ClassificationButtons
          selected={selectedCategory}
          onSelect={onSelect}
        />

        {/* Tombol Next */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 md:mt-6"
          >
            <button
              onClick={onNext}
              className="w-full py-3 md:py-3.5 bg-text-strong hover:bg-black text-background rounded-2xl font-semibold text-sm transition-all"
            >
              {isLast ? "Selesaikan & Lihat Hasil" : "Situasi Berikutnya →"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
