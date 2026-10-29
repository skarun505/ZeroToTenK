-- Clear old data
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

-- Product 1: The AI Millionaire Blueprint: How to Build & Scale Automated Digital Empires
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_001', 'zero-to-10k-day-playbook', 'The AI Millionaire Blueprint: How to Build & Scale Automated Digital Empires', 'ZeroToTenK Originals', 'Interactive Master Edition (PDF + ePub + Notion)', 'blueprint-courses', 'The definitive step-by-step master roadmap designed for creators, solopreneurs, and ambitious builders to build a recurring ₹10,000/day digital product income stream with AI agents and automation. Covers niche discovery, rapid 7-day drafting, high-converting checkout setups, organic viral traffic loops, and automated UPI payment workflows. Includes 8 core chapters, 12 actionable worksheets, and a turnkey Notion action dashboard.', '["/images/books/zero-to-10k-day-playbook.svg"]', 199900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_001_1', 'prod_ebk_001', 'EBK-ZERO-TO-10K--1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 4990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 49900, 42415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_001_2', 'prod_ebk_001', 'EBK-ZERO-TO-10K--1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 4990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 49900, 42415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_001_3', 'prod_ebk_001', 'EBK-ZERO-TO-10K--1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 4990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 49900, 42415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_001_1', 'prod_ebk_001', 'Arjun Verma', 5, 'Made my first ₹14,500 within 9 days of applying Chapter 4! The exact framing on pricing and WhatsApp checkout makes conversions effortless.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_001_2', 'prod_ebk_001', 'Sneha Mukherjee', 5, 'Finally an honest, non-fluff guide tailored specifically for modern creators selling through UPI and social channels. Worth 10x the price.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_001_3', 'prod_ebk_001', 'Rahul Deshmukh', 5, 'Clear, brutally practical, and zero filler. The chapter on audience objection handling is genius.', true, NOW());

-- Product 2: The 48-Hour Micro-eBook Method: Launch Profitable Digital Guides in a Weekend
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_002', '48-hour-micro-ebook-method', 'The 48-Hour Micro-eBook Method: Launch Profitable Digital Guides in a Weekend', 'ZeroToTenK Originals', 'Rapid Launch Edition (PDF + Templates)', 'creation-and-writing', 'Stop spending 6 months writing 300-page books nobody finishes. This field-tested methodology teaches you how to conceptualize, structure, and publish an ultra-specific 30-to-45-page micro-guide over a single weekend. Includes chapter-by-chapter outline formulas, hook writing templates, and zero-distraction formatting workflows in Google Docs & Canva.', '["/images/books/48-hour-micro-ebook-method.svg"]', 99900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_002_1', 'prod_ebk_002', 'EBK-48-HOUR-MICR-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 29900, 25415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_002_2', 'prod_ebk_002', 'EBK-48-HOUR-MICR-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 29900, 25415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_002_3', 'prod_ebk_002', 'EBK-48-HOUR-MICR-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 29900, 25415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_002_1', 'prod_ebk_002', 'Vikas Pillai', 5, 'Drafted my 36-page guide on React interview tricks in one weekend. Put it up on Monday and sold 23 copies by Wednesday.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_002_2', 'prod_ebk_002', 'Divya Nambiar', 5, 'Cured my chronic imposter syndrome and perfectionism. Highly recommended for first-time authors.', true, NOW());

