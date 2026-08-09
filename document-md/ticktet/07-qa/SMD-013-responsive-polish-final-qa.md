# SMD-013: Responsive Polish & Final QA

**Parent:** EPIC-001  
**Priority:** 🟡 Medium  
**Label:** `agent-ready`, `qa`, `polish`, `final`  
**Estimate:** 3 jam  
**Blocked By:** SMD-012  

---

## Problem / Context

Ticket terakhir sebelum presentasi Hackathon. Seluruh aplikasi sudah dibangun — perlu dilakukan *final polish* untuk memastikan kualitas responsif, aksesibilitas, performa, dan pengalaman pengguna yang premium di semua device. Ini termasuk bug fixing, micro-interaction polish, dan validasi end-to-end.

## Requirements

### Must Have
- [ ] **Responsive Audit** — Test di 5 breakpoint kritis:
  - 320px (iPhone SE / small mobile)
  - 375px (iPhone standard)
  - 768px (iPad / tablet)
  - 1024px (small laptop)
  - 1440px (desktop)
- [ ] **Cross-Browser Check** — Pastikan render konsisten di:
  - Chrome (latest)
  - Firefox (latest)
  - Safari (latest, jika memungkinkan)
- [ ] **Accessibility Audit:**
  - Semua interactive elements memiliki `aria-label` atau teks yang accessible
  - Contrast ratio ≥ 4.5:1 untuk teks normal
  - Keyboard navigation berfungsi (Tab, Enter, Escape)
  - Focus indicators visible
- [ ] **Performance Optimization:**
  - Lazy load komponen chart (dynamic import)
  - Image optimization (Next.js `<Image />`)
  - Bundle size check — tidak ada unused imports
  - Font subsetting / display swap
- [ ] **End-to-End Flow Test** — Jalankan seluruh alur:
  1. Landing Page → klik "Mulai Asesmen"
  2. Sandbox Modul 1 (Hallucination) → selesaikan → skor tersimpan
  3. Sandbox Modul 2 (Bias Audit) → selesaikan → skor tersimpan
  4. Sandbox Modul 3 (Ethical Dilemma) → selesaikan → skor tersimpan
  5. Dashboard → semua widget tampil dengan data benar
  6. "Ulangi Asesmen" → state reset → mulai dari awal
- [ ] **Bug Fix Pass** — Fix semua bug yang ditemukan selama audit
- [ ] **Loading States** — Pastikan semua halaman memiliki loading state / skeleton
- [ ] **Error States** — Pastikan error boundaries terpasang

### Nice to Have
- [ ] Micro-animations polish (hover effects, transitions)
- [ ] 404 page custom
- [ ] SEO meta tags lengkap per halaman
- [ ] OG Image untuk social sharing

## Success Criteria
- [ ] Tidak ada layout break di semua 5 breakpoint
- [ ] Lighthouse scores: Performance ≥ 80, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 80
- [ ] End-to-end flow berjalan tanpa error dari landing → sandbox (3 modul) → dashboard → reset
- [ ] `npm run build` sukses tanpa warning
- [ ] `npm run lint` bersih
- [ ] Tidak ada console error di browser DevTools
- [ ] Keyboard-only navigation bisa menyelesaikan seluruh flow

## Verification
```bash
npm run build
npm run lint
npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html
# Manual E2E test: ikuti alur 6 langkah di atas
# Responsive test: Chrome DevTools → Device Toolbar → 5 breakpoints
# Accessibility: Chrome DevTools → Lighthouse → Accessibility audit
```

## Boundaries

### In Scope
- Responsive fixes
- Accessibility improvements
- Performance optimization
- E2E flow validation
- Bug fixes
- Loading & error states

### Out of Scope
- New features
- Content changes
- Backend/API work
- Deployment to production
