"use client";

import React from "react";
import { Download, CheckCircle2, Zap, ShieldCheck } from "lucide-react";

export function ZeptoServiceStrip() {
  return (
    <div className="bg-slate-900/80 border-y border-slate-800 py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-around gap-4 text-[11px] sm:text-xs font-bold text-slate-300 overflow-x-auto no-scrollbar">
        <span className="flex items-center gap-1.5 whitespace-nowrap text-emerald-400">
          <Download className="w-4 h-4 shrink-0" />
          <span>Instant Download Upon Payment</span>
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-teal-300">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>PDF + ePub + Notion Action Boards</span>
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-amber-400">
          <Zap className="w-4 h-4 shrink-0" />
          <span>Battle-Tested ₹0 to ₹10K/Day Frameworks</span>
        </span>
        <span className="flex items-center gap-1.5 whitespace-nowrap text-cyan-400">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Lifetime Free Edition Updates</span>
        </span>
      </div>
    </div>
  );
}
