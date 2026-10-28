import React from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { TrustBlock } from "@/components/TrustBlock";
import { FlashSaleClient } from "@/components/FlashSaleClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "18-Hour Creator Flash Sale | Flat 75% OFF All eBooks - ZeroToTenK",
  description:
    "Limited 18-Hour Launch Event! Get flat 75% OFF on all ZeroToTenK digital playbooks and frameworks. Instant PDF + Notion delivery upon payment.",
};

export default async function FlashSalePage() {
  let products: any[] = [];
  try {
    const { data } = await supabase
      .from("Product")
      .select("*, units:Unit(*)")
      .order("createdAt", { ascending: false });
    if (data && data.length > 0) {
      products = data.map((p: any) => ({
        ...p,
        units: (p.units || [])
          .filter((u: any) => u.status === "AVAILABLE")
          .sort((a: any, b: any) => (a.pricePaise || 0) - (b.pricePaise || 0)),
      }));
    }
  } catch (supabaseErr) {
    console.warn("Supabase flash sale fetch error, trying Prisma:", supabaseErr);
  }

  if (products.length === 0) {
    try {
      products = await prisma.product.findMany({
        include: {
          units: {
            where: { status: "AVAILABLE" },
            orderBy: { pricePaise: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      console.warn("Prisma flash sale fetch failed:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-10">
        <FlashSaleClient initialProducts={products as any} />
        <TrustBlock />
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
