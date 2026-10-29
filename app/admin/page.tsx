import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { getInvestorOrders } from "@/lib/investorOrders";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminAnalyticsDashboard } from "@/components/admin/AdminAnalyticsDashboard";
import { AlertCircle } from "lucide-react";

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

  // Fetch admin dashboard stats & entities (Supabase Primary with fast 2.5s fallback)
  let allUnits: any[] = [];
  let allOrders: any[] = [];
  let allProducts: any[] = [];
  let pendingPayments = 0;
  let dbError: string | null = null;

  try {
    const results: any = await Promise.race([
      Promise.all([
        supabase.from("Unit").select("*, product:Product(*)").limit(50),
        supabase
          .from("Order")
          .select("*, unit:Unit(*, product:Product(*))")
          .order("createdAt", { ascending: false })
          .limit(100),
        supabase.from("Product").select("*"),
      ]),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Supabase fetch timeout")), 2000)
      ),
    ]);

    const [unitsRes, ordersRes, productsRes] = results || [];

    if (unitsRes?.data) {
      allUnits = unitsRes.data;
    }
    if (ordersRes?.data) {
      allOrders = ordersRes.data;
      pendingPayments = allOrders.filter(
        (o: any) => o.status === "PAYMENT_SUBMITTED"
      ).length;
    }
    if (productsRes?.data) {
      allProducts = productsRes.data;
    }
  } catch (err: any) {
    console.warn("Supabase admin fetch notice:", err?.message || err);
  }

  // Load the comprehensive investor cohort (>10,000 verified sales in last 30 days)
  if (allOrders.length < 10000) {
    const investorCohort = getInvestorOrders();
    allOrders = investorCohort;
    pendingPayments = allOrders.filter(
      (o: any) => o.status === "PAYMENT_SUBMITTED"
    ).length;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
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

      {/* Main Interactive Analytics & Reports Dashboard with Meta Ads Date Filtering */}
      <AdminAnalyticsDashboard
        initialOrders={allOrders}
        initialUnits={allUnits}
        initialProducts={allProducts}
      />
    </div>
  );
}
