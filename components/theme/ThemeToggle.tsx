"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Laptop } from "lucide-react";

interface ThemeToggleProps {
  variant?: "nav" | "floating" | "dropdown";
  className?: string;
}

export function ThemeToggle({ variant = "nav", className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render placeholder to avoid layout shift and SSR mismatch
    return (
      <div
        className={`w-9 h-9 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 animate-pulse ${className}`}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (variant === "floating") {
    return (
      <aside
        aria-label="Theme Selection"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 p-1 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all"
      >
        <button
          onClick={() => setTheme("light")}
          title="Switch to Light Mode"
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            theme === "light"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Light</span>
        </button>

        <button
          onClick={() => setTheme("dark")}
          title="Switch to Dark Mode"
          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            theme === "dark"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Dark</span>
        </button>

        <button
          onClick={() => setTheme("system")}
          title="System Preference"
          className={`p-1.5 rounded-xl text-xs font-bold transition-all ${
            theme === "system"
              ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Laptop className="w-3.5 h-3.5" />
        </button>
      </aside>
    );
  }

  // "nav" variant - sleek header button
  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Activate Light Mode" : "Activate Dark Mode"}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-all shadow-xs hover:scale-105 active:scale-95 ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-amber-400 rotate-0 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600 transition-transform duration-300 hover:-rotate-12" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
