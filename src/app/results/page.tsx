"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  BrainCircuit,
  ClipboardCheck,
  Scale,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Zap,
  Award,
  ChevronDown,
  Printer,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { calculateAssessmentResult } from "@/lib/scoring-engine";
import type {
  AssessmentHistoryItem,
  AssessmentResult,
  CognitiveAgencyCategory,
} from "@/types/assessment";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 26 } },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function getCategoryMeta(cat: CognitiveAgencyCategory) {
  switch (cat) {
    case "independent": return { label: "Independent Critical Thinker", color: "text-emerald-500", bg: "bg-emerald-500/10", icon: ShieldCheck };
    case "balanced": return { label: "Balanced AI Collaborator", color: "text-amber-500", bg: "bg-amber-500/10", icon: BrainCircuit };
    case "high-risk": return { label: "High-Risk AI Dependent", color: "text-red-500", bg: "bg-red-500/10", icon: AlertTriangle };
  }
}

function ScoreRing({ score, size = 120, stroke = 8, label }: {
  score: number; size?: number; stroke?: number; label: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#eab308" : "#ef4444";
  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-subtle)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ} initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }} transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold font-heading text-text-strong">{score}</span>
        <span className="text-[10px] text-text-muted uppercase tracking-widest">{label}</span>
      </div>
    </div>
  );
}

