"use client";

import React from "react";
import { Users, TrendingUp, Award, Phone, CheckCircle2, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export function StoreLocationMap() {
  const stats = [
    { label: "Active Readers & Creators", value: "12,400+", change: "+18% this month" },
    { label: "Average Daily Income Target", value: "₹10,000+", change: "Within 60-90 days" },
    { label: "5-Star Reader Reviews", value: "98.4%", change: "Verified UPI buyers" },
    { label: "Ready-to-Use Templates", value: "75+", change: "Notion, Canva & Prompts" },
  ];

  const caseStudies = [
    {
      name: "Rohit Verma",
      role: "Ex-Content Writer, Bengaluru",
      result: "₹14,200/Day with Micro-eBooks",
      quote: "I launched my first 38-page guide using the 48-Hour Micro-eBook method. The WhatsApp funnel setup alone generated 22 orders in 48 hours without ads.",
    },
    {
      name: "Pooja Hegde",
      role: "Freelance Designer, Pune",
      result: "₹2.4 Lakhs in Month 2",
      quote: "The Landing Page psychology chapter changed everything. My conversion rate tripled, and I finally stopped trading client hours for income.",
    },
    {
      name: "Kartik S.",
      role: "Digital Marketer, Chennai",
      result: "Scaled to ₹3 Lakhs/Mo",
      quote: "ZeroToTenK is the most actionable digital product library in India. Real UPI integration tactics, zero American fluff, and immediately usable swipe files.",
    },
  ];

  return (
    <section id="community" className="py-12 sm:py-16 bg-slate-950 border-t border-b border-slate-800 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 uppercase tracking-wider shadow-xs">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Real Results &bull; 10,000+ Readers Across India</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            How Everyday People Are Earning <span className="text-emerald-400">₹10K/Day</span>
          </h2>

          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Read real stories from students, creators, and freelancers who turned simple knowledge and micro-guides into dependable daily digital income streams.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 text-center">
              <p className="text-2xl sm:text-3xl font-black text-emerald-400">{s.value}</p>
              <p className="text-xs font-bold text-slate-200">{s.label}</p>
              <p className="text-[11px] text-slate-400">{s.change}</p>
            </div>
          ))}
        </div>

        {/* 3 Student Case Studies */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {caseStudies.map((c, i) => (
            <div key={i} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-white text-base">{c.name}</h3>
                    <p className="text-xs text-slate-400">{c.role}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-600/30 text-emerald-300 font-black text-xs">
                    {c.result}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 pt-2 border-t border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified ZeroToTenK Reader</span>
              </div>
            </div>
          ))}
        </div>

        {/* Creator VIP Assistance */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-600/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-black text-white">Need Personal Recommendations for Your Niche?</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Connect directly with our founder on WhatsApp. Tell us your current skills or background and get a tailored 3-step action plan for your first eBook.
            </p>
          </div>

          <a
            href="https://wa.me/916380640087?text=Hi%20ZeroToTenK,%20I%20want%20guidance%20on%20choosing%20the%20best%20eBook%20for%20my%20niche"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3 rounded-xl btn-emerald text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat with Founder on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
