import fs from 'fs';
import { EBOOKS } from '../prisma/seed.mjs';

function escapeSql(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/'/g, "''");
}

let sql = `-- Clear old data
DELETE FROM "Review";
DELETE FROM "Order";
DELETE FROM "Unit";
DELETE FROM "Product";
DELETE FROM "Coupon";

-- Insert Coupons
INSERT INTO "Coupon" ("code", "percentOff", "maxUses", "used", "active") VALUES
('START10', 10, 5000, 0, true),
('ZEROTOTENK', 15, 2000, 0, true),
('LAUNCH20', 20, 1000, 0, true),
('EXIT5', 5, 5000, 0, true)
ON CONFLICT ("code") DO UPDATE SET "percentOff" = EXCLUDED."percentOff", "active" = true;

`;

let prodIdx = 1;
for (const b of EBOOKS) {
  const prodId = `prod_ebk_${prodIdx.toString().padStart(3, '0')}`;
  const mrpPaise = Math.round(b.mrpPrice * 100);
  const pricePaise = Math.round(b.sellingPrice * 100);
  const floorPaise = Math.round(pricePaise * 0.85);

  sql += `
-- Product ${prodIdx}: ${b.title}
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('${prodId}', '${escapeSql(b.slug)}', '${escapeSql(b.title)}', '${escapeSql(b.brand)}', '${escapeSql(b.modelNumber)}', '${escapeSql(b.category)}', '${escapeSql(b.description)}', '${escapeSql(JSON.stringify(b.images))}', ${mrpPaise}, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
`;

  // Insert 3 Units
  for (let i = 1; i <= 3; i++) {
    const unitId = `unit_${prodId}_${i}`;
    const serial = `EBK-${b.slug.toUpperCase().slice(0, 12)}-${1000 + i}`;
    sql += `INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('${unitId}', '${prodId}', '${serial}', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', ${Math.round(pricePaise * 0.1)}, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, ${pricePaise}, ${floorPaise}, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
`;
  }

  // Insert Reviews
  if (b.reviews && b.reviews.length > 0) {
    let revIdx = 1;
    for (const r of b.reviews) {
      const revId = `rev_${prodId}_${revIdx++}`;
      sql += `INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('${revId}', '${prodId}', '${escapeSql(r.name)}', ${r.rating}, '${escapeSql(r.comment)}', true, NOW());
`;
    }
  }

  prodIdx++;
}

fs.writeFileSync('./scripts/seed-supabase.sql', sql, 'utf-8');
console.log('Successfully generated scripts/seed-supabase.sql with ' + EBOOKS.length + ' eBooks!');
