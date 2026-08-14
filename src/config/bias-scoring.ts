/**
 * SONAR MIND - Bias Audit Scoring Configuration (SMD-004)
 */

export const KEYWORD_WEIGHTS: Record<string, number> = {
  "bias gender": 20,
  "gender bias": 20,
  diskriminasi: 15,
  perempuan: 10,
  ketidakadilan: 10,
  "bias rekrutmen": 15,
  stereotype: 10,
  kualifikasi: 10,
  ipk: 8,
  pengalaman: 8,
};

export const DEFAULT_KEYWORD_WEIGHT = 8;
export const JUSTIFICATION_MIN_LENGTH = 50;
export const JUSTIFICATION_MAX_LENGTH_BASIS = 200;
export const JUSTIFICATION_LENGTH_MAX_SCORE = 40;
export const IDENTIFICATION_BASE_MAX = 70;
export const WRONG_SELECTION_PENALTY = 15;
export const CORRECT_SELECTION_BONUS = 30;

export function calculateJustificationScore(text: string, keywords: string[]): number {
  if (text.length < JUSTIFICATION_MIN_LENGTH) return 0;
  const lowerText = text.toLowerCase();
  let keywordScore = 0;
  for (const kw of keywords) {
    if (lowerText.includes(kw.toLowerCase())) {
      keywordScore += KEYWORD_WEIGHTS[kw] ?? DEFAULT_KEYWORD_WEIGHT;
    }
  }
  const lengthScore = Math.min(
    (text.length / JUSTIFICATION_MAX_LENGTH_BASIS) * JUSTIFICATION_LENGTH_MAX_SCORE,
    JUSTIFICATION_LENGTH_MAX_SCORE
  );
  return Math.min(100, Math.round(lengthScore + keywordScore));
}