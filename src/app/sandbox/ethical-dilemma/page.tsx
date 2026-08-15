"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { ProgressBar } from "@/components/sandbox/ethical/ProgressBar";
import { DilemmaCard } from "@/components/sandbox/ethical/DilemmaCard";
import { SituationReview } from "@/components/sandbox/ethical/SituationReview";
import { useLanguage } from "@/context/LanguageContext";
import { useAssessment } from "@/context/AssessmentContext";
import { calculateAssessmentResult } from "@/lib/scoring-engine";
import scenarioDataId from "@/data/scenarios/ethical-dilemma_id.json";
import scenarioDataEn from "@/data/scenarios/ethical-dilemma_en.json";
import type { DilemmaCategory, EthicalDilemmaSituation } from "@/types/assessment";

interface Answer {
  situationId: number;
  chosen: DilemmaCategory;
}

function computeEthicalScores(
  situations: typeof scenarioDataId,
  answers: Answer[]
): { ethicalReasoningScore: number; cognitiveAgencyScore: number } {
  let ethicalPoints = 0;
  let cognitivePoints = 0;
  let ethicalTotal = 0;
  let cognitiveTotal = 0;

  for (const situation of situations) {
    const answer = answers.find((a) => a.situationId === situation.id);
    if (!answer) continue;

    const isCorrect = answer.chosen === situation.correctCategory;
    const impact = situation.pillarImpact;

    // Hitung kontribusi per pilar
    if (impact.ethical !== 0) {
      ethicalTotal += 1;
      if (isCorrect) ethicalPoints += 1;
    }
    if (impact.cognitive !== 0) {
      cognitiveTotal += 1;
      if (isCorrect) cognitivePoints += 1;
    }
  }

  const ethicalReasoningScore =
    ethicalTotal > 0 ? Math.round((ethicalPoints / ethicalTotal) * 100) : 0;
  const cognitiveAgencyScore =
    cognitiveTotal > 0 ? Math.round((cognitivePoints / cognitiveTotal) * 100) : 0;

  return { ethicalReasoningScore, cognitiveAgencyScore };
}

export default function EthicalDilemmaPage() {
  const router = useRouter();
  const { locale } = useLanguage();
  const { setEthicalScore, setAssessmentResult, rawScores } = useAssessment();
  const scenarioData = locale === "en" ? scenarioDataEn : scenarioDataId;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentSelection, setCurrentSelection] = useState<DilemmaCategory | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [ethicalScore, setEthicalScore2] = useState(0);
  const [cognitiveScore, setCognitiveScore] = useState(0);

  const situations = scenarioData as unknown as EthicalDilemmaSituation[];
  const totalSituations = situations.length;
  const currentSituation = situations[currentIndex];
  const isLast = currentIndex === totalSituations - 1;

  const handleSelect = (category: DilemmaCategory) => {
    setCurrentSelection(category);
  };

  const handleNext = () => {
    if (!currentSelection) return;

    const newAnswers = [
      ...answers,
      { situationId: currentSituation.id, chosen: currentSelection },
    ];
    setAnswers(newAnswers);

    if (isLast) {
      // Hitung skor
      const { ethicalReasoningScore, cognitiveAgencyScore } =
        computeEthicalScores(situations, newAnswers);

      const ethicalRaw = { ethicalReasoningScore, cognitiveAgencyScore };
      setEthicalScore(ethicalRaw);
      setEthicalScore2(ethicalReasoningScore);
      setCognitiveScore(cognitiveAgencyScore);

      // Hitung final result
      const finalRaw = { ...rawScores, ethicalDilemma: ethicalRaw };
      const scoreResult = calculateAssessmentResult(finalRaw);
      
      if (!scoreResult.ok) {
        // Fallback jika error validasi (meskipun secara flow harusnya sudah valid)
        console.error("Gagal menghitung skor:", scoreResult.error);
        return;
      }
      
      const result = scoreResult.value;

      setAssessmentResult(result);

      setShowReview(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setCurrentSelection(null);
    }
  };

  return (
    <div className="p-3 md:p-8 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 md:mb-8"
      >
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-text-muted mb-2 md:mb-3">
          <span>Assessments</span>
          <span>/</span>
          <span className="text-teal-500 font-medium">Ethical Dilemma</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
            <Icon id="101174" className="w-5 h-5 bg-teal-500" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold font-heading text-text-strong">
              Ethical Dilemma Classification
            </h1>
            <p className="text-xs md:text-sm text-text-muted">
              Ethical Reasoning + Cognitive Agency — {locale === "en" ? "Weight" : "Bobot"} 45%
            </p>
          </div>
        </div>
        <p className="hidden sm:block text-sm text-text-muted mt-2 max-w-xl">
          {locale === "en" 
            ? "Classify each AI use case situation into the appropriate category. There are no perfect answers — your judgment is what's evaluated."
            : "Klasifikasikan setiap situasi penggunaan AI ke dalam kategori yang tepat. Tidak ada jawaban sempurna — judgment-mu yang dinilai."}
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-3 md:mb-6">
        <ProgressBar current={currentIndex} total={totalSituations} />
      </div>

      {/* Dilemma Card */}
      <DilemmaCard
        situationId={currentSituation.id}
        situationText={currentSituation.situation}
        selectedCategory={currentSelection}
        onSelect={handleSelect}
        isLast={isLast}
        onNext={handleNext}
      />

      {/* Review Modal */}
      {showReview && (
        <SituationReview
          situations={situations}
          answers={answers}
          ethicalScore={ethicalScore}
          cognitiveScore={cognitiveScore}
          onContinue={() => router.push("/results")}
        />
      )}
    </div>
  );
}
