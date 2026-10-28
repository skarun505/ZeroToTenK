"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface WarrantyStripProps {
  warrantyMonths?: number;
  returnDays?: number;
}

export function WarrantyStrip({ warrantyMonths = 30, returnDays = 7 }: WarrantyStripProps) {
  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
      <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-wider">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span>ZeroToTenK Reader Assurance</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>2026 Master Edition</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Instant Download + WhatsApp Delivery</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>Includes Actionable Templates</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span>7-Day Satisfaction Guarantee</span>
        </div>
      </div>
    </div>
  );
}
