# [x] SMD-015: Assessments Catalog Page

**Parent:** EPIC-001  
**Priority:** 🔵 Low  
**Label:** `ui`, `pages`  
**Estimate:** 2 jam  
**Blocked By:** SMD-014  

---

## Problem / Context

Mockup UI menampilkan halaman `/assessments` yang berisi katalog modul assessment (Available Modules & Completed Modules). Halaman ini awalnya tidak ada di *spec* awal. Ini perlu dibangun sebagai placeholder statis agar navigasi berfungsi.

## Requirements

### Must Have
- [ ] Buat *route* halaman baru di `src/app/assessments/page.tsx`
- [ ] Buat komponen daftar modul (*list item*)
- [ ] Implementasi UI *tabs* atau filter *pill* (All, Beginner, Intermediate) secara statis
- [ ] Tampilkan 3 modul di bagian "Available Modules": Algorithmic Bias Audit, Hallucination Detection, Ethical Reasoning
- [ ] Tampilkan 2 modul statis di bagian "Completed Modules"
- [ ] Berikan tombol "Start" yang mengarahkan ke rute masing-masing Sandbox (`/sandbox/hallucination`, dll)

### Nice to Have
- [ ] Filter tab berfungsi memilah array statis

## Success Criteria
- [ ] Halaman `/assessments` bisa diakses dari sidebar
- [ ] Tampilan list mengikuti gaya UI mockup (ada icon, deskripsi, estimasi waktu, jumlah soal)

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- UI halaman Assessment Catalog statis
- Routing ke halaman sandbox

### Out of Scope
- Sistem progress tracker dinamis untuk "Completed Modules" (cukup hardcode)
