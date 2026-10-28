"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Grid,
  Zap,
  Download,
  ShieldCheck,
  X,
  BookOpen,
  ArrowRight,
  Package,
  Sparkles,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  // Hide bottom nav on admin panel, checkout, and product details so Buy Now button is 100% clear with zero overlay
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/product") ||
    pathname.startsWith("/checkout")
  ) {
    return null;
  }

  const isHome = pathname === "/";
  const isCategory = pathname.startsWith("/category") || pathname.startsWith("/categories") || categoriesOpen;
  const isOrder = pathname.startsWith("/order");
  const isWarranty = pathname.startsWith("/warranty") || pathname.startsWith("/grading-guide");

  const categoryItems = [
    {
      title: "10K Blueprints",
      href: "/category/blueprint-courses",
      sub: "Core Roadmaps & Frameworks",
      badge: "Flagship",
      badgeColor: "bg-emerald-600",
      icon: BookOpen,
    },
    {
      title: "eBook Creation & Writing",
      href: "/category/creation-and-writing",
      sub: "48-Hour Guides & AI Prompts",
      badge: "Fast Launch",
      badgeColor: "bg-indigo-600",
      icon: Sparkles,
    },
    {
      title: "Sales Funnels & Copy",
      href: "/category/funnels-and-sales",
      sub: "Landing Pages & Copywriting",
      badge: "High ROI",
      badgeColor: "bg-rose-600",
      icon: Zap,
    },
    {
      title: "Traffic & Organic Reach",
      href: "/category/traffic-and-social",
      sub: "Reels & Social Funnels",
      badge: "Zero Ads",
      badgeColor: "bg-blue-600",
      icon: Sparkles,
    },
    {
      title: "Automation & Scaling",
      href: "/category/automation-and-scaling",
      sub: "WhatsApp Bots & Email Systems",
      badge: "Autopilot",
      badgeColor: "bg-teal-600",
      icon: Zap,
    },
    {
      title: "All-Access Empire Vault",
      href: "/category/mega-bundles",
      sub: "All 11 Books + Notion Systems",
      badge: "80% OFF",
      badgeColor: "bg-amber-500 text-slate-950 font-black",
      icon: Package,
    },
  ];

  return (
    <>
      {/* MOBILE CATEGORIES SLIDE-UP DRAWER */}
      {categoriesOpen && (
        <div
          className="md:hidden fixed inset-0 z-[110] bg-black/75 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-150"
          onClick={() => setCategoriesOpen(false)}
        >
          <div
            className="w-full bg-slate-900 rounded-t-3xl border-t border-slate-800 p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[85vh] overflow-y-auto pb-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-12 h-1 bg-slate-700 rounded-full mx-auto -mt-1 mb-1" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800/40">
                  <Grid className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">
                    eBook Library Directory
                  </h3>
                  <p className="text-[10px] text-slate-400">
                    Step-by-step playbooks to earn ₹10,000/day
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCategoriesOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {categoryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setCategoriesOpen(false);
                      router.push(item.href);
                    }}
                    className="p-3 rounded-2xl border border-slate-800 bg-slate-950/70 hover:bg-slate-800/90 text-left flex flex-col justify-between space-y-2 active:scale-98 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[8px] font-black uppercase text-white px-1.5 py-0.5 rounded-full shadow-xs ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white group-hover:text-emerald-400 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{item.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Flash Deals & Quick Jumps */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setCategoriesOpen(false);
                  router.push("/flash-sale");
                }}
                className="w-full p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 via-teal-950/80 to-slate-900 border border-emerald-600/40 flex items-center justify-between text-left active:scale-98 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-emerald-300 block">
                      ⚡ Creator Flash Deals
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Save flat 75% on playbooks today
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setCategoriesOpen(false);
                  router.push("/categories");
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View All 6 Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STICKY BOTTOM NAVIGATION BAR */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-[100] pointer-events-auto touch-manipulation select-none bg-slate-950/98 backdrop-blur-xl border-t border-slate-800 px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom,12px))] flex justify-around items-center shadow-[0_-4px_25px_rgba(0,0,0,0.5)]"
        aria-label="Mobile Navigation"
      >
        {/* 1. Home */}
        <Link
          href="/"
          prefetch={true}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative active:scale-90 ${
            isHome
              ? "text-emerald-400 font-black"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Home className={`w-5 h-5 ${isHome ? "stroke-[2.5]" : ""}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
          {isHome && (
            <span className="w-1.5 h-1 bg-emerald-400 rounded-full absolute -bottom-1" />
          )}
        </Link>

        {/* 2. Categories Drawer */}
        <button
          type="button"
          onClick={() => setCategoriesOpen((prev) => !prev)}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative active:scale-90 cursor-pointer ${
            isCategory
              ? "text-emerald-400 font-black"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Grid className={`w-5 h-5 ${isCategory ? "stroke-[2.5]" : ""}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Library</span>
          {isCategory && (
            <span className="w-1.5 h-1 bg-emerald-400 rounded-full absolute -bottom-1" />
          )}
        </button>

        {/* 3. Flash Deals */}
        <Link
          href="/flash-sale"
          className="flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all text-slate-400 hover:text-emerald-400 relative group active:scale-90"
        >
          <div className="relative">
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1.5 -right-3 px-1 py-0.2 bg-amber-500 text-slate-950 text-[7px] font-black rounded-full uppercase shadow-xs">
              HOT
            </span>
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 font-black text-amber-400">
            Deals
          </span>
        </Link>

        {/* 4. Track Downloads */}
        <Link
          href="/order/lookup"
          prefetch={true}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative active:scale-90 ${
            isOrder
              ? "text-emerald-400 font-black"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Download className={`w-5 h-5 ${isOrder ? "stroke-[2.5]" : ""}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Downloads</span>
          {isOrder && (
            <span className="w-1.5 h-1 bg-emerald-400 rounded-full absolute -bottom-1" />
          )}
        </Link>

        {/* 5. Guarantee */}
        <Link
          href="/warranty"
          prefetch={true}
          className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] rounded-xl transition-all relative active:scale-90 ${
            isWarranty
              ? "text-emerald-400 font-black"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <ShieldCheck className={`w-5 h-5 ${isWarranty ? "stroke-[2.5]" : ""}`} />
          <span className="text-[10px] tracking-tight mt-0.5">Guarantee</span>
          {isWarranty && (
            <span className="w-1.5 h-1 bg-emerald-400 rounded-full absolute -bottom-1" />
          )}
        </Link>
      </nav>
    </>
  );
}
