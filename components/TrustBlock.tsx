"use client";

import React from "react";
import { ShieldCheck, Download, Award, Zap, CheckCircle2 } from "lucide-react";

export function TrustBlock() {
  const points = [
    {
      icon: Award,
      title: "Proven ₹10K/Day Systems",
      desc: "Every guide is distilled from actual live campaigns, real sales screenshots, and verified revenue numbers.",
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: Download,
      title: "Instant Digital Access",
      desc: "Get your download links via email and WhatsApp within seconds of payment completion. Zero waiting.",
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: Zap,
      title: "Turnkey Action Templates",
      desc: "Includes Notion dashboards, Canva mockups, fill-in-the-blank sales copy, and AI prompt spreadsheets.",
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Direct UPI & 100% Safe",
      desc: "Pay securely via PhonePe, Google Pay, Paytm, BHIM, or any UPI app with instant QR scanning.",
      color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 shadow-md hover:shadow-emerald-950/30 transition-all space-y-2.5"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${p.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-1.5">
                <span>{p.title}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {p.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
