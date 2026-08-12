"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import type { PillarScores } from "@/types/assessment";

interface RadarChartPillarProps {
  scores?: PillarScores;
}

const DEFAULT_SCORES: PillarScores = {
  criticalEvaluation: 0,
  algorithmicBiasAwareness: 0,
  ethicalReasoning: 0,
  cognitiveAgency: 0,
};

export function RadarChartPillar({ scores = DEFAULT_SCORES }: RadarChartPillarProps) {
  const data = [
    {
      subject: "Hallucination Audit",
      value: scores.criticalEvaluation,
      fullMark: 100,
      colorClass: "bg-accent-blue",
      textClass: "text-accent-blue",
    },
    {
      subject: "Algorithmic Bias",
      value: scores.algorithmicBiasAwareness,
      fullMark: 100,
      colorClass: "bg-accent-red",
      textClass: "text-accent-red",
    },
    {
      subject: "Ethical & Agency",
      value: Math.round((scores.ethicalReasoning + scores.cognitiveAgency) / 2),
      fullMark: 100,
      colorClass: "bg-accent-green",
      textClass: "text-accent-green",
    },
  ];

  const hasData = data.some((d) => d.value > 0);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-between w-full min-w-0">
      {/* Radar Chart */}
      <div className="w-full md:w-1/2 h-[280px] min-w-0 min-h-0 relative flex justify-center items-center">
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-xs text-text-muted text-center bg-panel/80 px-4 py-2 rounded-xl">
              Selesaikan assessment untuk<br />melihat radar chart kamu
            </p>
          </div>
        )}
        <RadarChart
          responsive
          style={{ width: "100%", height: "100%", opacity: hasData ? 1 : 0.3 }}
          data={data}
        >
          <PolarGrid stroke="var(--border-strong)" strokeOpacity={0.5} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fill: "var(--text-muted)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
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

      {/* Progress Bars */}
      <div className="w-full md:w-1/2 space-y-6">
        {data.map((item) => (
          <div key={item.subject} className="relative">
            <div className="flex justify-between text-xs font-mono font-medium mb-2">
              <span className="text-text-strong uppercase tracking-wider">
                {item.subject}
              </span>
              <span className={item.textClass}>
                {hasData ? `${item.value}/100` : "--/100"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-sidebar-border rounded-none overflow-hidden relative border border-sidebar-border/60">
              <div
                className={`absolute top-0 left-0 h-full ${item.colorClass} transition-all duration-1000 ease-out`}
                style={{ width: hasData ? `${item.value}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
