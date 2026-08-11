# [x] SMD-010: Rekomendasi Modul Belajar Otomatis

**Parent:** EPIC-001  
**Priority:** 🟡 Medium  
**Label:** `agent-ready`, `frontend`, `dashboard`, `fitur-7`  
**Estimate:** 2 jam  
**Blocked By:** SMD-006  

---

## Problem / Context

Fitur 7 dari Sonar Pulse Dashboard. Berdasarkan pilar yang lemah, sistem merekomendasikan materi bacaan atau modul belajar yang relevan kepada siswa. Contoh: *"Skor Evaluasi Halusinasi-mu masih rendah. Kami merekomendasikan membaca: UNESCO MIL Chapter 4 – Verifikasi Konten Sintetis."*

## Requirements

### Must Have
- [x] **Komponen `LearningRecommendations`** di `src/components/dashboard/LearningRecommendations.tsx`
- [x] **Data Rekomendasi** — Mapping statis di `src/data/recommendations.json`:
  ```json
  {
    "criticalEvaluation": [
      {
        "title": "UNESCO MIL Chapter 4 – Verifikasi Konten Sintetis",
        "description": "Panduan langkah demi langkah untuk memverifikasi kebenaran informasi dari AI",
        "type": "reading",
        "difficulty": "beginner",
        "estimatedTime": "15 menit"
      }
    ],
    "algorithmicBiasAwareness": [...],
    "ethicalReasoning": [...],
    "cognitiveAgency": [...]
  }
  ```
- [x] **Logika Rekomendasi:**
  - Identifikasi pilar dengan skor terendah
  - Tampilkan 2–3 rekomendasi dari pilar terlemah
  - Jika semua pilar ≥ 75, tampilkan pesan "Excellent! Kamu menunjukkan literasi AI yang komprehensif" + advanced resources
- [x] **UI Card List** — Setiap rekomendasi ditampilkan sebagai card berisi:
  - Ikon tipe (📖 Reading, 🎥 Video, 🧩 Exercise)
  - Judul rekomendasi
  - Deskripsi singkat
  - Estimasi waktu
  - Badge difficulty (Beginner/Intermediate/Advanced)
- [x] **Highlight Pilar Lemah** — Tampilkan nama pilar yang perlu ditingkatkan + skor saat ini
- [x] Responsif di mobile (card stack vertikal)

### Nice to Have
- [x] Link ke sumber UNESCO asli (jika tersedia)
- [x] Bookmark/save rekomendasi
- [x] Progress tracking (checkbox "Sudah dibaca")

## Success Criteria
- [x] Rekomendasi tampil berdasarkan pilar terlemah
- [x] Minimal 2 rekomendasi ditampilkan per pilar lemah
- [x] Jika semua pilar tinggi, tampilkan pesan congratulatory
- [x] Card UI informatif dan tidak cluttered
- [x] Responsif di mobile
- [x] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: 
# 1. Set pilar 1 (Critical Eval) = 30 (terendah) → rekomendasi untuk Critical Eval muncul
# 2. Set semua pilar ≥ 75 → pesan "Excellent" muncul
# 3. Tampilan mobile OK
```

## Boundaries

### In Scope
- Recommendation display component
- Static mapping data (JSON)
- Pilar-terlemah detection logic
- Card UI

### Out of Scope
- Dynamic recommendation engine (ML/AI)
- Actual learning content / embedded videos
- User progress tracking
