"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { ShieldCheck, CheckCircle2, ArrowLeft, Phone, BookOpen, Download, Sparkles } from "lucide-react";

export default function QualityGuaranteePage() {
  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 flex-1">
        <Link
          href="/"
          className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to eBook Store</span>
        </Link>

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 p-6 sm:p-10 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ZEROTOTENK SATISFACTION PROMISE</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            100% Actionable Quality &amp; Reader Guarantee
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Every ZeroToTenK playbook is crafted to deliver practical, zero-fluff systems that help ordinary people create reliable daily income. Here is our iron-clad reader commitment.
          </p>
        </div>

        {/* Guarantee Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-base text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>What We Guarantee</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li>&bull; <strong>100% Actionable Content:</strong> No vague theory or filler chapters. Every section comes with step-by-step instructions.</li>
              <li>&bull; <strong>Instant Delivery:</strong> Immediate PDF &amp; ePub download links sent to your WhatsApp and email upon payment.</li>
              <li>&bull; <strong>Turnkey Worksheets:</strong> Includes ready-to-duplicate Notion workspaces, Canva layouts, and tested copy swipe files.</li>
              <li>&bull; <strong>Free Lifetime Updates:</strong> When algorithms or strategies change, you receive updated editions at zero extra cost.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>7-Day Reader Protection</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li>&bull; If you implement the framework and feel the playbook did not provide massive value, reach out to our team within 7 days.</li>
              <li>&bull; We will either exchange for any other playbook in our library or issue a prompt refund.</li>
              <li>&bull; Personal WhatsApp support is available for all readers to answer questions and unblock implementation hurdles.</li>
            </ul>
          </div>
        </div>

        {/* Creator Support */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-bold text-white text-sm">Have Questions Before Purchasing?</h4>
            <p className="text-xs text-slate-400">Our publishing team is available on WhatsApp to help you choose the right guide.</p>
          </div>
          <a
            href="https://wa.me/916380640087?text=Hi%20ZeroToTenK,%20I%20have%20questions%20about%20the%20guarantee%20and%20playbooks"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl btn-emerald text-white font-black text-xs flex items-center gap-2 shadow-md shrink-0"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp +91 63806 40087</span>
          </a>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
