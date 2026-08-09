# EPIC-001: SONAR MIND Dashboard — MVP Build

**Priority:** 🔴 Urgent  
**Label:** `epic`, `agent-ready`, `hackathon-unesco-2026`  
**Sprint:** MVP 14 Hari  
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4  

---

## Problem / Context

Sistem asesmen literasi AI saat ini gagal mengukur kemampuan kritis, etis, dan kemandirian kognitif siswa. 81% instrumen hanya berbasis self-report, dan **tidak ada** instrumen tervalidasi untuk mengukur *Cognitive Agency Loss*. SONAR MIND Dashboard dibangun untuk menutup 3 kesenjangan kritis ini selaras dengan kerangka UNESCO MIL.

## Requirements

### Must Have
- [ ] **Landing Page** — Hero section, penjelasan produk, navigasi ke Sandbox & Dashboard
- [ ] **Sonar Mind Sandbox** — 3 modul simulasi interaktif (Hallucination Audit, Bias Audit, Ethical Dilemma)
- [ ] **Sonar Pulse Dashboard** — Dasbor evaluasi personal siswa (Radar Chart, Cognitive Agency Ratio, ARI, Rekomendasi)
- [ ] **Scoring Engine** — Logika penilaian 4 Pilar Rubrik (Critical Evaluation 30%, Bias Awareness 25%, Ethical Reasoning 25%, Cognitive Agency 20%)
- [ ] **Responsive & Mobile-First** — Berjalan optimal di semua ukuran layar
- [ ] **PWA / Offline-Ready Architecture** — Dapat digunakan tanpa koneksi internet aktif

### Nice to Have
- [ ] Animasi transisi antar modul (Framer Motion)
- [ ] Dark mode toggle
- [ ] Export hasil evaluasi ke PDF
- [ ] Multi-bahasa (ID/EN)

## Success Criteria
- [ ] Semua 3 skenario simulasi berjalan end-to-end tanpa error
- [ ] Dasbor menampilkan skor 4 pilar secara akurat berdasarkan jawaban siswa
- [ ] Cognitive Agency Ratio mengategorikan siswa ke 3 level dengan benar
- [ ] Lighthouse Performance Score ≥ 80, Accessibility ≥ 90
- [ ] Build production (`next build`) sukses tanpa error
- [ ] Responsif di viewport 320px – 1920px

## Verification
```bash
npm run build
npm run lint
npx lighthouse http://localhost:3000 --output=json
```

## Boundaries

### In Scope
- Frontend web MVP (Next.js App Router)
- Client-side scoring logic (tanpa backend/API)
- Data skenario statis (hardcoded JSON)
- Visualisasi chart (Recharts / Chart.js)

### Out of Scope
- Backend API / database
- Autentikasi pengguna
- Admin panel untuk guru/pendidik
- Integrasi LLM/AI real-time
- Deployment ke production server

---

## Sub-Issues Breakdown

| ID | Ticket | Dependency | Est. |
|:---|:-------|:-----------|:-----|
| SMD-001 | Project Setup & Design System | — | 3h |
| SMD-002 | Landing Page & Navigation | SMD-001 | 4h |
| SMD-003 | Hallucination & Fact-Checking Audit Module | SMD-001 | 4h |
| SMD-004 | Algorithmic Bias & Cultural Audit Module | SMD-001 | 4h |
| SMD-005 | Ethical Dilemma & Cognitive Agency Module | SMD-001 | 4h |
| SMD-006 | Scoring Engine (4 Pilar Rubrik) | SMD-003, SMD-004, SMD-005 | 3h |
| SMD-007 | Radar Chart — 4 Pilar Kompetensi MIL-AI | SMD-006 | 3h |
| SMD-008 | Cognitive Agency Ratio Indicator | SMD-006 | 2h |
| SMD-009 | Algorithmic Resilience Index (ARI) | SMD-006 | 2h |
| SMD-010 | Rekomendasi Modul Belajar Otomatis | SMD-006 | 2h |
| SMD-011 | Sonar Pulse Dashboard Assembly | SMD-007, SMD-008, SMD-009, SMD-010 | 3h |
| SMD-012 | PWA & Offline-Ready Architecture | SMD-011 | 3h |
| SMD-013 | Responsive Polish & Final QA | SMD-012 | 3h |
