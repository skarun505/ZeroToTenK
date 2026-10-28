import fs from 'fs';
import path from 'path';

const books = [
  {
    slug: 'zero-to-10k-day-playbook',
    title: 'THE ZERO TO',
    titleHighlight: '₹10K / DAY',
    subtitle: 'PLAYBOOK',
    descriptor: 'The Step-by-Step Blueprint to Launch & Scale Your Digital eBook Empire',
    tag: 'FLAGSHIP MASTERCLASS',
    edition: '2026 COMPLETE EDITION',
    accent1: '#064e3b',
    accent2: '#047857',
    glow: '#10b981',
    gold: '#fbbf24',
    badge: '10,000+ COPIES SOLD',
    icon: 'chart'
  },
  {
    slug: '48-hour-micro-ebook-method',
    title: 'THE 48-HOUR',
    titleHighlight: 'MICRO-EBOOK',
    subtitle: 'METHOD',
    descriptor: 'From Zero Idea to Published, Profitable Mini-Guide in a Single Weekend',
    tag: 'RAPID LAUNCH SYSTEM',
    edition: 'NO WRITERS BLOCK',
    accent1: '#1e1b4b',
    accent2: '#312e81',
    glow: '#6366f1',
    gold: '#38bdf8',
    badge: 'WEEKEND BLUEPRINT',
    icon: 'clock'
  },
  {
    slug: 'high-converting-landing-pages',
    title: 'HIGH-CONVERTING',
    titleHighlight: 'LANDING PAGES',
    subtitle: 'FOR DIGITAL PRODUCTS',
    descriptor: 'Copywriting, Layouts & Psychology That Turn 12%+ Mobile Visitors into Buyers',
    tag: 'CONVERSION LAB',
    edition: 'TESTED ON 100K+ SESSIONS',
    accent1: '#4c0519',
    accent2: '#881337',
    glow: '#f43f5e',
    gold: '#fcd34d',
    badge: '12.4% AVG CONVERSION',
    icon: 'target'
  },
  {
    slug: 'zero-ad-spend-traffic-machine',
    title: 'ZERO AD-SPEND',
    titleHighlight: 'ORGANIC TRAFFIC',
    subtitle: 'MACHINE',
    descriptor: 'Instagram Reels, Carousels & Threads Systems for 500+ Daily Warm Leads',
    tag: 'ORGANIC GROWTH SECRETS',
    edition: 'ALGORITHM SAFE 2026',
    accent1: '#172554',
    accent2: '#1e3a8a',
    glow: '#3b82f6',
    gold: '#60a5fa',
    badge: '100% ORGANIC REACH',
    icon: 'lightning'
  },
  {
    slug: 'automated-whatsapp-sales-funnel',
    title: 'THE AUTOMATED',
    titleHighlight: 'WHATSAPP SALES',
    subtitle: 'FUNNEL',
    descriptor: 'Instant UPI Checkout Bots, Abandoned Recovery & 1-Click Upsells on Autopilot',
    tag: 'AUTOPILOT REVENUE',
    edition: 'DIRECT UPI INTEGRATION',
    accent1: '#064e3b',
    accent2: '#065f46',
    glow: '#34d399',
    gold: '#a7f3d0',
    badge: 'HIGH UPI RECOVERY',
    icon: 'message'
  },
  {
    slug: '50-profitable-digital-niches',
    title: '50 PROFITABLE',
    titleHighlight: 'DIGITAL NICHES',
    subtitle: 'FOR 2026',
    descriptor: 'Uncapped Micro-Niches Where Buyers Are Eagerly Paying ₹299 - ₹999 Today',
    tag: 'MARKET INTELLIGENCE',
    edition: 'DATA-BACKED RESEARCH',
    accent1: '#311042',
    accent2: '#581c87',
    glow: '#a855f7',
    gold: '#f0abfc',
    badge: 'HIGH-DEMAND BLUEPRINT',
    icon: 'compass'
  },
  {
    slug: 'copywriting-secrets-for-non-writers',
    title: 'COPYWRITING',
    titleHighlight: 'SECRETS FOR',
    subtitle: 'NON-WRITERS',
    descriptor: 'Fill-In-The-Blank Headlines & Bullets That Compel Quick UPI Payments',
    tag: 'SALES PSYCHOLOGY',
    edition: '50+ SWIPE TEMPLATES',
    accent1: '#431407',
    accent2: '#7c2d12',
    glow: '#f97316',
    gold: '#fde047',
    badge: 'COPY SWIPE FILE',
    icon: 'pen'
  },
  {
    slug: 'ai-prompt-engine-for-creators',
    title: 'AI PROMPT ENGINE',
    titleHighlight: 'FOR 10X CREATORS',
    subtitle: 'EXPEDITION',
    descriptor: '850+ Rigorously Tested Prompts for Outlining, Drafting & Scaling Ebooks',
    tag: 'AI WORKFLOW MASTERY',
    edition: 'TESTED ON CLAUDE & CHATGPT',
    accent1: '#0f172a',
    accent2: '#1e293b',
    glow: '#38bdf8',
    gold: '#7dd3fc',
    badge: '850+ READY PROMPTS',
    icon: 'bot'
  },
  {
    slug: 'email-marketing-broadcast-strategy',
    title: 'EMAIL MARKETING',
    titleHighlight: '₹1 LAKH/MONTH',
    subtitle: 'BROADCAST STRATEGY',
    descriptor: 'Build a Loyal 5K Newsletter That Generates Consistent Sales Every Tuesday',
    tag: 'RETENTION ENGINE',
    edition: 'HIGH-OPEN SEQUENCES',
    accent1: '#14532d',
    accent2: '#166534',
    glow: '#4ade80',
    gold: '#facc15',
    badge: '14 READY AUTOMATIONS',
    icon: 'mail'
  },
  {
    slug: 'freelancer-to-info-publisher',
    title: 'FREELANCER TO',
    titleHighlight: 'INFO-PUBLISHER',
    subtitle: 'TRANSITION',
    descriptor: 'Escape The Client Trap: Package Your Skills Into Self-Selling Digital Assets',
    tag: 'CAREER ARCHITECTURE',
    edition: 'PASSIVE REVENUE BLUEPRINT',
    accent1: '#18181b',
    accent2: '#27272a',
    glow: '#e4e4e7',
    gold: '#eab308',
    badge: 'RECLAIM YOUR TIME',
    icon: 'briefcase'
  },
  {
    slug: 'instagram-story-selling-blueprint',
    title: 'INSTAGRAM STORY',
    titleHighlight: 'SELLING BLUEPRINT',
    subtitle: '4-SLIDE SYSTEM',
    descriptor: 'The Non-Pushy Daily Sequence That Converts Followers into Customers',
    tag: 'SOCIAL CONVERSIONS',
    edition: '30 READY STORY CANVA MOCKUPS',
    accent1: '#701a75',
    accent2: '#831843',
    glow: '#ec4899',
    gold: '#f472b6',
    badge: 'DAILY CONVERSION FORMULA',
    icon: 'instagram'
  },
  {
    slug: 'zerototenk-all-access-empire-bundle',
    title: 'THE ZEROTOTENK',
    titleHighlight: 'EMPIRE BUNDLE',
    subtitle: 'ALL-ACCESS VAULT',
    descriptor: 'All 11 Master eBooks + 50 Notion Workbooks + 250 Graphics + VIP Community Access',
    tag: 'ULTIMATE COMPILATION',
    edition: 'LIFETIME ACCESS PASS',
    accent1: '#111827',
    accent2: '#000000',
    glow: '#f59e0b',
    gold: '#fbbf24',
    badge: '★ ALL-IN-ONE BUNDLE ★',
    icon: 'crown'
  },
  {
    slug: '10-lakh-digital-media-accelerator',
    title: 'THE ₹10 LAKHS/MO',
    titleHighlight: 'MEDIA ACCELERATOR',
    subtitle: 'SCALE ARCHITECTURE',
    descriptor: 'Scale from ₹10K/Day to ₹10 Lakhs/Month: Full Agency Funnels, Ghostwriting Systems & SOPs',
    tag: 'FLAGSHIP ACCELERATOR',
    edition: 'ENTERPRISE 2026 EDITION',
    accent1: '#022c22',
    accent2: '#064e3b',
    glow: '#10b981',
    gold: '#fbbf24',
    badge: '★ ₹10L/MO SYSTEM ★',
    icon: 'chart'
  },
  {
    slug: 'high-ticket-consulting-mastermind-blueprint',
    title: 'HIGH-TICKET',
    titleHighlight: 'CONSULTING BLUEPRINT',
    subtitle: 'PIPELINE ARCHITECTURE',
    descriptor: 'Convert ₹499 eBook Readers into ₹50,000 High-Ticket Consulting & Mentorship Clients',
    tag: 'HIGH-TICKET MASTERCLASS',
    edition: 'COMPLETE CLOSING SUITE',
    accent1: '#2e1065',
    accent2: '#4c1d95',
    glow: '#a855f7',
    gold: '#fcd34d',
    badge: 'HIGH-TICKET PIPELINE',
    icon: 'briefcase'
  },
  {
    slug: '365-day-traffic-and-ads-domination-vault',
    title: '365-DAY TRAFFIC &',
    titleHighlight: 'PAID ADS VAULT',
    subtitle: 'OMNICHANNEL MASTERY',
    descriptor: 'Multi-Million Ad Spend Vault: Plug-and-Play Meta/Google Campaigns, 365 Days of Content & Swipe Files',
    tag: 'PAID ADS & VIRAL GROWTH',
    edition: 'POSITIVE DAY-0 ROI',
    accent1: '#7f1d1d',
    accent2: '#991b1b',
    glow: '#ef4444',
    gold: '#f59e0b',
    badge: '365-DAY CAMPAIGNS',
    icon: 'lightning'
  },
  {
    slug: 'zerototenk-lifetime-founding-pass',
    title: 'LIFETIME FOUNDING',
    titleHighlight: 'MEMBER VIP PASS',
    subtitle: 'ALL-INCLUSIVE ACCESS',
    descriptor: 'Unconditional Lifetime Access to Every Present & Future eBook, Notion Vault, AI Prompts & PLR Rights',
    tag: 'LIFETIME VIP PASS',
    edition: 'EXCLUSIVE FOUNDER TIER',
    accent1: '#09090b',
    accent2: '#18181b',
    glow: '#fbbf24',
    gold: '#fef08a',
    badge: '★ 100% LIFETIME ACCESS ★',
    icon: 'crown'
  }
];

