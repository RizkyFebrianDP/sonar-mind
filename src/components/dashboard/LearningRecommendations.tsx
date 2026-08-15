import React from 'react';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';

interface Props {
  weakestCategory?: "halusinasi" | "bias" | "etika";
}

const RECOMMENDATIONS = {
  halusinasi: {
    title: "Deteksi & Verifikasi Halusinasi LLM",
    description: "Pelajari metode verifikasi independen untuk mengenali klaim palsu dan sitasi fiktif dari AI berdasarkan celah asesmen Anda.",
    href: "/learning"
  },
  bias: {
    title: "Mitigating Hidden Biases in Datasets",
    description: "A practical guide to detecting and neutralizing algorithmic bias before model deployment. Based on your recent assessment gaps.",
    href: "/learning"
  },
  etika: {
    title: "Penalaran Etis & Autonomi Kognitif Manusia",
    description: "Tingkatkan ketahanan kognitif Anda dari ketergantungan berlebihan dan identifikasi dilema moral AI.",
    href: "/learning"
  }
};

export function LearningRecommendations({ weakestCategory = "bias" }: Props) {
  const rec = RECOMMENDATIONS[weakestCategory];
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 bg-panel rounded-3xl p-6 flex flex-col justify-between group shadow-sm transition-shadow hover:shadow-md border border-transparent hover:border-border-subtle">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-blue/10 text-accent-blue text-[10px] font-bold uppercase tracking-widest rounded-full">
              <Icon id="7FRSm1RlZ1SV" className="w-3.5 h-3.5 bg-accent-blue" />
              Recommended
            </div>
            <span className="text-[10px] font-bold text-accent-red uppercase tracking-widest border border-accent-red/30 px-2 py-0.5 rounded-full">
              Priority Fix
            </span>
          </div>
          
          <h3 className="text-base font-heading font-bold text-text-strong mt-3 mb-2 leading-tight group-hover:text-accent-blue transition-colors">
            {rec.title}
          </h3>
          
          <p className="text-sm text-text-muted leading-relaxed mb-4">
            {rec.description}
          </p>
        </div>

        <Link 
          href={rec.href}
          className="inline-flex items-center justify-between w-full px-5 py-3 bg-text-strong text-background rounded-full text-sm font-semibold hover:bg-black transition-all group/btn mt-auto"
        >
          Start Module
          <Icon id="85463" className="w-4 h-4 bg-background group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
