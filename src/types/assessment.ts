// ============================================================
// SONAR MIND — Assessment Type Definitions
// ============================================================

// --- Raw Scores (input dari setiap modul sandbox) ---

export interface HallucinationAuditRaw {
  truePositives: number;    // Kalimat halusinasi yang benar ditandai
  falsePositives: number;   // Kalimat benar yang salah ditandai
  missed: number;           // Kalimat halusinasi yang tidak terdeteksi
  totalHallucinations: number; // Total kalimat halusinasi dalam teks
}

export interface BiasAuditRaw {
  biasIdentificationScore: number; // 0–100, dari cocok/tidaknya pilihan bias
  justificationScore: number;      // 0–100, dari kualitas teks justifikasi
}

export interface EthicalDilemmaRaw {
  ethicalReasoningScore: number;   // 0–100, sub-skor Pilar 3
  cognitiveAgencyScore: number;    // 0–100, sub-skor Pilar 4
}

export interface RawScores {
  hallucinationAudit?: HallucinationAuditRaw;
  biasAudit?: BiasAuditRaw;
  ethicalDilemma?: EthicalDilemmaRaw;
}

// --- Pillar Scores ---

export interface PillarScores {
  criticalEvaluation: number;       // Pilar 1 (30%)
  algorithmicBiasAwareness: number; // Pilar 2 (25%)
  ethicalReasoning: number;         // Pilar 3 (25%)
  cognitiveAgency: number;          // Pilar 4 (20%)
}

// --- Cognitive Agency Category ---

export type CognitiveAgencyCategory = 'independent' | 'balanced' | 'high-risk';

// --- Final Assessment Result (output dari Scoring Engine) ---

export interface AssessmentResult {
  pillars: PillarScores;
  weightedTotal: number;                             // 0–100
  cognitiveAgencyCategory: CognitiveAgencyCategory;
  algorithmicResilienceIndex: number;                // ARI 0–100
  recommendations: string[];                         // 1–2 rekomendasi modul
}

// --- Assessment History Record (dari Supabase) ---

export interface AssessmentHistoryItem {
  id: string;
  user_id: string;
  created_at: string;
  overall_score: number;
  hallucination_score: number;
  bias_score: number;
  ethical_score: number;
  cognitive_agency_score: number;
  cognitive_agency_category: CognitiveAgencyCategory;
  algorithmic_resilience_index: number;
  raw_scores?: RawScores | null;
}

// --- Scenario Data Types ---

export interface HallucinationSentence {
  id: number;
  text: string;
  isHallucination: boolean;
  explanation: string;
}

export interface HallucinationScenario {
  title: string;
  context: string;
  sentences: HallucinationSentence[];
  references: Array<{ claim: string; source: string }>;
}

export interface BiasCandidate {
  name: string;
  gender: string;
  school: string;
  gpa: number;
  extracurricular: string;
  achievements: string[];
  scholarshipEssayScore: number;
  aiRank: number;
  aiScore: number;
}

export interface BiasAuditScenario {
  title: string;
  context: string;
  candidates: BiasCandidate[];
  biasAnalysis: {
    correctBiasTypes: string[];
    explanation: string;
    keywords: string[];
  };
}

export type DilemmaCategory = 'ethical' | 'offloading' | 'grey';

export interface EthicalDilemmaSituation {
  id: number;
  situation: string;
  correctCategory: DilemmaCategory;
  explanation: string;
  pillarImpact: {
    ethical: number;   // -1, 0, or 1
    cognitive: number; // -1, 0, or 1
  };
}
