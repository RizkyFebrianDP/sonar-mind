"use client";

import React from "react";
import { PenLine } from "lucide-react";

interface JustificationInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  minLength?: number;
}

export function JustificationInput({
  value,
  onChange,
  disabled,
  minLength = 50,
}: JustificationInputProps) {
  const charCount = value.length;
  const isValid = charCount >= minLength;

  return (
    <div className="bg-panel rounded-2xl p-5 border border-sidebar-border">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-7 h-7 rounded-lg bg-teal-500/10 flex items-center justify-center">
          <PenLine className="w-3.5 h-3.5 text-teal-500" />
        </div>
        <h3 className="text-sm font-bold text-text-strong font-heading">
          Justifikasi Pendapatmu
        </h3>
      </div>
      <p className="text-xs text-text-muted mb-3">
        Jelaskan mengapa kamu mengidentifikasi bias tersebut. Tulis dengan spesifik
        dan sebutkan bukti dari tabel di atas.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Contoh: Saya menemukan bias gender karena Sari Dewi yang memiliki IPK 3.9 dan 4 tahun pengalaman diperingkatkan di bawah kandidat laki-laki dengan kualifikasi lebih rendah..."
        rows={5}
        className={`w-full bg-background text-text-body text-sm rounded-xl px-4 py-3 border resize-none transition-all outline-none leading-relaxed placeholder:text-text-muted/50 ${
          disabled
            ? "opacity-60 cursor-not-allowed border-sidebar-border"
            : "border-sidebar-border focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20"
        }`}
      />

      {/* Character Counter */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-text-muted">
          Minimum {minLength} karakter diperlukan
        </p>
        <span
          className={`text-xs font-medium tabular-nums ${
            isValid ? "text-green-500" : "text-text-muted"
          }`}
        >
          {charCount} / {minLength}
          {isValid && " ✓"}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mt-2 h-1.5 rounded-full bg-sidebar-border overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            isValid ? "bg-green-500" : "bg-accent-blue"
          }`}
          style={{ width: `${Math.min((charCount / minLength) * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
