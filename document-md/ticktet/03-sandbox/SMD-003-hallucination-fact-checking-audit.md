# SMD-003: Hallucination & Fact-Checking Audit Module

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `sandbox`, `fitur-1`  
**Estimate:** 4 jam  
**Blocked By:** SMD-001  

---

## Problem / Context

Fitur 1 dari Sonar Mind Sandbox. Siswa diberikan teks (esai, artikel berita, atau ringkasan medis) yang dibuat oleh AI dan berisi halusinasi/data fiktif. Siswa harus menandai kalimat yang berisi halusinasi menggunakan *interactive highlighter*, lalu mencocokkan dengan sumber rujukan. Ini mengukur **Pilar 1: Critical Evaluation** (bobot 30%).

## Requirements

### Must Have
- [ ] **Halaman `/sandbox/hallucination-audit`** — Route khusus untuk modul ini
- [ ] **Teks Skenario** — Minimal 1 teks AI-generated (300–500 kata) yang mengandung 5–8 kalimat halusinasi tersembunyi. Data disimpan di `src/data/scenarios/hallucination.json`
- [ ] **Interactive Highlighter** — Siswa bisa klik/tap kalimat untuk menandainya sebagai "halusinasi". Kalimat yang dipilih berubah warna (highlight kuning/merah)
- [ ] **Sumber Rujukan Panel** — Panel samping/bawah berisi "bukti kebenaran" (fakta sebenarnya) untuk referensi siswa
- [ ] **Submit & Scoring** — Tombol submit yang menghitung:
  - *True Positive*: kalimat halusinasi yang benar ditandai
  - *False Positive*: kalimat benar yang salah ditandai
  - *Missed*: kalimat halusinasi yang tidak terdeteksi
- [ ] **Feedback Instan** — Setelah submit, tampilkan kalimat mana yang benar/salah dengan penjelasan singkat
- [ ] **Skor Output** — Kirim skor ke state management (Context/Zustand) untuk dipakai Dashboard
- [ ] Responsif di mobile (scroll-friendly, tidak perlu panel samping)

### Nice to Have
- [ ] Timer countdown (opsional, untuk simulasi tekanan waktu)
- [ ] Konfirmasi highlight (tooltip "Yakin ini halusinasi?")
- [ ] Animasi reveal saat feedback ditampilkan

## Success Criteria
- [ ] Siswa bisa highlight minimal 5 kalimat berbeda
- [ ] Scoring menghitung TP, FP, Missed dengan akurat
- [ ] Feedback menampilkan semua kalimat dengan status benar/salah
- [ ] Skor tersimpan di client-state dan bisa diakses dari halaman lain
- [ ] Tampilan responsif (mobile 320px OK)
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: buka /sandbox/hallucination-audit
# 1. Highlight 3 kalimat halusinasi yang benar → skor naik
# 2. Highlight 1 kalimat yang bukan halusinasi → FP terdeteksi
# 3. Submit → feedback tampil lengkap
```

## Boundaries

### In Scope
- UI interaktif highlighter
- 1 set data skenario halusinasi (hardcoded JSON)
- Client-side scoring untuk pilar Critical Evaluation
- State management integrasi

### Out of Scope
- AI-generated teks secara real-time (pakai data statis)
- Multiple skenario / level difficulty
- Backend storage
