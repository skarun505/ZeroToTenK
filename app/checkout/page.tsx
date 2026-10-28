import React from "react";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { CheckoutFlow } from "@/components/CheckoutFlow";

export const dynamic = "force-dynamic";

interface CheckoutPageProps {
  searchParams: {
    unitId?: string;
    coupon?: string;
  };
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  let targetUnitId = searchParams.unitId;

  // Fallback if accessed directly: grab first available unit
  if (!targetUnitId) {
    try {
      const fallback = await prisma.unit.findFirst({
        where: { status: "AVAILABLE" },
      });
      if (fallback) {
        targetUnitId = fallback.id;
      }
    } catch {
      try {
        const { data } = await supabase
          .from("Unit")
          .select("id")
          .eq("status", "AVAILABLE")
          .limit(1)
          .maybeSingle();
        if (data) targetUnitId = data.id;
      } catch {}
    }
  }

  if (!targetUnitId) {
    redirect("/");
  }

  let unit: any = null;
  try {
    unit = await prisma.unit.findUnique({
      where: { id: targetUnitId },
      include: {
        product: true,
      },
    });
  } catch (err) {
    console.warn("Prisma checkout fetch failed, falling back to Supabase:", err);
  }

  if (!unit) {
    try {
      const { data } = await supabase
        .from("Unit")
        .select("*, product:Product(*)")
        .eq("id", targetUnitId)
        .maybeSingle();
      unit = data;
    } catch (fallbackErr) {
      console.error("Supabase checkout fallback error:", fallbackErr);
    }
  }

  if (!unit) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8">
      <CheckoutFlow unit={unit} initialCoupon={searchParams.coupon} />
    </div>
  );
}
