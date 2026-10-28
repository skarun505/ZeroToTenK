import React from "react";
import Link from "next/link";
import { RotateCcw, CheckCircle2, ArrowLeft, ShieldCheck } from "lucide-react";

export default function ReturnsPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 min-h-screen text-slate-100 bg-[#090d16]">
      <div>
        <Link href="/" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1.5 mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
        </Link>
        <h1 className="text-3xl font-black text-white">
          7-Day Reader Satisfaction &amp; Refund Policy
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Zero-risk purchase protection on all ZeroToTenK digital playbooks and bundles.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none text-xs text-slate-300 space-y-6">
        <section className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
          <h2 className="text-sm font-bold flex items-center gap-2 mb-2 text-white">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            100% Satisfaction Guarantee: 7 Days
          </h2>
          <p>
            We stand completely behind the quality and practical power of our eBooks. If you read the playbook, apply the framework, and feel it did not deliver immense value, you can request an exchange or full refund within 7 calendar days of purchase.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-bold text-white">1. Refund &amp; Exchange Process</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Simply message our creator support desk on WhatsApp (+91 63806 40087) with your Order ID.</li>
            <li>Let us know why the guide wasn&apos;t the right fit for your goals.</li>
            <li>You can choose to switch to any other playbook in our library or receive a direct UPI refund.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-bold text-white">2. Refund Processing Time</h3>
          <p>
            Direct UPI refunds are initiated within 24 hours back to your original paying VPA/PhonePe/Google Pay account.
          </p>
        </section>
      </div>
    </div>
  );
}
