"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCategoryTray } from "@/components/MobileCategoryTray";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MobileSearchBar } from "@/components/MobileSearchBar";
import { StorefrontCatalog } from "@/components/StorefrontCatalog";
import { TrustBlock } from "@/components/TrustBlock";
import { StoreLocationMap } from "@/components/StoreLocationMap";
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  Download,
  Flame,
} from "lucide-react";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok && data.products) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.error("Error loading products:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />
      <MobileSearchBar />
      <MobileCategoryTray />

      {/* Hero Section - Sleek High-Converting Digital Publishing Aesthetic */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/60 to-[#090d16] border-b border-slate-800 py-10 sm:py-20">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>THE ZERO TO ₹10,000/DAY DIGITAL BLUEPRINT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Turn Your Knowledge Into A <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
                ₹10K/Day eBook Business
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Practical, field-tested playbooks, copywriting swipe files, and automated UPI funnels that show ordinary creators and freelancers how to sell high-demand digital guides predictably.
            </p>

            {/* Feature Highlights Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 pt-2 text-xs font-bold text-slate-200">
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Instant PDF + ePub Downloads
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Actionable Notion Workbooks
              </span>
              <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-xs">
                <Zap className="w-4 h-4 text-amber-400" />
                Zero Coding &bull; Direct UPI
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <a
                href="#deals"
                className="px-6 py-3.5 rounded-xl btn-emerald text-white font-black text-sm transition-all shadow-md flex items-center gap-2 hover:scale-105"
              >
                <span>Browse eBook Library</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/category/mega-bundles"
                className="px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-500/40 text-amber-300 font-black text-sm transition-all flex items-center gap-2 shadow-xs hover:border-amber-400"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>All-Access Empire Vault</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Limited-Time Creator Flash Deal Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 relative z-20 w-full">
        <Link
          href="/flash-sale"
          className="block p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-2xl transition-all group hover:border-emerald-400"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl btn-gold flex items-center justify-center shrink-0 shadow-lg">
                <Zap className="w-6 h-6 fill-slate-950 text-slate-950 animate-bounce" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-900/60 text-[10px] font-black text-emerald-300 tracking-wider uppercase mb-1 border border-emerald-600/30">
                  <Flame className="w-3 h-3 text-amber-400" />
                  <span>SPECIAL LAUNCH PROMOTION &bull; CODE: ZEROTOTENK</span>
                </div>
                <h2 className="text-base sm:text-xl font-black text-white group-hover:text-emerald-300 transition-colors">
                  FLAT 75% OFF All 12 Playbooks &bull; From Just ₹199
                </h2>
                <p className="text-xs text-slate-400">
                  Instant Download Link on WhatsApp &amp; Email &bull; Lifetime Free Updates
                </p>
              </div>
            </div>
            <div className="px-5 py-2.5 rounded-xl btn-emerald text-white font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 group-hover:scale-105 transition-transform shadow-lg">
              <span>View Flash Deals</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>

      {/* Main Catalog Section */}
      <main className="flex-1 py-8 sm:py-12 space-y-12">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-slate-400">Loading ZeroToTenK eBook Library...</p>
          </div>
        ) : (
          <StorefrontCatalog initialProducts={products} />
        )}

        <TrustBlock />
        <StoreLocationMap />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
