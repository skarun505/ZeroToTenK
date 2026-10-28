import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { suggestPrice } from "@/lib/pricing";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productId,
      serialOrImei,
      grade,
      source,
      costPaise,
      pricePaise,
      repairNotes,
      batteryHealth,
      repairPhotos,
    } = body;

    let product: any = null;
    try {
      const { data } = await supabase.from("Product").select("*").eq("id", productId).maybeSingle();
      product = data;
    } catch {}

    if (!product) {
      try {
        product = await prisma.product.findUnique({ where: { id: productId } });
      } catch {}
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const { floor } = suggestPrice(product.mrp, grade, costPaise);

    if (pricePaise < floor) {
      return NextResponse.json(
        {
          error: `Price rejection: Proposed price (₹${pricePaise / 100}) is below the mandatory 12% margin floor (₹${floor / 100}). Minimum allowed price is ₹${floor / 100}.`,
        },
        { status: 400 }
      );
    }

    const unitId = `unit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const unitData = {
      id: unitId,
      productId,
      serialOrImei,
      grade,
      source: source || "REFURBISHED",
      costPaise,
      pricePaise,
      floorPaise: floor,
      repairNotes,
      batteryHealth: batteryHealth ? parseInt(batteryHealth, 10) : null,
      repairPhotos: repairPhotos ? JSON.stringify(repairPhotos) : null,
      status: "AVAILABLE",
    };

    let createdUnit: any = null;
    try {
      const { data } = await supabase.from("Unit").insert(unitData).select().maybeSingle();
      createdUnit = data;
    } catch {}

    if (!createdUnit) {
      try {
        createdUnit = await prisma.unit.create({ data: unitData });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, unit: createdUnit || unitData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, pricePaise, costPaise, grade, status, repairNotes, batteryHealth } = body;

    let unit: any = null;
    try {
      const { data } = await supabase.from("Unit").select("*, product:Product(*)").eq("id", id).maybeSingle();
      unit = data;
    } catch {}

    if (!unit) {
      try {
        unit = await prisma.unit.findUnique({ where: { id }, include: { product: true } });
      } catch {}
    }

    if (!unit) {
      return NextResponse.json({ error: "Unit not found" }, { status: 404 });
    }

    const activeCost = costPaise ?? unit.costPaise;
    const activeGrade = grade ?? unit.grade;
    const { floor } = suggestPrice(unit.product.mrp, activeGrade, activeCost);

    if (pricePaise !== undefined && pricePaise < floor) {
      return NextResponse.json(
        {
          error: `Price rejection: Cannot set price below margin floor of ₹${floor / 100}.`,
        },
        { status: 400 }
      );
    }

    const updatePayload: any = {
      ...(pricePaise !== undefined && { pricePaise }),
      ...(costPaise !== undefined && { costPaise, floorPaise: floor }),
      ...(grade && { grade }),
      ...(status && { status }),
      ...(repairNotes !== undefined && { repairNotes }),
      ...(batteryHealth !== undefined && { batteryHealth: parseInt(batteryHealth, 10) }),
    };

    let updatedUnit: any = null;
    try {
      const { data } = await supabase.from("Unit").update(updatePayload).eq("id", id).select().maybeSingle();
      updatedUnit = data;
    } catch {}

    if (!updatedUnit) {
      try {
        updatedUnit = await prisma.unit.update({ where: { id }, data: updatePayload });
      } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    return NextResponse.json({ ok: true, unit: updatedUnit || { id, ...updatePayload } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing unit ID" }, { status: 400 });
    }

    let orderCount = 0;
    try {
      const { count } = await supabase.from("Order").select("id", { count: "exact" }).eq("unitId", id);
      orderCount = count || 0;
    } catch {}

    if (orderCount === 0) {
      try {
        orderCount = await prisma.order.count({ where: { unitId: id } });
      } catch {}
    }

    if (orderCount > 0) {
      return NextResponse.json(
        { error: "Cannot delete unit that already has orders associated with it." },
        { status: 400 }
      );
    }

    try {
      await supabase.from("Unit").delete().eq("id", id);
    } catch {
      await prisma.unit.delete({ where: { id } });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
