"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ScenarioText } from "@/components/sandbox/hallucination/ScenarioText";
import { ReferencePanel } from "@/components/sandbox/hallucination/ReferencePanel";
import { FeedbackOverlay } from "@/components/sandbox/hallucination/FeedbackOverlay";
import { useAssessment } from "@/context/AssessmentContext";
import { calculateCriticalEvaluationScore } from "@/lib/scoring-engine";
import scenarioData from "@/data/scenarios/hallucination.json";

export default function HallucinationAuditPage() {
  const router = useRouter();
  const { setHallucinationScore } = useAssessment();

  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [stats, setStats] = useState({ tp: 0, fp: 0, missed: 0 });

  const handleToggle = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const hallucinations = scenarioData.sentences.filter((s) => s.isHallucination);
    const total = hallucinations.length;

    const tp = hallucinations.filter((s) => selectedIds.has(s.id)).length;
    const fp = scenarioData.sentences.filter(
      (s) => !s.isHallucination && selectedIds.has(s.id)
    ).length;
    const missed = total - tp;

    const raw = {
      truePositives: tp,
      falsePositives: fp,
      missed,
      totalHallucinations: total,
    };

    const score = calculateCriticalEvaluationScore(raw);

    setHallucinationScore(raw);
    setStats({ tp, fp, missed });
    setFinalScore(score);
    setIsSubmitted(true);
    setShowFeedback(true);
  };

  const handleContinue = () => {
    router.push("/sandbox/bias-audit");
  };

  const markedCount = selectedIds.size;

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-2 text-xs text-text-muted mb-3">
          <span>Assessments</span>
          <span>/</span>
          <span className="text-accent-blue font-medium">Hallucination Audit</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
            <Icon id="89629" className="w-5 h-5 bg-pink-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-text-strong">
              Hallucination Detection Audit
            </h1>
            <p className="text-sm text-text-muted">Critical Evaluation — Bobot 30%</p>
          </div>
        </div>

        {/* Info bar */}
        <div className="flex flex-wrap gap-3 mt-4">
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-800 dark:bg-amber-900/30 dark:border-amber-700/40 dark:text-amber-200 px-3 py-1.5 rounded-xl text-xs font-semibold">
            <Icon id="82783" className="w-3.5 h-3.5 bg-amber-700 dark:bg-amber-400" />
            Klik kalimat yang kamu duga mengandung halusinasi / informasi palsu
          </div>
          <div className="bg-panel text-text-muted px-3 py-1.5 rounded-xl text-xs border border-sidebar-border">
            {markedCount} kalimat ditandai
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Teks Skenario (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-panel rounded-2xl px-6 py-4 border border-sidebar-border">
            <h2 className="text-base font-bold font-heading text-text-strong">
              {scenarioData.title}
            </h2>
            <p className="text-xs text-text-muted mt-1">{scenarioData.context}</p>
          </div>
          <ScenarioText
            sentences={scenarioData.sentences}
            selectedIds={selectedIds}
            onToggle={handleToggle}
            isSubmitted={isSubmitted}
          />
        </div>

        {/* Panel Referensi (1/3) */}
        <div className="lg:col-span-1 space-y-4">
          <ReferencePanel references={scenarioData.references} />

          {/* Submit Button */}
          {!isSubmitted && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={markedCount === 0}
              className="w-full py-3.5 bg-text-strong hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-background rounded-2xl font-semibold text-sm transition-all shadow-sm"
            >
              Submit Audit ({markedCount} kalimat ditandai)
            </motion.button>
          )}
        </div>
      </div>

      {/* Feedback Overlay */}
      {showFeedback && (
        <FeedbackOverlay
          sentences={scenarioData.sentences}
          selectedIds={selectedIds}
          score={finalScore}
          truePositives={stats.tp}
          falsePositives={stats.fp}
          missed={stats.missed}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
