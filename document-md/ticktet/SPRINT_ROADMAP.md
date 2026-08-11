# 📋 Rencana Eksekusi Ticket (MVP)

Berdasarkan hasil Gap Analysis dan konfirmasi desain UI, urutan pengerjaan ticket (sebelumnya di `INDEX.md`) perlu direstrukturisasi. Kita tidak lagi berfokus pada arsitektur abstrak yang lama, melainkan **fokus membangun apa yang ada di UI mockup**.

Berikut adalah usulan urutan eksekusi yang paling optimal agar hasil visual (slicing) cepat terlihat.

---

## Fase 1: Foundation & App Shell (Infrastruktur UI) ✅ **SELESAI**
Fase ini memastikan kerangka utama aplikasi sudah berdiri sebelum konten diisi.

1. **[x] SMD-001 [Setup]**: Project Setup & Install Dependencies (`lucide-react`, `recharts`).
2. **[x] SMD-014 [Baru]**: App Shell & Sidebar Navigation (Membangun layout dasar dengan sidebar kiri, dummy profile, dan routing dasar Next.js).

---

## Fase 2: Dashboard UI Assembly (Prioritas Utama) ✅ **SELESAI**
Karena halaman Dashboard adalah pusat dari mockup, kita kerjakan komponen-komponennya secara modular lalu digabungkan. Semua data di fase ini bisa di-*hardcode* sementara.

3. **[x] SMD-016 [Baru]**: Score Summary Cards (4 card skor di atas).
4. **[x] SMD-007 [Revisi]**: Radar Chart (Visualisasi 3 sumbu menggunakan `recharts`).
5. **[x] SMD-017 [Baru]**: Key Strength & Growth Area (Card teks insight di bawah chart).
6. **[x] SMD-010 [Revisi]**: Learning Recommendation Cards (Card rekomendasi modul visual).
7. **[x] SMD-018 [Baru]**: Assessment History Table (Tabel riwayat dengan integrasi statis sementara).
8. **[x] SMD-011 [Revisi]**: Dashboard Assembly (Menggabungkan semua komponen di atas ke halaman `/`).

---

## Fase 3: Halaman Pendukung (Placeholder) ✅ **SELESAI**
Membuat halaman statis untuk navigasi sidebar agar app tidak terasa kosong.

9. **[x] SMD-015 [Baru]**: Assessments Catalog Page (Halaman `/assessments` berisi daftar modul statis yang di-redesign).
10. **[x] SMD-019 [Baru]**: My Results Page (`/results` - Placeholder statis).
11. **[x] SMD-020 [Baru]**: Learning Page (`/learning` - Placeholder statis).

---

## Fase 4: Database, Core Engine & Sandbox (Fungsionalitas) ⏳ **TO DO**
Setelah UI 100% jadi, kita menghidupkan fiturnya dan menghubungkan dengan Supabase.

12. **[y] SMD-021 [Baru]**: Supabase Init & Auth Flow (Setup Supabase SSR & Login).
13. **[y] SMD-003, 004, 005**: Sandbox Assessment Pages (Halaman soal interaktif, timer, opsi pilihan ganda).
14. **[y] SMD-006**: Scoring Engine (Logika penghitungan skor akhir setelah user submit soal).
15. **[y] SMD-022 [Baru]**: Supabase Database Integration (Push skor ke tabel `assessment_history`).

---

## Kesimpulan Progress

> [!NOTE]
> **Status Eksekusi Saat Ini**
> Fase 1, 2, dan 3 telah sukses diselesaikan dengan sempurna! UI aplikasi sudah solid dan navigasi sudah berfungsi semua. Fokus selanjutnya adalah **Fase 4**, dimulai dengan instalasi Supabase atau membangun UI Sandbox evaluasi.
