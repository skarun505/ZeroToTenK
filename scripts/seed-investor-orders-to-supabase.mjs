import { createClient } from "@supabase/supabase-js";

const DEFAULT_URL = "https://mdattxewghzooverrrxe.supabase.co";
const DEFAULT_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYXR0eGV3Z2h6b292ZXJycnhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIyNDY2NTEsImV4cCI6MjEwNzgyMjY1MX0.qN0aCh6Zf6AMRL0MW6x0DoionXvP8S7D0DK6xe_DM-M";

const supabase = createClient(DEFAULT_URL, DEFAULT_ANON_KEY);

const NAMES = [
  "Rajesh Sharma", "Vikram Patel", "Ananya Iyer", "Priya Nair", "Rohan Gupta",
  "Sneha Kulkarni", "Aditya Mehta", "Pooja Reddy", "Karthik Sundaram", "Meera Joshi",
  "Amit Malhotra", "Neha Choudhury", "Arjun Verma", "Swati Aggarwal", "Harish Pillai",
  "Divya Singhania", "Manish Tiwari", "Ritu Bhatt", "Rahul Sen", "Sanjay Deshmukh",
  "Kavita Rao", "Deepa Nambiar", "Suresh Menon", "Aishwarya Hegde", "Nikhil Mishra",
  "Tanvi Bansal", "Gaurav Kapoor", "Shreya Chatterjee", "Varun Pandey", "Pallavi Saxena"
];

const CITIES = [
  { city: "Bengaluru", state: "Karnataka", pincode: "560001" },
  { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
  { city: "New Delhi", state: "Delhi", pincode: "110001" },
  { city: "Hyderabad", state: "Telangana", pincode: "500001" },
  { city: "Pune", state: "Maharashtra", pincode: "411001" },
  { city: "Chennai", state: "Tamil Nadu", pincode: "600001" },
  { city: "Gurgaon", state: "Haryana", pincode: "122001" },
  { city: "Noida", state: "Uttar Pradesh", pincode: "201301" }
];

const PHONES = [
  "9820148291", "9845019284", "9810294819", "9910384729", "9741284918",
  "9886029481", "9980284719", "9823019482", "9890284719", "9825019482",
  "9840192847", "7019284719", "7021482910", "8884192847", "8971029481"
];

const PRODS = [
  { id: "prod_ebk_001", title: "The Zero to ₹10K/Day Playbook", price: 49900 },
  { id: "prod_ebk_005", title: "The Automated WhatsApp Sales Funnel", price: 44900 },
  { id: "prod_ebk_003", title: "High-Converting Landing Pages for Digital Products", price: 39900 },
  { id: "prod_ebk_002", title: "The 48-Hour Micro-eBook Method", price: 29900 },
  { id: "prod_ebk_004", title: "Zero Ad-Spend Organic Traffic Machine", price: 34900 },
  { id: "prod_ebk_012", title: "The ZeroToTenK All-Access Empire Bundle", price: 149900 },
  { id: "prod_ebk_016", title: "ZeroToTenK Lifetime Founding Member All-Access Pass", price: 699900 }
];

async function seed() {
  console.log("Starting Supabase database seeding of verified dummy orders...");

  const BATCH_SIZE = 50;
  const TOTAL_ORDERS_TO_DB = 500;
  const now = Date.now();

  for (let batch = 0; batch < TOTAL_ORDERS_TO_DB / BATCH_SIZE; batch++) {
    const unitsToInsert = [];
    const ordersToInsert = [];

    for (let i = 0; i < BATCH_SIZE; i++) {
      const idx = batch * BATCH_SIZE + i;
      const daysAgo = Math.random() * 29.5;
      const orderDate = new Date(now - daysAgo * 24 * 60 * 60 * 1000).toISOString();

      const prod = PRODS[Math.floor(Math.random() * PRODS.length)];
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const phone = PHONES[Math.floor(Math.random() * PHONES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];

      const unitId = `unit_inv_${10000 + idx}`;
      const orderId = `ord_inv_${10000 + idx}`;
      const serialOrImei = `EBK-INV-${prod.id.slice(-3).toUpperCase()}-${10000 + idx}`;
      const utr = `${Math.random() > 0.5 ? "4" : "5"}${Math.floor(10000000000 + Math.random() * 89999999999)}`;

      unitsToInsert.push({
        id: unitId,
        productId: prod.id,
        serialOrImei,
        grade: "DIGITAL_MASTER",
        source: "INSTANT_DOWNLOAD",
        costPaise: 0,
        pricePaise: prod.price,
        floorPaise: Math.round(prod.price * 0.85),
        status: "SOLD",
        createdAt: orderDate
      });

      ordersToInsert.push({
        id: orderId,
        userId: `usr_inv_${100 + (idx % 200)}`,
        unitId,
        amountPaise: prod.price,
        status: "VERIFIED",
        paymentMode: "MANUAL_UPI",
        utr,
        payerName: name,
        shippingJson: JSON.stringify({
          name,
          phone,
          address: "Business Tech Park, Level 4",
          city: city.city,
          state: city.state,
          pincode: city.pincode
        }),
        invoiceNo: `INV-2026-${10000 + idx}`,
        createdAt: orderDate
      });
    }

    const { error: unitErr } = await supabase.from("Unit").upsert(unitsToInsert, { onConflict: "id" });
    if (unitErr) {
      console.error("Batch Unit error:", unitErr);
      continue;
    }

    const { error: orderErr } = await supabase.from("Order").upsert(ordersToInsert, { onConflict: "id" });
    if (orderErr) {
      console.error("Batch Order error:", orderErr);
      continue;
    }

    console.log(`Seeded batch ${batch + 1}/${TOTAL_ORDERS_TO_DB / BATCH_SIZE} (${ordersToInsert.length} orders)`);
  }

  console.log("Supabase seeding complete!");
}

seed().catch(console.error);
