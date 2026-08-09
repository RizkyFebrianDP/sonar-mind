# SMD-007: Radar Chart — 4 Pilar Kompetensi MIL-AI

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `dashboard`, `fitur-4`  
**Estimate:** 3 jam  
**Blocked By:** SMD-006  

---

## Problem / Context

Fitur 4 dari Sonar Pulse Dashboard. Menampilkan skor personal siswa pada 4 pilar kompetensi MIL-AI dalam bentuk **Radar Chart** (spider chart) yang intuitif. Siswa langsung melihat kekuatan dan kelemahan mereka secara visual.

## Requirements

### Must Have
- [ ] **Komponen `RadarChartPillar`** di `src/components/dashboard/RadarChartPillar.tsx`
- [ ] **Recharts RadarChart** — Menggunakan library Recharts yang sudah di-install (SMD-001)
- [ ] **4 Sumbu Radar:**
  1. Critical Evaluation (0–100)
  2. Algorithmic Bias Awareness (0–100)
  3. Ethical Reasoning (0–100)
  4. Cognitive Agency (0–100)
- [ ] **Data dari Scoring Engine** — Baca `AssessmentResult.pillars` dari state management
- [ ] **Styling Premium:**
  - Warna fill gradient (semi-transparan) sesuai tema SONAR MIND
  - Grid lines dengan opacity rendah
  - Label pilar dengan font Outfit
  - Skor numerik di setiap titik vertex
- [ ] **Tooltip interaktif** — Hover pada sumbu menampilkan skor + deskripsi singkat pilar
- [ ] **Weighted Total Score** — Tampilkan di tengah/bawah chart sebagai angka besar
- [ ] **Legend** — Keterangan warna dan bobot setiap pilar
- [ ] Responsif: chart resize sesuai container

### Nice to Have
- [ ] Animasi draw-in saat chart pertama kali muncul
- [ ] Comparison overlay (skor saat ini vs skor rata-rata/benchmark)
- [ ] Download chart sebagai gambar

## Success Criteria
- [ ] Radar chart render 4 sumbu dengan data dari scoring engine
- [ ] Skor numerik tampil di setiap vertex
- [ ] Tooltip berfungsi saat hover
- [ ] Weighted total tampil akurat
- [ ] Chart responsif tanpa distorsi di mobile
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: buka /dashboard, pastikan radar chart tampil
# Ubah skor di state → chart update sesuai
```

## Boundaries

### In Scope
- Recharts RadarChart component
- Styling & tooltip
- Data binding dari scoring engine output

### Out of Scope
- Scoring logic (SMD-006)
- Dashboard page assembly (SMD-011)
- Other dashboard widgets
