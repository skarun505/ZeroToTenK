import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ConditionBadge } from "@/components/ConditionBadge";
import { WarrantyStrip } from "@/components/WarrantyStrip";
import { OrderInvoiceModal } from "@/components/OrderInvoiceModal";
import { formatINR, maskSerialOrImei } from "@/lib/utils";
import { SELLER_DETAILS } from "@/lib/invoice";
import {
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  FileText,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";

interface OrderPageProps {
  params: {
    id: string;
  };
  searchParams: {
    just_ordered?: string;
  };
}

import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function OrderPage({ params, searchParams }: OrderPageProps) {
  let order: any = null;
  try {
    order = await prisma.order.findUnique({
      where: { id: params.id },
      include: {
        unit: {
          include: {
            product: true,
          },
        },
      },
    });
  } catch (err) {
    console.warn("Prisma order fetch failed, falling back to Supabase:", err);
  }

  if (!order) {
    try {
      const { data } = await supabase
        .from("Order")
        .select("*, unit:Unit(*, product:Product(*))")
        .eq("id", params.id)
        .maybeSingle();
      order = data;
    } catch (fallbackErr) {
      console.error("Supabase order fallback error:", fallbackErr);
    }
  }

  if (!order) {
    notFound();
  }

  let shipping: any = {};
  try {
    shipping = JSON.parse(order.shippingJson);
  } catch {
    shipping = {};
  }

  let productImages: string[] = [];
  try {
    productImages = JSON.parse(order.unit.product.images);
  } catch {
    productImages = [];
  }
  const mainImage = productImages[0] || `/images/books/${order.unit.product.slug}.svg`;

  // Determine timeline steps
  const steps = [
    {
      key: "CREATED",
      label: "Order Created",
      desc: "Digital license allocated",
      completed: true,
      current: order.status === "AWAITING_PAYMENT",
    },
    {
      key: "SUBMITTED",
      label: "Payment Submitted",
      desc: order.utr ? `UTR: ${order.utr}` : "Waiting for UPI transfer",
      completed: ["PAYMENT_SUBMITTED", "VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(
        order.status
      ),
      current: order.status === "PAYMENT_SUBMITTED",
    },
    {
      key: "VERIFIED",
      label: "Payment Verified & License Issued",
      desc: order.verifiedAt
        ? `Verified on ${new Date(order.verifiedAt).toLocaleDateString()}`
        : "Automated statement match",
      completed: ["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(order.status),
      current: ["VERIFIED", "PAID"].includes(order.status),
    },
    {
      key: "DELIVERED",
      label: "Instant Download Link Active",
      desc: "Delivered to WhatsApp & Email",
      completed: ["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(order.status),
      current: ["SHIPPED", "DELIVERED"].includes(order.status),
    },
  ];

  const isVerifiedOrPaid = ["VERIFIED", "PAID", "SHIPPED", "DELIVERED", "PAYMENT_SUBMITTED"].includes(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 min-h-screen text-slate-100">
      {/* Just Ordered Banner */}
      {searchParams.just_ordered && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-sm font-bold">Order Registered Successfully!</div>
              <div className="text-xs text-slate-400">
                Your eBook license is reserved. Download links are active below and have been sent to your WhatsApp &amp; Email.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-1">
            <span>ORDER #{order.id.slice(-8).toUpperCase()}</span>
            <span>&bull;</span>
            <span>Placed {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Digital Access &amp; Tracking
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <OrderInvoiceModal order={order} shipping={shipping} sellerDetails={SELLER_DETAILS} />
        </div>
      </div>

      {/* Instant Download Action Card */}
      {isVerifiedOrPaid && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>Instant Digital Download Ready</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white">
                Download {order.unit.product.title}
              </h2>
              <p className="text-xs text-slate-300">
                Package includes: Full Master PDF, ePub Reader Edition, Notion Action Dashboard &amp; Bonus Swipe Files.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
              <a
                href={`/images/books/${order.unit.product.slug}.svg`}
                download={`${order.unit.product.slug}-playbook.svg`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-xl btn-emerald text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-105 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Playbook (PDF/SVG)</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Progress Timeline */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Digital Fulfillment Timeline
        </h2>

        <div className="relative border-l-2 border-slate-800 ml-4 space-y-6 pl-6">
          {steps.map((st, i) => (
            <div key={i} className="relative">
              {/* Circle Marker */}
              <div
                className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  st.completed
                    ? "bg-emerald-600 text-white"
                    : st.current
                    ? "bg-amber-500 text-white animate-pulse"
                    : "bg-slate-800 text-slate-400"
                }`}
              >
                {st.completed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>

              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{st.label}</span>
                  {st.current && (
                    <span className="text-[10px] font-semibold text-amber-300 bg-amber-950 px-2 py-0.5 rounded-full border border-amber-800">
                      Current Stage
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">{st.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {order.status === "PAYMENT_SUBMITTED" && (
          <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/40 text-xs text-amber-300 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Payment verification is processing. Your digital license is active and access link has been sent to your WhatsApp and email.
            </span>
          </div>
        )}
      </div>

      {/* Item & Digital Delivery Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* eBook Details */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
            Purchased Digital Playbook
          </h3>

          <div className="flex gap-4">
            <div className="w-20 h-24 rounded-xl bg-slate-950 p-1 shrink-0 border border-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src={mainImage}
                alt={order.unit.product.title}
                className="max-h-full max-w-full object-cover"
              />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-slate-400 uppercase">
                {order.unit.product.brand} &bull; {order.unit.product.modelNumber}
              </div>
              <h4 className="text-sm font-bold text-white">
                {order.unit.product.title}
              </h4>
              <div className="flex items-center gap-2 pt-1">
                <ConditionBadge grade={order.unit.grade} size="sm" />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400 pt-2 border-t border-slate-800">
            <div className="flex justify-between">
              <span>License / Serial No:</span>
              <span className="font-mono font-medium text-slate-200">
                {maskSerialOrImei(order.unit.serialOrImei)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Paid Amount:</span>
              <span className="font-bold text-emerald-400">
                {formatINR(order.amountPaise)}
              </span>
            </div>
            {order.utr && (
              <div className="flex justify-between">
                <span>UTR Reference:</span>
                <span className="font-mono text-emerald-400 font-bold">{order.utr}</span>
              </div>
            )}
          </div>
        </div>

        {/* Digital Delivery Recipient */}
        <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 space-y-4 shadow-xs">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3">
            Digital Delivery Recipient
          </h3>

          <div className="text-xs space-y-1.5 text-slate-300">
            <div className="font-bold text-sm text-white">{shipping.name}</div>
            <div>WhatsApp: +91 {shipping.phone}</div>
            {shipping.email && <div>Email: {shipping.email}</div>}
            <div className="text-slate-400 pt-1">
              Location: {shipping.city || "India"}, {shipping.state || ""}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800">
            <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              <span>Instant Digital Delivery &amp; Lifetime Updates Active</span>
            </div>
          </div>
        </div>
      </div>

      <WarrantyStrip
        warrantyMonths={order.unit.product.warrantyMonths}
        returnDays={order.unit.product.returnDays}
      />
    </div>
  );
}
