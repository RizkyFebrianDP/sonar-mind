import React from 'react';
import { Icon } from '@/components/ui/Icon';
import Link from 'next/link';

export interface SummaryCardProps {
  title: string;
  score: number;
  maxScore?: number;
  label: string;
  labelColor: 'green' | 'red' | 'blue' | 'yellow' | 'pink';
  description: string;
  iconId: string;
  href?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    isZero: boolean;
  };
}

export function SummaryCard({
  title,
  score,
  maxScore = 100,
  label,
  labelColor,
  description,
  iconId,
  href,
  trend,
}: SummaryCardProps) {
  
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  const colorMap = {
    green: { border: 'border-accent-green', text: 'text-accent-green', bg: 'bg-accent-green', iconBg: 'bg-accent-green' },
    red: { border: 'border-pink-400', text: 'text-pink-500', bg: 'bg-pink-400', iconBg: 'bg-pink-400' },
    blue: { border: 'border-blue-400', text: 'text-blue-500', bg: 'bg-blue-400', iconBg: 'bg-blue-400' },
    yellow: { border: 'border-yellow-400', text: 'text-yellow-500', bg: 'bg-yellow-400', iconBg: 'bg-yellow-400' },
    pink: { border: 'border-pink-400', text: 'text-pink-500', bg: 'bg-pink-400', iconBg: 'bg-pink-400' },
  };

  const colorConfig = colorMap[labelColor as keyof typeof colorMap] || colorMap.blue;

  const content = (
    <div className={`bg-panel border ${colorConfig.border} rounded-3xl p-5 flex flex-col shadow-sm transition-shadow hover:shadow-md h-full`}>
      <div className="flex flex-col mb-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-base font-bold text-text-strong leading-tight">{title}</h3>
          {trend && (
            <div className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
              trend.isZero ? 'bg-black/5 dark:bg-white/10 text-text-muted' :
              trend.isPositive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
            }`}>
              {trend.isZero ? null : (
                <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {trend.isPositive ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  )}
                </svg>
              )}
              <span>{trend.isZero ? '-' : `${trend.isPositive ? '+' : '-'}${trend.value}`}</span>
            </div>
          )}
        </div>
        <span className="text-sm text-text-muted mt-1.5">{description}</span>
      </div>
      
      <div className="mt-auto mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="w-4/5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${colorConfig.bg} rounded-full`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="text-xs font-medium text-text-muted">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <span className={`text-sm font-bold ${colorConfig.text}`}>
          {label}
        </span>
        <Icon id={iconId} className={`w-5 h-5 ${colorConfig.iconBg}`} />
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="h-full block">{content}</Link>;
  }

  return content;
}
