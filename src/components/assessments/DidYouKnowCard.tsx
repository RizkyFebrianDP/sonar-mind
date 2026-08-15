import React from 'react';
import { Icon } from '@/components/ui/Icon';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function DidYouKnowCard() {
  const { t } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-[#2D2D2D] rounded-3xl p-6 text-white relative overflow-hidden flex flex-col h-full min-h-[200px]"
    >
      <h4 className="text-accent-green font-bold text-sm mb-3">{t.assessments.didYouKnow}</h4>
      
      <p className="text-sm leading-relaxed text-gray-200 z-10 relative">
        {t.assessments.didYouKnowDesc}
      </p>
      
      {/* Decorative Icon */}
      <Icon
        id="99038"
        className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rotate-[-15deg] pointer-events-none"
      />
    </motion.div>
  );
}
