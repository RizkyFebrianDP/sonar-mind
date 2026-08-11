# [y] SMD-012: PWA & Offline-Ready Architecture

**Parent:** EPIC-001  
**Priority:** 🟡 Medium  
**Label:** `agent-ready`, `infrastructure`, `pwa`, `fitur-8`  
**Estimate:** 3 jam  
**Blocked By:** SMD-011  

---

## Problem / Context

Fitur 8 dari spesifikasi produk. Untuk mengatasi kesenjangan digital (*digital divide*), seluruh paket skenario asesmen dan dasbor hasil harus bisa diunduh dan dijalankan secara lokal tanpa koneksi internet aktif (Offline-First Architecture / PWA). Ini krusial untuk penggunaan di sekolah dengan infrastruktur terbatas.

## Requirements

### Must Have
- [ ] **PWA Manifest** — `public/manifest.json` dengan:
  - App name: "SONAR MIND Dashboard"
  - Short name: "SONAR MIND"
  - Theme color sesuai design system
  - Icons (192x192, 512x512)
  - Display: "standalone"
  - Start URL: "/"
- [ ] **Service Worker** — Menggunakan Next.js PWA plugin atau `next-pwa`:
  - Cache strategi: **Cache First** untuk asset statis (CSS, JS, fonts, images)
  - Cache strategi: **Network First** untuk halaman HTML
  - Pre-cache semua data skenario JSON
- [ ] **Offline Fallback** — Jika offline dan halaman belum di-cache, tampilkan halaman fallback yang informatif
- [ ] **Meta Tags** — Di `layout.tsx`:
  ```html
  <meta name="theme-color" content="#0A1628" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  ```
- [ ] **Install Prompt** — Banner/button "Pasang Aplikasi" untuk Add to Home Screen
- [ ] **Offline Indicator** — Badge/banner kecil yang tampil saat pengguna offline: "📡 Mode Luring Aktif"
- [ ] Data skenario JSON ter-bundle dalam build (bukan fetch dari API)

### Nice to Have
- [ ] Background sync ketika online kembali
- [ ] Cache size management / cleanup
- [ ] Splash screen custom saat launch dari homescreen

## Success Criteria
- [ ] Lighthouse PWA score ≥ 90
- [ ] Manifest terdeteksi oleh browser (Chrome DevTools → Application → Manifest)
- [ ] Service Worker terdaftar dan aktif
- [ ] App bisa di-install via "Add to Home Screen"
- [ ] Setelah kunjungan pertama, app bisa dibuka offline (semua modul sandbox + dashboard)
- [ ] Offline indicator tampil saat tidak ada koneksi
- [ ] `npm run build` sukses

## Verification
```bash
npm run build
npx lighthouse http://localhost:3000 --output=json --only-categories=pwa
# Manual:
# 1. Buka app → matikan network (DevTools → Offline) → app tetap berfungsi
# 2. Check Application tab → Manifest valid, SW active
# 3. Klik "Install" → app terpasang di homescreen
```

## Boundaries

### In Scope
- PWA manifest & meta tags
- Service worker setup & caching
- Offline fallback page
- Install prompt
- Offline indicator UI

### Out of Scope
- Push notifications
- Server-side data sync
- Complex offline data mutation
