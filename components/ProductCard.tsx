"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Zap, BookOpen, Star, Phone, Download, CheckCircle2, Sparkles } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    brand: string;
    modelNumber: string;
    category: string;
    description: string;
    images: string;
    mrp: number;
    units?: {
      id: string;
      pricePaise: number;
      status: string;
      grade: string;
    }[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [];
  }
  const mainImage = images[0] || `/images/books/${product.slug}.svg`;

  const availableUnits = product.units?.filter((u) => u.status === "AVAILABLE") || [];
  const minPrice = availableUnits.length > 0
    ? Math.min(...availableUnits.map((u) => u.pricePaise))
    : product.mrp;
  
  const discountPercent = product.mrp > minPrice
    ? Math.round(((product.mrp - minPrice) / product.mrp) * 100)
    : 70;

  const priceINR = (minPrice / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const mrpINR = (product.mrp / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const activeUnitId = availableUnits[0]?.id || product.units?.[0]?.id || "";
  const checkoutUrl = activeUnitId ? `/checkout?unitId=${activeUnitId}` : `/product/${product.slug}`;
  const whatsappUrl = `https://wa.me/916380640087?text=Hi%20ZeroToTenK,%20I%20want%20to%20get%20${encodeURIComponent(product.title)}%20(${priceINR})`;

  return (
    <div className="book-card rounded-2xl overflow-hidden flex flex-col justify-between group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/70 shadow-md hover:shadow-emerald-500/10 dark:hover:shadow-emerald-950/40 transition-all duration-300">
      {/* Book Cover Container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] bg-slate-100 dark:bg-slate-950/80 overflow-hidden border-b border-slate-200 dark:border-slate-800">
        <Image
          src={mainImage}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={true}
        />

        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-rose-600 text-white text-[10.5px] font-black uppercase tracking-wider shadow-md">
          {discountPercent}% OFF
        </div>

        {/* Edition / Format Pill */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold shadow-xs">
          PDF + ePub
        </div>

        {/* Bottom Tag */}
        <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-white/90 dark:bg-slate-950/90 backdrop-blur-md text-[9.5px] font-black text-amber-600 dark:text-amber-400 flex items-center gap-1 border border-amber-500/30 shadow-xs">
          <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-400" />
          <span>ZeroToTenK Certified</span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3.5 sm:p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-white dark:bg-slate-900 transition-colors">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/40">
              <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              Instant Access
            </span>
            <div className="flex items-center text-amber-500 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
              <span className="ml-1 font-bold text-slate-800 dark:text-slate-200">4.97</span>
            </div>
          </div>

          <Link href={`/product/${product.slug}`}>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 leading-snug">
              {product.title}
            </h3>
          </Link>

          <p className="text-[11.5px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>
        </div>

        {/* Price & Action Area */}
        <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                {priceINR}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through font-medium">
                {mrpINR}
              </span>
            </div>
            <span className="text-[10px] font-black text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700/50 px-2 py-0.5 rounded">
              SAVE {discountPercent}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-5 gap-1.5 pt-0.5">
            <Link
              href={checkoutUrl}
              className="col-span-4 py-2 px-3 rounded-xl btn-emerald text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Instant Access</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-1 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-all shadow-xs"
              title="Chat on WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