function generateBookSVG(book) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="100%" height="100%">
  <defs>
    <linearGradient id="bg-${book.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${book.accent1}" />
      <stop offset="60%" stop-color="${book.accent2}" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.25)" />
      <stop offset="30%" stop-color="rgba(0,0,0,0.6)" />
      <stop offset="85%" stop-color="rgba(0,0,0,0.1)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.05)" />
    </linearGradient>
    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${book.gold}" />
      <stop offset="100%" stop-color="#ffffff" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="15" stdDeviation="25" flood-color="#000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Book Base Background -->
  <rect x="0" y="0" width="600" height="850" rx="12" fill="url(#bg-${book.slug})" />
  
  <!-- Subtle Grid Texture -->
  <g opacity="0.07" stroke="#ffffff" stroke-width="1">
    <line x1="50" y1="0" x2="50" y2="850" />
    <line x1="150" y1="0" x2="150" y2="850" />
    <line x1="250" y1="0" x2="250" y2="850" />
    <line x1="350" y1="0" x2="350" y2="850" />
    <line x1="450" y1="0" x2="450" y2="850" />
    <line x1="550" y1="0" x2="550" y2="850" />
    <line x1="0" y1="100" x2="600" y2="100" />
    <line x1="0" y1="200" x2="600" y2="200" />
    <line x1="0" y1="350" x2="600" y2="350" />
    <line x1="0" y1="500" x2="600" y2="500" />
    <line x1="0" y1="650" x2="600" y2="650" />
    <line x1="0" y1="750" x2="600" y2="750" />
  </g>

  <!-- Ambient Glow Center -->
  <circle cx="380" cy="380" r="260" fill="${book.glow}" opacity="0.18" />

  <!-- Realistic Book Spine Crease -->
  <rect x="0" y="0" width="38" height="850" fill="url(#spineGrad)" />
  <line x1="38" y1="0" x2="38" y2="850" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
  <line x1="42" y1="0" x2="42" y2="850" stroke="rgba(0,0,0,0.5)" stroke-width="1.5" />

  <!-- Top Brand Seal -->
  <g transform="translate(65, 55)">
    <rect x="0" y="0" width="170" height="28" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <text x="85" y="19" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#ffffff" letter-spacing="2" text-anchor="middle">ZEROTOTENK.IN</text>
  </g>

  <!-- Category Tag -->
  <g transform="translate(65, 105)">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="900" fill="${book.glow}" letter-spacing="3">${book.tag}</text>
  </g>

  <!-- Gold Star Rating Badge -->
  <g transform="translate(420, 52)">
    <rect x="0" y="0" width="125" height="32" rx="8" fill="rgba(0,0,0,0.5)" stroke="${book.gold}" stroke-width="1.5"/>
    <text x="62" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="${book.gold}" letter-spacing="1" text-anchor="middle">★ 4.97 RATED</text>
  </g>

  <!-- Center Decorative Emblem -->
  <g transform="translate(320, 260)" opacity="0.85">
    <circle cx="0" cy="0" r="70" fill="none" stroke="${book.glow}" stroke-width="2" stroke-dasharray="8 6" />
    <circle cx="0" cy="0" r="55" fill="rgba(0,0,0,0.4)" stroke="${book.gold}" stroke-width="1.5" />
    <text x="0" y="8" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="900" fill="${book.gold}" text-anchor="middle">₹10K</text>
  </g>

  <!-- Main Title Block -->
  <g transform="translate(65, 390)">
    <text x="0" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#e2e8f0" letter-spacing="1.5">${book.title}</text>
    <text x="0" y="55" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="950" fill="url(#goldText)" letter-spacing="-0.5">${book.titleHighlight}</text>
    <text x="0" y="102" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900" fill="#ffffff" letter-spacing="2">${book.subtitle}</text>
  </g>

  <!-- Golden Divider -->
  <line x1="65" y1="520" x2="220" y2="520" stroke="${book.gold}" stroke-width="3" stroke-linecap="round" />

  <!-- Descriptor Paragraph -->
  <g transform="translate(65, 555)">
    <foreignObject width="470" height="110">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; line-height: 1.5; color: #cbd5e1; font-weight: 500;">
        ${book.descriptor}
      </div>
    </foreignObject>
  </g>

  <!-- Highlight Feature Pill -->
  <g transform="translate(65, 680)">
    <rect x="0" y="0" width="220" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    <text x="110" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" letter-spacing="1" text-anchor="middle">✔ ${book.badge}</text>
  </g>
  <g transform="translate(300, 680)">
    <rect x="0" y="0" width="235" height="34" rx="17" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    <text x="117" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#f8fafc" letter-spacing="1" text-anchor="middle">⚡ INSTANT PDF + EPUB</text>
  </g>

  <!-- Footer Author Stamp -->
  <g transform="translate(65, 785)">
    <line x1="0" y1="-25" x2="475" y2="-25" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#94a3b8" letter-spacing="2">AUTHOR / PUBLISHER</text>
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="900" fill="#ffffff" letter-spacing="0.5">ZEROTOTENK CREATOR LABS &amp; FOUNDERS</text>
    
    <text x="475" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="${book.gold}" letter-spacing="1" text-anchor="end">${book.edition}</text>
  </g>

  <!-- Top Right Book Corner Fold Illusion -->
  <polygon points="575,0 600,0 600,25" fill="rgba(255,255,255,0.08)" />
</svg>`;
}

const outDir = path.resolve('./public/images/books');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const book of books) {
  const svg = generateBookSVG(book);
  const filePath = path.join(outDir, `${book.slug}.svg`);
  fs.writeFileSync(filePath, svg, 'utf-8');
  console.log(`Generated: ${filePath}`);
}

console.log('All 12 book covers successfully generated!');
