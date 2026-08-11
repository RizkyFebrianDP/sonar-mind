# [x] SMD-016: Score Summary Cards

**Parent:** EPIC-001  
**Priority:** 🟡 High  
**Label:** `ui`, `dashboard`, `component`  
**Estimate:** 2 jam  
**Blocked By:** SMD-014  

---

## Problem / Context

Bagian paling atas dari Dashboard menampilkan 4 *Score Summary Cards*: 1 *Overall Competency* dan 3 pilar utama (Hallucination Audit, Algorithmic Bias, Ethical & Cognitive Agency). Komponen ini butuh dibuat *reusable* agar nanti mudah di-inject data dinamis dari Supabase.

## Requirements

### Must Have
- [x] Komponen `SummaryCard` (*reusable*)
- [x] *Props* komponen: `title` (string), `score` (number), `maxScore` (number), `label` (string, misal "Advanced", "Needs Attention"), `trend` atau *description* teks kecil.
- [x] Ikon yang berbeda untuk setiap card (menggunakan `lucide-react`)
- [x] Pewarnaan *label* (dot indicator) yang dinamis berdasarkan nilai (Hijau = Bagus, Merah = Kurang)
- [x] Tata letak responsive: 4 kolom di layar besar, 2 kolom di tablet, 1 kolom di mobile

### Nice to Have
- [x] Animasi *count up* dari 0 ke angka skor saat pertama kali dimuat
- [x] *Skeleton loader* state sebelum data riwayat tiba dari backend

## Success Criteria
- [x] Ke-empat card dirender berjejer rapi di halaman Dashboard
- [x] Tampilan konsisten dengan proporsi di UI Mockup (ukuran font skor sangat besar)
- [x] Menangani prop *mock data* (statis) dengan baik untuk pengujian awal UI

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- Pembuatan UI Card statis
- Integrasi `lucide-react` icon
- Grid layout untuk ke-4 card

### Out of Scope
- Kalkulasi live rata-rata skor (tunggu integrasi backend)
