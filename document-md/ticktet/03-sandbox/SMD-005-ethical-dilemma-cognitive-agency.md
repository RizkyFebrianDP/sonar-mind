# SMD-005: Ethical Dilemma & Cognitive Agency Boundary Module

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `sandbox`, `fitur-3`  
**Estimate:** 4 jam  
**Blocked By:** SMD-001  

---

## Problem / Context

Fitur 3 dari Sonar Mind Sandbox. Siswa dihadapkan pada studi kasus penugasan sekolah berjenjang dan harus menentukan batas mana yang termasuk pemanfaatan AI yang etis (*ethical co-pilot*) dan mana yang merupakan plagiarisme/degradasi kemandirian berpikir (*cognitive offloading*). Ini mengukur **Pilar 3: Ethical Reasoning & Academic Integrity** (bobot 25%) dan **Pilar 4: Cognitive Agency & Autonomy** (bobot 20%).

## Requirements

### Must Have
- [ ] **Halaman `/sandbox/ethical-dilemma`** — Route khusus untuk modul ini
- [ ] **Skenario Berjenjang** — Minimal 5–7 situasi (studi kasus) yang ditampilkan secara berurutan. Contoh situasi:
  1. "Menggunakan AI untuk brainstorming ide esai" → Ethical Co-pilot ✅
  2. "Copy-paste seluruh output AI sebagai tugas akhir tanpa editing" → Cognitive Offloading ❌
  3. "Menggunakan AI untuk memeriksa tata bahasa tulisan sendiri" → Ethical Co-pilot ✅
  4. "Meminta AI menulis kode lengkap tanpa memahami logikanya" → Cognitive Offloading ❌
  5. "Menggunakan AI sebagai tutor untuk memahami konsep yang sulit" → Grey Area ⚠️
  - Disimpan di `src/data/scenarios/ethical-dilemma.json`
- [ ] **Drag & Drop / Swipe Classification UI** — Siswa mengklasifikasikan setiap situasi ke salah satu kategori:
  - 🟢 **Ethical Co-pilot** (penggunaan AI yang etis & mandiri)
  - 🔴 **Cognitive Offloading** (ketergantungan/plagiarisme)
  - 🟡 **Grey Area** (ambigu, perlu pertimbangan konteks)
- [ ] **Progressive Reveal** — Situasi muncul satu per satu (card-by-card) agar siswa fokus
- [ ] **Scoring Logic** — Penilaian berdasarkan:
  - Kesesuaian jawaban dengan answer key
  - Kemampuan mengidentifikasi grey area (bonus jika reasoning tepat)
  - Menghasilkan 2 sub-skor: Ethical Reasoning score + Cognitive Agency score
- [ ] **Feedback per Situasi** — Setelah semua selesai, tampilkan review per situasi dengan penjelasan mengapa itu ethical/offloading/grey
- [ ] **Skor Output** — Kirim 2 sub-skor ke state management untuk Dashboard

### Nice to Have
- [ ] Animasi swipe kiri/kanan (Tinder-style classification)
- [ ] Confidence slider per jawaban ("Seberapa yakin kamu?")
- [ ] Branching scenario (jawaban mempengaruhi situasi berikutnya)

## Success Criteria
- [ ] Semua 5–7 situasi tampil secara sequential
- [ ] Siswa bisa mengklasifikasikan setiap situasi ke 3 kategori
- [ ] Scoring menghasilkan 2 sub-skor terpisah (Ethical + Cognitive Agency)
- [ ] Feedback per situasi tampil dengan penjelasan
- [ ] Skor tersimpan di client-state
- [ ] Responsif di mobile (card-based UI, touch-friendly)
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: buka /sandbox/ethical-dilemma
# 1. Klasifikasi situasi 1 ke "Ethical Co-pilot" → benar
# 2. Klasifikasi situasi 2 ke "Cognitive Offloading" → benar
# 3. Intentionally salah pada 1 situasi → skor turun
# 4. Submit semua → review feedback tampil lengkap
```

## Boundaries

### In Scope
- UI classification (drag-drop / button-select)
- 5–7 situasi studi kasus (hardcoded JSON)
- Client-side scoring untuk pilar Ethical Reasoning + Cognitive Agency
- Feedback edukatif per situasi

### Out of Scope
- Dynamic scenario generation
- Branching narrative
- Teacher/admin scenario editor
