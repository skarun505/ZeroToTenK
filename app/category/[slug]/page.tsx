import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { MobileSearchBar } from "@/components/MobileSearchBar";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

const CATEGORY_NAMES: Record<string, { title: string; desc: string }> = {
  "blueprint-courses": {
    title: "Zero to 10K Blueprints",
    desc: "Flagship master roadmaps and frameworks to build a recurring ₹10,000 daily digital product business.",
  },
  "creation-and-writing": {
    title: "eBook Creation & Writing",
    desc: "Rapid 48-hour drafting frameworks, AI prompt libraries, and high-demand niche validation for profitable publishing.",
  },
  "funnels-and-sales": {
    title: "Sales Funnels & Copywriting",
    desc: "High-converting mobile landing pages, headline formulas, and frictionless UPI checkout layouts that convert cold traffic.",
  },
  "traffic-and-social": {
    title: "Traffic & Organic Reach",
    desc: "Zero ad-spend systems for Instagram Reels, carousels, Twitter/X threads, and viral short-form hooks that pull daily buyers.",
  },
  "automation-and-scaling": {
    title: "Automation & Scaling",
    desc: "WhatsApp bot flows, email welcome broadcasts, abandoned recovery, and automated digital product fulfillment.",
  },
  "mega-bundles": {
    title: "All-Access Empire Vault",
    desc: "Comprehensive bundle packs with all master playbooks, 50 Notion systems, and lifetime VIP updates at 80% OFF.",
  },
};



export default async function CategoryPage({ params }: CategoryPageProps) {
  const categoryInfo = CATEGORY_NAMES[params.slug];
  if (!categoryInfo) {
    notFound();
  }

  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: {
        category: params.slug,
      },
      include: {
        units: {
          where: { status: "AVAILABLE" },
          orderBy: { pricePaise: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (err) {
    console.error("Failed to load category products:", err);
  }

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans">
      <Navbar />
      <MobileSearchBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        {/* Back Link */}
        <Link
          href="/"
          className="text-xs font-bold text-emerald-400 hover:underline flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All eBooks</span>
        </Link>

        {/* Category Header */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-emerald-500/30 p-6 sm:p-8 space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>ZEROTOTENK DIGITAL MASTERCLASS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            {categoryInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {categoryInfo.desc}
          </p>
          <div className="pt-2 text-xs text-emerald-400 font-bold">
            Showing {products.length} Playbooks Available for Instant Download
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6 pt-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p as any} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <Sparkles className="w-8 h-8 text-emerald-400 mx-auto" />
            <h3 className="font-bold text-white text-base">New Playbook Coming Soon</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              We are currently finalizing new chapters for this category. Check out our other popular playbooks!
            </p>
            <Link
              href="/"
              className="inline-block mt-2 px-5 py-2.5 rounded-xl btn-emerald text-white font-black text-xs"
            >
              Explore All eBooks
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