-- Product 3: High-Converting Landing Pages: The Psychology & Layouts That Turn 14%+ Traffic into Buyers
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_003', 'high-converting-landing-pages', 'High-Converting Landing Pages: The Psychology & Layouts That Turn 14%+ Traffic into Buyers', 'ZeroToTenK Originals', 'Conversion Lab Series (PDF + Wireframes)', 'funnels-and-sales', 'Learn the exact layout anatomy, typography hierarchy, social proof placements, and friction-free mobile checkout flows that convert 14% to 18% of cold mobile traffic into buyers. Features 15 visual wireframes, before-and-after conversion teardowns, and copy frameworks for sticky hero sections.', '["/images/books/high-converting-landing-pages.svg"]', 149900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_003_1', 'prod_ebk_003', 'EBK-HIGH-CONVERT-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 39900, 33915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_003_2', 'prod_ebk_003', 'EBK-HIGH-CONVERT-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 39900, 33915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_003_3', 'prod_ebk_003', 'EBK-HIGH-CONVERT-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 39900, 33915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_003_1', 'prod_ebk_003', 'Tanmay Bhattacharya', 5, 'Tweaked my mobile hero section using Page 41 framework and my conversion jumped from 3.2% to 8.7% overnight.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_003_2', 'prod_ebk_003', 'Kavita Rao', 5, 'Must-read for anyone frustrated with high traffic but low checkout completions. Extremely detailed.', true, NOW());

-- Product 4: Viral Content Secrets: The Zero-Ad-Spend Algorithm Machine for Reels & TikTok
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_004', 'zero-ad-spend-traffic-machine', 'Viral Content Secrets: The Zero-Ad-Spend Algorithm Machine for Reels & TikTok', 'ZeroToTenK Originals', 'Organic Growth Edition (PDF + Swipe File)', 'traffic-and-social', 'Generate 500+ warm visitors every single day without blowing money on Meta or Google Ads. Master short-form Reels scripts, high-retention carousel design, Twitter/X threads, and algorithm mechanics that predictably trigger organic viral reach and direct message inquiries.', '["/images/books/zero-ad-spend-traffic-machine.svg"]', 129900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_004_1', 'prod_ebk_004', 'EBK-ZERO-AD-SPEN-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 34900, 29665, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_004_2', 'prod_ebk_004', 'EBK-ZERO-AD-SPEN-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 34900, 29665, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_004_3', 'prod_ebk_004', 'EBK-ZERO-AD-SPEN-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 34900, 29665, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_004_1', 'prod_ebk_004', 'Kunal Shah', 5, 'One reel made with the ''Curiosity Bridge'' formula hit 240K views and brought in 180 ebook sales in 48 hours.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_004_2', 'prod_ebk_004', 'Meera Krishnan', 5, 'The 30-day posting system removes all guesswork about what to publish each morning.', true, NOW());

-- Product 5: The Conversational Cashflow System: Automated WhatsApp & UPI Sales Funnels
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_005', 'automated-whatsapp-sales-funnel', 'The Conversational Cashflow System: Automated WhatsApp & UPI Sales Funnels', 'ZeroToTenK Originals', 'Autopilot Edition (PDF + Flow Templates)', 'automation-and-scaling', 'WhatsApp is where consumers transact. This guide reveals how to deploy frictionless conversational funnels, QR code checkout links, instant payment verification, and automated 1-click upsells with 98% open rates and zero manual copy-pasting.', '["/images/books/automated-whatsapp-sales-funnel.svg"]', 179900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_005_1', 'prod_ebk_005', 'EBK-AUTOMATED-WH-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 4490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 44900, 38165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_005_2', 'prod_ebk_005', 'EBK-AUTOMATED-WH-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 4490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 44900, 38165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_005_3', 'prod_ebk_005', 'EBK-AUTOMATED-WH-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 4490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 44900, 38165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_005_1', 'prod_ebk_005', 'Sanjay Singhal', 5, 'Recovered 38 abandoned carts in the first week using the 3-step WhatsApp follow-up script. Paid for itself immediately.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_005_2', 'prod_ebk_005', 'Pooja Hegde', 5, 'Clear setup guides for bot workflows and UPI reconciliation. A game-changer.', true, NOW());

