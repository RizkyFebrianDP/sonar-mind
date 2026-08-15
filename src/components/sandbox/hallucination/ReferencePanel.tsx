"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/context/LanguageContext";

interface Reference {
  claim: string;
  source: string;
}

interface ReferencePanelProps {
  references: Reference[];
}

export function ReferencePanel({ references }: ReferencePanelProps) {
  const { locale } = useLanguage();

  return (
    <div className="bg-panel rounded-2xl p-5 border border-sidebar-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
          <Icon id="82742" className="w-4 h-4 bg-accent-blue" />
        </div>
        <h3 className="text-sm font-bold text-text-strong font-heading">
          {locale === "en" ? "Reference Panel" : "Panel Referensi"}
        </h3>
      </div>
      <p className="text-xs text-text-muted mb-4 leading-relaxed">
        {locale === "en" ? "Use the sources below to evaluate the accuracy of the text." : "Gunakan sumber-sumber di bawah ini untuk menilai keakuratan teks."}
      </p>
      <div className="space-y-3">
        {references.map((ref, idx) => (
          <div
            key={idx}
            className="p-3 rounded-xl bg-background border border-sidebar-border"
          >
            <p className="text-xs font-semibold text-text-strong mb-1">
              📌 {ref.claim}
            </p>
            <p className="text-xs text-text-muted leading-relaxed">
              {ref.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
