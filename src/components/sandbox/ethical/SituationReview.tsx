"use client";

import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { CheckCircle, XCircle } from "lucide-react";
import type { DilemmaCategory } from "@/types/assessment";

interface Situation {
  id: number;
  situation: string;
  correctCategory: DilemmaCategory;
  explanation: string;
}

interface Answer {
  situationId: number;
  chosen: DilemmaCategory;
}

interface SituationReviewProps {
  situations: Situation[];
  answers: Answer[];
  ethicalScore: number;
  cognitiveScore: number;
  onContinue: () => void;
}

const CATEGORY_LABELS: Record<DilemmaCategory, string> = {
  ethical: "🟢 Ethical Co-pilot",
  offloading: "🔴 Cognitive Offloading",
  grey: "🟡 Grey Area",
};

export function SituationReview({
  situations,
  answers,
  ethicalScore,
  cognitiveScore,
  onContinue,
}: SituationReviewProps) {
  const getResult = (situation: Situation, answer: Answer | undefined) => {
    if (!answer) return "incorrect";
    return answer.chosen === situation.correctCategory ? "correct" : "incorrect";
  };

  const correctCount = situations.filter((s) => {
    const answer = answers.find((a) => a.situationId === s.id);
    return answer && answer.chosen === s.correctCategory;
  }).length;

  const overallScore = Math.round((ethicalScore + cognitiveScore) / 2);

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
        className="bg-background rounded-3xl p-8 max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-sidebar-border"
      >
        {/* Skor */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center mx-auto mb-3">
            <Icon id="85613" className="w-7 h-7 bg-teal-500" />
          </div>
          <h2 className="text-xl font-bold font-heading text-text-strong">
            Selesai! Hasil Ethical Dilemma
          </h2>
          <p className="text-sm text-text-muted mb-5">Ethical Reasoning + Cognitive Agency</p>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-teal-500/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-teal-500">{correctCount}</div>
              <p className="text-xs text-text-muted mt-1">Benar dari {situations.length}</p>
            </div>
            <div className="bg-accent-blue/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-accent-blue">{ethicalScore}</div>
              <p className="text-xs text-text-muted mt-1">Ethical Reasoning</p>
            </div>
            <div className="bg-purple-500/10 rounded-xl p-3">
              <div className="text-2xl font-bold text-purple-500">{cognitiveScore}</div>
              <p className="text-xs text-text-muted mt-1">Cognitive Agency</p>
            </div>
          </div>
        </div>

        {/* Review per situasi */}
        <div className="space-y-3 mb-6">
          <h3 className="text-sm font-bold text-text-strong font-heading">
            Review Per Situasi
          </h3>
          {situations.map((situation) => {
            const answer = answers.find((a) => a.situationId === situation.id);
            if (!answer) return null;
            const isCorrect = getResult(situation, answer) === "correct";

            return (
              <div
                key={situation.id}
                className={`p-4 rounded-xl border text-sm ${
                  isCorrect
                    ? "bg-green-500/8 border-green-500/25"
                    : "bg-red-500/8 border-red-500/25"
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  )}
                  <p className="text-text-body italic leading-relaxed">
                    &ldquo;{situation.situation}&rdquo;
                  </p>
                </div>

                <div className="ml-6 space-y-1.5">
                  <p className="text-xs text-text-muted">
                    <span className="font-semibold">Jawabanmu:</span>{" "}
                    {CATEGORY_LABELS[answer.chosen]}
                  </p>
                  {!isCorrect && (
                    <p className="text-xs text-text-muted">
                      <span className="font-semibold">Jawaban Benar:</span>{" "}
                      {CATEGORY_LABELS[situation.correctCategory]}
                    </p>
                  )}
                  <p className="text-xs text-text-muted leading-relaxed">
                    💡 {situation.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onContinue}
          className="w-full py-3.5 bg-text-strong hover:bg-black text-background rounded-2xl font-semibold text-sm transition-all"
        >
          Lihat Dashboard Hasil Akhir →
        </button>
      </motion.div>
    </motion.div>
  );
}
