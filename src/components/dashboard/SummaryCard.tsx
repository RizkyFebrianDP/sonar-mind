import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SummaryCardProps {
  title: string;
  score: number;
  maxScore?: number;
  label: string;
  labelColor: 'green' | 'red' | 'blue' | 'yellow' | 'pink';
  description: string;
  icon: LucideIcon;
}

export function SummaryCard({
  title,
  score,
  maxScore = 100,
  label,
  labelColor,
  description,
  icon: Icon
}: SummaryCardProps) {
  
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));

  const colorMap = {
    green: { border: 'border-accent-green', text: 'text-accent-green', bg: 'bg-accent-green' },
    red: { border: 'border-pink-400', text: 'text-pink-500', bg: 'bg-pink-400' },
    blue: { border: 'border-blue-400', text: 'text-blue-500', bg: 'bg-blue-400' },
    yellow: { border: 'border-yellow-400', text: 'text-yellow-500', bg: 'bg-yellow-400' },
  };

  const colorConfig = colorMap[labelColor as keyof typeof colorMap] || colorMap.blue;

  return (
    <div className={`bg-panel border ${colorConfig.border} rounded-3xl p-5 flex flex-col shadow-sm transition-shadow hover:shadow-md h-full`}>
      <div className="flex flex-col mb-4">
        <h3 className="text-base font-bold text-text-strong">{title}</h3>
        <span className="text-sm text-text-muted mt-1">{description}</span>
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
        <Icon className="w-4 h-4 text-text-muted" />
      </div>
    </div>
  );
}
