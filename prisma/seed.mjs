import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const EBOOKS = [
  {
    title: "The AI Millionaire Blueprint: How to Build & Scale Automated Digital Empires",
    slug: "zero-to-10k-day-playbook",
    brand: "ZeroToTenK Originals",
    modelNumber: "Interactive Master Edition (PDF + ePub + Notion)",
    category: "blueprint-courses",
    categoryTitle: "Zero to 10K Blueprints",
    sellingPrice: 499.0,
    mrpPrice: 1999.0,
    discountText: "-75% OFF",
    images: ["/images/books/zero-to-10k-day-playbook.svg"],
    description: "The definitive step-by-step master roadmap designed for creators, solopreneurs, and ambitious builders to build a recurring ₹10,000/day digital product income stream with AI agents and automation. Covers niche discovery, rapid 7-day drafting, high-converting checkout setups, organic viral traffic loops, and automated UPI payment workflows. Includes 8 core chapters, 12 actionable worksheets, and a turnkey Notion action dashboard.",
    reviews: [
      { name: "Arjun Verma", rating: 5, comment: "Made my first ₹14,500 within 9 days of applying Chapter 4! The exact framing on pricing and WhatsApp checkout makes conversions effortless." },
      { name: "Sneha Mukherjee", rating: 5, comment: "Finally an honest, non-fluff guide tailored specifically for modern creators selling through UPI and social channels. Worth 10x the price." },
      { name: "Rahul Deshmukh", rating: 5, comment: "Clear, brutally practical, and zero filler. The chapter on audience objection handling is genius." }
    ]
  },
  {
    title: "The 48-Hour Micro-eBook Method: Launch Profitable Digital Guides in a Weekend",
    slug: "48-hour-micro-ebook-method",
    brand: "ZeroToTenK Originals",
    modelNumber: "Rapid Launch Edition (PDF + Templates)",
    category: "creation-and-writing",
    categoryTitle: "eBook Creation & Writing",
    sellingPrice: 299.0,
    mrpPrice: 999.0,
    discountText: "-70% OFF",
    images: ["/images/books/48-hour-micro-ebook-method.svg"],
    description: "Stop spending 6 months writing 300-page books nobody finishes. This field-tested methodology teaches you how to conceptualize, structure, and publish an ultra-specific 30-to-45-page micro-guide over a single weekend. Includes chapter-by-chapter outline formulas, hook writing templates, and zero-distraction formatting workflows in Google Docs & Canva.",
    reviews: [
      { name: "Vikas Pillai", rating: 5, comment: "Drafted my 36-page guide on React interview tricks in one weekend. Put it up on Monday and sold 23 copies by Wednesday." },
      { name: "Divya Nambiar", rating: 5, comment: "Cured my chronic imposter syndrome and perfectionism. Highly recommended for first-time authors." }
    ]
  },
  {
    title: "High-Converting Landing Pages: The Psychology & Layouts That Turn 14%+ Traffic into Buyers",
    slug: "high-converting-landing-pages",
    brand: "ZeroToTenK Originals",
    modelNumber: "Conversion Lab Series (PDF + Wireframes)",
    category: "funnels-and-sales",
    categoryTitle: "Sales Funnels & Copywriting",
    sellingPrice: 399.0,
    mrpPrice: 1499.0,
    discountText: "-73% OFF",
    images: ["/images/books/high-converting-landing-pages.svg"],
    description: "Learn the exact layout anatomy, typography hierarchy, social proof placements, and friction-free mobile checkout flows that convert 14% to 18% of cold mobile traffic into buyers. Features 15 visual wireframes, before-and-after conversion teardowns, and copy frameworks for sticky hero sections.",
    reviews: [
      { name: "Tanmay Bhattacharya", rating: 5, comment: "Tweaked my mobile hero section using Page 41 framework and my conversion jumped from 3.2% to 8.7% overnight." },
      { name: "Kavita Rao", rating: 5, comment: "Must-read for anyone frustrated with high traffic but low checkout completions. Extremely detailed." }
    ]
  },
  {
    title: "Viral Content Secrets: The Zero-Ad-Spend Algorithm Machine for Reels & TikTok",
    slug: "zero-ad-spend-traffic-machine",
    brand: "ZeroToTenK Originals",
    modelNumber: "Organic Growth Edition (PDF + Swipe File)",
    category: "traffic-and-social",
    categoryTitle: "Traffic & Organic Reach",
    sellingPrice: 349.0,
    mrpPrice: 1299.0,
    discountText: "-73% OFF",
    images: ["/images/books/zero-ad-spend-traffic-machine.svg"],
    description: "Generate 500+ warm visitors every single day without blowing money on Meta or Google Ads. Master short-form Reels scripts, high-retention carousel design, Twitter/X threads, and algorithm mechanics that predictably trigger organic viral reach and direct message inquiries.",
    reviews: [
      { name: "Kunal Shah", rating: 5, comment: "One reel made with the 'Curiosity Bridge' formula hit 240K views and brought in 180 ebook sales in 48 hours." },
      { name: "Meera Krishnan", rating: 5, comment: "The 30-day posting system removes all guesswork about what to publish each morning." }
    ]
  },
  {
    title: "The Conversational Cashflow System: Automated WhatsApp & UPI Sales Funnels",
    slug: "automated-whatsapp-sales-funnel",
    brand: "ZeroToTenK Originals",
    modelNumber: "Autopilot Edition (PDF + Flow Templates)",
    category: "automation-and-scaling",
    categoryTitle: "Automation & Scaling",
    sellingPrice: 449.0,
    mrpPrice: 1799.0,
    discountText: "-75% OFF",
    images: ["/images/books/automated-whatsapp-sales-funnel.svg"],
    description: "WhatsApp is where consumers transact. This guide reveals how to deploy frictionless conversational funnels, QR code checkout links, instant payment verification, and automated 1-click upsells with 98% open rates and zero manual copy-pasting.",
    reviews: [
      { name: "Sanjay Singhal", rating: 5, comment: "Recovered 38 abandoned carts in the first week using the 3-step WhatsApp follow-up script. Paid for itself immediately." },
      { name: "Pooja Hegde", rating: 5, comment: "Clear setup guides for bot workflows and UPI reconciliation. A game-changer." }
    ]
  },
  {
    title: "50 High-Profit Digital Niches: Micro-Markets Where Buyers Are Eagerly Paying Today",
    slug: "50-profitable-digital-niches",
    brand: "ZeroToTenK Originals",
    modelNumber: "Market Intelligence Pack (PDF + Research Matrix)",
    category: "creation-and-writing",
    categoryTitle: "eBook Creation & Writing",
    sellingPrice: 199.0,
    mrpPrice: 799.0,
    discountText: "-75% OFF",
    images: ["/images/books/50-profitable-digital-niches.svg"],
    description: "Discover 50 high-demand, uncapped micro-niches across tech, career growth, AI tools, productivity, personal finance, creator economy, and wellness where buyers are actively looking for solutions and ready to pay ₹299 to ₹999 without hesitation.",
    reviews: [
      { name: "Aditya Roy", rating: 5, comment: "Found my niche in Chapter 3 (Freelance Tax Compliance for Creators). Already sold 60 copies!" },
      { name: "Shalini Gupta", rating: 5, comment: "Eliminates months of wasted research. The pricing benchmarks for each niche are spot on." }
    ]
  },
  {
    title: "The Million-Dollar Copywriting Swipe File: Persuasive Headlines That Print Money",
    slug: "copywriting-secrets-for-non-writers",
    brand: "ZeroToTenK Originals",
    modelNumber: "Direct Response Edition (PDF + Swipe File)",
    category: "funnels-and-sales",
    categoryTitle: "Sales Funnels & Copywriting",
    sellingPrice: 249.0,
    mrpPrice: 899.0,
    discountText: "-72% OFF",
    images: ["/images/books/copywriting-secrets-for-non-writers.svg"],
    description: "You don't need to be an English major to write copy that prints money. Get 100+ fill-in-the-blank headlines, pain-point agitation frameworks, irresistible offer formulas, and urgent call-to-action triggers that make readers pull out their phones and buy immediately.",
    reviews: [
      { name: "Rohit Malhotra", rating: 5, comment: "The 5-part hook framework is pure gold. My product click-through rate doubled instantly." }
    ]
  },
  {
    title: "The 10x AI Prompt Engineering Bible: 850+ Tested Prompts for ChatGPT, Claude & Midjourney",
    slug: "ai-prompt-engine-for-creators",
    brand: "ZeroToTenK Originals",
    modelNumber: "AI Power Pack (PDF + Notion Database)",
    category: "creation-and-writing",
    categoryTitle: "eBook Creation & Writing",
    sellingPrice: 199.0,
    mrpPrice: 699.0,
    discountText: "-71% OFF",
    images: ["/images/books/ai-prompt-engine-for-creators.svg"],
    description: "Over 850+ rigorously tested prompts for Claude 3.5, ChatGPT 4o, and Midjourney to draft comprehensive outlines, polish technical chapters, generate viral social hooks, write high-converting sales emails, and produce engaging visual concepts.",
    reviews: [
      { name: "Praveen Nair", rating: 5, comment: "These aren't generic prompts you find on Twitter. They produce genuinely book-grade writing without sounding like an AI." }
    ]
  },
  {
    title: "The 6-Figure Newsletter Blueprint: Build, Grow & Monetize 5,000 True Fans",
    slug: "email-marketing-broadcast-strategy",
    brand: "ZeroToTenK Originals",
    modelNumber: "Revenue Engine Series (PDF + 14 Templates)",
    category: "automation-and-scaling",
    categoryTitle: "Automation & Scaling",
    sellingPrice: 399.0,
    mrpPrice: 1599.0,
    discountText: "-75% OFF",
    images: ["/images/books/email-marketing-broadcast-strategy.svg"],
    description: "How to nurture a small email list into an unbeatable daily revenue channel. Step-by-step guidance on setting up an automated 7-day welcome sequence, weekly value newsletters, and weekend flash-sale promotions that generate high open rates and consistent orders.",
    reviews: [
      { name: "Ananya Sen", rating: 5, comment: "Sent my first campaign following the 'Story + Offer' structure and generated ₹28,000 from an 800-person list." }
    ]
  },
  {
    title: "The Solopreneur Operating System: Escape the 9-to-5 & Build Assets That Sell Forever",
    slug: "freelancer-to-info-publisher",
    brand: "ZeroToTenK Originals",
    modelNumber: "Freedom Series (PDF + Strategy Map)",
    category: "blueprint-courses",
    categoryTitle: "Zero to 10K Blueprints",
    sellingPrice: 349.0,
    mrpPrice: 1299.0,
    discountText: "-73% OFF",
    images: ["/images/books/freelancer-to-info-publisher.svg"],
    description: "Stop trading hours for client fees. Learn how to package your client expertise, systemized SOPs, and industry workflows into standalone digital playbooks that sell while you sleep, freeing up your calendar for high-leverage work.",
    reviews: [
      { name: "Gaurav Joshi", rating: 5, comment: "Allowed me to drop 2 toxic freelance clients because my eBook revenue now covers all my basic living expenses." }
    ]
  },
  {
    title: "The 100K Personal Brand Formula: Turn Followers into High-Paying Customers",
    slug: "instagram-story-selling-blueprint",
    brand: "ZeroToTenK Originals",
    modelNumber: "Social Conversions (PDF + 30 Canva Templates)",
    category: "traffic-and-social",
    categoryTitle: "Traffic & Organic Reach",
    sellingPrice: 249.0,
    mrpPrice: 899.0,
    discountText: "-72% OFF",
    images: ["/images/books/instagram-story-selling-blueprint.svg"],
    description: "The subtle 4-slide daily story sequence that builds genuine anticipation and effortlessly drives 20-50 daily eBook orders from your existing followers without annoying your audience or feeling like a hard sell.",
    reviews: [
      { name: "Ritu Sharma", rating: 5, comment: "I used to feel so awkward selling on stories. This framework makes it feel like natural conversation and people actually thank me for recommending the book!" }
    ]
  },
  {
    title: "The Creator Economy Mega Vault: All 11 Bestselling Master eBooks + Notion Workspaces",
    slug: "zerototenk-all-access-empire-bundle",
    brand: "ZeroToTenK VIP",
    modelNumber: "Complete Mastermind Vault (All 11 Books + Notion Systems)",
    category: "mega-bundles",
    categoryTitle: "Bundles & Toolkits",
    sellingPrice: 999.0,
    mrpPrice: 4999.0,
    discountText: "-80% OFF",
    images: ["/images/books/zerototenk-all-access-empire-bundle.svg"],
    description: "The complete, all-inclusive ZeroToTenK digital library. Instant access to all 11 Master eBooks (1,250+ pages), 50 Notion Workspaces, 250 Canva Templates, 850+ AI Prompts, and private community updates. The ultimate investment for anyone serious about digital publishing in 2026.",
    reviews: [
      { name: "Karthik R.", rating: 5, comment: "The bundle is an insane steal. If bought separately it would cost thousands. Every single playbook is top tier." },
      { name: "Harish Venkat", rating: 5, comment: "Best decision I made this year. Went through the Playbook and the WhatsApp funnel first and already crossed ₹60,000 this month." }
    ]
  },
  {
    title: "The 8-Figure Digital Media & Agency Scale Playbook: Systems, Ghostwriting & Enterprise SOPs",
    slug: "10-lakh-digital-media-accelerator",
    brand: "ZeroToTenK Enterprise",
    modelNumber: "Executive Mastermind Edition (Playbooks + Funnels + SOPs)",
    category: "blueprint-courses",
    categoryTitle: "Zero to 10K Blueprints",
    sellingPrice: 3499.0,
    mrpPrice: 12999.0,
    discountText: "-73% OFF",
    images: ["/images/books/10-lakh-digital-media-accelerator.svg"],
    description: "The complete institutional master blueprint to scale beyond the ₹10K/day mark and build an 8-figure publishing media company. Covers team hiring frameworks for ghostwriters and designers, backend high-ticket monetization, automated revenue attribution, corporate training pipelines, and multi-brand expansion architectures.",
    reviews: [
      { name: "Siddharth Malhotra", rating: 5, comment: "We scaled our digital publishing revenue from ₹1.8L to ₹11.4L in under 5 months using the backend agency model in Chapter 6. This is enterprise-grade material." },
      { name: "Ananya Iyer", rating: 5, comment: "The ghostwriter hiring SOPs and funnel attribution spreadsheets alone saved us hundreds of wasted hours." }
    ]
  },
  {
    title: "The High-Ticket Consulting Rainmaker: Close ₹50,000 - ₹2,00,000 Retainers from Readers",
    slug: "high-ticket-consulting-mastermind-blueprint",
    brand: "ZeroToTenK Mastermind",
    modelNumber: "High-Ticket Suite (Client Acquisition Funnels + Call Scripts)",
    category: "funnels-and-sales",
    categoryTitle: "Sales Funnels & Copywriting",
    sellingPrice: 3999.0,
    mrpPrice: 14999.0,
    discountText: "-73% OFF",
    images: ["/images/books/high-ticket-consulting-mastermind-blueprint.svg"],
    description: "How to ethically ascend low-ticket ₹299 - ₹999 eBook buyers into lucrative ₹50,000 to ₹2,00,000 high-ticket consulting and private mastermind clients. Includes complete qualification call scripts, objection reversal matrix, client onboarding Notion workspaces, retainer legal contracts, and high-retention student tracking dashboards.",
    reviews: [
      { name: "Deepak Krishnan", rating: 5, comment: "Closed two consulting clients at ₹65,000 each within 3 weeks of deploying the objection matrix script. Life-changing return on a ₹3,999 investment." },
      { name: "Meera Sen", rating: 5, comment: "The cleanest high-ticket ascension framework I have seen. No sleazy sales tactics, just pure value positioning." }
    ]
  },
  {
    title: "The 365-Day Omnichannel Paid Ads & Growth Marketing Arsenal (Meta, Google & YouTube)",
    slug: "365-day-traffic-and-ads-domination-vault",
    brand: "ZeroToTenK Growth Labs",
    modelNumber: "Omnichannel Vault (Meta & Google Ad Templates + 365 Calendars)",
    category: "traffic-and-social",
    categoryTitle: "Traffic & Social Media",
    sellingPrice: 4499.0,
    mrpPrice: 16999.0,
    discountText: "-74% OFF",
    images: ["/images/books/365-day-traffic-and-ads-domination-vault.svg"],
    description: "The ultimate paid advertising and traffic generation arsenal. Plug-and-play Meta, Google, and YouTube ad campaigns with proven 3.8x+ ROAS, 365 days of done-for-you content prompts, 500+ viral hook swipe files, and editable Figma/Canva ad creatives engineered specifically for high day-zero cash flow and low-cost UPI acquisition.",
    reviews: [
      { name: "Vikram Singhania", rating: 5, comment: "Tested the exact CBO campaign setup from Module 3 with ₹5,000 ad spend on Facebook. Returned ₹24,800 in eBook sales on day one!" },
      { name: "Pooja Hegde", rating: 5, comment: "The 365-day organic calendar eliminates writer's block forever. We never have to think about what to post." }
    ]
  },
  {
    title: "The Lifetime VIP Founder Pass: Unlimited Lifetime Access to Every Present & Future eBook",
    slug: "zerototenk-lifetime-founding-pass",
    brand: "ZeroToTenK VIP Founder",
    modelNumber: "Ultimate Lifetime Vault (All 15+ Products + Commercial Rights + VIP)",
    category: "mega-bundles",
    categoryTitle: "Bundles & Toolkits",
    sellingPrice: 4999.0,
    mrpPrice: 19999.0,
    discountText: "-75% OFF",
    images: ["/images/books/zerototenk-lifetime-founding-pass.svg"],
    description: "The most prestigious tier in the ZeroToTenK ecosystem. Unconditional lifetime access to every current and future eBook, video breakdown, Notion operating system, and AI prompt vault released on ZeroToTenK. Includes commercial PLR/MRR rights, raw editable Canva/Google Docs source files, and direct private WhatsApp founder advisory channel.",
    reviews: [
      { name: "Aditya Nair", rating: 5, comment: "Getting full commercial rebranding rights to their entire digital product library for ₹4,999 is unreal. The highest ROI purchase I've ever made online." },
      { name: "Gaurav Bansal", rating: 5, comment: "The private founder community and immediate access to every new release alone is easily worth 10 times this." }
    ]
  }
];

