# [y] SMD-009: Algorithmic Resilience Index (ARI)

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `dashboard`, `fitur-6`  
**Estimate:** 2 jam  
**Blocked By:** SMD-006  

---

## Problem / Context

Fitur 6 dari Sonar Pulse Dashboard. Menampilkan **Algorithmic Resilience Index (ARI)** — skor kumulatif (0–100) yang menunjukkan seberapa kebal siswa terhadap manipulasi media sintetis, deepfake, dan *filter bubble*. ARI dihitung dari kombinasi Pilar 1 (Critical Evaluation) dan Pilar 2 (Bias Awareness).

## Requirements

### Must Have
- [ ] **Komponen `ResilienceIndex`** di `src/components/dashboard/ResilienceIndex.tsx`
- [ ] **Visualisasi Skor** — Tampilkan ARI dalam format yang impactful. Pilihan:
  - **Circular progress ring** (donut chart) dengan angka besar di tengah, ATAU
  - **Animated counter** dengan color-coded background
- [ ] **Color Coding berdasarkan skor:**
  - `≥ 80`: 🟢 Hijau — "Highly Resilient"
  - `60–79`: 🟡 Kuning — "Moderately Resilient"
  - `40–59`: 🟠 Oranye — "Developing Resilience"
  - `< 40`: 🔴 Merah — "Vulnerable to Manipulation"
- [ ] **Label Deskriptif** — Keterangan kontekstual sesuai level:
  - Highly Resilient: "Kamu memiliki ketahanan kuat terhadap manipulasi media sintetis dan deepfake"
  - Vulnerable: "Kamu perlu meningkatkan kemampuan mendeteksi konten palsu dan bias algoritma"
- [ ] **Formula Display** — Tampilkan breakdown: `ARI = (Critical Eval × 0.6) + (Bias Awareness × 0.4)` sebagai micro-detail
- [ ] **Data dari Scoring Engine** — Baca `AssessmentResult.algorithmicResilienceIndex`
- [ ] Responsif di mobile

### Nice to Have
- [ ] Animasi count-up dari 0 ke skor final
- [ ] Sparkline mini-chart (trend placeholder untuk iterasi masa depan)
- [ ] Comparison badge ("Top 20% siswa global" — dummy)

## Success Criteria
- [ ] ARI skor tampil akurat sesuai output scoring engine
- [ ] Color coding berubah sesuai range skor
- [ ] Label deskriptif relevan dengan skor
- [ ] Formula breakdown terlihat jelas
- [ ] Responsif di mobile
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: test dengan berbagai skor:
# P1=90, P2=80 → ARI=86 → hijau, "Highly Resilient"
# P1=50, P2=40 → ARI=46 → oranye, "Developing Resilience"
# P1=30, P2=20 → ARI=26 → merah, "Vulnerable"
```

## Boundaries

### In Scope
- ARI visualization component
- Color coding + label logic
- Data binding dari scoring engine

### Out of Scope
- ARI calculation logic (SMD-006)
- Dashboard assembly (SMD-011)
- Historical data / trends
