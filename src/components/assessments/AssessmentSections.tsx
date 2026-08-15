import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  number: string;
  title: string;
  description: string;
  footerText: string;
}

import { useLanguage } from '@/context/LanguageContext';

export function AssessmentSections() {
  const { t } = useLanguage();
  
  const sections = [
    {
      id: 'sec-1',
      number: '01',
      title: t.assessments.hallucinationTitle,
      description: t.assessments.hallucinationDesc,
      footerText: t.assessments.lockedStart
    },
    {
      id: 'sec-2',
      number: '02',
      title: t.assessments.biasTitle,
      description: t.assessments.biasDesc,
      footerText: t.assessments.lockedNext
    },
    {
      id: 'sec-3',
      number: '03',
      title: t.assessments.ethicalTitle,
      description: t.assessments.ethicalDesc,
      footerText: t.assessments.lockedNext
    }
  ];
  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold text-text-strong mb-1">{t.assessments.sectionsTitle}</h3>
        <p className="text-sm text-text-muted">{t.assessments.sectionsDesc}</p>
      </div>
      
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-panel rounded-3xl p-6 shadow-sm border border-border-subtle flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-background border border-border-subtle shrink-0">
                  <span className="text-xs font-bold text-text-muted">{section.number}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-text-strong mb-2 leading-tight max-w-sm">
                    {section.title}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed max-w-md">
                    {section.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-muted uppercase tracking-wider bg-background px-2.5 py-1 rounded-md border border-border-subtle shrink-0">
                <Icon id="82747" className="w-3 h-3 bg-text-muted" />
                {t.assessments.notStarted}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border-subtle/50">
              <p className="text-xs text-text-muted italic">
                {section.footerText}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
