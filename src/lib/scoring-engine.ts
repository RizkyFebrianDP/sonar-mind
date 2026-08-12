/**
 * SONAR MIND — Scoring Engine (SMD-006)
 * Pure functions, no side effects, fully unit-testable.
 *
 * Pilar Weights:
 *   P1 - Critical Evaluation (Hallucination)  : 30%
 *   P2 - Algorithmic Bias Awareness           : 25%
 *   P3 - Ethical Reasoning & Integrity        : 25%
 *   P4 - Cognitive Agency & Autonomy          : 20%
 */

import type {
  RawScores,
  PillarScores,
  CognitiveAgencyCategory,
  AssessmentResult,
  HallucinationAuditRaw,
  BiasAuditRaw,
  EthicalDilemmaRaw,
} from "@/types/assessment";

// ============================================================
// PILAR 1: Critical Evaluation (dari Hallucination Audit)
// Menggunakan F1-score-like formula berbasis precision & recall
// ============================================================

export function calculateCriticalEvaluationScore(
  raw: HallucinationAuditRaw
): number {
  const { truePositives, falsePositives, missed, totalHallucinations } = raw;

  if (totalHallucinations === 0) return 100;

  // Precision: dari yang ditandai, berapa yang benar?
  const totalMarked = truePositives + falsePositives;
  const precision = totalMarked > 0 ? truePositives / totalMarked : 0;

  // Recall: dari halusinasi yang ada, berapa yang terdeteksi?
  const recall =
    totalHallucinations > 0 ? truePositives / totalHallucinations : 0;

  // F1-score style: harmonic mean of precision and recall
  const f1 =
    precision + recall > 0
      ? (2 * precision * recall) / (precision + recall)
      : 0;

  // Penalti tambahan untuk false positives (max 15 poin penalty)
  const fpPenalty = Math.min(falsePositives * 5, 15);

  // Penalti untuk missed hallucinations
  const missedPenalty = Math.min((missed / totalHallucinations) * 20, 20);

  const rawScore = f1 * 100 - fpPenalty - missedPenalty;
  return Math.max(0, Math.min(100, Math.round(rawScore)));
}

// ============================================================
// PILAR 2: Algorithmic Bias Awareness (dari Bias Audit)
// ============================================================

export function calculateBiasAwarenessScore(raw: BiasAuditRaw): number {
  const { biasIdentificationScore, justificationScore } = raw;

  // Bobot: identifikasi 60%, justifikasi 40%
  const weighted =
    biasIdentificationScore * 0.6 + justificationScore * 0.4;

  return Math.max(0, Math.min(100, Math.round(weighted)));
}

// ============================================================
// PILAR 3: Ethical Reasoning & Academic Integrity
// ============================================================

export function calculateEthicalReasoningScore(
  raw: EthicalDilemmaRaw
): number {
  return Math.max(0, Math.min(100, Math.round(raw.ethicalReasoningScore)));
}

// ============================================================
// PILAR 4: Cognitive Agency & Autonomy
// ============================================================

export function calculateCognitiveAgencyScore(
  raw: EthicalDilemmaRaw
): number {
  return Math.max(0, Math.min(100, Math.round(raw.cognitiveAgencyScore)));
}

// ============================================================
// Weighted Total Score
// Formula: (P1×0.30) + (P2×0.25) + (P3×0.25) + (P4×0.20)
// ============================================================

export function calculateWeightedTotal(pillars: PillarScores): number {
  const total =
    pillars.criticalEvaluation * 0.3 +
    pillars.algorithmicBiasAwareness * 0.25 +
    pillars.ethicalReasoning * 0.25 +
    pillars.cognitiveAgency * 0.2;

  return Math.max(0, Math.min(100, Math.round(total)));
}

// ============================================================
// Cognitive Agency Category
// ============================================================

export function getCognitiveAgencyCategory(
  p4Score: number
): CognitiveAgencyCategory {
  if (p4Score >= 75) return "independent";
  if (p4Score >= 50) return "balanced";
  return "high-risk";
}

// ============================================================
// Algorithmic Resilience Index (ARI)
// Formula: (P1 × 0.6) + (P2 × 0.4)
// ============================================================

export function calculateARI(
  criticalEvaluation: number,
  biasAwareness: number
): number {
  const ari = criticalEvaluation * 0.6 + biasAwareness * 0.4;
  return Math.max(0, Math.min(100, Math.round(ari)));
}

// ============================================================
// Recommendation Generator
// Berdasarkan pilar terlemah → rekomendasikan modul belajar
// ============================================================

const RECOMMENDATION_MAP: Record<keyof PillarScores, string[]> = {
  criticalEvaluation: [
    "Modul: Deteksi Informasi Palsu & Verifikasi Fakta",
    "Latihan: Analisis Sumber Berita dengan AI",
  ],
  algorithmicBiasAwareness: [
    "Modul: Bias Algoritma dalam Rekrutmen & Media",
    "Baca: Panduan Audit AI Bertanggung Jawab",
  ],
  ethicalReasoning: [
    "Modul: Integritas Akademik di Era AI",
    "Diskusi: Batas Etis Penggunaan AI dalam Tugas",
  ],
  cognitiveAgency: [
    "Modul: Berpikir Mandiri vs. Ketergantungan AI",
    "Latihan: Refleksi Proses Berpikir (Metacognition)",
  ],
};

export function generateRecommendations(pillars: PillarScores): string[] {
  const entries = Object.entries(pillars) as [keyof PillarScores, number][];
  const sorted = entries.sort(([, a], [, b]) => a - b);

  const recommendations: string[] = [];

  // Ambil rekomendasi dari 2 pilar terlemah
  for (let i = 0; i < Math.min(2, sorted.length); i++) {
    const [key] = sorted[i];
    const recs = RECOMMENDATION_MAP[key];
    if (recs && recs.length > 0) {
      recommendations.push(recs[0]);
    }
  }

  return recommendations;
}

// ============================================================
// Master Function — calculateAssessmentResult
// ============================================================

export function calculateAssessmentResult(
  rawScores: RawScores
): AssessmentResult {
  // Fallback values jika modul belum selesai
  const hallucinationRaw = rawScores.hallucinationAudit ?? {
    truePositives: 0,
    falsePositives: 0,
    missed: 5,
    totalHallucinations: 5,
  };

  const biasRaw = rawScores.biasAudit ?? {
    biasIdentificationScore: 0,
    justificationScore: 0,
  };

  const ethicalRaw = rawScores.ethicalDilemma ?? {
    ethicalReasoningScore: 0,
    cognitiveAgencyScore: 0,
  };

  // Hitung skor per pilar
  const pillars: PillarScores = {
    criticalEvaluation: calculateCriticalEvaluationScore(hallucinationRaw),
    algorithmicBiasAwareness: calculateBiasAwarenessScore(biasRaw),
    ethicalReasoning: calculateEthicalReasoningScore(ethicalRaw),
    cognitiveAgency: calculateCognitiveAgencyScore(ethicalRaw),
  };

  const weightedTotal = calculateWeightedTotal(pillars);
  const cognitiveAgencyCategory = getCognitiveAgencyCategory(
    pillars.cognitiveAgency
  );
  const algorithmicResilienceIndex = calculateARI(
    pillars.criticalEvaluation,
    pillars.algorithmicBiasAwareness
  );
  const recommendations = generateRecommendations(pillars);

  return {
    pillars,
    weightedTotal,
    cognitiveAgencyCategory,
    algorithmicResilienceIndex,
    recommendations,
  };
}
