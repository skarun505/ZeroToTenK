"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WarrantyStrip } from "./WarrantyStrip";
import { RepairDisclosure } from "./RepairDisclosure";
import { formatINR } from "@/lib/utils";
import {
  ShieldCheck,
  Zap,
  CheckCircle2,
  Star,
  ArrowRight,
  BookOpen,
  Download,
  Phone,
  Clock,
  Sparkles,
  Plus,
  Minus,
  Check,
  FileText,
} from "lucide-react";

interface UnitType {
  id: string;
  serialOrImei: string;
  grade: string;
  source: string;
  pricePaise: number;
  floorPaise: number;
  status: string;
  reservedUntil?: string | Date | null;
}

interface ReviewType {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  verifiedPurchase?: boolean;
  createdAt: Date | string;
}

interface ProductDetailProps {
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
    warrantyMonths: number;
    returnDays: number;
    units: UnitType[];
    reviews: ReviewType[];
  };
}

export function ProductDetailClient({ product }: ProductDetailProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  let images: string[] = [];
  try {
    images = JSON.parse(product.images);
  } catch {
    images = [];
  }
  const [activeImage, setActiveImage] = useState(images[0] || `/images/books/${product.slug}.svg`);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (activeImage.includes("/images/books/")) {
      setActiveImage(`/covers/${product.slug}.svg`);
    } else if (activeImage.includes("/covers/")) {
      setActiveImage(`/books/${product.slug}.svg`);
    } else {
      setHasError(true);
    }
  };

  const availableUnits = product.units.filter((u) => {
    if (u.status === "AVAILABLE") return true;
    if (u.status === "RESERVED" && u.reservedUntil && new Date(u.reservedUntil).getTime() < Date.now()) return true;
    return false;
  });
  const selectedUnit = availableUnits[0] || product.units[0];

  const unitPricePaise = selectedUnit ? selectedUnit.pricePaise : product.mrp;
  const totalPricePaise = unitPricePaise * quantity;
  const mrpPaise = product.mrp * quantity;
  const discountPercent = mrpPaise > totalPricePaise ? Math.round(((mrpPaise - totalPricePaise) / mrpPaise) * 100) : 70;

  const handleBuyNow = () => {
    if (!selectedUnit) return;
    router.push(`/checkout?unitId=${selectedUnit.id}&qty=${quantity}`);
  };

  const whatsappUrl = `https://wa.me/916380640087?text=Hi%20ZeroToTenK,%20I%20want%20to%20get%20${encodeURIComponent(product.title)}%20(Qty:%20${quantity},%20Total:%20${formatINR(totalPricePaise)})`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10 pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Column: Book Cover Presentation */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-3xl bg-[#090d16] border border-slate-800 overflow-hidden shadow-2xl p-6 flex items-center justify-center group hover:border-emerald-500/50 transition-colors">
            {!hasError ? (
              <Image
                src={activeImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover p-2 group-hover:scale-102 transition-transform duration-300"
                unoptimized={true}
                onError={handleImageError}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 p-6 flex flex-col justify-between select-none">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase tracking-widest text-emerald-400">ZEROTOTENK.IN</span>
                  <div className="text-sm font-bold text-amber-300">★ 4.97 RATED EDITION</div>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-lg font-black text-white leading-snug">
                    {product.title}
                  </h2>
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                  <span>PDF + ePub + Notion</span>
                  <span className="text-emerald-400 font-bold">Instant Access</span>
                </div>
              </div>
            )}

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-black uppercase tracking-wider shadow-md">
              {discountPercent}% OFF
            </div>

            <div className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-1.5 shadow-md">
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Instant Download</span>
            </div>
          </div>

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="flex gap-3 justify-center overflow-x-auto pb-2 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-[#0c1322] ${
                    activeImage === img ? "border-emerald-400 scale-105 shadow-md shadow-emerald-500/20" : "border-slate-800 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt={`${product.title}-${idx}`} fill className="object-cover p-1" unoptimized={true} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Instant Booking Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                2026 MASTER EDITION
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-cyan-400" />
                ZeroToTenK Originals
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-bold text-slate-300">(4.97 &bull; Verified Reader Reviews)</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#111827] to-[#0f172a] border border-emerald-500/30 space-y-3 shadow-xl">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {formatINR(totalPricePaise)}
                </span>
                <span className="text-base text-slate-500 line-through">
                  {formatINR(mrpPaise)}
                </span>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black">
                SAVE {discountPercent}% OFF
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">Licenses:</span>
              <div className="flex items-center gap-2 bg-[#080c14] border border-slate-700 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-black text-sm text-emerald-300">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Instant download link via Email &amp; WhatsApp immediately after UPI confirmation.</span>
            </p>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px]">Format &amp; Edition</span>
              <p className="font-bold text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PDF + ePub + Notion</span>
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0f172a] border border-slate-800 space-y-1">
              <span className="text-slate-400 text-[11px]">Delivery &amp; Updates</span>
              <p className="font-bold text-white flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant &bull; Lifetime Free Updates</span>
              </p>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-emerald-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>What You&apos;ll Master Inside</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-[#0f172a]/60 p-4 rounded-xl border border-slate-800/80">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-1">
            <button
              onClick={handleBuyNow}
              disabled={!selectedUnit}
              className="w-full py-4 rounded-2xl btn-emerald text-white font-black text-base transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98 cursor-pointer shadow-lg"
            >
              <Download className="w-5 h-5" />
              <span>Get Instant Access Now (Direct UPI)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
            >
              <Phone className="w-4 h-4" />
              <span>Chat with Creator on WhatsApp (+91 63806 40087)</span>
            </a>
          </div>

          {/* Instant Delivery Timeline reassurance */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-600/30 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Instant Digital Access &bull; WhatsApp + Email Download Link</span>
            </div>
            <span className="font-bold text-[10px] bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">24/7 AUTO</span>
          </div>

          <WarrantyStrip />
          <RepairDisclosure />
        </div>
      </div>

      {/* Customer Reviews */}
      {product.reviews.length > 0 && (
        <div className="border-t border-slate-800 pt-8 space-y-4">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span>Verified Reader Reviews</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="p-4 rounded-xl bg-[#0f172a] border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{r.userName}</span>
                  <div className="flex text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{r.comment}</p>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified ZeroToTenK Reader
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Booking Bar (Mobile & Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#080c14]/95 backdrop-blur-md border-t border-slate-800 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-lg bg-[#0c1322] border border-slate-700 overflow-hidden shrink-0 hidden sm:block">
              <Image src={activeImage} alt={product.title} fill className="object-cover p-1" unoptimized={true} />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200 line-clamp-1 max-w-[150px] sm:max-w-[280px]">
                {product.title}
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black text-emerald-400">
                  {formatINR(totalPricePaise)}
                </span>
                <span className="text-[10px] text-emerald-300 font-bold">
                  ({discountPercent}% OFF)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 transition-colors shrink-0"
              title="WhatsApp Inquiries"
            >
              <Phone className="w-4 h-4" />
            </a>

            <button
              onClick={handleBuyNow}
              disabled={!selectedUnit}
              className="py-2.5 px-4 sm:px-6 rounded-xl btn-emerald text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg active:scale-98 transition-all shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Get Instant Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
