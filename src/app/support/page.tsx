"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { useToast } from "@/context/ToastContext";

// --- FAQ DATA ---
interface FAQItem {
  id: string;
  category: "integritas" | "unesco" | "halusinasi" | "retake" | "umum";
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

const FAQ_LIST: FAQItem[] = [
  {
    id: "faq-integritas-1",
    category: "integritas",
    categoryLabel: "Integritas AI",
    question: "Bagaimana standar Integritas AI diterapkan dalam penilaian SONAR MIND?",
    answer:
      "Integritas AI di SONAR MIND mengacu pada standar etika, objektivitas, dan transparansi ketika manusia berinteraksi dengan sistem Artificial Intelligence. Penilaian kami menguji kemampuan Anda untuk tidak sekadar menerima luaran (output) AI secara mentah, melainkan memverifikasi kebenaran faktual, memahami batasan model, serta menjaga akuntabilitas dalam penggunaan alat generatif.",
    highlights: [
      "Verifikasi independen terhadap fakta dan rujukan data.",
      "Penilaian independensi kognitif (menghindari over-reliance).",
      "Transparansi dan tanggung jawab etis penggunaan AI.",
    ],
  },
  {
    id: "faq-unesco-1",
    category: "unesco",
    categoryLabel: "MIL-AI UNESCO",
    question: "Apa itu Kerangka Kerja MIL-AI UNESCO dan apa saja 5 Pilar utamanya?",
    answer:
      "Kerangka kerja MIL-AI (Media and Information Literacy in Artificial Intelligence) UNESCO dirancang untuk membekali individu dengan literasi kritis dalam era kecerdasan buatan. SONAR MIND mengadopsi 5 pilar utama:\n1. Critical Evaluation (Audit Halusinasi & Verifikasi Informasi)\n2. Algorithmic Bias Awareness (Deteksi Stereotip & Bias Skenario)\n3. Ethical Reasoning (Penalaran Dilema Moral & Etika AI)\n4. Cognitive Agency (Kemandirian Kognitif & Pengambilan Keputusan)\n5. Algorithmic Resilience Index (Ketahanan Adaptif Manusia dalam Ekosistem AI)",
    highlights: [
      "Mengukur keterampilan abad ke-21 dalam berinteraksi dengan AI.",
      "Standar evaluasi internasional yang terstruktur dan terukur.",
    ],
  },
  {
    id: "faq-halusinasi-1",
    category: "halusinasi",
    categoryLabel: "Deteksi Halusinasi",
    question: "Bagaimana sistem menguji dan mengukur kemampuan Deteksi Halusinasi AI?",
    answer:
      "Modul Hallucination Audit menyajikan teks skenario hasil generasi AI yang berisi klaim faktual, kutipan studi, dan data statistik. Beberapa di antaranya mengandung 'halusinasi' (informasi palsu yang dibuat seolah-olah nyata oleh LLM).\n\nSistem mengukur:\n• True Positives: Kalimat halusinasi yang berhasil Anda identifikasi secara tepat.\n• False Positives: Kalimat sahih yang salah Anda tandai.\n• Missed Hallucinations: Halusinasi yang lolos dari pengamatan Anda.\n\nSkor akhir mencerminkan ketelitian evaluasi kritis Anda terhadap rujukan asli.",
    highlights: [
      "Simulasi real-time perbandingan teks AI vs dokumen referensi.",
      "Penilaian akurasi berbasis konsistensi data faktual.",
    ],
  },
  {
    id: "faq-retake-1",
    category: "retake",
    categoryLabel: "Cara Mengulang Assessment",
    question: "Bagaimana cara melakukan Retake (Mengulang) Assessment untuk memperbaiki skor?",
    answer:
      "Anda dapat mengulang asesmen kapan saja tanpa batasan jumlah percobaan. Langkah-langkahnya:\n1. Buka menu 'Assessments' di sidebar navigasi atau klik tombol 'Retake Assessment' di Dashboard utama.\n2. Pilih modul yang ingin Anda ulang (Hallucination Audit, Algorithmic Bias Audit, atau Ethical Dilemma Sandbox).\n3. Selesaikan simulasi interaktif hingga selesai.\n4. Skor terbaru Anda akan secara otomatis dikalkulasi oleh Scoring Engine dan dicatat di Riwayat Hasil ('My Results').",
    highlights: [
      "Riwayat asesmen sebelumnya tetap tersimpan rapi.",
      "Skor terbaru akan langsung memperbarui Radar Chart kompetensi Anda.",
    ],
  },
  {
    id: "faq-bias-1",
    category: "integritas",
    categoryLabel: "Integritas AI",
    question: "Bagaimana cara mengidentifikasi Bias Algoritma dalam evaluasi skenario?",
    answer:
      "Dalam modul Algorithmic Bias Audit, Anda akan dihadapkan pada hasil keputusan otomatis (misalnya sistem penyaringan kandidat kerja atau analisis kredit). Tugas Anda adalah menganalisis apakah algoritma memprioritaskan parameter tertentu secara tidak adil akibat bias gender, latar belakang, atau stereotip data historis, serta memberikan justifikasi kritis atas temuan Anda.",
    highlights: [
      "Deteksi bias terselubung pada data pelatihan model AI.",
      "Evaluasi kualitas pertimbangan rasional berbasis bukti.",
    ],
  },
  {
    id: "faq-retake-2",
    category: "retake",
    categoryLabel: "Cara Mengulang Assessment",
    question: "Apakah riwayat percobaan sebelumnya akan terhapus jika saya mengulang asesmen?",
    answer:
      "Tidak. Semua riwayat percobaan Anda tersimpan secara historis di database. Anda dapat melihat tren peningkatan skor kompetensi Anda dari waktu ke waktu di halaman 'My Results' dan grafik analitik.",
  },
];

// --- QUICK RESOURCES DATA ---
const QUICK_RESOURCES = [
  {
    title: "Panduan MIL-AI UNESCO",
    description: "Pelajari dokumen standar internasional literasi media dan kecerdasan buatan.",
    iconId: "82742",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-500 border-blue-500/30",
    linkText: "Baca Panduan",
    href: "/learning",
  },
  {
    title: "Sandbox Simulasi AI",
    description: "Uji langsung keterampilan deteksi halusinasi, bias algoritma, dan etika.",
    iconId: "101174",
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/30",
    linkText: "Mulai Sandbox",
    href: "/assessments",
  },
  {
    title: "Standar Integritas AI",
    description: "Kerangka acuan etika dan transparansi dalam pemanfaatan alat generatif.",
    iconId: "87367",
    color: "from-purple-500/20 to-pink-500/20 text-purple-500 border-purple-500/30",
    linkText: "Lihat Standar",
    href: "#faq-integritas-1",
  },
  {
    title: "Analitik & Trend Skor",
    description: "Pantau perkembangan ketahanan algoritma dan grafik radar kompetensi Anda.",
    iconId: "87375",
    color: "from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30",
    linkText: "Buka Analitik",
    href: "/results",
  },
];

export default function SupportPage() {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq-integritas-1");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Deteksi Halusinasi AI (Pilar 1)",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Global Toast Hook
  const { showToast } = useToast();

  // Filter FAQs based on search query & selected category
  const filteredFaqs = useMemo(() => {
    return FAQ_LIST.filter((faq) => {
      const matchesCategory =
        activeCategory === "all" || faq.category === activeCategory;
      const matchesQuery =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, activeCategory]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToast("Silakan masukkan nama lengkap Anda.", "error", 4500, "Nama Wajib Diisi");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      showToast("Masukkan alamat email yang valid.", "error", 4500, "Email Tidak Valid");
      return;
    }
    if (!formData.message.trim()) {
      showToast("Silakan tuliskan pertanyaan atau masukan Anda.", "error", 4500, "Pesan Kosong");
      return;
    }

    setSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false);
      showToast(
        `Terima kasih, ${formData.name}. Tim Support SONAR MIND akan merespons ke ${formData.email} segera.`,
        "success",
        5000,
        "Pesan Terkirim!"
      );
      setFormData({
        name: "",
        email: "",
        topic: "Deteksi Halusinasi AI (Pilar 1)",
        message: "",
      });
    }, 1200);
  };

  const categories = [
    { id: "all", label: "Semua FAQ" },
    { id: "integritas", label: "Integritas AI" },
    { id: "unesco", label: "MIL-AI UNESCO" },
    { id: "halusinasi", label: "Deteksi Halusinasi" },
    { id: "retake", label: "Cara Mengulang Assessment" },
  ];

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-10">

      {/* ============================================================ */}
      {/* MODERN HEADER & INTRO TEXT */}
      {/* ============================================================ */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden rounded-3xl bg-panel border border-border-subtle p-6 sm:p-10 shadow-sm"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-60 h-60 bg-accent-green/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20 text-xs font-semibold tracking-wide">
            <Icon id="82797" className="w-3.5 h-3.5 bg-accent-blue" />
            <span>Pusat Bantuan & Literasi AI</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-text-strong tracking-tight leading-tight">
            Bagaimana Kami Bisa Membantu Anda?
          </h1>

          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            Selamat datang di Pusat Support <strong className="text-text-strong">SONAR MIND</strong>. Pelajari panduan kerangka kerja MIL-AI UNESCO, standar Integritas AI, mekanisme audit halusinasi, atau hubungi tim bantuan kami.
          </p>

          {/* Search Bar */}
          <div className="pt-2">
            <div className="relative max-w-xl">
              <Icon id="82712" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari pertanyaan, misal: 'retake', 'halusinasi', 'UNESCO'..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-background border border-border-subtle text-text-strong placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all text-sm shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-text-muted hover:text-text-strong bg-panel px-2 py-1 rounded-md border border-border-subtle"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* QUICK RESOURCES CARDS */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-heading font-bold text-text-strong flex items-center gap-2">
            <Icon id="87351" className="w-5 h-5 bg-accent-blue" />
            <span>Sumber Daya Utama & Quick Links</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_RESOURCES.map((res, index) => {
            return (
              <motion.a
                key={index}
                href={res.href}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group flex flex-col justify-between p-5 rounded-2xl border border-border-subtle bg-panel hover:border-accent-blue/40 hover:shadow-md transition-all h-full"
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br border ${res.color}`}>
                    <Icon
                      id={res.iconId}
                      className="w-6 h-6 bg-current"
                    />
                  </div>
                  <h3 className="text-base font-heading font-bold text-text-strong mb-1.5 group-hover:text-accent-blue transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">
                    {res.description}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-blue pt-2 border-t border-border-subtle/50">
                  <span>{res.linkText}</span>
                  <Icon id="82787" className="w-3.5 h-3.5 bg-accent-blue" />
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* MAIN CONTENT GRID: FAQ ACCORDION + CONTACT FORM */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ------------------------------------------------------------ */}
        {/* LEFT / TOP: FAQ ACCORDION (8 Cols) */}
        {/* ------------------------------------------------------------ */}
        <section className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-accent-blue uppercase tracking-wider mb-1">
              <Icon id="83244" className="w-4 h-4 bg-accent-blue" />
              <span>Pertanyaan Sering Diajukan</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-text-strong">
              FAQ & Panduan Penilaian MIL-AI
            </h2>
            <p className="text-xs text-text-muted mt-1">
              Temukan jawaban seputar Integritas AI, kerangka UNESCO, deteksi halusinasi, dan pengulangan tes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-text-strong text-background shadow-sm"
                    : "bg-panel hover:bg-black/5 dark:hover:bg-white/10 text-text-muted hover:text-text-strong border border-border-subtle"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="bg-panel rounded-2xl p-8 text-center border border-border-subtle space-y-3">
                <Icon id="82783" className="w-8 h-8 bg-text-muted mx-auto" />
                <h3 className="text-sm font-semibold text-text-strong">
                  Tidak Ada FAQ Sesuai Pencarian
                </h3>
                <p className="text-xs text-text-muted max-w-sm mx-auto">
                  Coba kata kunci lain atau kirimkan pertanyaan Anda secara langsung melalui formulir kontak di samping.
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = expandedFaqId === faq.id;
                return (
                  <motion.div
                    key={faq.id}
                    id={faq.id}
                    layout
                    className="bg-panel border border-border-subtle rounded-2xl overflow-hidden shadow-sm transition-colors"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaqId(isOpen ? null : faq.id)
                      }
                      className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                    >
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-accent-blue/10 text-accent-blue border border-accent-blue/20">
                          {faq.categoryLabel}
                        </span>
                        <h3 className="text-base font-heading font-bold text-text-strong leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                      <div
                        className={`p-1.5 rounded-full bg-background border border-border-subtle shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-accent-blue" : "text-text-muted"
                        }`}
                      >
                        <Icon id="87345" className="w-4 h-4 bg-current" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-border-subtle/60 text-xs sm:text-sm text-text-muted leading-relaxed space-y-3">
                            <p className="whitespace-pre-line">{faq.answer}</p>

                            {faq.highlights && (
                              <div className="bg-background rounded-xl p-3.5 border border-border-subtle space-y-1.5 mt-2">
                                <span className="text-[11px] font-bold text-text-strong uppercase tracking-wider block">
                                  Poin Penting:
                                </span>
                                <ul className="space-y-1">
                                  {faq.highlights.map((item, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs text-text-strong"
                                    >
                                      <Icon id="82766" className="w-3.5 h-3.5 bg-accent-green shrink-0 mt-0.5" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            )}
          </div>
        </section>

        {/* ------------------------------------------------------------ */}
        {/* RIGHT / BOTTOM: INTERACTIVE CONTACT/FEEDBACK FORM (5 Cols) */}
        {/* ------------------------------------------------------------ */}
        <section className="lg:col-span-5 space-y-4">
          <div className="bg-panel border border-border-subtle rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-accent-green uppercase tracking-wider">
                <Icon id="93380" className="w-4 h-4 bg-accent-green" />
                <span>Formulir Kontak & Feedback</span>
              </div>
              <h2 className="text-xl font-heading font-bold text-text-strong">
                Kirim Pertanyaan / Masukan
              </h2>
              <p className="text-xs text-text-muted">
                Punya pertanyaan teknis, kendala asesmen, atau masukan untuk pengembangan SONAR MIND? Tulis pesan Anda di bawah.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Nama Lengkap */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-strong block">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Pratama"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-subtle text-text-strong placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all"
                />
              </div>

              {/* Alamat Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-strong block">
                  Alamat Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="email@domain.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-subtle text-text-strong placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all"
                />
              </div>

              {/* Topic Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-strong block">
                  Topik Pertanyaan / Asesmen
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-subtle text-text-strong text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all"
                >
                  <option value="Deteksi Halusinasi AI (Pilar 1)">
                    Deteksi Halusinasi AI (Pilar 1)
                  </option>
                  <option value="Bias Algoritma (Pilar 2)">
                    Bias Algoritma (Pilar 2)
                  </option>
                  <option value="Etika & Agensi Kognitif (Pilar 3 & 4)">
                    Etika & Agensi Kognitif (Pilar 3 & 4)
                  </option>
                  <option value="Kerangka MIL-AI UNESCO">
                    Kerangka MIL-AI UNESCO
                  </option>
                  <option value="Cara Retake & Mengulang Assessment">
                    Cara Retake & Mengulang Assessment
                  </option>
                  <option value="Masalah Teknis & Akun">
                    Masalah Teknis & Akun
                  </option>
                  <option value="Feedback & Masukan Platform">
                    Feedback & Masukan Platform
                  </option>
                </select>
              </div>

              {/* Pesan Textarea */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-text-strong block">
                  Pesan / Masukan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Jelaskan pertanyaan atau masukan Anda secara mendetail..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-background border border-border-subtle text-text-strong placeholder:text-text-muted text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-accent-blue/40 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-6 bg-text-strong text-background font-heading font-semibold text-sm rounded-xl hover:bg-black dark:hover:bg-white/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Icon id="85469" className="w-4 h-4 bg-background animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Icon id="87586" className="w-4 h-4 bg-background" />
                    <span>Kirim Pesan Support</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-border-subtle text-center text-[11px] text-text-muted flex items-center justify-center gap-1.5">
              <Icon id="83244" className="w-3.5 h-3.5 bg-accent-blue" />
              <span>Respon rata-rata: dalam 1x24 jam kerja</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
