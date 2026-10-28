import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminAnalyticsDashboard } from "@/components/admin/AdminAnalyticsDashboard";
import {
  CreditCard,
  Package,
  PlusCircle,
  Layers,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const token = cookies().get("cracker_admin_token");
  const isAuthenticated = !!token?.value;

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-20">
        <AdminLoginForm />
      </div>
    );
  }

  // Fetch admin dashboard stats & entities (Supabase Primary)
  let allUnits: any[] = [];
  let allOrders: any[] = [];
  let allProducts: any[] = [];
  let pendingPayments = 0;
  let dbError: string | null = null;

  try {
    const [unitsRes, ordersRes, productsRes] = await Promise.all([
      supabase.from("Unit").select("*, product:Product(*)"),
      supabase
        .from("Order")
        .select("*, unit:Unit(*, product:Product(*))")
        .order("createdAt", { ascending: false }),
      supabase.from("Product").select("*"),
    ]);

    if (unitsRes.data) {
      allUnits = unitsRes.data;
    }
    if (ordersRes.data) {
      allOrders = ordersRes.data;
      pendingPayments = allOrders.filter(
        (o: any) => o.status === "PAYMENT_SUBMITTED"
      ).length;
    }
    if (productsRes.data) {
      allProducts = productsRes.data;
    }
  } catch (err: any) {
    console.warn("Supabase admin fetch error, trying Prisma fallback:", err);
  }

  // If Supabase didn't load any units or orders, try Prisma as fallback
  if (allUnits.length === 0 && allOrders.length === 0) {
    try {
      allUnits = await prisma.unit.findMany({
        include: { product: true },
      });

      allOrders = await prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          unit: {
            include: { product: true },
          },
        },
      });

      allProducts = await prisma.product.findMany();

      pendingPayments = allOrders.filter(
        (o: any) => o.status === "PAYMENT_SUBMITTED"
      ).length;
    } catch (err: any) {
      console.error("Admin dashboard database error:", err);
      dbError = err?.message || "Failed to connect to database";
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {dbError && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-200 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-600" />
          <div>
            <h3 className="font-bold">Database Notice</h3>
            <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
              {dbError}
            </p>
          </div>
        </div>
      )}

      {/* Top Header & Fast Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
              Live Production Analytics
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Edge Synced
            </span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="bg-slate-900 p-1.5 rounded-xl border border-slate-800 shadow-md inline-block">
              <img
                src="/logo.svg"
                alt="ZeroToTenK"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                Executive Sales &amp; Growth Matrix
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Real-time revenue curves, AOV velocity, best-selling digital blueprints, and fulfillment stream.
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/products"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Product Catalog</span>
          </Link>
          <Link
            href="/admin/inventory"
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Licenses</span>
          </Link>
          <Link
            href="/admin/payments"
            className="relative px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-md transition-all"
          >
            <CreditCard className="w-4 h-4" />
            <span>Verify Payments</span>
            {pendingPayments > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black animate-pulse">
                {pendingPayments}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Interactive Analytics & Reports Dashboard */}
      <AdminAnalyticsDashboard
        initialOrders={allOrders}
        initialUnits={allUnits}
        initialProducts={allProducts}
      />
    </div>
  );
}
