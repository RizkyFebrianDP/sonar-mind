"use client";

import React from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle, XCircle } from "lucide-react";

interface FeedbackRevealProps {
  score: number;
  correctBiasTypes: string[];
  selectedBias: Set<string>;
  explanation: string;
  onContinue: () => void;
}

const BIAS_LABELS: Record<string, string> = {
  gender: "Bias Gender",
  cultural: "Stereotip Budaya/Etnis",
  political: "Keberpihakan Politik",
  age: "Bias Usia",
  socioeconomic: "Bias Sosio-ekonomi",
  none: "Tidak Ada Bias",
};

export function FeedbackReveal({
  score,
  correctBiasTypes,
  selectedBias,
  explanation,
  onContinue,
}: FeedbackRevealProps) {
  const getScoreColor = (s: number) => {
    if (s >= 75) return "text-green-500";
    if (s >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const correctSelected = correctBiasTypes.filter((b) => selectedBias.has(b));
  const wrongSelected = [...selectedBias].filter(
    (b) => !correctBiasTypes.includes(b)
  );
  const missed = correctBiasTypes.filter((b) => !selectedBias.has(b));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-background rounded-3xl p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-sidebar-border"
      >
        {/* Skor Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
            <Trophy className="w-7 h-7 text-purple-500" />
          </div>
          <h2 className="text-xl font-bold font-heading text-text-strong mb-0.5">
            Hasil Bias Audit
          </h2>
          <p className="text-sm text-text-muted">Pilar 2: Algorithmic Bias Awareness</p>
          <div className={`text-5xl font-bold font-heading mt-4 ${getScoreColor(score)}`}>
            {score}
          </div>
        </div>

        {/* Bias yang Teridentifikasi */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-bold text-text-strong font-heading">
            Detail Identifikasi
          </h3>

          {correctSelected.map((b) => (
            <div key={b} className="flex items-center gap-3 p-3 bg-green-500/8 rounded-xl border border-green-500/20">
              <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-sm font-medium text-text-strong">{BIAS_LABELS[b]}</span>
              <span className="ml-auto text-xs text-green-500 font-medium">Benar ✓</span>
            </div>
          ))}

          {wrongSelected.map((b) => (
            <div key={b} className="flex items-center gap-3 p-3 bg-red-500/8 rounded-xl border border-red-500/20">
              <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              <span className="text-sm font-medium text-text-strong">{BIAS_LABELS[b]}</span>
              <span className="ml-auto text-xs text-red-500 font-medium">Kurang Tepat</span>
            </div>
          ))}

          {missed.map((b) => (
            <div key={b} className="flex items-center gap-3 p-3 bg-orange-500/8 rounded-xl border border-orange-500/20">
              <div className="w-4 h-4 rounded-full border-2 border-orange-500 shrink-0" />
              <span className="text-sm font-medium text-text-strong">{BIAS_LABELS[b]}</span>
              <span className="ml-auto text-xs text-orange-500 font-medium">Terlewat</span>
            </div>
          ))}
        </div>

        {/* Penjelasan Edukatif */}
        <div className="bg-panel rounded-2xl p-4 mb-6 border border-sidebar-border">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
            Penjelasan
          </p>
          <p className="text-sm text-text-body leading-relaxed">{explanation}</p>
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3.5 bg-text-strong hover:bg-black text-background rounded-2xl font-semibold text-sm transition-all"
        >
          Lanjut ke Modul Terakhir →
        </button>
      </motion.div>
    </motion.div>
  );
}
