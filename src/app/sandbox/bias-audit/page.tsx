"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { CandidateTable } from "@/components/sandbox/bias/CandidateTable";
import { BiasChecklist } from "@/components/sandbox/bias/BiasChecklist";
import { JustificationInput } from "@/components/sandbox/bias/JustificationInput";
import { FeedbackReveal } from "@/components/sandbox/bias/FeedbackReveal";
import { useAssessment } from "@/context/AssessmentContext";
import { calculateBiasAwarenessScore } from "@/lib/scoring-engine";
import {
  calculateJustificationScore,
  IDENTIFICATION_BASE_MAX,
  WRONG_SELECTION_PENALTY,
  CORRECT_SELECTION_BONUS,
} from "@/config/bias-scoring";
import scenarioData from "@/data/scenarios/bias-audit.json";

export default function BiasAuditPage() {
  const router = useRouter();
  const { setBiasScore } = useAssessment();

  const [selectedBias, setSelectedBias] = useState<Set<string>>(new Set());
  const [justification, setJustification] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleToggleBias = (id: string) => {
    setSelectedBias((prev) => {
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
    const correctBiasTypes = scenarioData.biasAnalysis.correctBiasTypes;
    const allBiasTypes = ["gender", "cultural", "political", "age", "socioeconomic", "none"];

    // Skor identifikasi: match dengan answer key
    const correctSelected = correctBiasTypes.filter((b) => selectedBias.has(b));
    const wrongSelected = [...selectedBias].filter((b) => !correctBiasTypes.includes(b));
    const totalOptions = allBiasTypes.filter((b) => b !== "none").length;

    const identificationScore = Math.max(
      0,
      Math.round(
        (correctSelected.length / correctBiasTypes.length) * 70 -
          wrongSelected.length * 15
      )
    );

    // Skor justifikasi
    const justificationScore = calculateJustificationScore(
      justification,
      scenarioData.biasAnalysis.keywords
    );

    const raw = {
      biasIdentificationScore: Math.min(100, identificationScore + (correctSelected.length > 0 ? CORRECT_SELECTION_BONUS : 0)),
      justificationScore,
    };

    const score = calculateBiasAwarenessScore(raw);
    setBiasScore(raw);
    setFinalScore(score);
    setShowFeedback(true);
  };

  const canSubmit = selectedBias.size > 0 && justification.length >= 50;

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
          <span className="text-purple-500 font-medium">Bias Audit</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <Icon id="87375" className="w-5 h-5 bg-purple-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-heading text-text-strong">
              Algorithmic Bias Audit
            </h1>
            <p className="text-sm text-text-muted">
              Algorithmic Bias Awareness — Bobot 25%
            </p>
          </div>
        </div>
        <p className="text-sm text-text-muted mt-3 max-w-2xl">
          Analisis output sistem AI rekrutmen di bawah ini. Identifikasi apakah ada bias
          dalam cara AI meranking kandidat, lalu berikan justifikasi.
        </p>
      </motion.div>

      {/* Content */}
      <div className="space-y-5">
        {/* Konteks skenario */}
        <div className="bg-panel rounded-2xl px-6 py-4 border border-sidebar-border">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-1">
            Skenario
          </p>
          <p className="text-sm text-text-body leading-relaxed">
            {scenarioData.context}
          </p>
        </div>

        {/* Tabel Kandidat */}
        <CandidateTable candidates={scenarioData.candidates} />

        {/* Checklist & Justifikasi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <BiasChecklist
            selected={selectedBias}
            onToggle={handleToggleBias}
            disabled={showFeedback}
          />
          <div className="space-y-4">
            <JustificationInput
              value={justification}
              onChange={setJustification}
              disabled={showFeedback}
            />

            {!showFeedback && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full py-3.5 bg-text-strong hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed text-background rounded-2xl font-semibold text-sm transition-all"
              >
                Submit Audit
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedback && (
        <FeedbackReveal
          score={finalScore}
          correctBiasTypes={scenarioData.biasAnalysis.correctBiasTypes}
          selectedBias={selectedBias}
          explanation={scenarioData.biasAnalysis.explanation}
          onContinue={() => router.push("/sandbox/ethical-dilemma")}
        />
      )}
    </div>
  );
}


