import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
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
