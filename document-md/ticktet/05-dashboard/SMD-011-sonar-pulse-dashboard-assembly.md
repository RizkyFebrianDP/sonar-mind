# SMD-011: Sonar Pulse Dashboard Assembly

**Parent:** EPIC-001  
**Priority:** 🔴 Urgent  
**Label:** `agent-ready`, `frontend`, `dashboard`, `assembly`  
**Estimate:** 3 jam  
**Blocked By:** SMD-007, SMD-008, SMD-009, SMD-010  

---

## Problem / Context

Semua widget dashboard individual (Radar Chart, Cognitive Agency Gauge, ARI, Rekomendasi) sudah dibangun. Sekarang perlu dirakit menjadi **satu halaman Dashboard kohesif** (`/dashboard`) yang menampilkan evaluasi personal siswa secara menyeluruh dengan layout yang premium dan informatif.

## Requirements

### Must Have
- [ ] **Halaman `/dashboard`** — `src/app/dashboard/page.tsx`
- [ ] **State Gate** — Jika siswa belum menyelesaikan semua 3 modul sandbox, tampilkan pesan:
  > "Selesaikan semua 3 modul asesmen terlebih dahulu untuk melihat hasil evaluasimu."
  > [Kembali ke Sandbox →]
- [ ] **Header Section** — Greeting personal + ringkasan:
  - "Hasil Evaluasi Literasi AI-mu"
  - Total weighted score besar (angka + deskripsi level)
  - Tanggal penyelesaian asesmen
- [ ] **Grid Layout** — Responsive grid yang menampung 4 widget:
  ```
  Desktop (≥1024px):
  ┌──────────────────┬──────────────────┐
  │   Radar Chart    │  Cognitive Agency│
  │   (4 Pilar)      │     Gauge        │
  ├──────────────────┼──────────────────┤
  │   ARI Score      │  Rekomendasi     │
  │   (Resilience)   │  Modul Belajar   │
  └──────────────────┴──────────────────┘

  Mobile (<768px):
  ┌──────────────────┐
  │   Radar Chart    │
  ├──────────────────┤
  │  Cognitive Agency│
  ├──────────────────┤
  │   ARI Score      │
  ├──────────────────┤
  │  Rekomendasi     │
  └──────────────────┘
  ```
- [ ] **Summary Card** — Card di atas grid berisi:
  - Weighted total score (angka besar, color-coded)
  - 4 mini-badges per pilar (nama pilar + skor singkat)
- [ ] **Action Bar** — Tombol di bawah dashboard:
  - "Ulangi Asesmen" → reset state, kembali ke sandbox
  - "Kembali ke Beranda" → navigasi ke `/`
- [ ] **Smooth Transitions** — Setiap section/card muncul dengan subtle fade-in
- [ ] Responsif & mobile-first

### Nice to Have
- [ ] Print / export PDF button
- [ ] Share link (generate URL dengan encoded result)
- [ ] Confetti animation jika skor total ≥ 80

## Success Criteria
- [ ] Dashboard menampilkan semua 4 widget dalam layout yang benar
- [ ] State gate berfungsi: tanpa data → pesan redirect
- [ ] Weighted total score akurat di summary card
- [ ] Layout responsif: desktop 2-column, mobile stacked
- [ ] "Ulangi Asesmen" button reset state dan redirect
- [ ] Transisi smooth (no layout shift)
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run lint
# Manual:
# 1. Buka /dashboard tanpa data → state gate muncul
# 2. Selesaikan 3 modul → buka /dashboard → semua widget tampil
# 3. Resize ke mobile → layout stacked
# 4. Klik "Ulangi Asesmen" → state reset, redirect ke /sandbox
```

## Boundaries

### In Scope
- Dashboard page assembly & layout
- State gate logic
- Summary card
- Action buttons
- Widget integration

### Out of Scope
- Widget internals (sudah di SMD-007 to SMD-010)
- Scoring logic (SMD-006)
- Persistent storage
