"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { RadarChartPillar } from "@/components/dashboard/RadarChartPillar";
import type { AssessmentHistoryItem } from "@/types/assessment";
import { useAssessment } from "@/context/AssessmentContext";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

function getScoreBadge(score: number) {
  if (score >= 80)
    return {
      label: "Expert",
      color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
    };
  if (score >= 65)
    return {
      label: "Proficient",
      color: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    };
  if (score >= 50)
    return {
      label: "Developing",
      color: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    };
  return {
    label: "Beginner",
    color: "bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/20",
  };
}

export default function ResultsPage() {
  const { assessmentResult } = useAssessment();
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("assessment_history")
          .select("*")
          .order("created_at", { ascending: false });

        setHistory(data ?? []);
      } catch (err) {
        console.error("Error fetching assessment history:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  const latestRecord = history[0] ?? null;

  // Use local context result if available, otherwise fallback to database history
  const displayResult = assessmentResult ?? null;

  const overall = displayResult?.weightedTotal ?? latestRecord?.overall_score ?? 0;
  const hallucination = displayResult?.pillars.criticalEvaluation ?? latestRecord?.hallucination_score ?? 0;
  const bias = displayResult?.pillars.algorithmicBiasAwareness ?? latestRecord?.bias_score ?? 0;
  const ethical = displayResult?.pillars.ethicalReasoning ?? latestRecord?.ethical_score ?? 0;
  const agency = displayResult?.pillars.cognitiveAgency ?? latestRecord?.cognitive_agency_score ?? 0;
  const ari = displayResult?.algorithmicResilienceIndex ?? latestRecord?.algorithmic_resilience_index ?? 0;

  const pillarScores = displayResult
    ? displayResult.pillars
    : latestRecord
    ? {
        criticalEvaluation: hallucination,
        algorithmicBiasAwareness: bias,
        ethicalReasoning: ethical,
        cognitiveAgency: agency,
      }
    : undefined;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Icon id="86286" className="w-4 h-4 bg-accent-blue" />
            <span className="text-accent-blue font-semibold uppercase tracking-wider text-xs">Hasil & Analitik Asesmen</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-strong font-heading tracking-tight">
              My Competency Results
            </h1>
            <p className="text-text-muted text-sm mt-1">
              Riwayat performa, analisis radar 4 pilar UNESCO, dan indikator Ketahanan Algoritma (ARI).
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <Link
            href="/assessments"
            className="flex w-full sm:w-auto justify-center items-center gap-2 px-6 py-2.5 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all tracking-wide"
          >
            <Icon id="85469" className="w-4 h-4 bg-background" />
            <span>Retake Assessment</span>
          </Link>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Overall Score Card */}
        <div className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-text-muted">
              Overall Score
            </span>
            <div className="p-2 rounded-xl bg-accent-blue/10 text-accent-blue">
              <Icon id="82716" className="w-5 h-5 bg-accent-blue" />
            </div>
          </div>
          <div className="text-4xl font-heading font-extrabold text-text-strong flex items-baseline gap-1">
            <span>{Math.round(overall)}</span>
            <span className="text-sm font-normal text-text-muted">/100</span>
          </div>
          <div className="mt-auto pt-4 flex items-center gap-2">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                getScoreBadge(overall).color
              }`}
            >
              {getScoreBadge(overall).label}
            </span>
            <span className="text-xs text-text-muted">Terbaru</span>
          </div>
        </div>

        {/* ARI Index Card */}
        <div className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-text-muted">
              Algorithmic Resilience (ARI)
            </span>
            <div className="p-2 rounded-xl bg-accent-green/10 text-accent-green">
              <Icon id="86554" className="w-5 h-5 bg-accent-green" />
            </div>
          </div>
          <div className="text-4xl font-heading font-extrabold text-text-strong flex items-baseline gap-1">
            <span>{Math.round(ari)}</span>
            <span className="text-sm font-normal text-text-muted">/100</span>
          </div>
          <div className="mt-auto pt-4">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                getScoreBadge(ari).color
              }`}
            >
              Indeks Ketahanan AI
            </span>
          </div>
        </div>

        {/* Critical Evaluation Card */}
        <div className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-text-muted">
              Hallucination Audit
            </span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
              <Icon id="82782" className="w-5 h-5 bg-indigo-500" />
            </div>
          </div>
          <div className="text-4xl font-heading font-extrabold text-text-strong flex items-baseline gap-1">
            <span>{Math.round(hallucination)}</span>
            <span className="text-sm font-normal text-text-muted">/100</span>
          </div>
          <div className="mt-auto pt-4">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                getScoreBadge(hallucination).color
              }`}
            >
              Verifikasi
            </span>
          </div>
        </div>

        {/* Ethical & Agency Card */}
        <div className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-text-muted">
              Ethical & Agency
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Icon id="101174" className="w-5 h-5 bg-amber-500" />
            </div>
          </div>
          <div className="text-4xl font-heading font-extrabold text-text-strong flex items-baseline gap-1">
            <span>{Math.round(ethical)}</span>
            <span className="text-sm font-normal text-text-muted">/100</span>
          </div>
          <div className="mt-auto pt-4">
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                getScoreBadge(ethical).color
              }`}
            >
              Etika
            </span>
          </div>
        </div>
      </motion.div>

      {/* Main Analytics Grid: Radar Chart & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Radar Chart (7 cols) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 bg-panel border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-6"
        >
          <div className="space-y-1">
            <h2 className="text-xl font-heading font-bold text-text-strong">
              Radar Kompetensi UNESCO
            </h2>
            <p className="text-xs text-text-muted">
              Visualisasi keseimbangan antara evaluasi kritis, identifikasi bias, penalaran etis, dan agensi kognitif.
            </p>
          </div>

          <RadarChartPillar scores={pillarScores} />
        </motion.div>

        {/* Right: Badges & Cognitive Agency Category (5 cols) */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col h-full gap-6">
          {/* Cognitive Agency Card */}
          <div className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm flex-1 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-accent-blue/10 text-accent-blue">
                <Icon id="85778" className="w-6 h-6 bg-accent-blue" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-text-strong">
                  Status Agensi Kognitif
                </h3>
                <p className="text-xs text-text-muted">
                  Tingkat kemandirian berpikir saat berinteraksi dengan AI
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-background border border-border-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">Kategori:</span>
                <span className="text-xs font-bold uppercase tracking-wider text-accent-blue">
                  {latestRecord?.cognitive_agency_category ?? "Independent"}
                </span>
              </div>
              <p className="text-xs text-text-strong leading-relaxed">
                Anda menunjukkan tingkat kemandirian yang tinggi dalam mengevaluasi tanggapan AI dan tidak mudah bergantung secara berlebihan.
              </p>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Icon id="85613" className="w-5 h-5 bg-amber-500" />
              <h3 className="text-base font-heading font-bold text-text-strong">
                Lencana Kompetensi Terbuka
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-background border border-border-subtle flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Icon id="82797" className="w-4 h-4 bg-emerald-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-strong">
                    Hallucination Hunter
                  </h4>
                  <span className="text-[10px] text-text-muted">Level 1</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-background border border-border-subtle flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <Icon id="87375" className="w-4 h-4 bg-blue-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-text-strong">
                    Bias Detective
                  </h4>
                  <span className="text-[10px] text-text-muted">Level 1</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* History Table */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text-strong">
            Riwayat Percobaan Asesmen
          </h2>
          <span className="text-xs text-text-muted">
            Total {history.length} sesi tersimpan
          </span>
        </div>

        <div className="bg-panel border border-border-subtle rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-8 text-center text-xs text-text-muted">
              Memuat riwayat asesmen...
            </div>
          ) : history.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <Icon id="84997" className="w-10 h-10 bg-text-muted mx-auto" />
              <h3 className="text-sm font-semibold text-text-strong">
                Belum Ada Riwayat Asesmen
              </h3>
              <p className="text-xs text-text-muted max-w-sm mx-auto">
                Selesaikan asesmen pertama Anda di Sandbox untuk melihat riwayat performa di sini.
              </p>
              <Link
                href="/assessments"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-blue text-white rounded-full text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                Mulai Asesmen Sekarang
                <Icon id="85463" className="w-3.5 h-3.5 bg-white" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-border-subtle bg-background/50 text-text-muted font-medium">
                    <th className="py-4 px-6">Tanggal & Waktu</th>
                    <th className="py-4 px-6">Overall Score</th>
                    <th className="py-4 px-6">Hallucination Audit</th>
                    <th className="py-4 px-6">Bias Score</th>
                    <th className="py-4 px-6">Ethical Score</th>
                    <th className="py-4 px-6 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60">
                  {history.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-6 text-text-strong font-medium">
                        {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-text-strong">
                          {item.overall_score}
                        </span>
                        <span className="text-text-muted">/100</span>
                      </td>
                      <td className="py-4 px-6 text-text-muted">
                        {item.hallucination_score} pts
                      </td>
                      <td className="py-4 px-6 text-text-muted">
                        {item.bias_score} pts
                      </td>
                      <td className="py-4 px-6 text-text-muted">
                        {item.ethical_score} pts
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link
                          href="/assessments"
                          className="text-xs font-semibold text-accent-blue hover:underline"
                        >
                          Ulangi
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
