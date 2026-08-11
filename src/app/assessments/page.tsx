"use client";

import React from "react";
import { AssessmentHeroCard } from "@/components/assessments/AssessmentHeroCard";
import { AssessmentSections } from "@/components/assessments/AssessmentSections";
import { PreviousAttemptsWidget } from "@/components/assessments/PreviousAttemptsWidget";
import { DidYouKnowCard } from "@/components/assessments/DidYouKnowCard";

export default function AssessmentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-8">
        <h1 className="text-3xl font-heading font-bold text-text-strong">Assessments</h1>
        <p className="text-text-muted">Test how critically, ethically, and independently you interact with AI.</p>
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