function PillarBar({ label, score, icon: Icon, delay = 0 }: {
  label: string; score: number; icon: React.ElementType; delay?: number;
}) {
  const color = score >= 75 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Icon className="w-4 h-4" /><span>{label}</span>
        </div>
        <span className="text-sm font-semibold text-text-strong tabular-nums">{score}</span>
      </div>
      <div className="h-2.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }} animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function ModuleTimelineCard({ title, score, icon: Icon, status, raw }: {
  title: string; score: number; icon: React.ElementType; status: string;
  raw: Record<string, number> | null;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div variants={item}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left bg-panel border border-sidebar-border rounded-2xl p-5 hover:border-accent-blue/40 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-accent-blue" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-text-strong text-sm">{title}</h3>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                score >= 75 ? "bg-emerald-500/10 text-emerald-600" : score >= 50 ? "bg-amber-500/10 text-amber-600" : "bg-red-500/10 text-red-600"
              }`}>{score}/100</span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">{status}</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
        {expanded && raw && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="mt-4 pt-4 border-t border-sidebar-border">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(raw).map(([k, v]) => (
                <div key={k} className="bg-background rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">{k.replace(/_/g, " ")}</p>
                  <p className="text-lg font-bold text-text-strong tabular-nums">{v}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </button>
    </motion.div>
  );
}

export default function ResultsPage() {
  const [history, setHistory] = useState<AssessmentHistoryItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await supabase
        .from("assessment_history")
        .select("*")
        .order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setHistory(data as AssessmentHistoryItem[]);
        setSelectedId(data[0].id);
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const record = history.find((h) => h.id === selectedId);
  const result: AssessmentResult | null = record?.raw_scores
    ? calculateAssessmentResult(record.raw_scores)
    : null;
  const catMeta = record ? getCategoryMeta(record.cognitive_agency_category) : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Memuat hasil assessment...</div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 flex items-center justify-center mx-auto">
            <ClipboardCheck className="w-8 h-8 text-accent-blue" />
          </div>
          <h2 className="text-xl font-bold font-heading text-text-strong">Belum Ada Hasil</h2>
          <p className="text-sm text-text-muted">
            Kamu belum menyelesaikan assessment apapun. Selesaikan ketiga modul sandbox untuk melihat laporan detail.
          </p>
          <Link href="/assessments" className="inline-flex items-center gap-2 px-6 py-2.5 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold transition-all">
            Mulai Assessment <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  const CatIcon = catMeta?.icon ?? AlertTriangle;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-sidebar-border print:hidden">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-5 h-14">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1.5 rounded-lg hover:bg-black/5 transition-colors">
              <ArrowLeft className="w-5 h-5 text-text-muted" />
            </Link>
            <h1 className="font-heading font-bold text-text-strong">Assessment Report</h1>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 1 && (
              <select
                value={selectedId ?? ""}
                onChange={(e) => setSelectedId(e.target.value)}
                className="text-xs bg-panel border border-sidebar-border rounded-lg px-3 py-1.5 text-text-strong focus:outline-none focus:ring-2 focus:ring-accent-blue/40"
              >
                {history.map((h) => (
                  <option key={h.id} value={h.id}>
                    {formatDate(h.created_at)}
                  </option>
                ))}
              </select>
            )}
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg hover:bg-black/5 transition-colors text-text-muted hover:text-text-strong"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <motion.main className="max-w-4xl mx-auto px-5 py-8 space-y-6" variants={container} initial="hidden" animate="show">
        {/* Score Hero */}
        <motion.section variants={item} className="bg-panel border border-sidebar-border rounded-3xl p-8">
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <ScoreRing score={record.overall_score} size={140} stroke={10} label="Overall" />
            <div className="flex-1 text-center sm:text-left space-y-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-strong">
                  {record.overall_score >= 75 ? "Luar Biasa" : record.overall_score >= 50 ? "Cukup Baik" : "Perlu Ditingkatkan"}
                </h2>
                <p className="text-sm text-text-muted mt-1">Sonar Mind AI Competency Assessment</p>
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <div className="inline-flex items-center gap-2 bg-accent-blue/10 text-accent-blue text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5" /> ARI: {record.algorithmic_resilience_index}
                </div>
                {catMeta && (
                  <div className={`inline-flex items-center gap-2 ${catMeta.bg} ${catMeta.color} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                    <CatIcon className="w-3.5 h-3.5" /> {catMeta.label}
                  </div>
                )}
              </div>
              <div className="text-xs text-text-muted pt-1">
                <span className="inline-flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {formatDate(record.created_at)}</span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pillar Breakdown */}
        {result && (
          <motion.section variants={item} className="bg-panel border border-sidebar-border rounded-3xl p-8 space-y-5">
            <h3 className="font-heading font-bold text-text-strong flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-blue" /> Kompetensi Per Pilar
            </h3>
            <div className="space-y-4">
              <PillarBar label="Pilar 1 — Critical Evaluation" score={result.pillars.criticalEvaluation} icon={ClipboardCheck} delay={0.1} />
              <PillarBar label="Pilar 2 — Bias Awareness" score={result.pillars.algorithmicBiasAwareness} icon={Scale} delay={0.2} />
              <PillarBar label="Pilar 3 — Ethical Reasoning" score={result.pillars.ethicalReasoning} icon={ShieldCheck} delay={0.3} />
              <PillarBar label="Pilar 4 — Cognitive Agency" score={result.pillars.cognitiveAgency} icon={BrainCircuit} delay={0.4} />
            </div>
          </motion.section>
        )}

        {/* Module Detail */}
        <motion.section variants={item} className="space-y-3">
          <h3 className="font-heading font-bold text-text-strong flex items-center gap-2 px-1">
            <TrendingUp className="w-5 h-5 text-accent-blue" /> Detail Per Modul
          </h3>
          <div className="space-y-3">
            <ModuleTimelineCard
              title="Hallucination Audit"
              score={record.hallucination_score}
              icon={ClipboardCheck}
              status={record.hallucination_score >= 75 ? "Mampu mendeteksi halusinasi AI dengan baik" : "Perlu latihan lebih banyak deteksi halusinasi"}
              raw={record.raw_scores?.hallucinationAudit ? {
                truePositives: record.raw_scores.hallucinationAudit.truePositives,
                falsePositives: record.raw_scores.hallucinationAudit.falsePositives,
                missed: record.raw_scores.hallucinationAudit.missed,
                totalHallucinations: record.raw_scores.hallucinationAudit.totalHallucinations,
              } : null}
            />
            <ModuleTimelineCard
              title="Algorithmic Bias Audit"
              score={record.bias_score}
              icon={Scale}
              status={record.bias_score >= 75 ? "Sadar baik terhadap bias algoritmik" : "Perlu meningkatkan kesadaran bias"}
              raw={record.raw_scores?.biasAudit ? {
                identificationScore: record.raw_scores.biasAudit.biasIdentificationScore,
                justificationScore: record.raw_scores.biasAudit.justificationScore,
              } : null}
            />
            <ModuleTimelineCard
              title="Ethical Dilemma"
              score={record.ethical_score}
              icon={ShieldCheck}
              status={record.ethical_score >= 75 ? "Penalaran etika yang kuat" : "Perlu penguatan penalaran etika"}
              raw={record.raw_scores?.ethicalDilemma ? {
                ethicalReasoning: record.raw_scores.ethicalDilemma.ethicalReasoningScore,
                cognitiveAgency: record.raw_scores.ethicalDilemma.cognitiveAgencyScore,
              } : null}
            />
          </div>
        </motion.section>

        {/* Recommendations */}
        {result && result.recommendations.length > 0 && (
          <motion.section variants={item} className="bg-panel border border-sidebar-border rounded-3xl p-8 space-y-4">
            <h3 className="font-heading font-bold text-text-strong flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" /> Rekomendasi
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                  <CheckCircle2 className="w-4 h-4 text-accent-green shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Actions */}
        <motion.section variants={item} className="flex flex-col sm:flex-row gap-3 justify-center pt-4 pb-8 print:hidden">
          <Link href="/assessments" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold transition-all">
            Ulangi Assessment <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
          <Link href="/learning" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-panel border border-sidebar-border hover:border-accent-blue/40 text-text-strong rounded-full text-sm font-semibold transition-all">
            Modul Belajar <BookOpen className="w-4 h-4" />
          </Link>
        </motion.section>
      </motion.main>
    </div>
  );
}
