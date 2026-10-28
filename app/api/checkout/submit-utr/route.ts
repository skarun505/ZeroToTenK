import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";

const schema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  utr: z
    .string()
    .trim()
    .regex(/^\d{12}$/, "UTR must be exactly 12 numeric digits (from your UPI/Bank app)"),
  payerName: z.string().trim().min(2, "Payer name must be at least 2 characters"),
  screenshotUrl: z.string().url().optional().or(z.literal("")),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const body = schema.safeParse(raw);

    if (!body.success) {
      return NextResponse.json(
        { error: body.error.issues[0]?.message || "Invalid UTR submission" },
        { status: 400 }
      );
    }

    const { orderId, utr, payerName, screenshotUrl } = body.data;

    // 1. Check if UTR has already been submitted on any other order
    let existingUtr: any = null;
    try {
      const { data } = await supabase.from("Order").select("id").eq("utr", utr).maybeSingle();
      existingUtr = data;
    } catch {}

    if (existingUtr && existingUtr.id !== orderId) {
      return NextResponse.json(
        { error: "This 12-digit UTR has already been registered on another order. Each transaction reference can only be claimed once." },
        { status: 409 }
      );
    }

    // 2. Fetch the target order
    let order: any = null;
    try {
      const { data } = await supabase
        .from("Order")
        .select("*, unit:Unit(*)")
        .eq("id", orderId)
        .maybeSingle();
      order = data;
    } catch {}

    if (!order) {
      try {
        order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { unit: true },
        });
      } catch {}
    }

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 3. Update order state to PAYMENT_SUBMITTED
    const nowIso = new Date().toISOString();
    const holdUntil = new Date(Date.now() + 12 * 3600_000).toISOString();

    try {
      await supabase
        .from("Order")
        .update({
          utr,
          payerName,
          screenshotUrl: screenshotUrl || null,
          status: "PAYMENT_SUBMITTED",
          utrSubmittedAt: nowIso,
        })
        .eq("id", orderId);

      if (order.unitId) {
        await supabase
          .from("Unit")
          .update({
            status: "RESERVED",
            reservedUntil: holdUntil,
          })
          .eq("id", order.unitId);
      }
    } catch (e) {
      console.warn("Supabase UTR update error, trying Prisma:", e);
      try {
        await prisma.order.update({
          where: { id: orderId },
          data: {
            utr,
            payerName,
            screenshotUrl: screenshotUrl || null,
            status: "PAYMENT_SUBMITTED",
            utrSubmittedAt: new Date(),
          },
        });
        if (order.unitId) {
          await prisma.unit.update({
            where: { id: order.unitId },
            data: {
              status: "RESERVED",
              reservedUntil: new Date(Date.now() + 12 * 3600_000),
            },
          });
        }
      } catch (prismaErr) {
        console.error("Prisma UTR update error:", prismaErr);
      }
    }

    return NextResponse.json({
      ok: true,
      orderId,
      status: "PAYMENT_SUBMITTED",
      message: "UTR registered successfully! Your digital playbook access will be activated upon verification.",
    });
  } catch (err: any) {
    console.error("UTR submission error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to process UTR submission" },
      { status: 500 }
    );
  }
}
