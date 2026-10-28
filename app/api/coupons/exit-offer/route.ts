import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { applyExitOffer } from "@/lib/pricing";

export async function POST(req: Request) {
  try {
    const { unitId, code } = await req.json();

    if (!unitId || !code) {
      return NextResponse.json({ error: "unitId and code are required" }, { status: 400 });
    }

    const normCode = code.toUpperCase();
    let coupon: any = null;
    try {
      const { data } = await supabase.from("Coupon").select("*").eq("code", normCode).maybeSingle();
      coupon = data;
    } catch {}

    if (!coupon) {
      try {
        coupon = await prisma.coupon.findUnique({ where: { code: normCode } });
      } catch {}
    }

    if (!coupon || !coupon.active || coupon.used >= coupon.maxUses) {
      return NextResponse.json({ ok: false, error: "Invalid or expired promo code" }, { status: 400 });
    }

    let unit: any = null;
    try {
      const { data } = await supabase.from("Unit").select("*").eq("id", unitId).maybeSingle();
      unit = data;
    } catch {}

    if (!unit) {
      try {
        unit = await prisma.unit.findUnique({ where: { id: unitId } });
      } catch {}
    }

    if (!unit) {
      return NextResponse.json({ ok: false, error: "Unit not found" }, { status: 404 });
    }

    // Apply pricing floor check (Section 5.1 & Section 7)
    const result = applyExitOffer(unit.pricePaise, unit.floorPaise, coupon.percentOff);

    if (!result.ok) {
      return NextResponse.json({
        ok: false,
        error: "Coupon cannot be applied because this unit is already priced at the maximum discount floor.",
        pricePaise: unit.pricePaise,
      });
    }

    return NextResponse.json({
      ok: true,
      code: coupon.code,
      percentOff: coupon.percentOff,
      originalPricePaise: unit.pricePaise,
      discountedPricePaise: result.discounted,
      savingsPaise: result.savingsPaise,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
