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
      const res: any = await Promise.race([
        supabase
          .from("Order")
          .select("id", { count: "exact", head: true })
          .eq("status", "PAYMENT_SUBMITTED"),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 1500)
        ),
      ]);
      pendingPaymentsCount = res?.count || 0;
    } catch {
      pendingPaymentsCount = 0;
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
