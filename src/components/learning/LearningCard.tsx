import React from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { LearningModule } from "@/data/learning-modules";

interface LearningCardProps {
  module: LearningModule;
  isCompleted?: boolean;
}

export function LearningCard({ module, isCompleted = false }: LearningCardProps) {
  return (
    <div className="flex flex-col bg-card-bg border border-card-border rounded-xl p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 relative group h-full">
      {/* Status Badge */}
      {isCompleted && (
        <div className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-500">
          <Icon id="94553" className="w-4 h-4" /> {/* check icon */}
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 bg-accent-blue/10 text-accent-blue rounded-xl flex items-center justify-center mb-4 shrink-0 group-hover:scale-110 transition-transform">
        <Icon id={module.iconId} className="w-6 h-6 bg-accent-blue" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-black/5 text-text-strong uppercase tracking-wider">
            {module.category}
          </span>
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Icon id="85434" className="w-3 h-3 bg-text-muted" /> {/* clock icon */}
            {module.duration}
          </span>
        </div>
        
        <h3 className="text-lg font-heading font-bold text-text-strong mb-2 leading-tight">
          {module.title}
        </h3>
        
        <p className="text-sm text-text-muted mb-6 flex-grow line-clamp-3">
          {module.description}
        </p>
      </div>

      {/* Action */}
      <div className="mt-auto pt-4 border-t border-card-border">
        <Link 
          href={module.actionUrl}
          className="flex items-center justify-center w-full py-2.5 px-4 bg-accent-blue text-white font-medium text-sm rounded-lg hover:bg-accent-blue/90 transition-colors"
        >
          {isCompleted ? "Review Module" : "Start Learning"}
        </Link>
      </div>
    </div>
  );
}
