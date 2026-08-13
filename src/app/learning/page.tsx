"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface LearningModule {
  id: string;
  pillar: string;
  category: "halusinasi" | "bias" | "etika" | "unesco";
  title: string;
  description: string;
  duration: string;
  level: "Pemula" | "Menengah" | "Mahir";
  points: number;
  icon: string;
  badgeColor: string;
  topics: string[];
  sandboxHref: string;
  recommendedForScoreBelow?: number;
}

const LEARNING_MODULES: LearningModule[] = [
  {
    id: "mod-halusinasi-1",
    pillar: "Critical Evaluation",
    category: "halusinasi",
    title: "Deteksi & Verifikasi Halusinasi LLM",
    description:
      "Pelajari metode verifikasi independen untuk mengenali klaim palsu, sitasi fiktif, dan fakta buatan dari Large Language Models.",
    duration: "15 Menit",
    level: "Pemula",
    points: 150,
    icon: "82782",
    badgeColor: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    topics: ["Strategi Cross-Checking", "Struktur Prompt Faktual", "Pengenalan Sintaks Sitasi"],
    sandboxHref: "/learning/mod-halusinasi-1",
  },
  {
    id: "mod-bias-1",
    pillar: "Algorithmic Bias Awareness",
    category: "bias",
    title: "Audit Demografi & Bias Algoritma Rekrutmen",
    description:
      "Pahami bagaimana dataset historis yang tidak seimbang menghasilkan kepengurusan bias gender, ras, dan latar belakang sosial.",
    duration: "20 Menit",
    level: "Menengah",
    points: 200,
    icon: "87375",
    badgeColor: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    topics: ["Mitigasi Bias Skenario", "Metrik Keadilan Algoritma", "Justifikasi Evaluasi Kritis"],
    sandboxHref: "/learning/mod-bias-1",
  },
  {
    id: "mod-etika-1",
    pillar: "Ethical & Cognitive Agency",
    category: "etika",
    title: "Penalaran Etis & Autonomi Kognitif Manusia",
    description:
      "Tingkatkan ketahanan kognitif Anda dari ketergantungan berlebihan (cognitive offloading) dan identifikasi dilema moral AI.",
    duration: "25 Menit",
    level: "Mahir",
    points: 250,
    icon: "101174",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-500",
    topics: ["Dilema Etika AI", "Cognitive Offloading Risk", "Kerangka Keputusan Etis"],
    sandboxHref: "/learning/mod-etika-1",
  },
  {
    id: "mod-unesco-1",
    pillar: "Kurikulum Inti UNESCO",
    category: "unesco",
    title: "Pengantar Framework MIL-AI UNESCO",
    description:
      "Landasan komprehensif mengenai 5 pilar kompetensi Media & Information Literacy dalam era Artificial Intelligence.",
    duration: "30 Menit",
    level: "Pemula",
    points: 300,
    icon: "85778",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-500",
    topics: ["5 Pilar MIL-AI", "Hak Digital & Privasi", "Etika Generatif Abad 21"],
    sandboxHref: "/learning/mod-unesco-1",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function LearningPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [recommendedModuleId, setRecommendedModuleId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function loadLearningData() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setUserId(user.id);

        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`learning_progress_${user.id}`);
        if (savedProgress) {
          setCompletedModules(JSON.parse(savedProgress));
        }

        // Fetch latest assessment to find the weakest pillar
        const { data: historyData } = await supabase
          .from("assessment_history")
          .select("hallucination_score, bias_score, ethical_score, cognitive_agency_score")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(1);

        if (historyData && historyData.length > 0) {
          const scores = historyData[0];
          const scoreMap = [
            { cat: "halusinasi", score: scores.hallucination_score ?? 0 },
            { cat: "bias", score: scores.bias_score ?? 0 },
            { cat: "etika", score: Math.min(scores.ethical_score ?? 0, scores.cognitive_agency_score ?? 0) },
          ];
          
          scoreMap.sort((a, b) => a.score - b.score);
          const weakestCat = scoreMap[0].cat;
          
          const recMod = LEARNING_MODULES.find(m => m.category === weakestCat);
          if (recMod) setRecommendedModuleId(recMod.id);
        }
      } catch (err) {
        console.error("Failed to load learning data:", err);
      }
    }
    loadLearningData();
  }, []);

  const handleMarkAsDone = (moduleId: string, href: string) => {
    if (!completedModules.includes(moduleId)) {
      const newCompleted = [...completedModules, moduleId];
      setCompletedModules(newCompleted);
      if (userId) {
        localStorage.setItem(`learning_progress_${userId}`, JSON.stringify(newCompleted));
      }
    }
    router.push(href);
  };

  const sortedModules = [...LEARNING_MODULES].sort((a, b) => {
    if (a.id === recommendedModuleId) return -1;
    if (b.id === recommendedModuleId) return 1;
    return 0;
  });

  const filteredModules = sortedModules.filter((mod) => {
    const matchesCategory =
      selectedCategory === "all" || mod.category === selectedCategory;
    const matchesQuery =
      mod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.pillar.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-full p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-10"
    >
      {/* Header Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-panel border border-border-subtle p-6 sm:p-10 shadow-sm"
      >
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-accent-green/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-green/10 text-accent-green border border-accent-green/20 text-xs font-semibold tracking-wide">
            <Icon id="82797" className="w-3.5 h-3.5 bg-accent-green" />
            <span>Katalog Pembelajaran Terstruktur</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-text-strong tracking-tight">
            Modul Pembelajaran MIL-AI
          </h1>

          <p className="text-sm text-text-muted leading-relaxed">
            Tingkatkan skor kompetensi dan ketahanan algoritma Anda melalui materi interaktif yang dirancang khusus berdasarkan kerangka kerja <strong className="text-text-strong">MIL-AI UNESCO</strong>.
          </p>

          {/* Search & Filter */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-md">
              <Icon id="82712" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 bg-text-muted" />
              <input
                type="text"
                placeholder="Cari modul pembelajaran..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-background border border-border-subtle text-text-strong text-xs sm:text-sm placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent-green/40 transition-all"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Category Tabs */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Semua Modul" },
          { id: "halusinasi", label: "Deteksi Halusinasi" },
          { id: "bias", label: "Bias Algoritma" },
          { id: "etika", label: "Etika & Agensi" },
          { id: "unesco", label: "UNESCO Framework" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === tab.id
                ? "bg-text-strong text-background shadow-sm"
                : "bg-panel hover:bg-black/5 dark:hover:bg-white/5 text-text-muted hover:text-text-strong border border-border-subtle"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Module Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {filteredModules.map((module) => {
          return (
            <div
              key={module.id}
              className="bg-panel border border-border-subtle rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${module.badgeColor}`}
                  >
                    {module.pillar}
                  </span>
                  
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <Icon id="82767" className="w-3.5 h-3.5 bg-text-muted" />
                      <span>{module.duration}</span>
                    </div>
                    {recommendedModuleId === module.id && (
                      <span className="text-[10px] font-bold text-amber-600 dark:text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 shadow-sm">
                        ✨ Rekomendasi Utama
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-background border border-border-subtle text-text-strong shrink-0">
                    <Icon id={module.icon} className="w-6 h-6 bg-accent-blue" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-text-strong leading-snug">
                      {module.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-1 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>

                {/* Topics Covered */}
                <div className="space-y-1.5 pt-2 border-t border-border-subtle/50">
                  <span className="text-[11px] font-bold text-text-strong uppercase tracking-wider block">
                    Topik Utama:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {module.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-background text-[11px] text-text-muted border border-border-subtle"
                      >
                        <Icon id="82766" className="w-3 h-3 bg-accent-green" />
                        <span>{topic}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-text-strong font-semibold">
                  <Icon id="85613" className="w-4 h-4 bg-amber-500" />
                  <span>+{module.points} Poin MIL-AI</span>
                </div>

                {completedModules.includes(module.id) ? (
                  <button
                    onClick={() => handleMarkAsDone(module.id, module.sandboxHref)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold hover:bg-emerald-500/20 transition-all"
                  >
                    <span>Selesai</span>
                    <Icon id="83017" className="w-3.5 h-3.5 bg-emerald-600 dark:bg-emerald-400" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkAsDone(module.id, module.sandboxHref)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-blue text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    <span>Tandai Selesai & Praktik</span>
                    <Icon id="85463" className="w-3.5 h-3.5 bg-white" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
