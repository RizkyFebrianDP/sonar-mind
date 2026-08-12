"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { RadarChartPillar } from "@/components/dashboard/RadarChartPillar";
import { InsightCard } from "@/components/dashboard/InsightCard";
import { HistoryTable } from "@/components/dashboard/HistoryTable";
import { LearningRecommendations } from "@/components/dashboard/LearningRecommendations";
import { TrendingUp, ClipboardCheck, Scale, BrainCircuit } from "lucide-react";
import { useAssessment } from "@/context/AssessmentContext";
import { createClient } from "@/lib/supabase/client";
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
  useEffect(() => {
    const saveToSupabase = async () => {
      if (!assessmentResult || !rawScores.hallucinationAudit || !rawScores.biasAudit || !rawScores.ethicalDilemma) return;
      if (savedRef.current) return;
      savedRef.current = true;

      const supabase = createClient();
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) return;

      await supabase.from("assessment_history").insert({
        user_id: currentUser.id,
        overall_score: assessmentResult.weightedTotal,
        hallucination_score: assessmentResult.pillars.criticalEvaluation,
        bias_score: assessmentResult.pillars.algorithmicBiasAwareness,
        ethical_score: assessmentResult.pillars.ethicalReasoning,
        cognitive_agency_score: assessmentResult.pillars.cognitiveAgency,
        cognitive_agency_category: assessmentResult.cognitiveAgencyCategory,
        algorithmic_resilience_index: assessmentResult.algorithmicResilienceIndex,
        raw_scores: rawScores,
      });
    };

    saveToSupabase();
  }, [assessmentResult, rawScores]);

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

  return (
    <motion.div
      className="p-8 max-w-7xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2"
      >
        <div className="flex items-center gap-2 text-sm text-text-muted mb-2 sm:mb-0">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-semibold text-text-strong">Competency</span>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-text-strong sm:hidden font-heading tracking-tight">
            Welcome, {displayName}
          </h1>
          <a
            href="/assessments"
            className="px-6 py-2.5 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold shadow-sm transition-all flex items-center gap-2 tracking-wide"
          >
            {hasData ? "Retake Assessment" : "Take Assessment"}
          </a>
        </div>
        <h1 className="hidden sm:block text-2xl md:text-3xl font-bold text-text-strong font-heading tracking-tight">
          Welcome back, {displayName} 👋
        </h1>
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
            icon={TrendingUp}
          />
          <SummaryCard
            title="Hallucination Audit"
            score={hallucinationScore}
            label={hasData ? hallucinationMeta.label : "Belum Ada Data"}
            labelColor={hasData ? hallucinationMeta.color : "blue"}
            description={hasData ? "Kemampuan deteksi informasi palsu AI" : "Pilar 1 — Critical Evaluation"}
            icon={ClipboardCheck}
          />
          <SummaryCard
            title="Algorithmic Bias"
            score={biasScore}
            label={hasData ? biasMeta.label : "Belum Ada Data"}
            labelColor={hasData ? biasMeta.color : "blue"}
            description={hasData ? "Identifikasi bias dalam sistem AI" : "Pilar 2 — Bias Awareness"}
            icon={Scale}
          />
          <SummaryCard
            title="Ethical & Agency"
            score={ethicalScore}
            label={hasData ? ethicalMeta.label : "Belum Ada Data"}
            labelColor={hasData ? ethicalMeta.color : "blue"}
            description={hasData ? "Penalaran etika & kemandirian kognitif" : "Pilar 3 & 4 — Ethical & Cognitive"}
            icon={BrainCircuit}
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
            <LearningRecommendations />
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
