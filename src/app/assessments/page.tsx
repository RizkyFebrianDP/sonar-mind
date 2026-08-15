"use client";

import React from "react";
import { AssessmentHeroCard } from "@/components/assessments/AssessmentHeroCard";
import { AssessmentSections } from "@/components/assessments/AssessmentSections";
import { PreviousAttemptsWidget } from "@/components/assessments/PreviousAttemptsWidget";
import { DidYouKnowCard } from "@/components/assessments/DidYouKnowCard";
import { useLanguage } from "@/context/LanguageContext";

export default function AssessmentsPage() {
  const { t } = useLanguage();
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span>{t.sidebar.dashboard}</span>
            <span className="opacity-50">/</span>
            <span className="font-medium text-text-strong">{t.sidebar.assessments}</span>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-strong font-heading tracking-tight">
              {t.assessments.title}
            </h1>
            <p className="text-text-muted text-sm mt-1">
              {t.assessments.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Card */}
      <AssessmentHeroCard />

      {/* Two Column Layout for the rest */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2">
          <AssessmentSections />
        </div>

        {/* Right Column (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <PreviousAttemptsWidget />
          <DidYouKnowCard />
        </div>
        
      </div>
    </div>
  );
}