-- Product 6: 50 High-Profit Digital Niches: Micro-Markets Where Buyers Are Eagerly Paying Today
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_006', '50-profitable-digital-niches', '50 High-Profit Digital Niches: Micro-Markets Where Buyers Are Eagerly Paying Today', 'ZeroToTenK Originals', 'Market Intelligence Pack (PDF + Research Matrix)', 'creation-and-writing', 'Discover 50 high-demand, uncapped micro-niches across tech, career growth, AI tools, productivity, personal finance, creator economy, and wellness where buyers are actively looking for solutions and ready to pay ₹299 to ₹999 without hesitation.', '["/images/books/50-profitable-digital-niches.svg"]', 79900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_006_1', 'prod_ebk_006', 'EBK-50-PROFITABL-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 1990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 19900, 16915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_006_2', 'prod_ebk_006', 'EBK-50-PROFITABL-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 1990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 19900, 16915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_006_3', 'prod_ebk_006', 'EBK-50-PROFITABL-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 1990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 19900, 16915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_006_1', 'prod_ebk_006', 'Aditya Roy', 5, 'Found my niche in Chapter 3 (Freelance Tax Compliance for Creators). Already sold 60 copies!', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_006_2', 'prod_ebk_006', 'Shalini Gupta', 5, 'Eliminates months of wasted research. The pricing benchmarks for each niche are spot on.', true, NOW());

-- Product 7: The Million-Dollar Copywriting Swipe File: Persuasive Headlines That Print Money
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_007', 'copywriting-secrets-for-non-writers', 'The Million-Dollar Copywriting Swipe File: Persuasive Headlines That Print Money', 'ZeroToTenK Originals', 'Direct Response Edition (PDF + Swipe File)', 'funnels-and-sales', 'You don''t need to be an English major to write copy that prints money. Get 100+ fill-in-the-blank headlines, pain-point agitation frameworks, irresistible offer formulas, and urgent call-to-action triggers that make readers pull out their phones and buy immediately.', '["/images/books/copywriting-secrets-for-non-writers.svg"]', 89900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_007_1', 'prod_ebk_007', 'EBK-COPYWRITING--1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 24900, 21165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_007_2', 'prod_ebk_007', 'EBK-COPYWRITING--1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 24900, 21165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_007_3', 'prod_ebk_007', 'EBK-COPYWRITING--1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 24900, 21165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_007_1', 'prod_ebk_007', 'Rohit Malhotra', 5, 'The 5-part hook framework is pure gold. My product click-through rate doubled instantly.', true, NOW());

-- Product 8: The 10x AI Prompt Engineering Bible: 850+ Tested Prompts for ChatGPT, Claude & Midjourney
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_008', 'ai-prompt-engine-for-creators', 'The 10x AI Prompt Engineering Bible: 850+ Tested Prompts for ChatGPT, Claude & Midjourney', 'ZeroToTenK Originals', 'AI Power Pack (PDF + Notion Database)', 'creation-and-writing', 'Over 850+ rigorously tested prompts for Claude 3.5, ChatGPT 4o, and Midjourney to draft comprehensive outlines, polish technical chapters, generate viral social hooks, write high-converting sales emails, and produce engaging visual concepts.', '["/images/books/ai-prompt-engine-for-creators.svg"]', 69900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_008_1', 'prod_ebk_008', 'EBK-AI-PROMPT-EN-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 1990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 19900, 16915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_008_2', 'prod_ebk_008', 'EBK-AI-PROMPT-EN-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 1990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 19900, 16915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_008_3', 'prod_ebk_008', 'EBK-AI-PROMPT-EN-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 1990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 19900, 16915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_008_1', 'prod_ebk_008', 'Praveen Nair', 5, 'These aren''t generic prompts you find on Twitter. They produce genuinely book-grade writing without sounding like an AI.', true, NOW());

-- Product 9: The 6-Figure Newsletter Blueprint: Build, Grow & Monetize 5,000 True Fans
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_009', 'email-marketing-broadcast-strategy', 'The 6-Figure Newsletter Blueprint: Build, Grow & Monetize 5,000 True Fans', 'ZeroToTenK Originals', 'Revenue Engine Series (PDF + 14 Templates)', 'automation-and-scaling', 'How to nurture a small email list into an unbeatable daily revenue channel. Step-by-step guidance on setting up an automated 7-day welcome sequence, weekly value newsletters, and weekend flash-sale promotions that generate high open rates and consistent orders.', '["/images/books/email-marketing-broadcast-strategy.svg"]', 159900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_009_1', 'prod_ebk_009', 'EBK-EMAIL-MARKET-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 39900, 33915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_009_2', 'prod_ebk_009', 'EBK-EMAIL-MARKET-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 39900, 33915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_009_3', 'prod_ebk_009', 'EBK-EMAIL-MARKET-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 39900, 33915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_009_1', 'prod_ebk_009', 'Ananya Sen', 5, 'Sent my first campaign following the ''Story + Offer'' structure and generated ₹28,000 from an 800-person list.', true, NOW());

