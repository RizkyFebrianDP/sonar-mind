"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RadarChartPillar } from "@/components/dashboard/RadarChartPillar";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { LearningRecommendations } from "@/components/dashboard/LearningRecommendations";
import { Icon } from "@/components/ui/Icon";
import { useAssessment } from "@/context/AssessmentContext";
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
  const savedRef = React.useRef(false);

  // Jika ada rawScores dari sesi ini, simpan ke Supabase (sekali per sesi)


  // Tentukan sumber data: context (baru selesai) atau DB (riwayat)
  const displayResult: AssessmentResult | null = assessmentResult ?? (latestRecord
    ? (latestRecord.raw_scores && latestRecord.raw_scores.hallucinationAudit
        ? calculateAssessmentResult(latestRecord.raw_scores)
        : {
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
          })
    : null);

  const overall = displayResult?.weightedTotal ?? latestRecord?.overall_score ?? 0;
  const hallucinationScore = displayResult?.pillars.criticalEvaluation ?? latestRecord?.hallucination_score ?? 0;
  const biasScore = displayResult?.pillars.algorithmicBiasAwareness ?? latestRecord?.bias_score ?? 0;
  const ethicalScore = displayResult?.pillars.ethicalReasoning ?? latestRecord?.ethical_score ?? 0;
  const hasData = latestRecord !== null || assessmentResult !== null;

  const displayName = user?.user_metadata?.full_name ?? user?.email?.split("@")[0] ?? "there";

  const overallMeta = getScoreLabel(overall);
  const hallucinationMeta = getScoreLabel(hallucinationScore);
  const biasMeta = getScoreLabel(biasScore);
  const ethicalMeta = getScoreLabel(ethicalScore);

  const scoreMap = [
    { cat: "halusinasi", score: hallucinationScore },
    { cat: "bias", score: biasScore },
    { cat: "etika", score: ethicalScore },
  ];
  scoreMap.sort((a, b) => a.score - b.score);
  const weakestCat = scoreMap[0].cat as "halusinasi" | "bias" | "etika";

  return (
    <motion.div
      className="min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>Dashboard</span>
            <span className="opacity-50">/</span>
            <span className="font-medium text-text-strong">Competency</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-text-strong font-heading tracking-tight">
            Welcome back, {displayName}{" "}
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
            {hasData ? "Retake Assessment" : "Take Assessment"}
          </a>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-text-strong">My Competencies</h2>
          {!hasData && (
            <span className="text-xs text-text-muted bg-panel border border-sidebar-border px-3 py-1 rounded-full">
              Selesaikan assessment untuk melihat skor
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard
            title="Overall Competency"
            score={overall}
            label={hasData ? overallMeta.label : "Belum Ada Data"}
            labelColor={hasData ? overallMeta.color : "blue"}
            description={hasData ? `Skor gabungan 4 pilar kompetensi` : "Mulai assessment untuk melihat skor"}
            iconId="85933"
          />
          <SummaryCard
            title="Hallucination Audit"
            score={hallucinationScore}
            label={hasData ? hallucinationMeta.label : "Belum Ada Data"}
            labelColor={hasData ? hallucinationMeta.color : "blue"}
            description={hasData ? "Kemampuan deteksi informasi palsu AI" : "Critical Evaluation"}
            iconId="89779"
          />
          <SummaryCard
            title="Algorithmic Bias"
            score={biasScore}
            label={hasData ? biasMeta.label : "Belum Ada Data"}
            labelColor={hasData ? biasMeta.color : "blue"}
            description={hasData ? "Identifikasi bias dalam sistem AI" : "Bias Awareness"}
            iconId="86472"
          />
          <SummaryCard
            title="Ethical & Agency"
            score={ethicalScore}
            label={hasData ? ethicalMeta.label : "Belum Ada Data"}
            labelColor={hasData ? ethicalMeta.color : "blue"}
            description={hasData ? "Penalaran etika & kemandirian kognitif" : "Ethical & Cognitive"}
            iconId="101164"
          />
        </div>
      </motion.section>

      {/* Radar Chart + Learning Recs */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-heading font-bold text-text-strong mb-4">
          Your AI Competency
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-panel rounded-3xl p-6 lg:p-8 border border-sidebar-border shadow-sm flex flex-col gap-8">
              <RadarChartPillar scores={displayResult?.pillars} />
              {displayResult && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InsightCard
                    type="strength"
                    pillar="Critical Evaluation"
                    score={displayResult.pillars.criticalEvaluation}
                    description="Kemampuan mendeteksi halusinasi dan memverifikasi klaim dari sumber AI."
                  />
                  <InsightCard
                    type="growth"
                    pillar="Algorithmic Bias Awareness"
                    score={displayResult.pillars.algorithmicBiasAwareness}
                    description="Identifikasi bias gender, budaya, dan stereotip dalam output sistem AI."
                  />
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1 h-full">
            <LearningRecommendations weakestCategory={weakestCat} />
          </div>
        </div>
      </motion.section>

      {/* History Table */}
      <motion.section variants={itemVariants} className="w-full">
        <HistoryTable data={history} loading={false} />
      </motion.section>
    </motion.div>
  );
}
