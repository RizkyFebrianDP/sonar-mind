# 🔍 Gap Analysis: UI Mockup vs Ticket Specifications

> **Tanggal Analisis:** 9 Agustus 2026  
> **Terakhir Divalidasi:** 11 Agustus 2026  
> **Sumber UI:** 4 screenshot mockup (Dashboard + Assessments page + Sandbox/Question page)  
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

> [!NOTE]
> **✅ RESOLUSI TERCAPAI:** Sesuai diskusi terbaru, desain telah disepakati:
> 1. Terdapat **4 Score Cards** di atas, di mana 1 card adalah nilai **Overall** (rata-rata dari 3 indikator penilaian), dan 3 card sisanya adalah masing-masing indikator.
> 2. **Radar Chart** akan memvisualisasikan ke-3 indikator tersebut beserta dengan penjabaran *strength* & *weakness*.

#### Gap B: Score Summary Cards — Tidak Ada Ticket Spesifik
UI menampilkan 4 card di atas (Sesuai resolusi baru):
- Overall Competency (Rata-rata 3 indikator)
- Indikator 1 (mis. Hallucination Audit)
- Indikator 2 (mis. Algorithmic Bias)
- Indikator 3 (mis. Ethical & Cognitive Agency)

Ini **bukan** bagian dari SMD-007 (Radar) maupun SMD-011 (Assembly). Perlu komponen terpisah, dan implementasi slicing akan langsung mengadopsi struktur 1 Overall + 3 Indikator ini.

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

> [!NOTE]
> **📌 KEPUTUSAN: Dipindahkan ke Phase 2.** SMD-008 tidak muncul di mockup MVP karena fungsinya sudah di-absorb oleh Score Card + Radar Chart. Widget gauge tetap akan dibangun di fase berikutnya ketika ada dedicated placement di UI. Untuk MVP, cukup score card.

#### Gap F: ARI / Algorithmic Resilience Index (SMD-009) — Tidak Terlihat di UI
Ticket SMD-009 mendefinisikan ARI circular progress ring. **Tidak terlihat sama sekali di UI mockup.**

> [!NOTE]
> **📌 KEPUTUSAN: Dipindahkan ke Phase 2.** ARI tidak muncul di mockup MVP kemungkinan karena belum ada placement UI yang confirmed atau fitur ini direncanakan untuk iterasi berikutnya. ARI tetap ada di roadmap, bukan di-drop — implementasi menunggu ada "rumahnya" di UI.

---

## 3. Assessments Page (Screenshot 3)

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

## 4. Sandbox / Question Page (Screenshot 4) ✅ Dikonfirmasi

Screenshot ke-4 menampilkan halaman soal interaktif yang sesuai dengan ticket SMD-003/004/005 (Sandbox Assessment).

**Elemen yang terlihat di UI:**
| Elemen | Detail |
|:-------|:-------|
| Progress bar soal | Nomor soal 1–20 di bagian atas, dengan status ✅ sudah dijawab |
| Timer | Countdown timer di kanan atas (contoh: 12:45 remaining) |
| Scenario text (kiri) | Narasi kasus nyata sebagai konteks soal |
| Pilihan ganda (kanan) | 4 opsi jawaban dengan radio button |
| Navigasi soal | Tombol "Previous Question" & "Next Question" di bawah |

> [!NOTE]
> **✅ KONFIRMASI:** Halaman Sandbox/Question sudah sesuai dengan scope ticket SMD-003/004/005. Tidak ada gap signifikan untuk halaman ini. Perlu dipastikan jumlah soal per modul (20 Qs untuk Algorithmic Bias, 15 Qs untuk Hallucination Detection, 10 Qs untuk Ethical Reasoning) konsisten dengan data di halaman Assessments.

---

## 5. User Profile & Auth

| Elemen UI | Status Ticket | Resolusi |
|:----------|:-------------|:---------|
| "Alex Student" + email + avatar | ❌ **Out of Scope** di Epic | ✅ **Supabase Auth** — menggunakan sistem login nyata |
| "Log Out" button | ❌ **Out of Scope** di Epic | ✅ **Supabase Auth** — fungsionalitas logout |
| Settings page (sidebar) | ❌ Tidak ada ticket | 📌 Placeholder sidebar saja untuk MVP |

> [!NOTE]
> **✅ RESOLUSI TERCAPAI:** Auth akan menggunakan **Supabase Auth**. Ini mengubah keputusan sebelumnya dari sekadar dummy user menjadi sistem autentikasi nyata yang terhubung ke backend.

---

## 6. Branding

| Aspek | Ticket (Lama) | UI Mockup | Resolusi MVP |
|:------|:-------------|:----------|:-------------|
| Nama Produk | "SONAR MIND Dashboard" | "MIL-AI Competency Framework" | ✅ **Pakai "MIL-AI"** untuk sekarang, fleksibel diganti |
| Nama Dashboard | "Sonar Pulse" | Tidak disebutkan | ✅ **Tidak dipakai di MVP**, nama bisa disesuaikan nanti |

> [!NOTE]
> **✅ RESOLUSI TERCAPAI:** Branding menggunakan **"MIL-AI Competency Framework"** sesuai mockup. Nama ini bersifat sementara dan dapat diganti sewaktu-waktu tanpa perubahan arsitektural — cukup ganti konstanta/variabel nama brand.

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
| SMD-007 | **✅ RESOLVED** — 3 sumbu radar sesuai UI mockup (Hallucination Audit, Algorithmic Bias, Ethical & Cognitive Agency) |
| SMD-008 | **📌 Phase 2** — Gauge dipindahkan ke fase berikutnya; MVP cukup score card |
| SMD-009 | **📌 Phase 2** — ARI dipindahkan ke fase berikutnya; belum ada placement di UI MVP |
| SMD-010 | **Upgrade visual** — UI menampilkan card dengan gambar modul, bukan hanya teks |
| SMD-011 | **Redesign layout** — Layout dashboard harus mengikuti UI (score cards → competency → history → recommendations) |
| EPIC-001 | **Perluas scope** — Assessment History, Sidebar nav, Assessments page, dan branding perlu masuk |

---

## Keputusan yang Dibutuhkan

| No | Keputusan | Status |
|:---|:----------|:-------|
| 1 | **Scope Auth:** Apakah user profile/login ditambahkan ke MVP? | ✅ **RESOLVED** — Menggunakan **Supabase Auth** |
| 2 | **3 vs 4 Pilar Radar:** Berapa sumbu radar? | ✅ **RESOLVED** — 3 sumbu sesuai UI |
| 3 | **ARI Widget (SMD-009):** Dipertahankan atau di-drop? | ✅ **RESOLVED** — Dipindahkan ke Phase 2 |
| 4 | **Cognitive Agency Gauge (SMD-008):** Widget terpisah atau score card? | ✅ **RESOLVED** — Score card untuk MVP, gauge di Phase 2 |
| 5 | **Branding:** "SONAR MIND" atau "MIL-AI"? | ✅ **RESOLVED** — Pakai "MIL-AI" sementara, fleksibel diganti |
| 6 | **Assessment History:** Apakah localStorage masuk scope MVP? | ✅ **RESOLVED** — Menggunakan **Supabase Database** |
| 7 | **Modul Tambahan:** "Data Privacy" & "Generative AI Basics" — konten nyata atau placeholder? | ✅ **RESOLVED** — Hanya placeholder UI |
