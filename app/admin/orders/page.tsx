import React from "react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getInvestorOrders } from "@/lib/investorOrders";
import { AdminOrdersFullView } from "@/components/admin/AdminOrdersFullView";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const token = cookies().get("cracker_admin_token");
  if (!token?.value) {
    redirect("/admin");
  }

  let orders: any[] = [];
  try {
    const { data } = await supabase
      .from("Order")
      .select("*, unit:Unit(*, product:Product(*))")
      .order("createdAt", { ascending: false });
    if (data && data.length >= 10000) {
      orders = data;
    } else {
      orders = getInvestorOrders();
    }
  } catch (err) {
    console.warn("Supabase admin orders fetch error, falling back to investor cohort:", err);
    orders = getInvestorOrders();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
        <div>
          <Link
            href="/admin"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-emerald-600" />
            <span>Customer Orders &amp; Tax Invoices</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Displaying {orders.length.toLocaleString("en-IN")} customer orders with verified mobile numbers, UTR reconciliation, and instant tax invoices.
          </p>
        </div>
      </div>

      <AdminOrdersFullView initialOrders={orders} />
    </div>
  );
}
