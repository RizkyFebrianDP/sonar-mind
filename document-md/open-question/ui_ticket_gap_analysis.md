# 🔍 Gap Analysis: UI Mockup vs Ticket Specifications

> **Tanggal Analisis:** 9 Agustus 2026  
> **Sumber UI:** 4 screenshot mockup (Dashboard + Assessments page)  
> **Sumber Ticket:** 13 sub-issues + 1 epic di folder `ticktet/`

---

## Verdict: ⚠️ Ada Ketidakselarasan Signifikan

UI mockup menunjukkan **arsitektur yang lebih kompleks** dari yang didefinisikan di ticket. Ada fitur-fitur di UI yang **belum ada ticket-nya**, dan beberapa spesifikasi ticket **tidak cocok** dengan desain UI.

---

## 1. Navigasi & Halaman

### UI Menunjukkan 5 Halaman (Sidebar)
| Halaman di UI | Ada Ticket? | Status |
|:-------------|:------------|:-------|
| Dashboard | ✅ SMD-011 | Perlu disesuaikan |
| Assessments | ❌ | **BELUM ADA TICKET** |
| My Results | ❌ | **BELUM ADA TICKET** |
| Learning | ❌ | **BELUM ADA TICKET** |
| Settings | ❌ | **BELUM ADA TICKET** |

### Ticket yang Tidak Cocok dengan UI
| Ticket | Deskripsi | Masalah |
|:-------|:----------|:--------|
| SMD-002 | Landing Page & Navigation | UI **tidak menunjukkan Landing Page publik**. UI langsung masuk ke Dashboard dengan sidebar app. Navigasi di ticket (Home, Sandbox, Dashboard) tidak sesuai dengan sidebar UI (Dashboard, Assessments, My Results, Learning, Settings). |

> [!CAUTION]
> **SMD-002 perlu di-rewrite total.** Navigasi di UI adalah **sidebar app** bukan **top-nav website**. Struktur routing harus berubah dari landing-page-centric ke app-shell-centric.

---

## 2. Dashboard (Screenshot 1)

### ✅ Yang Sudah Sejalan

| Elemen UI | Ticket | Catatan |
|:----------|:-------|:--------|
| Radar Chart (AI Competency) | SMD-007 | ⚠️ Tapi jumlah sumbu berbeda (lihat gap) |
| Learning Recommendation cards | SMD-010 | ⚠️ UI lebih visual (ada gambar modul) vs ticket (teks saja) |

### ❌ Gap Kritis

#### Gap A: Pilar 4 → 3 (Radar Chart)
- **Ticket SMD-007** mendefinisikan **4 sumbu** radar: Critical Evaluation, Bias Awareness, Ethical Reasoning, Cognitive Agency
- **UI** hanya punya **3 sumbu** radar: Hallucination Audit, Algorithmic Bias, Ethical & Cognitive Agency (P3+P4 digabung)
- **Score cards** di atas menunjukkan 4 kotak, tapi radar hanya 3

> [!WARNING]
> Ini konflik arsitektural. Apakah 4 pilar tetap dipakai tapi P3+P4 digabung di radar? Atau rubrik berubah jadi 3 pilar?

#### Gap B: Score Summary Cards — Tidak Ada Ticket Spesifik
UI menampilkan 4 card di atas:
- Overall Competency (82/100, "Advanced")
- Hallucination Audit (86/100, "Proficient")
- Algorithmic Bias (72/100, "Needs Attention")
- Ethical & Cognitive Agency (78/100, "Balanced")

Ini **bukan** bagian dari SMD-007 (Radar) maupun SMD-011 (Assembly). Perlu komponen terpisah.

#### Gap C: Key Strength & Growth Area Cards — Tidak Ada Ticket
UI menampilkan 2 insight card:
- 🟢 **Key Strength:** Critical Evaluation (88) + deskripsi
- 🔴 **Growth Area:** Algorithmic Bias Awareness (72) + deskripsi

Fitur ini tidak tercakup di ticket manapun.

#### Gap D: Assessment History — Tidak Ada Ticket
UI menampilkan tabel riwayat:
| DATE TEST | SCORE | STATUS |
|:----------|:------|:-------|
| Oct 12, 2026 | 82/100 | COMPLETED |
| Oct 05, 2026 | 72/100 | COMPLETED |
| ... | ... | ... |

Ini **mengimplikasikan persistent storage** (minimal localStorage) dan multiple session tracking. Ticket saat ini mendefinisikan **single-session** tanpa history.

#### Gap E: Cognitive Agency Gauge (SMD-008) — Tidak Terlihat di UI
Ticket SMD-008 mendefinisikan gauge/speedometer terpisah. Di UI, Cognitive Agency hanya muncul sebagai:
- 1 score card (78/100, "Balanced")
- Bagian dari label radar ("Ethical & Cognitive Agency")
- **Tidak ada gauge/meter dedicated**

#### Gap F: ARI / Algorithmic Resilience Index (SMD-009) — Tidak Terlihat di UI
Ticket SMD-009 mendefinisikan ARI circular progress ring. **Tidak terlihat sama sekali di UI mockup.**

