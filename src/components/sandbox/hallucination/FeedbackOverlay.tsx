"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";

interface Sentence {
  id: number;
  text: string;
  isHallucination: boolean;
  explanation: string;
}

interface FeedbackOverlayProps {
  sentences: Sentence[];
  selectedIds: Set<number>;
  score: number;
  truePositives: number;
  falsePositives: number;
  missed: number;
  onContinue: () => void;
}

export function FeedbackOverlay({
  sentences,
  selectedIds,
  score,
  truePositives,
  falsePositives,
  missed,
  onContinue,
}: FeedbackOverlayProps) {
  const { locale } = useLanguage();

  const getScoreColor = (s: number) => {
    if (s >= 75) return "text-green-500";
    if (s >= 50) return "text-amber-600 dark:text-yellow-400";
    return "text-red-500";
  };

  const getScoreLabel = (s: number) => {
    if (locale === "en") {
      if (s >= 85) return "Excellent!";
      if (s >= 70) return "Good!";
      if (s >= 50) return "Fair";
      return "Needs Practice";
    }
    if (s >= 85) return "Luar Biasa!";
    if (s >= 70) return "Bagus!";
    if (s >= 50) return "Cukup Baik";
    return "Perlu Latihan";
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-background rounded-3xl p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-sidebar-border"
        >
          {/* Header Skor */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mx-auto mb-4">
              <Icon id="85613" className="w-8 h-8 bg-accent-blue" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-text-strong mb-1">
              {locale === "en" ? "Audit Results" : "Hasil Audit"}
            </h2>
            <p className="text-text-muted text-sm">
              {locale === "en" ? "Module: Hallucination Detection" : "Modul: Hallucination Detection"}
            </p>

            <div className={`text-6xl font-bold font-heading mt-4 ${getScoreColor(score)}`}>
              {score}
            </div>
            <p className={`text-lg font-semibold mt-1 ${getScoreColor(score)}`}>
              {getScoreLabel(score)}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="bg-green-500/10 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400 mb-1">
                  <Icon id="82766" className="w-4 h-4 bg-green-600" />
                  <span className="text-lg font-bold">{truePositives}</span>
                </div>
                <p className="text-xs text-text-muted">{locale === "en" ? "Correctly Marked" : "Benar Ditandai"}</p>
              </div>
              <div className="bg-red-500/10 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                  <Icon id="82771" className="w-4 h-4 bg-red-500" />
                  <span className="text-lg font-bold">{falsePositives}</span>
                </div>
                <p className="text-xs text-text-muted">{locale === "en" ? "Wrongly Marked" : "Salah Tandai"}</p>
              </div>
              <div className="bg-orange-500/10 rounded-xl p-3">
                <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                  <Icon id="82783" className="w-4 h-4 bg-orange-500" />
                  <span className="text-lg font-bold">{missed}</span>
                </div>
                <p className="text-xs text-text-muted">{locale === "en" ? "Missed" : "Terlewat"}</p>
              </div>
            </div>
          </div>

          {/* Detail per kalimat */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-text-strong mb-3 font-heading">
              {locale === "en" ? "Detailed Explanation" : "Penjelasan Detail"}
            </h3>
            <div className="space-y-2">
              {sentences
                .filter(
                  (s) =>
                    s.isHallucination ||
                    (!s.isHallucination && selectedIds.has(s.id))
                )
                .map((sentence) => {
                  const isSelected = selectedIds.has(sentence.id);
                  const isTP = sentence.isHallucination && isSelected;
                  const isFP = !sentence.isHallucination && isSelected;
                  const isMissed = sentence.isHallucination && !isSelected;

                  return (
                    <div
                      key={sentence.id}
                      className={`p-4 rounded-xl border text-sm ${
                        isTP
                          ? "bg-green-500/8 border-green-500/30"
                          : isFP
                          ? "bg-red-500/8 border-red-500/30"
                          : "bg-orange-500/8 border-orange-500/30"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {isTP && <Icon id="82766" className="w-4 h-4 bg-green-500 shrink-0 mt-0.5" />}
                        {isFP && <Icon id="82771" className="w-4 h-4 bg-red-500 shrink-0 mt-0.5" />}
                        {isMissed && <Icon id="82783" className="w-4 h-4 bg-orange-500 shrink-0 mt-0.5" />}
                        <div>
                          <p className="text-text-body mb-1 leading-relaxed italic">
                            &ldquo;{sentence.text}&rdquo;
                          </p>
                          <p className="text-xs text-text-muted leading-relaxed">
                            {sentence.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onContinue}
            className="w-full py-3.5 bg-text-strong hover:bg-black text-background rounded-2xl font-semibold text-sm transition-all shadow-sm"
          >
            {locale === "en" ? "Continue to Next Module →" : "Lanjut ke Modul Berikutnya →"}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
