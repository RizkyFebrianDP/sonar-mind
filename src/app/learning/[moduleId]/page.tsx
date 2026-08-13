import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

const moduleContents: Record<string, any> = {
  "mod-halusinasi-1": {
    title: "Deteksi & Verifikasi Halusinasi LLM",
    category: "halusinasi",
    duration: "15 Menit",
    iconId: "82782",
    content: (
      <div className="space-y-4">
        <p>
          Artificial Intelligence (AI), khususnya Large Language Models (LLMs) seperti GPT-4, pada dasarnya adalah mesin probabilistik. Mereka tidak memiliki pemahaman semantik atau akses ke &quot;kebenaran absolut&quot;. Sebaliknya, model ini memprediksi token (potongan kata) berikutnya berdasarkan distribusi probabilitas dari data pelatihannya. Kelemahan struktural inilah yang memicu fenomena <strong>AI Hallucination (Halusinasi AI)</strong>.
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Definisi Akademik</h3>
        <p>
          Menurut Zhai (2024) dalam kajiannya mengenai dampak sistem dialog AI terhadap kemampuan kognitif, halusinasi AI didefinisikan sebagai <em>&quot;kondisi di mana AI menghasilkan informasi palsu, tidak akurat, atau sepenuhnya fabrikasi (rekayasa), meskipun dengan struktur kalimat yang sangat meyakinkan.&quot;</em>
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Akar Masalah (Root Causes)</h3>
        <ol className="list-decimal pl-5 space-y-3">
          <li><strong>Data Inconsistency:</strong> Kesenjangan atau kontradiksi dalam miliaran parameter data latih.</li>
          <li><strong>Sycophancy (Kecenderungan Menyenangkan Pengguna):</strong> Model AI dilatih (misalnya melalui RLHF) untuk bersikap membantu. Seringkali, model lebih memilih memberikan jawaban yang salah daripada mengakui bahwa ia tidak tahu.</li>
          <li><strong>Dead Links &amp; Fake Citations:</strong> AI dapat menghasilkan kutipan jurnal, DOI, atau URL yang mengikuti pola sintaksis yang benar, namun sama sekali tidak eksis di dunia nyata.</li>
        </ol>

        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Kompetensi AI Natives</h3>
        <p>
          Menurut riset Ponce Rojo mengenai kompetensi <em>AI Natives</em>, pengguna modern harus menguasai <strong>Model-Aware Discernment</strong> (Kecerdasan Berbasis Model). Praktik terbaiknya meliputi:
        </p>
        <div className="bg-accent-blue/5 p-6 rounded-xl border border-accent-blue/20">
          <ul className="list-disc list-outside ml-5 space-y-3">
            <li><strong>Triangulasi Eksternal:</strong> Selalu verifikasi klaim faktual menggunakan mesin pencari konvensional atau basis data jurnal akademik (seperti PubMed atau Scopus).</li>
            <li><strong>Controlled Hallucination Tests:</strong> Cobalah memberikan prompt jebakan (misalnya meminta AI menjelaskan peristiwa fiktif) untuk mengkalibrasi seberapa jauh model tersebut berhalusinasi.</li>
            <li><strong>Zero-Trust Policy:</strong> Terapkan prinsip bahwa setiap output AI adalah draf pertama yang penuh potensi kesalahan hingga dibuktikan kebenarannya.</li>
          </ul>
        </div>

        <p className="mt-6 text-sm text-text-muted italic border-l-4 border-text-muted pl-4">
          Dengan memahami batasan probabilistik AI, Anda melindungi integritas akademik dan profesional Anda dari jebakan fabrikasi informasi.
        </p>
      </div>
    ),
    sandboxHref: "/sandbox/hallucination-audit",
  },
  "mod-bias-1": {
    title: "Audit Demografi & Bias Algoritma Rekrutmen",
    category: "bias",
    duration: "20 Menit",
    iconId: "87375",
    content: (
      <div className="space-y-4">
        <p>
          Bias Algoritma (Algorithmic Bias) adalah tantangan paling persisten dalam etika AI modern. Hal ini terjadi ketika sebuah sistem AI mereplikasi, atau bahkan memperburuk, diskriminasi yang ada di dunia nyata karena anomali dalam data pelatihan atau arsitektur algoritmanya.
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Jenis-jenis Bias Utama</h3>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Historical Bias:</strong> Model AI mewarisi prasangka manusia. Misalnya, jika data rekrutmen perusahaan selama 10 tahun terakhir didominasi laki-laki, AI akan menyimpulkan bahwa atribut &quot;perempuan&quot; berkorelasi negatif dengan kesuksesan pekerjaan.</li>
          <li><strong>Representation Bias:</strong> Terjadi ketika populasi tertentu tidak terwakili dengan baik dalam data pelatihan (misalnya, sistem *facial recognition* yang gagal mengenali warna kulit gelap karena mayoritas dataset adalah ras Kaukasia).</li>
          <li><strong>Measurement Bias:</strong> Saat cara mengukur keberhasilan sistem menguntungkan kelompok dominan dibandingkan kelompok minoritas.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Studi Kasus: Sistem ATS (Applicant Tracking System)</h3>
        <p>
          Dalam skenario rekrutmen modern, sistem AI digunakan untuk menyaring ribuan CV (Resume). Studi menemukan bahwa sistem sering menurunkan peringkat kandidat yang bersekolah di &quot;Perguruan Tinggi Khusus Wanita&quot; atau yang memiliki ekstrakurikuler tertentu yang berafiliasi dengan minoritas.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Pendekatan Mitigasi &amp; Audit</h3>
        <p>
          Mendeteksi bias membutuhkan pengujian proaktif menggunakan kerangka <strong>Fairness Metrics</strong>:
        </p>
        <div className="bg-accent-blue/5 p-6 rounded-xl border border-accent-blue/20">
          <ol className="list-decimal list-outside ml-5 space-y-3">
            <li><strong>Demographic Parity:</strong> Memastikan tingkat penerimaan pelamar setara terlepas dari atribut demografis mereka yang dilindungi (gender, ras, usia).</li>
            <li><strong>Equal Opportunity:</strong> Memastikan kandidat yang benar-benar kualified memiliki peluang (True Positive Rate) yang sama terlepas dari grup asal mereka.</li>
            <li><strong>Counterfactual Fairness:</strong> Pertanyaan kritis: <em>&quot;Apakah keputusan AI akan sama terhadap individu ini jika satu-satunya hal yang diubah adalah gendernya?&quot;</em></li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-text-muted italic border-l-4 border-text-muted pl-4">
          Literasi AI berarti tidak menerima keputusan algoritma secara mentah-mentah. Pengguna manusia harus selalu menjadi wasit terakhir (Human-in-the-Loop) untuk sistem AI yang berdampak pada nasib seseorang.
        </p>
      </div>
    ),
    sandboxHref: "/sandbox/bias-audit",
  },
  "mod-etika-1": {
    title: "Penalaran Etis & Autonomi Kognitif Manusia",
    category: "etika",
    duration: "25 Menit",
    iconId: "101174",
    content: (
      <div className="space-y-4">
        <p>
          Interaksi berkelanjutan antara manusia dan <em>AI Dialogue Systems</em> telah memunculkan perdebatan besar di dunia psikologi kognitif dan etika. Inti dari permasalahan ini adalah perlindungan terhadap <strong>Autonomi Kognitif (Cognitive Autonomy)</strong>.
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Ancaman Cognitive Offloading</h3>
        <p>
          Menurut temuan Chunpeng Zhai (2024), ketergantungan berlebih (over-reliance) terhadap AI berpotensi memicu fenomena <em>Cognitive Offloading</em>. Ini adalah praktik di mana individu menyerahkan tugas berpikir kritis, analisis, dan pengambilan keputusan sepenuhnya kepada mesin.
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li><strong>Dampak Negatif:</strong> Penurunan kepercayaan diri (self-confidence), erosi kemampuan <em>problem-solving</em>, dan hilangnya <em>Human Agency</em> (kemandirian).</li>
          <li><strong>Ilusi Kompetensi:</strong> Pengguna sering merasa diri mereka jauh lebih pintar karena output tulisan AI yang elegan, namun sesungguhnya mereka kehilangan pemahaman mendalam tentang konsep yang ditulis.</li>
        </ul>

        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Menavigasi Dilema Etis (Moral Trade-offs)</h3>
        <p>
          AI yang sepenuhnya otonom, tanpa campur tangan manusia (Autonomous Agents), akan sering berhadapan dengan dilema etis. Dalam kasus ini, tidak ada jawaban &quot;benar&quot; secara matematis, yang ada hanyalah <strong>Value Alignment</strong>.
        </p>
        <div className="bg-accent-blue/5 p-6 rounded-xl border border-accent-blue/20">
          <ul className="list-disc list-outside ml-5 space-y-3">
            <li><strong>Trolley Problem Modern:</strong> Dalam situasi rem blong, apakah mobil otonom harus mengorbankan penumpangnya sendiri demi menyelamatkan 5 pejalan kaki?</li>
            <li><strong>Keamanan Nasional vs Privasi:</strong> Apakah etis menggunakan model bahasa untuk memindai setiap chat pribadi warga negara untuk mencegah aksi terorisme?</li>
          </ul>
        </div>

        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Sikap Berkelanjutan (Sustainable Attitude)</h3>
        <p>
          Kompetensi tertinggi literasi AI bukanlah tahu cara merancang prompt yang paling canggih, melainkan memiliki kebijaksanaan kapan AI <strong>tidak</strong> boleh digunakan. Menjaga ruang bagi pemikiran orisinil manusia adalah pertahanan etis terbesar kita.
        </p>
      </div>
    ),
    sandboxHref: "/sandbox/ethical-dilemma",
  },
  "mod-unesco-1": {
    title: "Pengantar Framework MIL-AI UNESCO",
    category: "unesco",
    duration: "30 Menit",
    iconId: "85778",
    content: (
      <div className="space-y-4">
        <p>
          Merespons revolusi Generative AI, Organisasi Pendidikan, Keilmuan, dan Kebudayaan PBB (UNESCO) secara resmi telah mengekspansi kurikulum <em>Media and Information Literacy (MIL)</em> agar mencakup kompetensi <em>Artificial Intelligence Literacy</em>.
        </p>
        
        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">Paradigma Baru Kewarganegaraan Digital</h3>
        <p>
          Literasi bukan lagi sekadar kemampuan menggunakan komputer (Digital Literacy). Saat ini, warga global dituntut memahami konsekuensi sosiologis, psikologis, dan hak asasi manusia akibat implementasi algoritma <em>Black Box</em>.
        </p>

        <h3 className="text-xl font-bold mt-8 mb-3 text-accent-blue">5 Pilar Kompetensi Inti UNESCO MIL-AI</h3>
        <div className="bg-accent-blue/5 p-6 rounded-xl border border-accent-blue/20">
          <ol className="list-decimal list-outside ml-5 space-y-4">
            <li>
              <strong>Fondasi Teknis (Understanding AI):</strong> Menyadari perbedaan mendasar antara pemrograman linier klasik, Machine Learning (Supervised/Unsupervised), dan Generative AI. Mengerti bahwa AI tidak memiliki "kesadaran".
            </li>
            <li>
              <strong>Hak Asasi &amp; Privasi (AI and Human Rights):</strong> Mempertanyakan dari mana asal data pelatihan model AI (Data Provenance). Apakah data tersebut dikeruk (scraped) dengan melanggar hak cipta atau mengeksploitasi seniman?
            </li>
            <li>
              <strong>Evaluasi Kritis (Critical Evaluation):</strong> Memiliki sensitivitas tinggi terhadap <em>Synthetic Media</em> (Deepfakes, audio fabrikasi) dan menyadari bagaimana algoritma rekomendasi media sosial mengamplifikasi ruang gema (Echo Chambers) serta polarisasi opini.
            </li>
            <li>
              <strong>Integritas Etis (Ethical Application):</strong> Menggunakan alat AI dengan integritas—secara transparan (mendeklarasikan penggunaan AI) dan tidak memanfaatkannya untuk kejahatan akademis (plagiarisme) atau penipuan finansial.
            </li>
            <li>
              <strong>Keterlibatan Demokratis (Civic Engagement):</strong> Berpartisipasi aktif dalam menuntut regulasi AI (seperti EU AI Act) agar teknologi digunakan untuk menutup kesenjangan ekonomi global, bukan memperlebarnya.
            </li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-text-muted italic border-l-4 border-text-muted pl-4">
          Framework ini tidak menolak kehadiran AI (Neo-Luddism), melainkan mengajak manusia untuk mengontrol lintasan perkembangannya secara demokratis dan berbasis nilai-nilai humanisme.
        </p>
      </div>
    ),
    sandboxHref: "/assessments",
  }
};

