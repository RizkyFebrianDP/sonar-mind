# [x] SMD-014: App Shell & Sidebar Navigation

**Parent:** EPIC-001  
**Priority:** 🔴 Urgent  
**Label:** `ui`, `layout`, `navigation`  
**Estimate:** 3 jam  
**Blocked By:** SMD-001, SMD-021  

---

## Problem / Context

Desain UI berpusat pada sebuah *Sidebar* navigasi (App Shell) di sisi kiri. Kita tidak lagi menggunakan arsitektur *Landing Page* publik, melainkan langsung masuk ke aplikasi. Struktur `layout.tsx` di Next.js perlu dirombak untuk mendukung sidebar dan main content area ini.

## Requirements

### Must Have
- [ ] Buat komponen `Sidebar` yang memuat logo "MIL-AI Competency Framework"
- [ ] Tampilkan menu navigasi utama: Dashboard (`/`), Assessments (`/assessments`), My Results (`/results`), Learning (`/learning`), Settings (`/settings`)
- [ ] *Active state styling* untuk link yang saat ini sedang dibuka
- [ ] Area profil user di sudut bawah sidebar (menampilkan email dari Supabase Session)
- [ ] Tombol Log Out yang terhubung dengan Supabase sign-out
- [ ] Gunakan CSS Grid/Flex di `layout.tsx` (mis. sidebar fixed width 250px, sisa area untuk main content)

### Nice to Have
- [ ] Mobile responsive: Sidebar berubah menjadi *hamburger menu* atau *bottom navigation* di layar kecil

## Success Criteria
- [ ] Sidebar selalu muncul di semua rute di dalam area aplikasi (seperti `/`, `/assessments`, dll)
- [ ] Layout tidak pecah saat isi *main content* sangat panjang (mendukung scroll independen)
- [ ] Tombol menu mengarahkan ke rute yang benar
- [ ] Nama/Email user tampil dengan benar setelah login

## Verification
```bash
npm run build
```

## Boundaries

### In Scope
- Layout global (Sidebar + Main Area)
- Navigasi link dasar
- UI Profil user & Logout

### Out of Scope
- Konten spesifik masing-masing halaman dashboard
- Fungsionalitas Settings (ganti password, dll)
