"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "id" ? "en" : "id")}
      className="flex items-center justify-center w-9 h-9 rounded-xl bg-panel border border-sidebar-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text-strong font-bold text-xs shadow-sm cursor-pointer"
      aria-label="Toggle language"
      title="Toggle language"
    >
      {locale.toUpperCase()}
    </button>
  );
}
