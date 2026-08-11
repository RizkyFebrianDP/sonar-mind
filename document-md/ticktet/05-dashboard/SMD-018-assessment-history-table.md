# [x] SMD-018: Assessment History Table

**Parent:** EPIC-001  
**Priority:** 🟡 High  
**Label:** `ui`, `dashboard`, `database`  
**Estimate:** 3 jam  
**Blocked By:** SMD-014, SMD-021  

---

## Problem / Context

Dashboard membutuhkan fitur untuk melacak riwayat nilai user secara persisten. Sebelumnya direncanakan menggunakan `localStorage`, namun kini di-upgrade menggunakan Supabase. Tabel history ini butuh UI yang bagus dan fitur pengambilan data dari backend.

## Requirements

### Must Have
- [x] Buat struktur tabel HTML/Tailwind sesuai desain (Kolom: `DATE TEST`, `SCORE`, `STATUS`)
- [x] Desain badge/status dengan warna (mis. background hijau muda dengan teks "COMPLETED" hijau tua)
- [x] State `Loading` berupa *skeleton loader* saat fetch data dari Supabase
- [x] State `Empty` yang menampilkan pesan bila tabel kosong (belum ada history)
- [x] Batasi history yang ditampilkan di Dashboard maksimal 5 entri terakhir (diurutkan berdasarkan tanggal terbaru)

### Nice to Have
- [x] Link "View All" yang mengarahkan ke halaman `/results`

## Success Criteria
- [x] Tabel ter-render responsif (bisa di-*scroll* secara horizontal bila layar terlalu kecil)
- [x] Status badge terlihat seperti mockup
- [x] Berhasil membaca mock data array

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- Desain UI Tabel History
- State manajemen dasar (Loading, Empty, Data)

### Out of Scope
- Pagination (halaman ini hanya menampilkan 5 entri terbaru)
- Implementasi query fetch real (bila belum siap)
