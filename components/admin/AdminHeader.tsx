"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Layers,
  Package,
  CreditCard,
  ShoppingBag,
  ExternalLink,
  LogOut,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface AdminHeaderProps {
  pendingPaymentsCount?: number;
}

export function AdminHeader({ pendingPaymentsCount = 0 }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const navItems = [
    {
      label: "Analytics & Sales",
      href: "/admin",
      icon: BarChart3,
      exact: true,
    },
    {
      label: "Product Catalog",
      href: "/admin/products",
      icon: Layers,
    },
    {
      label: "Manage Licenses",
      href: "/admin/inventory",
      icon: Package,
    },
    {
      label: "Verify Payments",
      href: "/admin/payments",
      icon: CreditCard,
      badge: pendingPaymentsCount,
      badgeColor: "bg-red-600 text-white animate-pulse",
    },
    {
      label: "All Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
  ];

  const handleSignOut = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/admin/login", { method: "DELETE" });
      router.refresh();
      window.location.href = "/admin";
    } catch (err) {
      console.error("Sign out error:", err);
      setLoggingOut(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar */}
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Brand & Portal Badge */}
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-2.5 group">
              <div className="bg-slate-900 dark:bg-white p-1 rounded-xl shadow-xs transition-transform group-hover:scale-105 flex items-center justify-center">
                <img
                  src="/logo.svg"
                  alt="ZeroToTenK"
                  className="h-6 w-auto object-contain invert dark:invert-0"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm text-slate-900 dark:text-white tracking-tight">
                    ZeroToTenK
                  </span>
                  <span className="px-1.5 py-0.2 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Admin Portal
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>Meta-Analytics Sync Active</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-black ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Storefront, Theme, Sign Out */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* View Storefront Link */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Public Storefront"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-bold transition-all shadow-xs"
            >
              <span>Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            {/* Dark & Light Mode Toggle */}
            <ThemeToggle variant="nav" />

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={loggingOut}
              title="Sign Out of Admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-400 text-xs font-bold transition-all shadow-xs disabled:opacity-50"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {loggingOut ? "Signing out..." : "Sign Out"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar (Horizontal Scrollable Tabs) */}
        <div className="md:hidden flex items-center gap-1 overflow-x-auto no-scrollbar py-2 border-t border-slate-200 dark:border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[9px] font-black ${
                      isActive ? "bg-white text-emerald-800" : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
