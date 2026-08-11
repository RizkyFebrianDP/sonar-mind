# 📋 MIL-AI Dashboard — Ticket Index (Updated MVP)

> **Project:** MIL-AI Competency Framework Dashboard  
> **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase  
> **Sprint:** MVP 14 Hari  
> **Tanggal Update:** 11 Agustus 2026 (Refleksi Supabase & Slicing UI)

---

## Daftar Ticket Terbaru

### 📁 `00-epic/` — Epic
| ID | Ticket | Status |
|:---|:-------|:-------|
| EPIC-001 | MIL-AI Dashboard — MVP Build | 🔄 **Updated** |

---

### 📁 `01-setup/` — Foundation & App Shell
| ID | Ticket | Keterangan |
|:---|:-------|:-----------|
| SMD-001 | **[x] Project Setup & Design System** | Install `lucide-react`, `recharts`, dll. |
| **SMD-021** | [y] Supabase Init & Auth Flow | 🆕 **BARU:** Setup Supabase SSR & Login |
| **SMD-014** | **[x] App Shell & Sidebar Navigation** | 🆕 **BARU:** Menggantikan SMD-002 (Landing Page) |
| ~~SMD-002~~| ~~[x] Landing Page & Navigation~~ | ❌ **Replaced** oleh SMD-014 |

---

### 📁 `05-dashboard/` — Visualisasi Dashboard
*Dikerjakan lebih awal untuk prioritas slicing UI.*
| ID | Ticket | Keterangan |
|:---|:-------|:-----------|
| **SMD-016** | **[x] Score Summary Cards** | 🆕 **BARU:** 4 Card (1 Overall + 3 Pilar) |
| SMD-007 | **[x] Radar Chart 3 Pilar Kompetensi** | 🔄 **Revisi:** Menjadi 3 Sumbu |
| **SMD-017** | **[x] Key Strength & Growth Area Insight** | 🆕 **BARU:** Insight card di bawah radar |
| SMD-010 | **[x] Rekomendasi Modul Belajar** | 🔄 **Revisi:** Upgrade UI sesuai mockup |
| **SMD-018** | **[x] Assessment History Table** | 🆕 **BARU:** Menampilkan history dari Supabase |
| SMD-011 | **[x] Dashboard Assembly** | 🔄 **Revisi:** Merakit komponen baru |
| ~~SMD-008~~| ~~[y] Cognitive Agency Ratio Indicator~~ | 📌 **Phase 2:** Di-absorb score card |
| ~~SMD-009~~| ~~[y] Algorithmic Resilience Index (ARI)~~ | 📌 **Phase 2:** Belum ada di UI MVP |

---

### 📁 `02-pages/` — Halaman Pendukung (Placeholder)
| ID | Ticket | Keterangan |
|:---|:-------|:-----------|
| **SMD-015** | **[x] Assessments Catalog Page** | 🆕 **BARU:** Daftar modul statis |
| **SMD-019** | **[x] My Results Page** | 🆕 **BARU:** Placeholder `/results` |
| **SMD-020** | **[x] Learning Page** | 🆕 **BARU:** Placeholder `/learning` |

---

### 📁 `03-sandbox/` — Modul Simulasi Interaktif
| ID | Ticket | Pilar |
|:---|:-------|:------|
| SMD-003 | [y] Hallucination Detection | P1 |
| SMD-004 | [y] Algorithmic Bias Audit | P2 |
| SMD-005 | [y] Ethical Reasoning | P3 |

---

### 📁 `04-engine/` — Scoring & Backend Integration
| ID | Ticket | Keterangan |
|:---|:-------|:-----------|
| SMD-006 | [y] Scoring Engine | 🔄 **Revisi:** Kalkulasi skor untuk 3 pilar |
| **SMD-022** | [y] Supabase Database Integration | 🆕 **BARU:** Push skor ke tabel `assessment_history` |

---

### 📁 `06-infrastructure/` & `07-qa/`
| ID | Ticket | Keterangan |
|:---|:-------|:-----------|
| SMD-012 | [y] PWA & Offline-Ready Architecture | — |
| SMD-013 | [y] Responsive Polish & Final QA | — |