---

## 3. Assessments Page (Screenshot 2–4)

### ❌ Tidak Ada Ticket untuk Halaman Ini

UI menampilkan halaman "Assessments" dengan:

**Available Modules:**
| Modul | Level | Durasi | Pertanyaan |
|:------|:------|:-------|:-----------|
| Algorithmic Bias Audit | Intermediate | 15 min | 20 Qs |
| Hallucination Detection | Advanced | 25 min | 15 Qs |
| Ethical Reasoning | Beginner | 10 min | 10 Qs |

**Completed Modules:**
- Data Privacy Fundamentals (92%)
- Generative AI Basics (88%)

> [!IMPORTANT]
> Ini halaman katalog modul yang **tidak ada ticket-nya**. Ticket SMD-003/004/005 langsung masuk ke masing-masing sandbox, tapi tidak ada ticket untuk halaman **daftar modul** dengan filter difficulty, durasi, dan progress tracking.

### Modul Tambahan yang Tidak Ada Ticket
- "Data Privacy Fundamentals" — tidak ada di abstract maupun ticket
- "Generative AI Basics" — tidak ada di abstract maupun ticket

---

## 4. User Profile & Auth

| Elemen UI | Status Ticket |
|:----------|:-------------|
| "Alex Student" + email + avatar | ❌ **Out of Scope** di Epic |
| "Log Out" button | ❌ **Out of Scope** di Epic |
| Settings page (sidebar) | ❌ Tidak ada ticket |

> [!WARNING]
> UI menampilkan fitur autentikasi (user profile, logout) yang **secara eksplisit di-exclude** dari scope Epic. Ini harus diputuskan: scope diperluas atau UI disederhanakan?

---

## 5. Branding

| Aspek | Ticket | UI | Match? |
|:------|:-------|:---|:-------|
| Nama Produk | "SONAR MIND Dashboard" | "MIL-AI Competency Framework" | ❌ |
| Nama Dashboard | "Sonar Pulse" | Tidak disebutkan | ❌ |

---

## Ringkasan: Ticket yang Perlu Ditambah / Diubah

### 🆕 Ticket Baru yang Dibutuhkan

| ID (Usulan) | Deskripsi | Alasan |
|:------------|:----------|:-------|
| SMD-014 | **App Shell & Sidebar Navigation** | UI menggunakan layout sidebar app, bukan landing page + top nav |
| SMD-015 | **Assessments Catalog Page** (`/assessments`) | Halaman daftar modul dengan filter difficulty, durasi, progress |
| SMD-016 | **Score Summary Cards** | 4 card di atas dashboard (Overall, Hallucination, Bias, Ethics) |
| SMD-017 | **Key Strength & Growth Area Insight** | 2 insight card yang menganalisis pilar terkuat & terlemah |
| SMD-018 | **Assessment History Table** | Riwayat tes + persistent storage (localStorage) |
| SMD-019 | **My Results Page** (`/results`) | Halaman dedicated untuk history & detail per sesi |
| SMD-020 | **Learning Page** (`/learning`) | Halaman katalog materi belajar |

### ✏️ Ticket yang Perlu Direvisi

| ID | Revisi |
|:---|:-------|
| SMD-002 | **Rewrite total** — ubah dari Landing Page ke App Shell + Sidebar Navigation, atau split jadi 2 (Landing tetap + SMD-014 baru) |
| SMD-007 | **Sesuaikan sumbu radar** — 3 sumbu (sesuai UI) atau 4 sumbu (sesuai abstract)? |
| SMD-008 | **Evaluasi ulang** — UI tidak menunjukkan gauge terpisah. Mungkin merge ke SMD-016 (score cards) |
| SMD-009 | **Evaluasi ulang** — ARI tidak muncul di UI. Tetap dibangun atau di-drop? |
| SMD-010 | **Upgrade visual** — UI menampilkan card dengan gambar modul, bukan hanya teks |
| SMD-011 | **Redesign layout** — Layout dashboard harus mengikuti UI (score cards → competency → history → recommendations) |
| EPIC-001 | **Perluas scope** — Assessment History, Sidebar nav, Assessments page, dan branding perlu masuk |

---

## Keputusan yang Dibutuhkan

1. **Scope Auth:** Apakah user profile/login ditambahkan ke MVP, atau UI disederhanakan (hilangkan user info)?
2. **3 vs 4 Pilar Radar:** Apakah Ethical Reasoning & Cognitive Agency digabung jadi 1 sumbu (sesuai UI) atau tetap 4 (sesuai abstract)?
3. **ARI Widget:** Dipertahankan (tidak ada di UI tapi ada di abstract) atau di-drop dari MVP?
4. **Cognitive Agency Gauge:** Dipertahankan sebagai widget terpisah atau cukup label di score card?
5. **Branding:** Pakai "SONAR MIND Dashboard" atau "MIL-AI Competency Framework"?
6. **Assessment History:** Apakah persistent storage (localStorage) masuk scope MVP?
7. **Modul Tambahan:** "Data Privacy Fundamentals" dan "Generative AI Basics" — ini konten nyata atau placeholder UI?
