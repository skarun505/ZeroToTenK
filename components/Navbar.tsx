"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Zap, Flame, Phone, Download, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md text-slate-800 dark:text-white transition-colors duration-200">
      {/* Top micro-announcement banner */}
      <Link
        href="/flash-sale"
        className="block bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-3 sm:px-4 py-1.5 text-center text-[10.5px] sm:text-xs font-black hover:opacity-95 transition-opacity shadow-inner"
      >
        <div className="flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 shrink-0 text-yellow-300 animate-bounce" />
          <span className="truncate">
            🚀 ZERO TO ₹10K/DAY SPECIAL SALE: UP TO 80% OFF DIGITAL PLAYBOOKS &bull; INSTANT PDF + NOTION ACCESS ➔
          </span>
        </div>
      </Link>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative h-9 sm:h-11 w-auto flex items-center bg-white/90 dark:bg-transparent px-1.5 py-0.5 rounded-lg border border-slate-200 dark:border-transparent">
            <img
              src="/logo.svg"
              alt="ZeroToTenK Digital"
              className="h-7 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <span className="hidden sm:inline text-[9px] uppercase font-black tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-600/40 shrink-0">
            Instant Digital Download
          </span>
        </Link>

        {/* Categories Nav (Desktop) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link href="/" prefetch={true} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            All eBooks
          </Link>
          <Link href="/category/blueprint-courses" prefetch={true} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            10K Blueprints
          </Link>
          <Link href="/category/funnels-and-sales" prefetch={true} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
            Funnels &amp; Copy
          </Link>
          <Link href="/category/traffic-and-social" prefetch={true} className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Organic Traffic
          </Link>
          <Link href="/category/mega-bundles" prefetch={true} className="hover:text-amber-600 dark:hover:text-yellow-400 transition-colors text-amber-600 dark:text-yellow-300 font-bold flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-yellow-400" />
            All-Access Vault
          </Link>
          <Link
            href="/flash-sale"
            prefetch={true}
            className="px-3 py-1 rounded-full btn-gold text-slate-950 font-black text-xs flex items-center gap-1 shadow-md hover:scale-105 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-slate-950" />
            <span>Flash Deals</span>
          </Link>
        </nav>

        {/* Right side actions - Theme Toggle, Track Order & WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Light / Dark Mode Toggle */}
          <ThemeToggle variant="nav" />

          <Link
            href="/order/lookup"
            prefetch={true}
            className="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/90 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
            <span>My Downloads</span>
          </Link>

          <a
            href="https://wa.me/916380640087?text=Hi%20ZeroToTenK,%20I%20have%20a%20question%20about%20the%20eBooks"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-xs font-bold text-emerald-700 dark:text-emerald-400 items-center gap-1.5 px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-800/40 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Creator Support</span>
          </a>
        </div>
      </div>
    </header>
  );
}
