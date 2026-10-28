import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mdattxewghzooverrrxe.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYXR0eGV3Z2h6b292ZXJycnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDY2NTEsImV4cCI6MjEwNzgyMjY1MX0.qN0aCh6Zf6AMRL0MW6x0DoionXvP8S7D0DK6xe_DM-M";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const customers = [
  { name: "Rahul Sharma", city: "Bengaluru", state: "Karnataka", phone: "9845012345" },
  { name: "Pooja Hegde", city: "Mumbai", state: "Maharashtra", phone: "9820054321" },
  { name: "Amitav Sengupta", city: "Kolkata", state: "West Bengal", phone: "9830011223" },
  { name: "Vikram Malhotra", city: "Delhi", state: "Delhi", phone: "9811099887" },
  { name: "Sneha Reddy", city: "Hyderabad", state: "Telangana", phone: "9849033445" },
  { name: "Ananya Iyer", city: "Chennai", state: "Tamil Nadu", phone: "9840077889" },
  { name: "Rohan Patel", city: "Ahmedabad", state: "Gujarat", phone: "9825066778" },
  { name: "Kavita Nair", city: "Kochi", state: "Kerala", phone: "9847055667" },
  { name: "Aditya Verma", city: "Pune", state: "Maharashtra", phone: "9822044556" },
  { name: "Siddharth Jain", city: "Jaipur", state: "Rajasthan", phone: "9829033221" },
  { name: "Deepak Choudhary", city: "Chandigarh", state: "Punjab", phone: "9814022110" },
  { name: "Meera Krishnan", city: "Coimbatore", state: "Tamil Nadu", phone: "9842011990" },
];

async function seedAnalytics() {
  console.log("Seeding analytics orders across last 30 days...");

  // Fetch available units
  const { data: units, error: uErr } = await supabase
    .from("Unit")
    .select("id, productId, pricePaise, product:Product(*)");

  if (uErr || !units || units.length === 0) {
    console.error("Failed to load units:", uErr);
    return;
  }

  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  // Generate 25 realistic orders with dedicated units
  const distribution = [
    { daysAgo: 28, unitIdx: 11 }, // Empire Bundle ₹999
    { daysAgo: 26, unitIdx: 0 },  // 10K Playbook ₹499
    { daysAgo: 25, unitIdx: 12 }, // Accelerator ₹3,499
    { daysAgo: 23, unitIdx: 2 },  // Landing pages ₹499
    { daysAgo: 21, unitIdx: 15 }, // Founding Pass ₹4,999
    { daysAgo: 19, unitIdx: 11 }, // Empire Bundle ₹999
    { daysAgo: 17, unitIdx: 4 },  // WhatsApp Funnel ₹499
    { daysAgo: 15, unitIdx: 14 }, // Traffic Vault ₹4,499
    { daysAgo: 14, unitIdx: 11 }, // Empire Bundle ₹999
    { daysAgo: 12, unitIdx: 0 },  // 10K Playbook ₹499
    { daysAgo: 10, unitIdx: 13 }, // Consulting Blueprint ₹3,999
    { daysAgo: 9, unitIdx: 6 },   // Copywriting Secrets ₹499
    { daysAgo: 8, unitIdx: 11 },  // Empire Bundle ₹999
    { daysAgo: 7, unitIdx: 12 },  // Accelerator ₹3,499
    { daysAgo: 6, unitIdx: 0 },   // 10K Playbook ₹499
    { daysAgo: 5, unitIdx: 15 },  // Founding Pass ₹4,999
    { daysAgo: 4, unitIdx: 11 },  // Empire Bundle ₹999
    { daysAgo: 3, unitIdx: 14 },  // Traffic Vault ₹4,499
    { daysAgo: 2, unitIdx: 0 },   // 10K Playbook ₹499
    { daysAgo: 1, unitIdx: 11 },  // Empire Bundle ₹999
    { daysAgo: 0, unitIdx: 15 },  // Founding Pass ₹4,999
  ];

  const newUnits = [];
  const newOrders = [];

  for (let i = 0; i < distribution.length; i++) {
    const item = distribution[i];
    const orderDate = new Date(now - item.daysAgo * dayMs - Math.random() * 10 * 3600 * 1000);
    const selectedTemplateUnit = units[item.unitIdx % units.length];
    const customer = customers[i % customers.length];
    const unitId = `unit_hist_${Date.now()}_${i}`;
    const orderId = `ord_hist_${Date.now()}_${i}`;
    const amount = selectedTemplateUnit.pricePaise;

    newUnits.push({
      id: unitId,
      productId: selectedTemplateUnit.productId,
      serialOrImei: `Z10K-LIC-${Date.now().toString().slice(-6)}-${i + 100}`,
      grade: "DIGITAL_MASTER",
      source: "INSTANT_FULFILLMENT",
      costPaise: Math.round(amount * 0.1),
      pricePaise: amount,
      floorPaise: amount,
      status: "SOLD",
      createdAt: orderDate.toISOString(),
    });

    const shipping = {
      name: customer.name,
      phone: customer.phone,
      address: "102 Executive Heights",
      city: customer.city,
      state: customer.state,
      pincode: "560001",
    };

    newOrders.push({
      id: orderId,
      userId: `usr_${customer.phone}`,
      unitId: unitId,
      amountPaise: amount,
      discountPaise: 0,
      status: item.daysAgo === 0 ? "PAYMENT_SUBMITTED" : "VERIFIED",
      paymentMode: "MANUAL_UPI",
      utr: `2026${String(88000000 + i * 359).slice(0, 8)}`,
      utrSubmittedAt: orderDate.toISOString(),
      payerName: customer.name,
      verifiedBy: item.daysAgo === 0 ? null : "admin_lead",
      verifiedAt: item.daysAgo === 0 ? null : new Date(orderDate.getTime() + 1200000).toISOString(),
      invoiceNo: `INV-2026-${String(2000 + i)}`,
      shippingJson: JSON.stringify(shipping),
      createdAt: orderDate.toISOString(),
    });
  }

  // Insert Units first
  const { error: uInsErr } = await supabase.from("Unit").insert(newUnits);
  if (uInsErr) {
    console.error("Error inserting units:", uInsErr);
    return;
  }

  // Insert Orders
  const { data: inserted, error: oInsErr } = await supabase.from("Order").insert(newOrders).select();
  if (oInsErr) {
    console.error("Error inserting orders:", oInsErr);
  } else {
    console.log(`Successfully seeded ${inserted.length} analytics units and orders!`);
  }
}

seedAnalytics().catch(console.error);
