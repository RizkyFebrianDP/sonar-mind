"use client";

import React from "react";

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="bg-panel rounded-2xl p-4 border border-sidebar-border">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
          Progress
        </span>
        <span className="text-xs font-bold text-text-strong tabular-nums">
          Situasi {current} / {total}
        </span>
      </div>
      <div className="h-2 bg-sidebar-border rounded-full overflow-hidden">
        <div
          className="h-full bg-accent-blue rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < current
                ? "bg-accent-blue"
                : i === current
                ? "bg-accent-blue/40"
                : "bg-sidebar-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
