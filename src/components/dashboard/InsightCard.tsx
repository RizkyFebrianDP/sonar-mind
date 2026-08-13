import React from 'react';
import { Icon } from '@/components/ui/Icon';

export interface InsightCardProps {
  type: 'strength' | 'growth';
  pillar: string;
  score: number;
  description: string;
}

export function InsightCard({ type, pillar, score, description }: InsightCardProps) {
  const isStrength = type === 'strength';
  
  return (
    <div className={`
      border p-5 lg:p-6 flex flex-col gap-5 rounded-3xl shadow-sm
      ${isStrength 
        ? 'bg-[#f6fcf7] border-[#d8f0dc]' 
        : 'bg-[#fef6f6] border-[#fadbdc]'
      }
    `}>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${isStrength ? 'text-accent-green' : 'text-accent-red'}`}>
            {isStrength ? 'Key Strength' : 'Growth Area'}
          </span>
          <h4 className="text-sm font-semibold text-text-strong">
            {pillar} <span className="whitespace-nowrap">({score})</span>
          </h4>
        </div>
        {isStrength ? (
          <Icon id="99472" className={`w-5 h-5 bg-accent-green`} />
        ) : (
          <Icon id="82783" className={`w-5 h-5 bg-accent-red`} />
        )}
      </div>
      <p className="text-sm text-text-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
