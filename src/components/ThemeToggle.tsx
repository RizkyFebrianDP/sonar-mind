"use client";

import * as React from "react";
import { Icon } from "@/components/ui/Icon";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative flex items-center justify-center w-10 h-10 border border-border-subtle hover:bg-panel rounded-xl transition-colors duration-200 cursor-pointer"
      aria-label="Toggle Theme"
    >
      <Icon id="82718" className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 bg-foreground" />
      <Icon id="88860" className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 bg-foreground" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
