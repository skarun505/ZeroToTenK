"use client";

import React from "react";
import { Download, CheckCircle2, FileText, Smartphone, Laptop } from "lucide-react";

export function RepairDisclosure() {
  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
      <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-400 uppercase tracking-wide">
        <Download className="w-4 h-4 text-emerald-400" />
        <span>What You Get Inside Every Playbook</span>
      </div>
      <ul className="text-xs text-slate-300 space-y-2">
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>Full Master PDF Guide (designed for easy reading on phone, tablet, and laptop).</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>Universal ePub format for Apple Books, Kindle, and Google Play Books.</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>1-Click Notion Template to track your progress and copy-paste swipe files.</span>
        </li>
        <li className="flex items-start gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <span>Instant WhatsApp delivery + email backup link with lifetime update access.</span>
        </li>
      </ul>
    </div>
  );
}
