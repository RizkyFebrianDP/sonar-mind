# [x] SMD-017: Key Strength & Growth Area Insight

**Parent:** EPIC-001  
**Priority:** 🟢 Medium  
**Label:** `ui`, `dashboard`, `component`  
**Estimate:** 1 jam  
**Blocked By:** SMD-014  

---

## Problem / Context

Di halaman Dashboard, tepat di bawah area Radar Chart, terdapat 2 kotak informasi (*insight*): **Key Strength** dan **Growth Area**. Kotak ini memberikan deskripsi naratif berdasarkan pilar kompetensi dengan skor tertinggi dan terendah dari hasil assessment.

## Requirements

### Must Have
- [x] Buat komponen UI `InsightCard` yang *reusable*
- [x] Varian desain: `Strength` (berwarna hijau/positif) dan `Growth` (berwarna merah/peringatan)
- [x] Menampilkan nama pilar kompetensi, skor numeriknya, dan satu kalimat rekomendasi singkat
- [x] Layout grid: posisinya diletakkan mengelilingi atau di bawah Radar Chart di halaman Dashboard

### Nice to Have
- [x] —

## Success Criteria
- [x] Kedua box berhasil dirender dengan kontras warna yang tepat (hijau dan merah transparan/teks warna solid)
- [x] Mampu merender data statis (mock) dengan benar sebelum dihubungkan ke backend

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- Pembuatan UI komponen statis
- Pengaturan warna dengan Tailwind CSS

### Out of Scope
- Logika penentuan otomatis pilar terkuat/terlemah (akan dikerjakan saat integrasi data dinamis)
