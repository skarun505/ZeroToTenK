"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ShoppingCart,
  Plus,
  Minus,
  ArrowRight,
  Phone,
  QrCode,
  Copy,
  Check,
  AlertCircle,
  X,
  Truck,
  Sparkles,
  Lock,
  ExternalLink,
  Download,
} from "lucide-react";

interface ProductType {
  id: string;
  slug: string;
  title: string;
  brand: string;
  modelNumber: string;
  category: string;
  description: string;
  images: string;
  mrp: number;
  units?: { id: string; pricePaise: number; status: string }[];
}

interface CartItem {
  product: ProductType;
  qty: number;
  mrpInr: number;
  flashPriceInr: number;
}

function PhonePeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#5f259f" />
      <path
        d="M20.5 8H15.8C14.8 8 14 8.8 14 9.8V29.5C14 30.3 14.7 31 15.5 31H17.8C18.6 31 19.3 30.3 19.3 29.5V23.5H22.5C26.1 23.5 28.5 20.8 28.5 17.2C28.5 13.6 25.8 11.2 22.5 11.2H19.3V10.2C19.3 9.7 19.7 9.3 20.2 9.3H23.5C24.3 9.3 25 8.6 25 7.8C25 7 24.3 6.3 23.5 6.3H20.5V8ZM22.5 19.5H19.3V15.2H22.5C23.8 15.2 24.8 16.1 24.8 17.3C24.8 18.6 23.8 19.5 22.5 19.5Z"
        fill="white"
      />
    </svg>
  );
}

function GooglePayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <path
        d="M20.2 16.5V20.2H26.3C26 21.6 24.6 24.3 20.2 24.3C16.4 24.3 13.4 21.2 13.4 17.4C13.4 13.6 16.4 10.5 20.2 10.5C22.4 10.5 23.8 11.4 24.7 12.2L27.6 9.4C25.7 7.6 23.2 6.5 20.2 6.5C14.2 6.5 9.3 11.4 9.3 17.4C9.3 23.4 14.2 28.3 20.2 28.3C26.5 28.3 30.7 23.9 30.7 17.7C30.7 17 30.6 16.5 30.5 16.5H20.2Z"
        fill="#4285F4"
      />
      <path
        d="M10.8 13.4L13.8 15.6C14.7 12.9 17.2 11 20.2 11C22.4 11 23.8 11.9 24.7 12.7L27.6 9.9C25.7 8.1 23.2 7 20.2 7C16 7 12.5 9.5 10.8 13.4Z"
        fill="#EA4335"
      />
      <path
        d="M20.2 28.3C23.2 28.3 25.7 27.2 27.6 25.5L24.4 23C23.3 23.8 21.9 24.3 20.2 24.3C17.2 24.3 14.7 22.4 13.8 19.7L10.8 22C12.5 25.8 16 28.3 20.2 28.3Z"
        fill="#34A853"
      />
      <path
        d="M10.8 13.4C10.3 14.6 10 16 10 17.4C10 18.8 10.3 20.2 10.8 21.4L13.8 19.1C13.5 18.5 13.4 18 13.4 17.4C13.4 16.8 13.5 16.3 13.8 15.7L10.8 13.4Z"
        fill="#FBBC05"
      />
    </svg>
  );
}

