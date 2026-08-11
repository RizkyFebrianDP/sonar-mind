import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function LearningRecommendations() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-panel rounded-3xl p-6 flex flex-col justify-between group shadow-sm transition-shadow hover:shadow-md border border-transparent hover:border-border-subtle">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-bold uppercase tracking-widest rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Recommended
            </div>
            <span className="text-[10px] font-bold text-accent-red uppercase tracking-widest border border-accent-red/30 px-2 py-0.5 rounded-full">
              Priority Fix
            </span>
          </div>
          
          <h3 className="text-base font-heading font-bold text-text-strong mt-3 mb-2 leading-tight group-hover:text-accent-blue transition-colors">
            Mitigating Hidden Biases in Datasets
          </h3>
          
          <p className="text-sm text-text-muted leading-relaxed mb-4">
            A practical guide to detecting and neutralizing algorithmic bias before model deployment. Based on your recent assessment gaps.
          </p>
        </div>

        <Link 
          href="/learning/bias-mitigation"
          className="inline-flex items-center justify-between w-full px-5 py-3 bg-text-strong text-background rounded-full text-sm font-semibold hover:bg-black transition-all group/btn mt-auto"
        >
          Start Module
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
