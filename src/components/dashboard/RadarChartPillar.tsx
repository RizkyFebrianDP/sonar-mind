"use client";

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

const data = [
  { subject: 'Hallucination Audit', value: 86, fullMark: 100, colorClass: 'bg-accent-blue', textClass: 'text-accent-blue' },
  { subject: 'Algorithmic Bias', value: 72, fullMark: 100, colorClass: 'bg-accent-red', textClass: 'text-accent-red' },
  { subject: 'Ethical & Cognitive Agency', value: 78, fullMark: 100, colorClass: 'bg-accent-green', textClass: 'text-accent-green' },
];

export function RadarChartPillar() {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full min-w-0">
      {/* Radar Chart Area */}
      <div className="w-full md:w-1/2 h-[300px] min-w-0 min-h-0 relative flex justify-center items-center">
        <RadarChart
          responsive
          style={{ width: '100%', height: '100%' }}
          data={data}
        >
          <PolarGrid stroke="var(--border-strong)" strokeOpacity={0.5} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'var(--text-muted)', fontSize: 11, fontFamily: 'var(--font-mono)' }} 
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Competency"
            dataKey="value"
            stroke="var(--accent-blue)"
            strokeWidth={2}
            fill="var(--accent-blue)"
            fillOpacity={0.15}
          />
        </RadarChart>
      </div>

      {/* Progress Bars Area */}
      <div className="w-full md:w-1/2 space-y-6">
        {data.map((item) => (
          <div key={item.subject} className="relative">
            <div className="flex justify-between text-xs font-mono font-medium mb-2">
              <span className="text-text-strong uppercase tracking-wider">{item.subject}</span>
              <span className={item.textClass}>{item.value}/100</span>
            </div>
            {/* Track */}
            <div className="h-1.5 w-full bg-border-subtle rounded-none overflow-hidden relative border border-border-strong/30">
              {/* Fill */}
              <div 
                className={`absolute top-0 left-0 h-full ${item.colorClass} transition-all duration-1000 ease-out`} 
                style={{ width: `${item.value}%` }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
