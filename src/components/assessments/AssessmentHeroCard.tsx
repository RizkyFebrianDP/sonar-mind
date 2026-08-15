import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function AssessmentHeroCard() {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-panel rounded-3xl p-6 lg:p-8 shadow-sm border border-border-subtle flex flex-col mb-8"
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider rounded-md border border-emerald-500/20">
          {t.assessments.heroBadge}
        </span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-strong mb-3">
        {t.assessments.heroTitle}
      </h2>
      
      <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
        {t.assessments.heroDesc}
      </p>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border-subtle text-sm text-text-muted font-medium">
            <Icon id="89779" className="w-4 h-4 bg-text-muted" />
            {t.assessments.heroSectionCount}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border-subtle text-sm text-text-muted font-medium">
            <Icon id="82767" className="w-4 h-4 bg-text-muted" />
            {t.assessments.heroDuration}
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border-subtle text-sm text-text-muted font-medium">
            <Icon id="82793" className="w-4 h-4 bg-text-muted" />
            {t.assessments.heroType}
          </div>
        </div>
        
        <Link 
          href="/sandbox/hallucination-audit" 
          className="inline-flex items-center justify-center px-6 py-3 bg-text-strong text-background rounded-xl text-sm font-bold hover:bg-black transition-all shrink-0 shadow-sm"
        >
          {t.assessments.start}
          <Icon id="85463" className="w-4 h-4 ml-2 bg-background" />
        </Link>
      </div>
    </motion.div>
  );
}
