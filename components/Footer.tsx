"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Phone, Mail, ShieldCheck, Zap, Download, Award, CheckCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-slate-800 bg-[#070b16] text-slate-200 text-xs mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="ZeroToTenK" className="h-9 w-auto" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              <strong className="text-white">ZeroToTenK</strong> provides battle-tested blueprints, frameworks, and playbooks that show everyday people how to build a scalable ₹10,000/day income stream selling high-value eBooks and digital guides.
            </p>
            <div className="pt-1 text-xs text-emerald-400 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Satisfaction &amp; Instant Access Guarantee</span>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-emerald-400">Playbook Library</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><Link href="/category/blueprint-courses" className="hover:text-emerald-300 transition-colors">Zero to 10K Blueprints</Link></li>
              <li><Link href="/category/creation-and-writing" className="hover:text-emerald-300 transition-colors">eBook Creation &amp; Writing</Link></li>
              <li><Link href="/category/funnels-and-sales" className="hover:text-emerald-300 transition-colors">Sales Funnels &amp; Copywriting</Link></li>
              <li><Link href="/category/traffic-and-social" className="hover:text-emerald-300 transition-colors">Traffic &amp; Organic Reach</Link></li>
              <li><Link href="/category/automation-and-scaling" className="hover:text-emerald-300 transition-colors">Automation &amp; Scaling</Link></li>
              <li><Link href="/category/mega-bundles" className="text-yellow-400 font-bold hover:underline">⚡ All-Access Empire Bundle</Link></li>
            </ul>
          </div>

          {/* Policies & Guides */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-emerald-400">Reader Resources</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><Link href="/order/lookup" className="hover:text-emerald-300 transition-colors">Instant Download Access</Link></li>
              <li><Link href="/grading-guide" className="hover:text-emerald-300 transition-colors">Digital Formats &amp; Delivery</Link></li>
              <li><Link href="/warranty" className="hover:text-emerald-300 transition-colors">ZeroToTenK Quality Guarantee</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-300 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/returns-policy" className="hover:text-emerald-300 transition-colors">Refund &amp; Access Policy</Link></li>
            </ul>
          </div>

          {/* Creator Support */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-wider text-emerald-400">Support &amp; Inquiries</h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant PDF + ePub Delivery on Payment</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/916380640087" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-emerald-300">WhatsApp: +91 63806 40087</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>support@zerototenk.in</span>
              </li>
              <li className="pt-2">
                <Link
                  href="/flash-sale"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-bold border border-emerald-500/30 transition-all text-[11px]"
                >
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  <span>View Today&apos;s Creator Flash Deals ➔</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} ZeroToTenK Digital Publishing. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-emerald-400 font-bold">
            <span>Instant Digital Access</span>
            <span>&bull;</span>
            <span>Lifetime Updates Included</span>
            <span>&bull;</span>
            <span>Secure Direct UPI Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
