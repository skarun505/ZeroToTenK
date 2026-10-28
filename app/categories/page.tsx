"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { BookOpen, Sparkles, Zap, Package, Rocket, ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const categories = [
    {
      slug: "blueprint-courses",
      title: "Zero to 10K Blueprints",
      desc: "Flagship master roadmaps and step-by-step systems to build a scalable daily digital income stream.",
      icon: Rocket,
      count: "2 Core Blueprints",
      badge: "Flagship",
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      slug: "creation-and-writing",
      title: "eBook Creation & Writing",
      desc: "48-Hour Micro-eBook methods, 850+ AI prompts, and validated profitable niches for 2026.",
      icon: BookOpen,
      count: "3 Guides & Prompts",
      badge: "High Demand",
      gradient: "from-indigo-600 to-blue-600",
    },
    {
      slug: "funnels-and-sales",
      title: "Sales Funnels & Copywriting",
      desc: "Psychology-backed mobile landing pages, headline formulas, and high-converting UPI checkouts.",
      icon: Sparkles,
      count: "2 Playbooks",
      badge: "12% Conv. Rate",
      gradient: "from-rose-600 to-pink-600",
    },
    {
      slug: "traffic-and-social",
      title: "Traffic & Organic Reach",
      desc: "Zero ad-spend systems for Instagram Reels, carousels, Threads, and high-retention viral hooks.",
      icon: Zap,
      count: "2 Growth Systems",
      badge: "100% Organic",
      gradient: "from-blue-600 to-cyan-600",
    },
    {
      slug: "automation-and-scaling",
      title: "Automation & Scaling",
      desc: "Automated WhatsApp sales bots, email nurture broadcasts, and scaling systems to hit ₹1 Lakh+/mo.",
      icon: Zap,
      count: "2 Systems",
      badge: "Autopilot",
      gradient: "from-teal-600 to-emerald-600",
    },
    {
      slug: "mega-bundles",
      title: "All-Access Empire Vault",
      desc: "All 11 Master eBooks + 50 Notion Workbooks + 250 Canva Templates + VIP Mastermind Pass.",
      icon: Package,
      count: "Complete Collection",
      badge: "80% OFF Value",
      gradient: "from-amber-500 to-yellow-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
            ZEROTOTENK DIGITAL PUBLISHING
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            Browse by Playbook Category
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Select a specialized category to access battle-tested roadmaps, templates, and frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((c, i) => {
            const Icon = c.icon;
            return (
              <Link
                key={i}
                href={`/category/${c.slug}`}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-6 transition-all flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-emerald-950/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.gradient} p-0.5 flex items-center justify-center shadow-md`}>
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                        <Icon className="w-6 h-6 text-emerald-400" />
                      </div>
                    </div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                      {c.badge}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-white group-hover:text-emerald-400 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {c.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs font-bold text-emerald-400">
                  <span>{c.count}</span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
