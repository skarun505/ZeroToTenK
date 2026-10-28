import React from "react";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("cracker_admin_token");
  const isAuthenticated = !!token?.value;

  let pendingPaymentsCount = 0;
  if (isAuthenticated) {
    try {
      const { count } = await supabase
        .from("Order")
        .select("id", { count: "exact", head: true })
        .eq("status", "PAYMENT_SUBMITTED");
      pendingPaymentsCount = count || 0;
    } catch (err) {
      console.warn("Error fetching pending payments count for AdminHeader:", err);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {isAuthenticated && <AdminHeader pendingPaymentsCount={pendingPaymentsCount} />}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
