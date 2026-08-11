"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { RadarChartPillar } from '@/components/dashboard/RadarChartPillar';
import { InsightCard } from '@/components/dashboard/InsightCard';
import { HistoryTable } from '@/components/dashboard/HistoryTable';
import { LearningRecommendations } from '@/components/dashboard/LearningRecommendations';
import { TrendingUp, ClipboardCheck, Scale, BrainCircuit } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <motion.div 
      className="p-8 max-w-7xl mx-auto space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
        <div className="flex items-center gap-2 text-sm text-text-muted mb-2 sm:mb-0">
          <span>Dashboard</span>
          <span>/</span>
          <span className="font-semibold text-text-strong">Competency</span>
        </div>
        
        <div className="flex items-center justify-between w-full sm:w-auto">
          <h1 className="text-2xl font-bold text-text-strong sm:hidden font-heading tracking-tight">
            Good Morning, Alex
          </h1>
          <button className="px-6 py-2.5 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold shadow-sm transition-all flex items-center gap-2 tracking-wide">
            Take New Assessment
          </button>
        </div>
        <h1 className="hidden sm:block text-2xl md:text-3xl font-bold text-text-strong font-heading tracking-tight">
          Good Morning, Alex
        </h1>
      </motion.div>



      {/* Your Test Result */}
      <motion.section variants={itemVariants}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-text-strong">My Competencies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard 
            title="Overall Competency"
            score={82}
            label="Advanced"
            labelColor="blue"
            description="Top 15% across all AI evaluations"
            icon={TrendingUp}
          />
          <SummaryCard 
            title="Hallucination Audit"
            score={86}
            label="Proficient"
            labelColor="pink"
            description="Strong at verifying synthetic claims"
            icon={ClipboardCheck}
          />
          <SummaryCard 
            title="Algorithmic Bias"
            score={72}
            label="Needs Attention"
            labelColor="yellow"
            description="Struggles with subtle cultural bias"
            icon={Scale}
          />
          <SummaryCard 
            title="Ethical & Agency"
            score={78}
            label="Balanced"
            labelColor="blue"
            description="Maintains clear human oversight"
            icon={BrainCircuit}
          />
        </div>
      </motion.section>

      {/* Your AI Competency & Learning Recs */}
      <motion.section variants={itemVariants}>
        <h2 className="text-xl font-heading font-bold text-text-strong mb-4">Your AI Competency</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Radar + Insight (Takes 2/3 space on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-panel rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-sm flex flex-col gap-8">
              <RadarChartPillar />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InsightCard 
                  type="strength"
                  pillar="Critical Evaluation"
                  score={88}
                  description="Excellent ability to detect hallucinations and verify synthetic data sources."
                />
                <InsightCard 
                  type="growth"
                  pillar="Algorithmic Bias Awareness"
                  score={72}
                  description="Focus on identifying subtle cultural and gender biases in AI-driven recruitment and media recommendations."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Learning Recs (Takes 1/3 space on large screens) */}
          <div className="lg:col-span-1 h-full">
            <LearningRecommendations />
          </div>

        </div>
      </motion.section>

      {/* History Table */}
      <motion.section variants={itemVariants} className="w-full">
        <HistoryTable />
      </motion.section>

    </motion.div>
  );
}
