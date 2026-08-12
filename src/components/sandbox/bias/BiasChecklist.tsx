"use client";

import React from "react";
import { Check } from "lucide-react";

const BIAS_OPTIONS = [
  { id: "gender", label: "Bias Gender", emoji: "⚥", description: "Diskriminasi berdasarkan jenis kelamin" },
  { id: "cultural", label: "Stereotip Budaya/Etnis", emoji: "🌍", description: "Prasangka berbasis suku atau budaya" },
  { id: "political", label: "Keberpihakan Politik", emoji: "🏛️", description: "Favoritism terhadap pandangan politik tertentu" },
  { id: "age", label: "Bias Usia", emoji: "📅", description: "Diskriminasi berdasarkan usia" },
  { id: "socioeconomic", label: "Bias Sosio-ekonomi", emoji: "💰", description: "Diskriminasi berdasarkan status ekonomi" },
  { id: "none", label: "Tidak Ada Bias", emoji: "✅", description: "Sistem berjalan secara adil dan objektif" },
];

interface BiasChecklistProps {
  selected: Set<string>;
  onToggle: (id: string) => void;
  disabled?: boolean;
}

export function BiasChecklist({ selected, onToggle, disabled }: BiasChecklistProps) {
  return (
    <div className="bg-panel rounded-2xl p-5 border border-sidebar-border">
      <h3 className="text-sm font-bold text-text-strong font-heading mb-1">
        Jenis Bias yang Terdeteksi
      </h3>
      <p className="text-xs text-text-muted mb-4">
        Pilih semua jenis bias yang kamu identifikasi dalam hasil peringkat AI di atas.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {BIAS_OPTIONS.map((option) => {
          const isSelected = selected.has(option.id);
          return (
            <button
              key={option.id}
              onClick={() => !disabled && onToggle(option.id)}
              disabled={disabled}
              className={`flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                isSelected
                  ? "border-accent-blue bg-accent-blue/8"
                  : "border-sidebar-border bg-background hover:border-accent-blue/40 hover:bg-accent-blue/4"
              } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <div
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isSelected
                    ? "border-accent-blue bg-accent-blue"
                    : "border-sidebar-border"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-text-strong">
                  {option.emoji} {option.label}
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
