"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface ConditionBadgeProps {
  grade?: string;
  size?: "sm" | "md" | "lg" | string;
}

export function ConditionBadge({ grade, size }: ConditionBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${size === "sm" ? "text-[10px]" : "text-[11px]"} font-black uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-xs`}>
      <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
      <span>2026 Master Edition</span>
    </div>
  );
}
