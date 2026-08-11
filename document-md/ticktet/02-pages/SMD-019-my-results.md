# [x] SMD-019: My Results Page

**Parent:** EPIC-001  
**Priority:** 🔵 Low  
**Label:** `ui`, `pages`  
**Estimate:** 30 menit  
**Blocked By:** SMD-014  

---

## Problem / Context

Menu "My Results" ada di Sidebar navigasi. Saat ini belum ada definisi fungsional yang rinci tentang halaman ini. Untuk MVP, kita hanya perlu men-setup *route* dasar agar navigasi dari Sidebar tidak memunculkan Error 404 (Page Not Found).

## Requirements

### Must Have
- [ ] Buat *route* halaman baru di `src/app/results/page.tsx`
- [ ] Render tampilan placeholder sederhana dengan pesan "My Results - Coming Soon"
- [ ] Pastikan Layout utama (Sidebar) tetap membungkus halaman ini

### Nice to Have
- [ ] Desain placeholder yang lebih menyatu dengan tema aplikasi (mis. menambahkan ilustrasi/ikon)

## Success Criteria
- [ ] Klik "My Results" di sidebar berhasil membuka halaman `/results` tanpa error

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- Setup *route* dasar Next.js
- UI Placeholder

### Out of Scope
- Logika pengambilan riwayat lengkap (di-handle di fase selanjutnya bila diminta)
