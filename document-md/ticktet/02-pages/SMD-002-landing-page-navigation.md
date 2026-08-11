# [x] SMD-002: Landing Page & Navigation

**Parent:** EPIC-001  
**Priority:** 🟠 High  
**Label:** `agent-ready`, `frontend`, `page`  
**Estimate:** 4 jam  
**Blocked By:** SMD-001  

---

## Problem / Context

Produk membutuhkan halaman utama (Landing Page) sebagai pintu masuk yang menjelaskan misi SONAR MIND Dashboard, menampilkan 3 kesenjangan kritis literasi AI, dan memberikan navigasi yang jelas ke modul Sandbox dan Dashboard.

## Requirements

### Must Have
- [ ] **Hero Section** — Judul "SONAR MIND Dashboard", sub-judul tagline, CTA button "Mulai Asesmen"
- [ ] **Problem Statement Section** — Visualisasi 3 kesenjangan kritis (Gap 1: Cognitive Agency Loss, Gap 2: Algorithmic Bias, Gap 3: Lack of Performance-Based Evaluation) dengan card atau icon
- [ ] **Feature Overview Section** — Preview 3 modul Sandbox + 4 fitur Dashboard dalam grid/carousel
- [ ] **UNESCO Alignment Section** — Badge/ikon keselarasan dengan UNESCO MIL, Human-Centred AI, SDG 4 & 16
- [ ] **Navigation Bar** — Fixed top nav dengan links: Home, Sandbox, Dashboard, About
- [ ] **Footer** — Credit, referensi UNESCO, tahun
- [ ] **Routing** — Setup route `/sandbox` dan `/dashboard` (placeholder pages)
- [ ] Responsif di semua breakpoint (mobile, tablet, desktop)

### Nice to Have
- [ ] Scroll-triggered animations (fade-in, slide-up)
- [ ] Parallax effect pada Hero Section
- [ ] Particle/wave animation background (tema "sonar")

## Success Criteria
- [ ] Landing page render lengkap tanpa error di browser
- [ ] Navigasi ke `/sandbox` dan `/dashboard` berfungsi (placeholder OK)
- [ ] Hero section menampilkan CTA yang clickable
- [ ] 3 gap cards tampil dengan deskripsi singkat
- [ ] Responsif: tampilan mobile (320px) tidak pecah
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npm run dev
# Manual: buka http://localhost:3000, klik semua nav links
```

## Boundaries

### In Scope
- Halaman `/` (Landing Page)
- Navigation bar global
- Route placeholder `/sandbox` dan `/dashboard`
- Konten statis (teks dari abstract)

### Out of Scope
- Konten interaktif Sandbox (SMD-003–005)
- Dashboard visualisasi (SMD-007–011)
- Scoring logic