-- Product 10: The Solopreneur Operating System: Escape the 9-to-5 & Build Assets That Sell Forever
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_010', 'freelancer-to-info-publisher', 'The Solopreneur Operating System: Escape the 9-to-5 & Build Assets That Sell Forever', 'ZeroToTenK Originals', 'Freedom Series (PDF + Strategy Map)', 'blueprint-courses', 'Stop trading hours for client fees. Learn how to package your client expertise, systemized SOPs, and industry workflows into standalone digital playbooks that sell while you sleep, freeing up your calendar for high-leverage work.', '["/images/books/freelancer-to-info-publisher.svg"]', 129900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_010_1', 'prod_ebk_010', 'EBK-FREELANCER-T-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 34900, 29665, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_010_2', 'prod_ebk_010', 'EBK-FREELANCER-T-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 34900, 29665, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_010_3', 'prod_ebk_010', 'EBK-FREELANCER-T-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 3490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 34900, 29665, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_010_1', 'prod_ebk_010', 'Gaurav Joshi', 5, 'Allowed me to drop 2 toxic freelance clients because my eBook revenue now covers all my basic living expenses.', true, NOW());

-- Product 11: The 100K Personal Brand Formula: Turn Followers into High-Paying Customers
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_011', 'instagram-story-selling-blueprint', 'The 100K Personal Brand Formula: Turn Followers into High-Paying Customers', 'ZeroToTenK Originals', 'Social Conversions (PDF + 30 Canva Templates)', 'traffic-and-social', 'The subtle 4-slide daily story sequence that builds genuine anticipation and effortlessly drives 20-50 daily eBook orders from your existing followers without annoying your audience or feeling like a hard sell.', '["/images/books/instagram-story-selling-blueprint.svg"]', 89900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_011_1', 'prod_ebk_011', 'EBK-INSTAGRAM-ST-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 24900, 21165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_011_2', 'prod_ebk_011', 'EBK-INSTAGRAM-ST-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 24900, 21165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_011_3', 'prod_ebk_011', 'EBK-INSTAGRAM-ST-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 2490, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 24900, 21165, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_011_1', 'prod_ebk_011', 'Ritu Sharma', 5, 'I used to feel so awkward selling on stories. This framework makes it feel like natural conversation and people actually thank me for recommending the book!', true, NOW());

-- Product 12: The Creator Economy Mega Vault: All 11 Bestselling Master eBooks + Notion Workspaces
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_012', 'zerototenk-all-access-empire-bundle', 'The Creator Economy Mega Vault: All 11 Bestselling Master eBooks + Notion Workspaces', 'ZeroToTenK VIP', 'Complete Mastermind Vault (All 11 Books + Notion Systems)', 'mega-bundles', 'The complete, all-inclusive ZeroToTenK digital library. Instant access to all 11 Master eBooks (1,250+ pages), 50 Notion Workspaces, 250 Canva Templates, 850+ AI Prompts, and private community updates. The ultimate investment for anyone serious about digital publishing in 2026.', '["/images/books/zerototenk-all-access-empire-bundle.svg"]', 499900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_012_1', 'prod_ebk_012', 'EBK-ZEROTOTENK-A-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 9990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 99900, 84915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_012_2', 'prod_ebk_012', 'EBK-ZEROTOTENK-A-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 9990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 99900, 84915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_012_3', 'prod_ebk_012', 'EBK-ZEROTOTENK-A-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 9990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 99900, 84915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_012_1', 'prod_ebk_012', 'Karthik R.', 5, 'The bundle is an insane steal. If bought separately it would cost thousands. Every single playbook is top tier.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_012_2', 'prod_ebk_012', 'Harish Venkat', 5, 'Best decision I made this year. Went through the Playbook and the WhatsApp funnel first and already crossed ₹60,000 this month.', true, NOW());

