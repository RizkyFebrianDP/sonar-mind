# SMD-001: Project Setup & Design System

**Parent:** EPIC-001  
**Priority:** 🔴 Urgent  
**Label:** `agent-ready`, `setup`, `foundation`  
**Estimate:** 3 jam  
**Blocked By:** —  

---

## Problem / Context

Proyek Next.js 16 sudah di-scaffold dengan Tailwind CSS 4, tetapi belum memiliki design system, komponen dasar, tipografi, color token, dan library chart. Semua ticket berikutnya bergantung pada fondasi ini.

## Requirements

### Must Have
- [ ] Konfigurasi Tailwind CSS 4 dengan custom color palette bertema "SONAR MIND" (deep navy, electric blue, accent teal, warm gold)
- [ ] Setup Google Fonts — **Inter** untuk body, **Outfit** untuk heading
- [ ] Global CSS reset & base styles (`globals.css`)
- [ ] Design token: spacing scale, border-radius, shadow system, transition defaults
- [ ] Install & konfigurasi library chart — **Recharts** (untuk Radar Chart, Bar Chart, Gauge)
- [ ] Layout component: `RootLayout` dengan sidebar/navigation shell
- [ ] Reusable UI primitives: `Button`, `Card`, `Badge`, `ProgressBar`
- [ ] Folder structure conventions:
  ```
  src/
  ├── app/              # Next.js App Router pages
  ├── components/
  │   ├── ui/           # Primitives (Button, Card, Badge, etc.)
  │   ├── sandbox/      # Sandbox module components
  │   └── dashboard/    # Dashboard visualization components
  ├── data/             # Static JSON scenario data
  ├── lib/              # Scoring engine & utility functions
  └── types/            # TypeScript type definitions
  ```

### Nice to Have
- [ ] Dark mode CSS variables siap pakai
- [ ] Storybook atau halaman `/dev` untuk preview komponen

## Success Criteria
- [ ] `npm run build` sukses tanpa error
- [ ] `npm run lint` tanpa warning
- [ ] Semua design token terdefinisi di `globals.css` atau Tailwind config
- [ ] Recharts ter-import dan render chart kosong tanpa error
- [ ] Folder structure sesuai konvensi di atas
- [ ] Font Inter & Outfit ter-load dari Google Fonts

## Verification
```bash
npm install recharts
npm run build
npm run lint
```

## Boundaries

### In Scope
- Tailwind config, color palette, typography
- Folder scaffolding
- Reusable UI primitives (unstyled logic + styled variants)
- Recharts installation

### Out of Scope
- Konten halaman (Landing, Sandbox, Dashboard)
- Scoring logic
- Data skenario