export function FlashSaleClient({ initialProducts }: { initialProducts: ProductType[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<{ [id: string]: CartItem }>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [step, setStep] = useState<"cart" | "payment" | "success">("cart");
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [utr, setUtr] = useState("");
  const [submittingUtr, setSubmittingUtr] = useState(false);
  const [utrSuccess, setUtrSuccess] = useState(false);
  const [utrError, setUtrError] = useState<string | null>(null);

  const [shipping, setShipping] = useState({
    name: "",
    email: "",
    phone: "",
    address: "Digital Delivery",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560001",
  });

  // 18-Hour Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 17,
    minutes: 58,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 18, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter Categories
  const categoryOptions = [
    { id: "all", label: "🔥 All Flash Deals" },
    { id: "blueprint-courses", label: "🚀 10K Blueprints" },
    { id: "creation-and-writing", label: "✍️ Creation & Writing" },
    { id: "funnels-and-sales", label: "💰 Funnels & Copy" },
    { id: "traffic-and-social", label: "📱 Traffic & Reach" },
    { id: "automation-and-scaling", label: "⚡ Automation & Scale" },
    { id: "mega-bundles", label: "👑 All-Access Vault" },
  ];

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return initialProducts;
    return initialProducts.filter((p) => p.category?.toLowerCase() === selectedCategory);
  }, [initialProducts, selectedCategory]);

  // Cart calculations
  const cartItemsList = Object.values(cart);
  const totalItemsCount = cartItemsList.reduce((sum, item) => sum + item.qty, 0);
  const totalAmountInr = cartItemsList.reduce((sum, item) => sum + item.qty * item.flashPriceInr, 0);
  const totalMrpInr = cartItemsList.reduce((sum, item) => sum + item.qty * item.mrpInr, 0);
  const totalSavingsInr = totalMrpInr - totalAmountInr;

  const MIN_CART_INR = 999;
  const isMinReached = totalAmountInr >= MIN_CART_INR;
  const remainingInr = Math.max(0, MIN_CART_INR - totalAmountInr);
  const progressPct = Math.min(100, Math.round((totalAmountInr / MIN_CART_INR) * 100));

  // Add / Remove from Cart
  const addToCart = (product: ProductType) => {
    const mrpInr = product.mrp / 100;
    const flashPriceInr = Math.round(mrpInr * 0.2); // Flat 80% OFF
    setCart((prev) => {
      const existing = prev[product.id];
      if (existing) {
        return {
          ...prev,
          [product.id]: { ...existing, qty: existing.qty + 1 },
        };
      }
      return {
        ...prev,
        [product.id]: {
          product,
          qty: 1,
          mrpInr,
          flashPriceInr,
        },
      };
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev[productId];
      if (!existing) return prev;
      if (existing.qty <= 1) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return {
        ...prev,
        [productId]: { ...existing, qty: existing.qty - 1 },
      };
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedVpa(true);
    setTimeout(() => setCopiedVpa(false), 2000);
  };

  // Submit Flash Order
  const handleCreateFlashOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMinReached) return;
    setLoading(true);
    setOrderError(null);

    try {
      const itemsPayload = cartItemsList.map((item) => ({
        productId: item.product.id,
        slug: item.product.slug,
        title: item.product.title,
        qty: item.qty,
        mrpPaise: item.product.mrp * 100,
        flashPricePaise: Math.round(item.product.mrp * 0.2) * 100,
      }));

      const res = await fetch("/api/checkout/flash-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: itemsPayload,
          shipping,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to initialize flash order");
      }

      setOrderData(data);
      setStep("payment");
    } catch (err: any) {
      setOrderError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit UTR
  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUtr = utr.trim().replace(/\D/g, "");
    if (cleanUtr.length !== 12) {
      setUtrError("Please enter a valid 12-digit UTR or Transaction Ref number.");
      return;
    }

    setSubmittingUtr(true);
    setUtrError(null);

    try {
      const res = await fetch("/api/checkout/submit-utr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderData.orderId,
          utr: cleanUtr,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to verify UTR");
      }

      setUtrSuccess(true);
      setStep("success");
    } catch (err: any) {
      setUtrError(err.message || "Failed to verify UTR. Please retry.");
    } finally {
      setSubmittingUtr(false);
    }
  };

  const getProductImage = (p: ProductType) => {
    try {
      const imgs = JSON.parse(p.images);
      return imgs[0] || "/logo.svg";
    } catch {
      return "/logo.svg";
    }
  };

  const whatsappOrderMsg = `🚀 *ZEROTOTENK - 18-HR FLASH SALE ORDER (75% OFF)* 🚀\n\n` +
    cartItemsList.map((it) => `• ${it.product.title} x ${it.qty} = ₹${it.qty * it.flashPriceInr}`).join("\n") +
    `\n\n*Total Flash Amount:* ₹${totalAmountInr} (Saved ₹${totalSavingsInr}!)\n` +
    `*Access For:* ${shipping.name || "Customer"} (${shipping.email || "Email"} / ${shipping.phone || "Phone"})\n\n` +
    `Please confirm instant download access.`;

  const whatsappUrl = `https://wa.me/916380640087?text=${encodeURIComponent(whatsappOrderMsg)}`;

  return (
    <div className="space-y-6 sm:space-y-8 pb-32">
      {/* 18-Hour Flash Sale Banner - Bright & Electric Festive Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-orange-600 to-amber-500 p-6 sm:p-8 shadow-2xl border-2 border-yellow-300 text-white text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-black/30 border border-white/40 text-yellow-300 shadow-sm animate-pulse">
          <Flame className="w-4 h-4 text-yellow-300" />
          <span>ZEROTOTENK CREATOR LAUNCH &bull; 18 HOURS ONLY</span>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-sm">
            FLAT <span className="text-yellow-300 underline decoration-white underline-offset-4">75% OFF</span> FLASH SALE
          </h1>
          <p className="text-xs sm:text-sm text-yellow-100 max-w-xl mx-auto font-bold">
            All 12 Premium Playbooks &bull; Instant PDF + Notion Workbooks &bull; Direct UPI Access
          </p>
        </div>

        {/* Live Countdown Display */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 pt-1">
          <div className="flex flex-col items-center bg-white border-2 border-yellow-300 rounded-2xl px-3.5 sm:px-5 py-2.5 min-w-[70px] sm:min-w-[88px] shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-800 uppercase font-black tracking-wider">Hours</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-950 font-black font-mono animate-pulse">:</span>
          <div className="flex flex-col items-center bg-white border-2 border-yellow-300 rounded-2xl px-3.5 sm:px-5 py-2.5 min-w-[70px] sm:min-w-[88px] shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-800 uppercase font-black tracking-wider">Mins</span>
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-950 font-black font-mono animate-pulse">:</span>
          <div className="flex flex-col items-center bg-white border-2 border-yellow-300 rounded-2xl px-3.5 sm:px-5 py-2.5 min-w-[70px] sm:min-w-[88px] shadow-lg">
            <span className="text-2xl sm:text-3xl font-black text-red-600 font-mono">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-800 uppercase font-black tracking-wider">Secs</span>
          </div>
        </div>

        {/* Flash Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 text-xs font-bold text-white">
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/25 backdrop-blur-xs border border-white/30">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
            80% OFF All {initialProducts.length} Imaged Products
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/25 backdrop-blur-xs border border-white/30 text-yellow-200">
            <Truck className="w-3.5 h-3.5 text-yellow-300" />
            Free Transport on Min. ₹999 Order
          </span>
          <span className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black/25 backdrop-blur-xs border border-white/30 text-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            100% CSIR-NEERI Green Certified
          </span>
        </div>
      </section>

      {/* Category Filter Pills (Mobile Friendly Horizontal Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categoryOptions.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCategory(c.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === c.id
                ? "festive-btn-gold text-slate-950 scale-105 shadow-md"
                : "bg-white border border-slate-300 text-slate-700 hover:border-amber-500 hover:bg-amber-50 font-bold shadow-xs"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Product Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2 px-1">
        <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-orange-400" />
          Showing {filteredProducts.length} Authentic Imaged Flash Deals
        </span>
        <span className="text-amber-600 font-black">All Flat 80% OFF</span>
      </div>

      {/* 2-Column Mobile & 4-Column Desktop Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
        {filteredProducts.map((p) => {
          const mrpInr = p.mrp / 100;
          const flashPriceInr = Math.round(mrpInr * 0.2); // Flat 80% OFF
          const inCartQty = cart[p.id]?.qty || 0;
          const mainImage = getProductImage(p);

          return (
            <div
              key={p.id}
              className="festive-card rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-[#f8fafc] overflow-hidden border-b border-slate-100">
                <Image
                  src={mainImage}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  unoptimized={true}
                />

                {/* 80% OFF Flash Tag */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md festive-badge-red text-[9.5px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-white" />
                  <span>80% OFF</span>
                </div>

                {/* Unit packaging pill */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/80 border border-amber-500/30 text-amber-300 text-[9px] font-bold">
                  1 {p.modelNumber || "BOX"}
                </div>
              </div>

              {/* Details & Fast Add Area */}
              <div className="p-3 sm:p-3.5 space-y-2 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#111827] to-[#0d1424]">
                <div className="space-y-1">
                  <Link href={`/product/${p.slug}`}>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-100 group-hover:text-amber-400 transition-colors line-clamp-1">
                      {p.title}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="text-emerald-400 font-semibold">Green Cracker</span>
                    <span className="text-amber-300 font-bold">5.0 ★</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/80 space-y-2">
                  {/* Prices: 80% OFF Flash Price + Struck-through MRP */}
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base sm:text-lg font-black text-amber-400">
                        ₹{flashPriceInr}
                      </span>
                      <span className="text-[11px] text-slate-500 line-through">
                        ₹{mrpInr}
                      </span>
                    </div>
                    <span className="text-[9px] font-extrabold text-red-400 bg-red-950/60 border border-red-500/30 px-1 py-0.2 rounded">
                      -80%
                    </span>
                  </div>

                  {/* 1-Tap Add to Flash Cart Stepper */}
                  {inCartQty === 0 ? (
                    <button
                      type="button"
                      onClick={() => addToCart(p)}
                      className="w-full py-2 px-3 rounded-xl festive-btn-gold text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>ADD DEAL</span>
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-[#080c14] border border-amber-500/50 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => removeFromCart(p.id)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-black transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-black text-xs text-amber-400 px-2">
                        {inCartQty} in Cart
                      </span>
                      <button
                        type="button"
                        onClick={() => addToCart(p)}
                        className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center font-black transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sticky Bottom Cart & Minimum Progress Bar (Mobile & Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#080c14]/98 backdrop-blur-lg border-t border-amber-500/30 p-3 sm:p-4 shadow-2xl">
        <div className="max-w-7xl mx-auto space-y-2">
          {/* Minimum Order Value Progress Bar */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold">
              {isMinReached ? (
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Minimum ₹999 Reached! Free Factory Transport Unlocked!</span>
                </span>
              ) : (
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>
                    Add <strong className="text-white underline">₹{remainingInr} more</strong> to unlock 80% Flash Order (Min ₹999)
                  </span>
                </span>
              )}
              <span className="text-slate-400 font-mono">
                ₹{totalAmountInr} / ₹999
              </span>
            </div>

            {/* Visual Progress Meter */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isMinReached
                    ? "bg-gradient-to-r from-emerald-500 to-green-400"
                    : "bg-gradient-to-r from-amber-500 to-orange-500"
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div>
              <div className="text-[11px] text-slate-400 font-semibold">
                {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"} &bull; Flash Total:
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-amber-400">
                  ₹{totalAmountInr}
                </span>
                {totalSavingsInr > 0 && (
                  <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Save ₹{totalSavingsInr}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {totalItemsCount > 0 && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Order Flash Cart on WhatsApp"
                  className="p-2.5 sm:px-3 sm:py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">WhatsApp Order</span>
                </a>
              )}

              <button
                type="button"
                disabled={!isMinReached || totalItemsCount === 0}
                onClick={() => {
                  setStep("cart");
                  setIsDrawerOpen(true);
                }}
                className={`py-3 px-4 sm:px-6 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg active:scale-98 ${
                  isMinReached && totalItemsCount > 0
                    ? "festive-btn-gold text-slate-950 cursor-pointer"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>
                  {isMinReached
                    ? `Checkout Now (₹${totalAmountInr})`
                    : `Add ₹${remainingInr} More`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide-Up Flash Checkout Drawer / Modal */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 overflow-y-auto">
          <div className="w-full sm:max-w-xl bg-[#0f172a] border border-amber-500/30 rounded-t-3xl sm:rounded-3xl p-5 sm:p-6 space-y-5 max-h-[90vh] overflow-y-auto text-slate-100 shadow-2xl animate-in slide-in-from-bottom-6">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg festive-btn-gold flex items-center justify-center">
                  <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
                </div>
                <div>
                  <h3 className="font-black text-base text-white">18-Hour Flash Order</h3>
                  <p className="text-[11px] text-amber-400 font-bold">Flat 80% OFF &bull; Min. ₹999 Order</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Review Items & Address Form */}
            {step === "cart" && (
              <div className="space-y-4">
                {/* Cart Items List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 no-scrollbar">
                  {cartItemsList.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-[#080c14] border border-slate-700 text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-white truncate">{item.product.title}</div>
                        <div className="text-[11px] text-slate-400">
                          ₹{item.flashPriceInr} x {item.qty} = <span className="text-amber-400 font-bold">₹{item.flashPriceInr * item.qty}</span>
                          <span className="text-slate-500 line-through ml-1.5">₹{item.mrpInr * item.qty}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-black text-amber-300">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => addToCart(item.product)}
                          className="w-6 h-6 rounded bg-amber-500 text-slate-950 flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Savings Pill */}
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold">Total Flash Savings (80% OFF):</span>
                  <span className="text-emerald-400 font-black text-sm">- ₹{totalSavingsInr}</span>
                </div>

                {orderError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{orderError}</span>
                  </div>
                )}

                {/* Delivery Address Form */}
                <form onSubmit={handleCreateFlashOrder} className="space-y-3 pt-1">
                  <div className="text-xs font-bold text-slate-300 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant Digital Delivery Details:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={shipping.name}
                        onChange={(e) => setShipping({ ...shipping, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email for eBook Links *"
                        value={shipping.email}
                        onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="WhatsApp Number *"
                        value={shipping.phone}
                        onChange={(e) => setShipping({ ...shipping, phone: e.target.value.replace(/\D/g, "") })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Complete Street / Door Address *"
                      value={shipping.address}
                      onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="City *"
                        value={shipping.city}
                        onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="State *"
                        value={shipping.state}
                        onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="Pincode *"
                        value={shipping.pincode}
                        onChange={(e) => setShipping({ ...shipping, pincode: e.target.value.replace(/\D/g, "") })}
                        className="w-full px-3 py-2 rounded-xl bg-[#080c14] border border-slate-700 text-xs focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !isMinReached}
                    className="w-full py-3.5 rounded-xl festive-btn-gold text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer active:scale-98 transition-all"
                  >
                    {loading ? (
                      <span>Generating Direct Factory Payment Link...</span>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 fill-slate-950" />
                        <span>Continue to UPI Payment (₹{totalAmountInr})</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Instant UPI Payment Screen */}
            {step === "payment" && orderData && (
              <div className="space-y-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold">
                    <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                    <span>Order Ref: #{orderData.invoiceNo}</span>
                  </div>
                  <span className="font-black text-sm text-white">Pay: ₹{orderData.amountInr}</span>
                </div>

                {/* QR Code and Quick Pay Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center p-4 rounded-2xl bg-[#080c14] border border-slate-700">
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center shadow-md">
                      {orderData.qrCode ? (
                        <img src={orderData.qrCode} alt="Flash Sale UPI QR" className="w-full h-full object-contain" />
                      ) : (
                        <QrCode className="w-24 h-24 text-slate-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1.5 font-bold">
                      Scan with any UPI App (Zero Fee)
                    </span>
                  </div>

                  <div className="space-y-2.5 w-full">
                    <div className="text-xs font-bold text-slate-300">1-Tap Pay via Mobile Apps:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={orderData.appLinks?.phonepe || orderData.upiLink}
                        className="py-2.5 px-3 rounded-xl bg-[#5f259f] hover:bg-[#521e8a] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <PhonePeIcon className="w-4 h-4 shrink-0" />
                        <span>PhonePe</span>
                      </a>
                      <a
                        href={orderData.appLinks?.gpay || orderData.upiLink}
                        className="py-2.5 px-3 rounded-xl bg-white text-slate-900 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
                      >
                        <GooglePayIcon className="w-4 h-4 shrink-0" />
                        <span>Google Pay</span>
                      </a>
                    </div>

                    <a
                      href={orderData.upiLink}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Any Other UPI App</span>
                    </a>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-700 text-[11px]">
                      <span className="font-mono text-slate-300 truncate">{orderData.vpa}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(orderData.vpa)}
                        className="px-2 py-0.5 rounded bg-slate-800 text-amber-400 text-[10px] font-bold flex items-center gap-1"
                      >
                        {copiedVpa ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedVpa ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2: Enter 12-Digit UTR */}
                <form onSubmit={handleSubmitUtr} className="space-y-3 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                  <div>
                    <label className="block text-xs font-bold text-white mb-1">
                      Confirm Payment: Enter 12-Digit UPI UTR / Ref No. *
                    </label>
                    <p className="text-[11px] text-slate-400 mb-2">
                      After paying in PhonePe/Google Pay/UPI, copy the 12-digit UTR from the receipt.
                    </p>
                    <input
                      type="text"
                      required
                      maxLength={12}
                      placeholder="e.g. 428901234567"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value.replace(/\D/g, ""))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#080c14] border border-emerald-500/50 text-slate-950 font-black font-mono text-sm focus:outline-none"
                    />
                  </div>

                  {utrError && (
                    <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{utrError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submittingUtr || utr.length !== 12}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submittingUtr ? "Verifying Payment with ZeroToTenK Access..." : "Confirm UTR & Unlock Instant Access"}
                  </button>
                </form>

                {/* Direct WhatsApp Confirmation Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-xl border border-emerald-600/50 text-emerald-400 hover:bg-emerald-950/30 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Send Order Receipt to WhatsApp (+91 63806 40087)</span>
                </a>
              </div>
            )}

            {/* Step 3: Success Screen */}
            {step === "success" && (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Flash Order Confirmed!</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Your 75% OFF ZeroToTenK order (#{orderData?.invoiceNo}) has been confirmed! Your download link has been dispatched to your email and WhatsApp.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#080c14] border border-slate-700 text-xs text-slate-300 space-y-1 text-left">
                  <div><strong>Access For:</strong> {shipping.name} ({shipping.email || shipping.phone})</div>
                  <div><strong>Total Paid:</strong> ₹{orderData?.amountInr} (75% OFF Flash Rate)</div>
                  <div><strong>Status:</strong> Instant Download Ready &bull; Lifetime Access Active</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCart({});
                    setIsDrawerOpen(false);
                  }}
                  className="w-full py-3 rounded-xl festive-btn-gold text-slate-950 font-black text-xs"
                >
                  Return to Flash Sale
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
