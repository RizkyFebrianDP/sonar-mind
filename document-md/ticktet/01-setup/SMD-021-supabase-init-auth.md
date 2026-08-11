# [y] SMD-021: Supabase Init & Auth Flow

**Parent:** EPIC-001  
**Priority:** 🔴 Urgent  
**Label:** `backend`, `auth`, `supabase`  
**Estimate:** 3 jam  
**Blocked By:** SMD-001  

---

## Problem / Context

Proyek ini membutuhkan penyimpanan permanen dan autentikasi nyata, bukan hanya *dummy user* atau *localStorage*. Supabase dipilih sebagai solusi Backend-as-a-Service (BaaS) agar kita dapat menggunakan SSR (Server-Side Rendering) untuk proteksi *route* di Next.js App Router.

## Requirements

### Must Have
- [ ] Install library `@supabase/supabase-js` dan `@supabase/ssr`
- [ ] Setup *environment variables* `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Inisialisasi client Supabase untuk *Browser*, *Server*, dan *Middleware*
- [ ] Buat file `middleware.ts` untuk memproteksi *route* dashboard agar redirect ke `/login` bila unauthenticated
- [ ] Buat UI halaman `/login` minimalis dengan form Email & Password
- [ ] Buat fungsi Logout yang di-trigger dari Sidebar

### Nice to Have
- [ ] Opsi "Login with Google" (OAuth) jika waktu memungkinkan

## Success Criteria
- [ ] Bisa mengakses halaman `/login`
- [ ] Redirect otomatis dari `/` ke `/login` jika tidak ada sesi aktif
- [ ] Berhasil *Sign In* dan memunculkan email pengguna di UI (App Shell)
- [ ] Berhasil *Sign Out* dan dikembalikan ke `/login`

## Verification
```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Boundaries

### In Scope
- Supabase SDK setup
- Middleware protection
- Login UI & Logout Function

### Out of Scope
- Registrasi/Sign Up (bisa pakai user *seeded* dari dashboard Supabase saja)
- Manajemen Profil (Upload Avatar)
