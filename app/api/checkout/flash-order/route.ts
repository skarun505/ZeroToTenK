import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { buildUpiLink, buildSpecificUpiLinks, generateUpiQrCode } from "@/lib/upi";

const flashOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      unitId: z.string().optional(),
      slug: z.string(),
      title: z.string(),
      qty: z.number().min(1),
      mrpPaise: z.number(),
      flashPricePaise: z.number(),
    })
  ).min(1, "At least one item is required in the cart"),
  shipping: z.object({
    name: z.string().min(2, "Full name is required"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Valid 10-digit Indian phone number is required"),
    address: z.string().min(5, "Complete street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Valid 6-digit postal pincode is required"),
  }),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const parsed = flashOrderSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid order data" },
        { status: 400 }
      );
    }

    const { items, shipping } = parsed.data;

    // Calculate total amount at 80% OFF (20% of MRP)
    let totalMrpPaise = 0;
    let totalFlashPaise = 0;

    for (const item of items) {
      totalMrpPaise += item.mrpPaise * item.qty;
      const expectedFlash = Math.round(item.mrpPaise * 0.2) * item.qty;
      totalFlashPaise += expectedFlash;
    }

    // Minimum cart requirement: ₹999 (99,900 paise)
    const MIN_CART_PAISE = 99900;
    if (totalFlashPaise < MIN_CART_PAISE) {
      const remainingInr = Math.ceil((MIN_CART_PAISE - totalFlashPaise) / 100);
      return NextResponse.json(
        {
          error: `Minimum cart value for the 80% Flash Opening Sale is ₹999. Please add ₹${remainingInr} more to checkout.`,
          minRequired: 999,
          currentTotal: totalFlashPaise / 100,
        },
        { status: 400 }
      );
    }

    const discountPaise = totalMrpPaise - totalFlashPaise;

    // Generate unique invoice number
    const invoiceNo = `JC-FL80-${Date.now().toString().slice(-6)}`;

    // Prepare complete shipping JSON with flash order items
    const fullShippingJson = JSON.stringify({
      ...shipping,
      isFlashSale: true,
      flashDiscountPct: 80,
      totalItemsCount: items.reduce((sum, it) => sum + it.qty, 0),
      items: items.map((it) => ({
        title: it.title,
        slug: it.slug,
        qty: it.qty,
        mrpInr: it.mrpPaise / 100,
        flashPriceInr: Math.round(it.mrpPaise * 0.2) / 100,
        lineTotalInr: (Math.round(it.mrpPaise * 0.2) * it.qty) / 100,
      })),
      totalMrpInr: totalMrpPaise / 100,
      totalPaidInr: totalFlashPaise / 100,
      savingsInr: discountPaise / 100,
      freeDeliveryUnlocked: true,
    });

    const firstProduct = items[0];

    // Create a dedicated unit for this flash order so order creation is guaranteed
    const unit = await prisma.unit.create({
      data: {
        productId: firstProduct.productId,
        serialOrImei: `Z10K-FL-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
        grade: "DIGITAL_MASTER",
        source: "INSTANT_DOWNLOAD",
        pricePaise: totalFlashPaise,
        floorPaise: totalFlashPaise,
        status: "RESERVED",
      },
    });

    const order = await prisma.order.create({
      data: {
        unitId: unit.id,
        amountPaise: totalFlashPaise,
        discountPaise,
        couponCode: "FLASH75",
        status: "AWAITING_PAYMENT",
        paymentMode: "MANUAL_UPI",
        invoiceNo,
        shippingJson: fullShippingJson,
      },
    });

    const amountInr = totalFlashPaise / 100;
    const vpa = process.env.MERCHANT_VPA || "6380640087@upi";
    const payeeName = process.env.MERCHANT_NAME || "ZeroToTenK Digital";

    const upiOptions = {
      vpa,
      payeeName,
      amountPaise: totalFlashPaise,
      orderId: order.id,
      productTitle: `Flash Sale ${invoiceNo}`,
    };

    const upiLink = buildUpiLink(upiOptions);
    const specificLinks = buildSpecificUpiLinks(upiOptions);

    let qrDataUrl = "";
    try {
      qrDataUrl = await generateUpiQrCode(upiLink);
    } catch (e) {
      console.error("QR Code generation error:", e);
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      invoiceNo,
      amountPaise: totalFlashPaise,
      amountInr,
      totalMrpInr: totalMrpPaise / 100,
      savingsInr: discountPaise / 100,
      upiLink,
      phonePeLink: specificLinks.phonepe,
      gpayLink: specificLinks.gpay,
      paytmLink: specificLinks.paytm,
      qrDataUrl,
      payeeVpa: vpa,
      payeeName,
    });
  } catch (err: any) {
    console.error("Flash Order creation error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create flash order" },
      { status: 500 }
    );
  }
}
