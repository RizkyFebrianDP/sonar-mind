# [y] SMD-022: Supabase Database Integration (History)

**Parent:** EPIC-001  
**Priority:** 🔴 Urgent  
**Label:** `backend`, `database`, `supabase`  
**Estimate:** 3 jam  
**Blocked By:** SMD-006, SMD-021  

---

## Problem / Context

Riwayat skor (Assessment History) yang ada di Dashboard perlu diambil dari database yang sesungguhnya. Tiket ini mengatur sisi *Backend* integrasi, di mana aplikasi menyimpan hasil setelah *Scoring Engine* beroperasi, ke tabel Supabase.

## Requirements

### Must Have
- [ ] Pembuatan Tabel `assessment_history` di database Supabase melalui Editor/SQL (Kolom: `id`, `user_id`, `created_at`, `overall_score`, `hallucination_score`, `bias_score`, `ethical_score`)
- [ ] Implementasi aturan RLS (Row Level Security) agar insert dan select *secure*
- [ ] Edit fungsi Scoring Engine (SMD-006) agar mengeksekusi operasi `supabase.from('assessment_history').insert({...})` setelah kalkulasi selesai

### Nice to Have
- [ ] Error handling saat gagal menyimpan data ke Supabase (tampilkan *toast notification* ke user)

## Success Criteria
- [ ] Skenario simulasi assessment berhasil
- [ ] Skor akhir muncul di *Dashboard Supabase* (Tabel `assessment_history`)
- [ ] Halaman Dashboard UI (SMD-018) dapat mengambil (*fetch*) data ini

## Verification
```bash
# Tidak ada perintah khusus
```

## Boundaries

### In Scope
- Skema database di Supabase
- Operasi Insert (Write) dari aplikasi ke database
- Integrasi ke Scoring Engine

### Out of Scope
- Pembuatan tabel manajemen user yang kompleks
