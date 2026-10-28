"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { BookOpen, Download, Smartphone, Laptop, FileText, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function DigitalDeliveryGuidePage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1">
        <Link
          href="/"
          className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Store</span>
        </Link>

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 sm:p-10 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>FORMATS &amp; DELIVERY STANDARD</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            ZeroToTenK Digital Delivery &amp; Reading Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            How our eBooks, templates, and swipe files are structured so you can read on any device and start implementing immediately.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-white">Mobile-Optimized PDF</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Designed with high-legibility typography and single-column layout so you can read smoothly on iPhone or Android without pinching and zooming.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-white">Notion Action Systems</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              1-click duplicate into your personal Notion account. Contains progress trackers, checklist milestones, and copy swipe databases.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-sm text-white">Instant Multi-Channel Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Direct download link sent to your WhatsApp and Email immediately after UPI verification. Lifetime updates included for free.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
