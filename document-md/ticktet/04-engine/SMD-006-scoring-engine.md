# SMD-006: Scoring Engine (4 Pilar Rubrik)

**Parent:** EPIC-001  
**Priority:** 🔴 Urgent  
**Label:** `agent-ready`, `logic`, `engine`  
**Estimate:** 3 jam  
**Blocked By:** SMD-003, SMD-004, SMD-005  

---

## Problem / Context

Setiap modul Sandbox menghasilkan raw score masing-masing. Dibutuhkan **Scoring Engine terpusat** yang mengonsolidasi seluruh skor ke dalam kerangka 4 Pilar Rubrik SONAR MIND sesuai bobot UNESCO MIL-AI, serta menghitung metrik turunan (Cognitive Agency Ratio & Algorithmic Resilience Index).

## Requirements

### Must Have
- [ ] **File `src/lib/scoring-engine.ts`** — Pure function module (no side effects)
- [ ] **Input Contract** — Menerima raw scores dari 3 modul:
  ```typescript
  interface RawScores {
    hallucinationAudit: {
      truePositives: number;
      falsePositives: number;
      missed: number;
      totalHallucinations: number;
    };
    biasAudit: {
      biasIdentificationScore: number;  // 0–100
      justificationScore: number;        // 0–100
    };
    ethicalDilemma: {
      ethicalReasoningScore: number;     // 0–100
      cognitiveAgencyScore: number;      // 0–100
    };
  }
  ```
- [ ] **4 Pilar Score Calculation** — Output skor per pilar (0–100):
  - **Pilar 1: Critical Evaluation (30%)** ← dari `hallucinationAudit` (precision, recall, F1-like)
  - **Pilar 2: Algorithmic Bias Awareness (25%)** ← dari `biasAudit` (identification + justification)
  - **Pilar 3: Ethical Reasoning & Academic Integrity (25%)** ← dari `ethicalDilemma.ethicalReasoningScore`
  - **Pilar 4: Cognitive Agency & Autonomy (20%)** ← dari `ethicalDilemma.cognitiveAgencyScore`
- [ ] **Weighted Total Score** — Skor gabungan berbobot: `(P1×0.30) + (P2×0.25) + (P3×0.25) + (P4×0.20)`
- [ ] **Cognitive Agency Ratio** — Kategorisasi berdasarkan Pilar 4 score:
  - `≥ 75`: 🟢 **Independent Critical Thinker**
  - `50–74`: 🟡 **Balanced AI Collaborator**
  - `< 50`: 🔴 **High-Risk AI Dependent**
- [ ] **Algorithmic Resilience Index (ARI)** — Skor kumulatif (0–100) gabungan Pilar 1 + Pilar 2 dengan formula: `ARI = (P1 × 0.6) + (P2 × 0.4)`
- [ ] **Output Contract:**
  ```typescript
  interface AssessmentResult {
    pillars: {
      criticalEvaluation: number;
      algorithmicBiasAwareness: number;
      ethicalReasoning: number;
      cognitiveAgency: number;
    };
    weightedTotal: number;
    cognitiveAgencyCategory: 'independent' | 'balanced' | 'high-risk';
    algorithmicResilienceIndex: number;
    recommendations: string[];
  }
  ```
- [ ] **Recommendation Generator** — Berdasarkan pilar terendah, generate 1–2 rekomendasi modul belajar (mapping statis)
- [ ] **Type Definitions** — Semua tipe di `src/types/assessment.ts`
- [ ] **Unit-testable** — Pure functions, no external dependencies

### Nice to Have
- [ ] Normalisasi skor dengan curve (bell curve adjustment)
- [ ] Breakdown skor per sub-indikator

## Success Criteria
- [ ] Semua fungsi scoring menghasilkan output yang konsisten untuk input yang sama (deterministic)
- [ ] Weighted total selalu dalam range 0–100
- [ ] Cognitive Agency Ratio mengategorikan dengan benar sesuai threshold
- [ ] ARI dihitung sesuai formula
- [ ] Rekomendasi berubah sesuai pilar terlemah
- [ ] TypeScript compile tanpa error
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Unit test (manual / scripted):
# Input: TP=5, FP=1, Missed=2, biasScore=80, justScore=70, ethScore=60, cogScore=45
# Expected: P1~71, P2=75, P3=60, P4=45, Category=high-risk
```

## Boundaries

### In Scope
- Pure scoring functions
- Type definitions
- Recommendation mapping
- Cognitive Agency Ratio + ARI calculation

### Out of Scope
- UI rendering (handled by SMD-007 to SMD-010)
- Persistent storage
- Complex NLP analysis