async function main() {
  console.log("Seeding ZeroToTenK database with", EBOOKS.length, "premium e-books...");

  // 1. Coupons
  await prisma.coupon.upsert({
    where: { code: "START10" },
    update: { percentOff: 10, active: true },
    create: { code: "START10", percentOff: 10, maxUses: 5000, active: true },
  });
  await prisma.coupon.upsert({
    where: { code: "ZEROTOTENK" },
    update: { percentOff: 15, active: true },
    create: { code: "ZEROTOTENK", percentOff: 15, maxUses: 2000, active: true },
  });
  await prisma.coupon.upsert({
    where: { code: "LAUNCH20" },
    update: { percentOff: 20, active: true },
    create: { code: "LAUNCH20", percentOff: 20, maxUses: 1000, active: true },
  });
  await prisma.coupon.upsert({
    where: { code: "EXIT5" },
    update: { percentOff: 5, active: true },
    create: { code: "EXIT5", percentOff: 5, maxUses: 5000, active: true },
  });

  // 2. Clear old products if any
  const existingProducts = await prisma.product.findMany();
  for (const old of existingProducts) {
    if (!EBOOKS.some(b => b.slug === old.slug)) {
      await prisma.review.deleteMany({ where: { productId: old.id } });
      await prisma.unit.deleteMany({ where: { productId: old.id } });
      await prisma.product.delete({ where: { id: old.id } });
    }
  }

  // 3. Insert or Update all 16 E-books & Units & Reviews
  let count = 0;
  for (const b of EBOOKS) {
    const mrpPaise = Math.round(b.mrpPrice * 100);
    const pricePaise = Math.round(b.sellingPrice * 100);
    const floorPaise = Math.round(pricePaise * 0.85);

    const product = await prisma.product.upsert({
      where: { slug: b.slug },
      update: {
        title: b.title,
        brand: b.brand,
        modelNumber: b.modelNumber,
        category: b.category,
        description: b.description,
        images: JSON.stringify(b.images),
        mrp: mrpPaise,
        warrantyMonths: 30,
        returnDays: 7,
      },
      create: {
        slug: b.slug,
        title: b.title,
        brand: b.brand,
        modelNumber: b.modelNumber,
        category: b.category,
        description: b.description,
        images: JSON.stringify(b.images),
        mrp: mrpPaise,
        warrantyMonths: 30,
        returnDays: 7,
      },
    });

    // Create 3 available digital units per book for orders
    for (let i = 1; i <= 3; i++) {
      const serial = `EBK-${b.slug.toUpperCase().slice(0, 12)}-${1000 + i}`;
      await prisma.unit.upsert({
        where: { serialOrImei: serial },
        update: {
          pricePaise,
          floorPaise,
          status: "AVAILABLE",
        },
        create: {
          productId: product.id,
          serialOrImei: serial,
          grade: "DIGITAL_MASTER",
          source: "INSTANT_DOWNLOAD",
          costPaise: Math.round(pricePaise * 0.1),
          repairNotes: "Verified Master PDF + ePub + Notion Checklist. Instant 24/7 Digital Delivery.",
          batteryHealth: 100,
          pricePaise,
          floorPaise,
          status: "AVAILABLE",
        },
      });
    }

    // Add reviews
    await prisma.review.deleteMany({ where: { productId: product.id } });
    for (const r of b.reviews) {
      await prisma.review.create({
        data: {
          productId: product.id,
          userName: r.name,
          rating: r.rating,
          comment: r.comment,
          verifiedPurchase: true,
        },
      });
    }

    count++;
    console.log(`Seeded eBook ${count}/${EBOOKS.length}: ${b.title}`);
  }

  console.log("ZeroToTenK Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
