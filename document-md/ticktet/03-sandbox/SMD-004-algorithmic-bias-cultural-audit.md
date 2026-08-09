# SMD-004: Algorithmic Bias & Cultural Nuance Audit Module

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `sandbox`, `fitur-2`  
**Estimate:** 4 jam  
**Blocked By:** SMD-001  

---

## Problem / Context

Fitur 2 dari Sonar Mind Sandbox. Siswa menganalisis output rekomendasi AI (contoh: hasil penyaringan rekrutmen atau rekomendasi berita) dan bertindak sebagai "auditor etika" yang harus menemukan kecacatan bias gender, stereotip budaya, atau keberpihakan politik. Ini mengukur **Pilar 2: Algorithmic Bias Awareness** (bobot 25%).

## Requirements

### Must Have
- [ ] **Halaman `/sandbox/bias-audit`** — Route khusus untuk modul ini
- [ ] **Skenario Data** — Minimal 1 skenario berisi output AI yang mengandung bias tersembunyi. Contoh skenario:
  - *Skenario A:* Daftar kandidat hasil screening AI untuk posisi engineer — mengandung bias gender (nama perempuan diranking lebih rendah meski kualifikasi sama)
  - Disimpan di `src/data/scenarios/bias-audit.json`
- [ ] **Audit Checklist Interface** — UI berbentuk checklist/card selection di mana siswa memilih jenis bias yang terdeteksi:
  - [ ] Bias Gender
  - [ ] Stereotip Budaya/Etnis
  - [ ] Keberpihakan Politik
  - [ ] Bias Usia
  - [ ] Bias Sosio-ekonomi
  - [ ] Tidak ada bias (opsi netral)
- [ ] **Justifikasi Teks** — Textarea untuk siswa menuliskan alasan mengapa mereka mengidentifikasi bias tertentu (min 50 karakter)
- [ ] **Scoring Logic** — Penilaian berdasarkan:
  - Ketepatan identifikasi jenis bias (match dengan answer key)
  - Kualitas justifikasi (panjang & kata kunci relevan)
- [ ] **Feedback Instan** — Reveal bias sebenarnya dengan penjelasan edukatif
- [ ] **Skor Output** — Kirim skor ke state management untuk Dashboard

### Nice to Have
- [ ] Skenario kedua: rekomendasi berita politik dengan filter bubble bias
- [ ] Visual comparison (before/after debiasing)
- [ ] Tooltip edukatif saat hover pada setiap opsi bias

## Success Criteria
- [ ] Siswa bisa memilih ≥1 jenis bias dan menulis justifikasi
- [ ] Scoring akurat: jenis bias yang benar = skor tinggi, salah = penalti proporsional
- [ ] Justifikasi dinilai berdasarkan panjang minimum + keyword matching
- [ ] Feedback menampilkan bias sebenarnya + penjelasan
- [ ] Skor tersimpan di client-state
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual: buka /sandbox/bias-audit
# 1. Pilih "Bias Gender" → match answer key → skor naik
# 2. Tulis justifikasi > 50 karakter dengan keyword relevan → skor bonus
# 3. Submit → feedback reveal bias sebenarnya
```

## Boundaries

### In Scope
- UI audit checklist + justifikasi
- 1 set data skenario bias (hardcoded JSON)
- Client-side scoring untuk pilar Bias Awareness
- Keyword matching sederhana untuk justifikasi

### Out of Scope
- NLP/AI analysis pada justifikasi siswa
- Multiple skenario dinamis
- Real AI recruitment/recommendation system
