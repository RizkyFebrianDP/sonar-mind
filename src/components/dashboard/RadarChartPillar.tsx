"use client";

import React from "react";
import { ResponsiveRadar } from "@nivo/radar";
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
      score: scores.criticalEvaluation,
      colorClass: "bg-accent-blue",
      textClass: "text-accent-blue",
    },
    {
      subject: "Algorithmic Bias",
      score: scores.algorithmicBiasAwareness,
      colorClass: "bg-accent-red",
      textClass: "text-accent-red",
    },
    {
      subject: "Ethical & Agency",
      score: Math.round((scores.ethicalReasoning + scores.cognitiveAgency) / 2),
      colorClass: "bg-accent-green",
      textClass: "text-accent-green",
    },
  ];

  const hasData = data.some((d) => d.score > 0);
  
  // Custom theme for Nivo to match Tailwind colors and variables
  const nivoTheme = {
    textColor: "var(--text-muted)",
    fontSize: 11,
    fontFamily: "var(--font-mono)",
    grid: {
      line: {
        stroke: "var(--border-strong)",
        strokeWidth: 1,
        strokeOpacity: 0.5,
      },
    },
    tooltip: {
      container: {
        background: "var(--panel)",
        color: "var(--text-strong)",
        fontSize: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        border: "1px solid var(--border-subtle)",
      },
    },
    dots: {
      text: {
        fill: "var(--text-strong)",
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between w-full min-w-0">
      {/* Radar Chart */}
      <div className="w-full md:w-1/2 h-[300px] min-w-0 min-h-0 relative flex justify-center items-center">
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <p className="text-xs text-text-muted text-center bg-panel/90 px-4 py-2 rounded-xl backdrop-blur-sm border border-border-subtle shadow-sm">
              Selesaikan assessment untuk<br />melihat radar chart kamu
            </p>
          </div>
        )}
        <div style={{ width: "100%", height: "100%", opacity: hasData ? 1 : 0.3 }} className="transition-opacity duration-500">
          <ResponsiveRadar
            data={data}
            keys={["score"]}
            indexBy="subject"
            maxValue={100}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            curve="linearClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={4}
            gridShape="linear"
            gridLabelOffset={16}
            gridLabel={({ id, x, y, anchor }) => {
              const lines = String(id).split(" ");
              const lineHeight = 14;
              const startDy = -((lines.length - 1) * lineHeight) / 2;
              
              return (
                <text
                  x={x}
                  y={y}
                  textAnchor={anchor}
                  dominantBaseline="central"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fill: "var(--text-muted)",
                    fontWeight: 500,
                  }}
                >
                  {lines.map((line, i) => (
                    <tspan key={i} x={x} dy={i === 0 ? startDy : lineHeight}>
                      {line}
                    </tspan>
                  ))}
                </text>
              );
            }}
            enableDots={true}
            dotSize={6}
            dotColor="var(--panel)"
            dotBorderWidth={2}
            dotBorderColor={{ from: "color" }}
            enableDotLabel={false}
            colors={["var(--accent-blue)"]}
            fillOpacity={0.25}
            blendMode="normal"
            animate={true}
            motionConfig="wobbly"
            theme={nivoTheme}
          />
        </div>
      </div>

      {/* Progress Bars */}
      <div className="w-full md:w-1/2 space-y-6">
        {data.map((item) => (
          <div key={item.subject} className="relative group">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-medium mb-2">
              <span className="text-text-strong uppercase tracking-wider group-hover:text-accent-blue transition-colors break-words max-w-full">
                {item.subject}
              </span>
              <span className={`${item.textClass} shrink-0`}>
                {hasData ? `${item.score}/100` : "--/100"}
              </span>
            </div>
            {/* Background stack/gray for progress bar */}
            <div className="h-2 w-full bg-border-subtle dark:bg-border-strong rounded-full overflow-hidden relative border border-border-subtle/50">
              <div
                className={`absolute top-0 left-0 h-full ${item.colorClass} transition-all duration-1000 ease-out rounded-full`}
                style={{ width: hasData ? `${item.score}%` : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