-- Product 13: The 8-Figure Digital Media & Agency Scale Playbook: Systems, Ghostwriting & Enterprise SOPs
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_013', '10-lakh-digital-media-accelerator', 'The 8-Figure Digital Media & Agency Scale Playbook: Systems, Ghostwriting & Enterprise SOPs', 'ZeroToTenK Enterprise', 'Executive Mastermind Edition (Playbooks + Funnels + SOPs)', 'blueprint-courses', 'The complete institutional master blueprint to scale beyond the ₹10K/day mark and build an 8-figure publishing media company. Covers team hiring frameworks for ghostwriters and designers, backend high-ticket monetization, automated revenue attribution, corporate training pipelines, and multi-brand expansion architectures.', '["/images/books/10-lakh-digital-media-accelerator.svg"]', 1299900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_013_1', 'prod_ebk_013', 'EBK-10-LAKH-DIGI-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 34990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 349900, 297415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_013_2', 'prod_ebk_013', 'EBK-10-LAKH-DIGI-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 34990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 349900, 297415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_013_3', 'prod_ebk_013', 'EBK-10-LAKH-DIGI-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 34990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 349900, 297415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_013_1', 'prod_ebk_013', 'Siddharth Malhotra', 5, 'We scaled our digital publishing revenue from ₹1.8L to ₹11.4L in under 5 months using the backend agency model in Chapter 6. This is enterprise-grade material.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_013_2', 'prod_ebk_013', 'Ananya Iyer', 5, 'The ghostwriter hiring SOPs and funnel attribution spreadsheets alone saved us hundreds of wasted hours.', true, NOW());

-- Product 14: The High-Ticket Consulting Rainmaker: Close ₹50,000 - ₹2,00,000 Retainers from Readers
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_014', 'high-ticket-consulting-mastermind-blueprint', 'The High-Ticket Consulting Rainmaker: Close ₹50,000 - ₹2,00,000 Retainers from Readers', 'ZeroToTenK Mastermind', 'High-Ticket Suite (Client Acquisition Funnels + Call Scripts)', 'funnels-and-sales', 'How to ethically ascend low-ticket ₹299 - ₹999 eBook buyers into lucrative ₹50,000 to ₹2,00,000 high-ticket consulting and private mastermind clients. Includes complete qualification call scripts, objection reversal matrix, client onboarding Notion workspaces, retainer legal contracts, and high-retention student tracking dashboards.', '["/images/books/high-ticket-consulting-mastermind-blueprint.svg"]', 1499900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_014_1', 'prod_ebk_014', 'EBK-HIGH-TICKET--1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 39990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 399900, 339915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_014_2', 'prod_ebk_014', 'EBK-HIGH-TICKET--1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 39990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 399900, 339915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_014_3', 'prod_ebk_014', 'EBK-HIGH-TICKET--1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 39990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 399900, 339915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_014_1', 'prod_ebk_014', 'Deepak Krishnan', 5, 'Closed two consulting clients at ₹65,000 each within 3 weeks of deploying the objection matrix script. Life-changing return on a ₹3,999 investment.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_014_2', 'prod_ebk_014', 'Meera Sen', 5, 'The cleanest high-ticket ascension framework I have seen. No sleazy sales tactics, just pure value positioning.', true, NOW());

