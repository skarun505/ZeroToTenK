"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Sparkles, Zap, Package, Tag, Rocket, Flame } from "lucide-react";

export function MobileCategoryTray() {
  const categories = [
    {
      title: "10K Blueprint",
      href: "/category/blueprint-courses",
      badge: "Flagship",
      badgeColor: "bg-emerald-600",
      gradient: "from-emerald-600 to-teal-600",
      icon: Rocket,
    },
    {
      title: "Creation & AI",
      href: "/category/creation-and-writing",
      badge: "Popular",
      badgeColor: "bg-indigo-600",
      gradient: "from-indigo-600 to-blue-600",
      icon: BookOpen,
    },
    {
      title: "Funnels & Copy",
      href: "/category/funnels-and-sales",
      badge: "High ROI",
      badgeColor: "bg-rose-600",
      gradient: "from-rose-600 to-pink-600",
      icon: Sparkles,
    },
    {
      title: "Organic Traffic",
      href: "/category/traffic-and-social",
      badge: "Zero Ads",
      badgeColor: "bg-blue-600",
      gradient: "from-blue-600 to-cyan-700",
      icon: Zap,
    },
    {
      title: "WhatsApp Bot",
      href: "/category/automation-and-scaling",
      badge: "Autopilot",
      badgeColor: "bg-teal-600",
      gradient: "from-teal-600 to-emerald-700",
      icon: Flame,
    },
    {
      title: "Empire Vault",
      href: "/category/mega-bundles",
      badge: "80% OFF",
      badgeColor: "bg-amber-500 text-slate-950 font-black animate-pulse",
      gradient: "from-amber-400 to-yellow-600",
      icon: Package,
    },
  ];

  return (
    <div className="md:hidden py-3 px-4 bg-slate-950 border-y border-slate-800">
      <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1">
        {categories.map((c, i) => {
          const Icon = c.icon;
          return (
            <Link
              key={i}
              href={c.href}
              className="flex flex-col items-center gap-1.5 shrink-0 group"
            >
              <div className="relative">
                <div
                  className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${c.gradient} p-0.5 shadow-md group-hover:scale-105 transition-transform`}
                >
                  <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>
                {c.badge && (
                  <span
                    className={`absolute -top-1.5 -right-1 px-1.5 py-0.2 text-[8px] font-black text-white rounded-full ${c.badgeColor} shadow-sm whitespace-nowrap`}
                  >
                    {c.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-slate-300 group-hover:text-emerald-400 text-center tracking-tight">
                {c.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
