import React from 'react';
import Link from 'next/link';
import { ArrowRight, ListOrdered, Clock, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

export function AssessmentHeroCard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-panel rounded-3xl p-6 lg:p-8 shadow-sm border border-border-subtle flex flex-col mb-8"
    >
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-accent-green/10 text-accent-green text-[11px] font-bold uppercase tracking-wider rounded-md">
          MIL-AI Competency Test
        </span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-strong mb-3">
        Comprehensive MIL-AI Evaluation
      </h2>
      
      <p className="text-text-muted max-w-3xl mb-8 leading-relaxed">
        Evaluate your ability to identify misinformation, recognize algorithmic bias, 
        and maintain cognitive agency when co-creating with AI systems.
      </p>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border-subtle text-sm text-text-muted font-medium">
            <ListOrdered className="w-4 h-4" />
            3 Sections
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border-subtle text-sm text-text-muted font-medium">
            <Clock className="w-4 h-4" />
            ~20 min
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg border border-border-subtle text-sm text-text-muted font-medium">
            <MousePointerClick className="w-4 h-4" />
            Performance-based
          </div>
        </div>
        
        <Link 
          href="/sandbox/hallucination" 
          className="inline-flex items-center justify-center px-6 py-3 bg-text-strong text-background rounded-xl text-sm font-bold hover:bg-black transition-all shrink-0 shadow-sm"
        >
          Start Assessment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </motion.div>
  );
}