-- Product 15: The 365-Day Omnichannel Paid Ads & Growth Marketing Arsenal (Meta, Google & YouTube)
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_015', '365-day-traffic-and-ads-domination-vault', 'The 365-Day Omnichannel Paid Ads & Growth Marketing Arsenal (Meta, Google & YouTube)', 'ZeroToTenK Growth Labs', 'Omnichannel Vault (Meta & Google Ad Templates + 365 Calendars)', 'traffic-and-social', 'The ultimate paid advertising and traffic generation arsenal. Plug-and-play Meta, Google, and YouTube ad campaigns with proven 3.8x+ ROAS, 365 days of done-for-you content prompts, 500+ viral hook swipe files, and editable Figma/Canva ad creatives engineered specifically for high day-zero cash flow and low-cost UPI acquisition.', '["/images/books/365-day-traffic-and-ads-domination-vault.svg"]', 1699900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_015_1', 'prod_ebk_015', 'EBK-365-DAY-TRAF-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 44990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 449900, 382415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_015_2', 'prod_ebk_015', 'EBK-365-DAY-TRAF-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 44990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 449900, 382415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_015_3', 'prod_ebk_015', 'EBK-365-DAY-TRAF-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 44990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 449900, 382415, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_015_1', 'prod_ebk_015', 'Vikram Singhania', 5, 'Tested the exact CBO campaign setup from Module 3 with ₹5,000 ad spend on Facebook. Returned ₹24,800 in eBook sales on day one!', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_015_2', 'prod_ebk_015', 'Pooja Hegde', 5, 'The 365-day organic calendar eliminates writer''s block forever. We never have to think about what to post.', true, NOW());

-- Product 16: The Lifetime VIP Founder Pass: Unlimited Lifetime Access to Every Present & Future eBook
INSERT INTO "Product" ("id", "slug", "title", "brand", "modelNumber", "category", "description", "images", "mrp", "warrantyMonths", "returnDays", "createdAt")
VALUES ('prod_ebk_016', 'zerototenk-lifetime-founding-pass', 'The Lifetime VIP Founder Pass: Unlimited Lifetime Access to Every Present & Future eBook', 'ZeroToTenK VIP Founder', 'Ultimate Lifetime Vault (All 15+ Products + Commercial Rights + VIP)', 'mega-bundles', 'The most prestigious tier in the ZeroToTenK ecosystem. Unconditional lifetime access to every current and future eBook, video breakdown, Notion operating system, and AI prompt vault released on ZeroToTenK. Includes commercial PLR/MRR rights, raw editable Canva/Google Docs source files, and direct private WhatsApp founder advisory channel.', '["/images/books/zerototenk-lifetime-founding-pass.svg"]', 1999900, 30, 7, NOW())
ON CONFLICT ("slug") DO UPDATE SET "title" = EXCLUDED."title", "mrp" = EXCLUDED."mrp", "images" = EXCLUDED."images", "description" = EXCLUDED."description";
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_016_1', 'prod_ebk_016', 'EBK-ZEROTOTENK-L-1001', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 49990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 499900, 424915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_016_2', 'prod_ebk_016', 'EBK-ZEROTOTENK-L-1002', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 49990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 499900, 424915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Unit" ("id", "productId", "serialOrImei", "grade", "source", "costPaise", "repairNotes", "batteryHealth", "pricePaise", "floorPaise", "status", "createdAt")
VALUES ('unit_prod_ebk_016_3', 'prod_ebk_016', 'EBK-ZEROTOTENK-L-1003', 'DIGITAL_MASTER', 'INSTANT_DOWNLOAD', 49990, 'Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.', 100, 499900, 424915, 'AVAILABLE', NOW())
ON CONFLICT ("serialOrImei") DO UPDATE SET "pricePaise" = EXCLUDED."pricePaise", "status" = 'AVAILABLE';
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_016_1', 'prod_ebk_016', 'Aditya Nair', 5, 'Getting full commercial rebranding rights to their entire digital product library for ₹4,999 is unreal. The highest ROI purchase I''ve ever made online.', true, NOW());
INSERT INTO "Review" ("id", "productId", "userName", "rating", "comment", "verifiedPurchase", "createdAt")
VALUES ('rev_prod_ebk_016_2', 'prod_ebk_016', 'Gaurav Bansal', 5, 'The private founder community and immediate access to every new release alone is easily worth 10 times this.', true, NOW());

