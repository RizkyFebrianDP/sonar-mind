# [x] SMD-020: Learning Page

**Parent:** EPIC-001  
**Priority:** 🔵 Low  
**Label:** `ui`, `pages`  
**Estimate:** 30 menit  
**Blocked By:** SMD-014  

---

## Problem / Context

Sama seperti halaman My Results, halaman "Learning" juga ada di navigasi Sidebar dan juga akan menjadi tujuan dari tombol-tombol "Start Learning" di Dashboard. Untuk menghindari Error 404, kita butuh placeholder.

## Requirements

### Must Have
- [ ] Buat *route* halaman baru di `src/app/learning/page.tsx`
- [ ] Render tampilan statis dengan pesan "Learning Modules - Coming Soon"
- [ ] Pastikan halaman ini tetap berada di dalam Layout Sidebar

### Nice to Have
- [ ] Tambahkan tombol "Back to Dashboard" di placeholder

## Success Criteria
- [ ] Halaman `/learning` bisa diakses dari sidebar dan tidak me-lempar *error*

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- Route initialization
- Teks statis

### Out of Scope
- Interaksi katalog LMS (Learning Management System)
