# [y] SMD-008: Cognitive Agency Ratio Indicator

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `dashboard`, `fitur-5`  
**Estimate:** 2 jam  
**Blocked By:** SMD-006  

---

## Problem / Context

Fitur 5 dari Sonar Pulse Dashboard. Menampilkan di mana posisi siswa pada spektrum kemandirian kognitif — apakah mereka *Independent Critical Thinker*, *Balanced AI Collaborator*, atau *High-Risk AI Dependent*. Ini adalah indikator unik yang tidak ada di instrumen asesmen manapun saat ini.

## Requirements

### Must Have
- [ ] **Komponen `CognitiveAgencyGauge`** di `src/components/dashboard/CognitiveAgencyGauge.tsx`
- [ ] **Visualisasi Gauge / Meter** — Bisa berupa:
  - Semi-circular gauge (speedometer-style) dengan 3 zona warna, ATAU
  - Horizontal segmented bar dengan pointer
- [ ] **3 Zona Kategori:**
  - 🟢 **Independent Critical Thinker** (skor ≥ 75) — zona hijau
  - 🟡 **Balanced AI Collaborator** (skor 50–74) — zona kuning
  - 🔴 **High-Risk AI Dependent** (skor < 50) — zona merah
- [ ] **Pointer/Needle** — Menunjuk posisi skor siswa yang tepat pada gauge
- [ ] **Label Kategori Aktif** — Nama kategori siswa ditampilkan besar + deskripsi singkat:
  - Independent: "Kamu mampu berpikir mandiri & kritis tanpa bergantung pada AI"
  - Balanced: "Kamu menggunakan AI sebagai mitra etis dalam belajar"
  - High-Risk: "Perhatian! Kamu menunjukkan tanda ketergantungan berlebih pada AI"
- [ ] **Skor Numerik** — Tampilkan angka skor (0–100) di dalam/dekat gauge
- [ ] **Data dari Scoring Engine** — Baca `AssessmentResult.cognitiveAgencyCategory` dan `pillars.cognitiveAgency`
- [ ] Responsif di mobile

### Nice to Have
- [ ] Animasi needle sweep saat pertama muncul
- [ ] Pulse animation pada zona aktif
- [ ] Perbandingan dengan rata-rata populasi (dummy data)

## Success Criteria
- [ ] Gauge render dengan 3 zona warna yang jelas
- [ ] Pointer menunjuk posisi yang akurat sesuai skor
- [ ] Label kategori berubah sesuai zona
- [ ] Deskripsi kontekstual tampil di bawah gauge
- [ ] Responsif di mobile tanpa distorsi
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: test dengan 3 skor berbeda:
# skor=85 → zona hijau, label "Independent Critical Thinker"
# skor=60 → zona kuning, label "Balanced AI Collaborator"
# skor=30 → zona merah, label "High-Risk AI Dependent"
```

## Boundaries

### In Scope
- Gauge/meter visualization component
- 3-zone color coding
- Label & description logic
- Data binding dari scoring engine

### Out of Scope
- Scoring calculation (SMD-006)
- Dashboard assembly (SMD-011)
- Historical trend tracking
