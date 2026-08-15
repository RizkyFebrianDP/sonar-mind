"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { LearningRecommendations } from "@/components/dashboard/LearningRecommendations";
import { Icon } from "@/components/ui/Icon";
import { useAssessment } from "@/context/AssessmentContext";
import { useLanguage } from "@/context/LanguageContext";
import { calculateAssessmentResult, generateRecommendations } from "@/lib/scoring-engine";
import type { AssessmentHistoryItem, AssessmentResult } from "@/types/assessment";
import type { User } from "@supabase/supabase-js";

interface DashboardClientProps {
  user: User | null;
  history: AssessmentHistoryItem[];
  latestRecord: AssessmentHistoryItem | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

function getScoreLabel(score: number): { label: string; color: "blue" | "yellow" | "green" | "red" | "pink" } {
  if (score >= 80) return { label: "Advanced", color: "green" };
  if (score >= 65) return { label: "Proficient", color: "blue" };
  if (score >= 50) return { label: "Developing", color: "yellow" };
  return { label: "Beginner", color: "red" };
}

export function DashboardClient({ user, history, latestRecord }: DashboardClientProps) {
  const { assessmentResult, rawScores } = useAssessment();
  const { t } = useLanguage();
  const savedRef = React.useRef(false);

  // Jika ada rawScores dari sesi ini, simpan ke Supabase (sekali per sesi)


  // Tentukan sumber data: context (baru selesai) atau DB (riwayat)
  let fallbackResult = null;
  if (latestRecord?.raw_scores) {
    const calc = calculateAssessmentResult(latestRecord.raw_scores);
    if (calc.ok) fallbackResult = calc.value;
  }

  const resultData =
    assessmentResult ||
    (latestRecord
      ? {
          pillars: {
            criticalEvaluation: latestRecord.hallucination_score,
            algorithmicBiasAwareness: latestRecord.bias_score,
            ethicalReasoning: latestRecord.ethical_score,
            cognitiveAgency: latestRecord.cognitive_agency_score,
          },
          weightedTotal: latestRecord.overall_score,
          cognitiveAgencyCategory: latestRecord.cognitive_agency_category,
          algorithmicResilienceIndex: latestRecord.algorithmic_resilience_index,
          recommendations: generateRecommendations({
            criticalEvaluation: latestRecord.hallucination_score,
            algorithmicBiasAwareness: latestRecord.bias_score,
            ethicalReasoning: latestRecord.ethical_score,
            cognitiveAgency: latestRecord.cognitive_agency_score,
          }),
        }
      : fallbackResult);

  const overall = resultData?.weightedTotal ?? latestRecord?.overall_score ?? 0;
  const hallucinationScore = resultData?.pillars.criticalEvaluation ?? latestRecord?.hallucination_score ?? 0;
  const biasScore = resultData?.pillars.algorithmicBiasAwareness ?? latestRecord?.bias_score ?? 0;
  const ethicalScore = resultData?.pillars.ethicalReasoning ?? latestRecord?.ethical_score ?? 0;
  const hasData = latestRecord !== null || assessmentResult !== null;

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "there";

  const overallMeta = getScoreLabel(overall);
  const hallucinationMeta = getScoreLabel(hallucinationScore);
  const biasMeta = getScoreLabel(biasScore);
  const ethicalMeta = getScoreLabel(ethicalScore);

  const prevRecord = assessmentResult ? latestRecord : (history.length > 1 ? history[1] : null);

  const getTrend = (current: number, previous: number | undefined | null) => {
    if (previous === undefined || previous === null) return undefined;
    const diff = current - previous;
    return {
      value: Math.abs(diff),
      isPositive: diff > 0,
      isZero: diff === 0,
    };
  };

  const overallTrend = getTrend(overall, prevRecord?.overall_score);
  const hallucinationTrend = getTrend(hallucinationScore, prevRecord?.hallucination_score);
  const biasTrend = getTrend(biasScore, prevRecord?.bias_score);
  const ethicalTrend = getTrend(ethicalScore, prevRecord?.ethical_score);

  const scoreMap = [
    { cat: "halusinasi", score: hallucinationScore },
    { cat: "bias", score: biasScore },
    { cat: "etika", score: ethicalScore },
  ];
  scoreMap.sort((a, b) => a.score - b.score);
  const weakestCat = scoreMap[0].cat as "halusinasi" | "bias" | "etika";

  return (
    <motion.div
      className="min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col gap-8 lg:gap-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 shrink-0"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>Dashboard</span>
            <span className="opacity-50">/</span>
            <span className="font-medium text-text-strong">Competency</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-strong font-heading tracking-tight">
            {t.dashboard.welcome}, {displayName}{" "}
            <span className="inline-block origin-bottom-right hover:-rotate-12 hover:scale-110 transition-transform duration-300 cursor-default">
              👋
            </span>
          </h1>
        </div>
        
        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <a
            href="/assessments"
            className="flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-2.5 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all tracking-wide"
          >
            {hasData ? t.dashboard.retakeAssessment : t.dashboard.takeAssessment}
          </a>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.section variants={itemVariants} className="shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-text-strong">{t.dashboard.myCompetencies}</h2>
          {!hasData && (
            <span className="text-xs text-text-muted bg-panel border border-sidebar-border px-3 py-1 rounded-full">
              {t.dashboard.noData}
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title={t.dashboard.overallCompetency}
            score={overall}
            label={hasData ? overallMeta.label : "---"}
            labelColor={hasData ? overallMeta.color : "blue"}
            description={hasData ? t.dashboard.overallDesc : t.dashboard.noDataDesc}
            iconId="85933"
            href="/results"
            trend={overallTrend}
          />
          <SummaryCard
            title={t.dashboard.criticalEvaluation}
            score={hallucinationScore}
            label={hasData ? hallucinationMeta.label : "---"}
            labelColor={hasData ? hallucinationMeta.color : "blue"}
            description={hasData ? t.dashboard.criticalDesc : t.dashboard.noDataDesc}
            iconId="89779"
            href="/results"
            trend={hallucinationTrend}
          />
          <SummaryCard
            title={t.dashboard.biasAwareness}
            score={biasScore}
            label={hasData ? biasMeta.label : "---"}
            labelColor={hasData ? biasMeta.color : "blue"}
            description={hasData ? t.dashboard.biasDesc : t.dashboard.noDataDesc}
            iconId="86472"
            href="/results"
            trend={biasTrend}
          />
          <SummaryCard
            title={t.dashboard.ethicalReasoning}
            score={ethicalScore}
            label={hasData ? ethicalMeta.label : "---"}
            labelColor={hasData ? ethicalMeta.color : "blue"}
            description={hasData ? t.dashboard.ethicalDesc : t.dashboard.noDataDesc}
            iconId="101164"
            href="/results"
            trend={ethicalTrend}
          />
        </div>
      </motion.section>

      {/* History & Learning Recs */}
      <motion.section variants={itemVariants} className="flex-1 flex flex-col min-h-[300px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-2 flex flex-col h-full">
            <HistoryTable data={history} loading={false} />
          </div>
          <div className="lg:col-span-1 flex flex-col h-full">
            <LearningRecommendations weakestCategory={weakestCat} />
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