export default async function LearningModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  
  const module = moduleContents[moduleId];

  if (!module) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
        <Link href="/learning" className="hover:text-text-strong transition-colors">
          Learning Modules
        </Link>
        <span className="opacity-50">/</span>
        <span className="font-medium text-text-strong">{module.title}</span>
      </div>

      {/* Header */}
      <div className="bg-panel border border-border-subtle rounded-3xl p-8 mb-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-sm">
        <div className="w-20 h-20 bg-accent-blue/10 text-accent-blue rounded-2xl flex items-center justify-center shrink-0">
          <Icon id={module.iconId} className="w-10 h-10 bg-accent-blue" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/5 text-text-strong uppercase tracking-wider">
              {module.category}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Icon id="85434" className="w-3 h-3 bg-text-muted" />
              {module.duration}
            </span>
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-strong mb-2">
            {module.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-panel border border-border-subtle rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-heading font-bold text-text-strong mb-6 border-b border-border-subtle pb-4">
          Materi Pembelajaran
        </h2>
        <div className="text-text-strong leading-relaxed text-sm md:text-base">
          {module.content}
        </div>
        
        {/* Completion Action */}
        <div className="mt-12 flex justify-end pt-6 border-t border-border-subtle">
          <Link 
            href={module.sandboxHref}
            className="flex items-center gap-2 px-6 py-3 bg-accent-blue text-white font-medium rounded-xl hover:opacity-90 transition-opacity shadow-sm"
          >
            Lanjutkan ke Praktik Sandbox
            <Icon id="82806" className="w-4 h-4 bg-white" />
          </Link>
        </div>
      </div>
    </div>
  );
}
