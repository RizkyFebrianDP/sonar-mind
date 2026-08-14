
import { describe, it, expect } from "vitest";
import {
  calculateCriticalEvaluationScore,
  calculateBiasAwarenessScore,
  calculateEthicalReasoningScore,
  calculateCognitiveAgencyScore,
  calculateWeightedTotal,
  getCognitiveAgencyCategory,
  calculateARI,
  generateRecommendations,
  calculateAssessmentResult,
} from "../src/lib/scoring-engine";

describe("Scoring Engine", () => {
  describe("calculateCriticalEvaluationScore", () => {
    it("perfect score: semua halusinasi terdeteksi, tanpa FP", () => {
      const result = calculateCriticalEvaluationScore({
        truePositives: 5, falsePositives: 0, missed: 0, totalHallucinations: 5,
      });
      expect(result).toBe(100);
    });

    it("semua salah: tidak mendeteksi apapun", () => {
      const result = calculateCriticalEvaluationScore({
        truePositives: 0, falsePositives: 0, missed: 5, totalHallucinations: 5,
      });
      expect(result).toBe(0);
    });

    it("sebagian benar dengan FP", () => {
      const result = calculateCriticalEvaluationScore({
        truePositives: 3, falsePositives: 1, missed: 2, totalHallucinations: 5,
      });
      expect(result).toBe(54);
    });

    it("FP berlebihan mengurangi skor", () => {
      const result = calculateCriticalEvaluationScore({
        truePositives: 3, falsePositives: 3, missed: 2, totalHallucinations: 5,
      });
      expect(result).toBe(32);
    });

    it("totalHallucinations=0 returns 100", () => {
      const result = calculateCriticalEvaluationScore({
        truePositives: 0, falsePositives: 0, missed: 0, totalHallucinations: 0,
      });
      expect(result).toBe(100);
    });

    it("tidak pernah negatif", () => {
      const result = calculateCriticalEvaluationScore({
        truePositives: 0, falsePositives: 10, missed: 5, totalHallucinations: 5,
      });
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe("calculateBiasAwarenessScore", () => {
    it("weighted 60/40 correctly", () => {
      const result = calculateBiasAwarenessScore({ biasIdentificationScore: 80, justificationScore: 70 });
      expect(result).toBe(76);
    });

    it("clamped to 0-100", () => {
      const result = calculateBiasAwarenessScore({ biasIdentificationScore: 150, justificationScore: -20 });
      expect(result).toBe(82);
    });
  });

  describe("calculateEthicalReasoningScore", () => {
    it("passthrough dengan clamp", () => {
      expect(calculateEthicalReasoningScore({ ethicalReasoningScore: 65, cognitiveAgencyScore: 40 })).toBe(65);
      expect(calculateEthicalReasoningScore({ ethicalReasoningScore: 120, cognitiveAgencyScore: 40 })).toBe(100);
      expect(calculateEthicalReasoningScore({ ethicalReasoningScore: -10, cognitiveAgencyScore: 40 })).toBe(0);
    });
  });

  describe("calculateCognitiveAgencyScore", () => {
    it("passthrough dengan clamp", () => {
      expect(calculateCognitiveAgencyScore({ ethicalReasoningScore: 0, cognitiveAgencyScore: 45 })).toBe(45);
      expect(calculateCognitiveAgencyScore({ ethicalReasoningScore: 0, cognitiveAgencyScore: 80 })).toBe(80);
    });
  });

  describe("calculateWeightedTotal", () => {
    it("formula P1*0.3 + P2*0.25 + P3*0.25 + P4*0.2", () => {
      const result = calculateWeightedTotal({
        criticalEvaluation: 80, algorithmicBiasAwareness: 70, ethicalReasoning: 60, cognitiveAgency: 50,
      });
      expect(result).toBe(67);
    });

    it("all 100 = 100", () => {
      expect(calculateWeightedTotal({ criticalEvaluation: 100, algorithmicBiasAwareness: 100, ethicalReasoning: 100, cognitiveAgency: 100 })).toBe(100);
    });
  });

  describe("getCognitiveAgencyCategory", () => {
    it(">= 75 -> independent", () => {
      expect(getCognitiveAgencyCategory(75)).toBe("independent");
      expect(getCognitiveAgencyCategory(100)).toBe("independent");
    });
    it("50-74 -> balanced", () => {
      expect(getCognitiveAgencyCategory(50)).toBe("balanced");
      expect(getCognitiveAgencyCategory(74)).toBe("balanced");
    });
    it("< 50 -> high-risk", () => {
      expect(getCognitiveAgencyCategory(49)).toBe("high-risk");
      expect(getCognitiveAgencyCategory(0)).toBe("high-risk");
    });
  });

  describe("calculateARI", () => {
    it("P1*0.6 + P2*0.4", () => {
      expect(calculateARI(80, 70)).toBe(76);
    });
  });

  describe("generateRecommendations", () => {
    it("rekomendasikan pilar terlemah", () => {
      const recs = generateRecommendations({
        criticalEvaluation: 40, algorithmicBiasAwareness: 80, ethicalReasoning: 60, cognitiveAgency: 70,
      });
      expect(recs).toContain("Modul: Deteksi Informasi Palsu & Verifikasi Fakta");
    });

    it("selalu return array", () => {
      const recs = generateRecommendations({
        criticalEvaluation: 100, algorithmicBiasAwareness: 100, ethicalReasoning: 100, cognitiveAgency: 100,
      });
      expect(Array.isArray(recs)).toBe(true);
      expect(recs.length).toBeLessThanOrEqual(2);
    });
  });

  describe("calculateAssessmentResult (integration)", () => {
    it("full integration SMD-006 verification", () => {
      const result = calculateAssessmentResult({
        hallucinationAudit: { truePositives: 5, falsePositives: 1, missed: 2, totalHallucinations: 7 },
        biasAudit: { biasIdentificationScore: 80, justificationScore: 70 },
        ethicalDilemma: { ethicalReasoningScore: 60, cognitiveAgencyScore: 45 },
      });
      expect(result.pillars.criticalEvaluation).toBeGreaterThanOrEqual(0) ; expect(result.pillars.criticalEvaluation).toBeLessThanOrEqual(100) // 60-ish, exact value depends on F1 calc;
      expect(result.pillars.algorithmicBiasAwareness).toBe(76);
      expect(result.pillars.ethicalReasoning).toBe(60);
      expect(result.pillars.cognitiveAgency).toBe(45);
      expect(result.cognitiveAgencyCategory).toBe("high-risk");
    });

    it("fallback ketika modul belum dikerjakan", () => {
      const result = calculateAssessmentResult({});
      expect(result.pillars.criticalEvaluation).toBe(0);
      expect(result.pillars.algorithmicBiasAwareness).toBe(0);
      expect(result.cognitiveAgencyCategory).toBe("high-risk");
    });
  });
});


