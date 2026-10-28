import fs from 'fs';
import path from 'path';

export const books = [
  {
    slug: 'zero-to-10k-day-playbook',
    title: 'THE ZERO TO',
    titleHighlight: '₹10K / DAY',
    subtitle: 'PLAYBOOK',
    descriptor: 'The Step-by-Step Blueprint to Launch & Scale Your Digital eBook Empire',
    tag: 'FLAGSHIP MASTERCLASS',
    edition: '2026 COMPLETE EDITION',
    accent1: '#022c22',
    accent2: '#064e3b',
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

function renderVectorIcon(iconType, glowColor, goldColor) {
  switch (iconType) {
    case 'chart':
      return `
        <!-- Chart Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <line x1="-36" y1="28" x2="36" y2="28" />
          <rect x="-30" y="8" width="10" height="20" fill="${glowColor}" fill-opacity="0.35" />
          <rect x="-14" y="-6" width="10" height="34" fill="${glowColor}" fill-opacity="0.55" />
          <rect x="2" y="-20" width="10" height="48" fill="${glowColor}" fill-opacity="0.75" />
          <rect x="18" y="-34" width="10" height="62" fill="${goldColor}" fill-opacity="0.9" />
          <path d="M-30 6 L-10 -8 L8 -22 L28 -38" stroke="#ffffff" stroke-width="3" />
          <polygon points="28,-38 28,-26 16,-38" fill="#ffffff" stroke="none" />
        </g>
      `;
    case 'clock':
      return `
        <!-- Clock / Speed Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <circle cx="0" cy="0" r="38" stroke="${glowColor}" stroke-width="3" />
          <circle cx="0" cy="0" r="32" stroke="rgba(255,255,255,0.2)" stroke-dasharray="4 4" />
          <line x1="0" y1="-26" x2="0" y2="0" stroke="#ffffff" stroke-width="3.5" />
          <line x1="0" y1="0" x2="20" y2="10" stroke="${goldColor}" stroke-width="3.5" />
          <circle cx="0" cy="0" r="5" fill="${goldColor}" stroke="none" />
          <path d="M-12 -38 L12 -38 M0 -38 L0 -44" stroke="${goldColor}" stroke-width="3" />
          <path d="M28 -28 L36 -36" stroke="${glowColor}" stroke-width="3" />
        </g>
      `;
    case 'target':
      return `
        <!-- Target / Conversion Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <circle cx="0" cy="0" r="38" stroke="${glowColor}" stroke-width="2" stroke-dasharray="6 4" />
          <circle cx="0" cy="0" r="26" stroke="rgba(255,255,255,0.4)" stroke-width="2" />
          <circle cx="0" cy="0" r="14" fill="${glowColor}" fill-opacity="0.3" stroke="${goldColor}" stroke-width="2.5" />
          <circle cx="0" cy="0" r="4" fill="${goldColor}" stroke="none" />
          <!-- Crosshairs -->
          <line x1="-44" y1="0" x2="-30" y2="0" stroke="${glowColor}" />
          <line x1="30" y1="0" x2="44" y2="0" stroke="${glowColor}" />
          <line x1="0" y1="-44" x2="0" y2="-30" stroke="${glowColor}" />
          <line x1="0" y1="30" x2="0" y2="44" stroke="${glowColor}" />
          <!-- Arrow hitting bullseye -->
          <line x1="28" y1="-28" x2="3" y2="-3" stroke="#ffffff" stroke-width="3" />
          <polygon points="3,-3 14,-5 5,-14" fill="#ffffff" stroke="none" />
        </g>
      `;
    case 'lightning':
      return `
        <!-- Lightning Bolt Icon -->
        <g stroke="${goldColor}" stroke-width="2" stroke-linejoin="round" fill="${goldColor}">
          <polygon points="4,-42 -22,2 -4,2 -12,42 22,-2 4,-2" fill="url(#goldText)" stroke="#ffffff" stroke-width="2" />
          <circle cx="-18" cy="-20" r="3" fill="${glowColor}" stroke="none" />
          <circle cx="20" cy="18" r="3.5" fill="${glowColor}" stroke="none" />
        </g>
      `;
    case 'message':
      return `
        <!-- WhatsApp / Funnel Chat Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M-30 0 C-30 -18, -14 -32, 6 -32 C26 -32, 42 -18, 42 0 C42 16, 28 30, 8 30 L-10 36 L-6 26 C-20 22, -30 12, -30 0 Z" fill="${glowColor}" fill-opacity="0.25" stroke="${glowColor}" stroke-width="2.5" />
          <path d="M-10 0 L-2 8 L18 -10" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="24" cy="18" r="10" fill="${goldColor}" stroke="#090d16" stroke-width="2" />
          <text x="24" y="22" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#090d16" text-anchor="middle">₹</text>
        </g>
      `;
    case 'compass':
      return `
        <!-- Compass Icon -->
        <g stroke="${goldColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <circle cx="0" cy="0" r="38" stroke="${glowColor}" stroke-width="2" />
          <circle cx="0" cy="0" r="32" stroke="rgba(255,255,255,0.2)" stroke-dasharray="2 6" />
          <!-- 4 main points -->
          <polygon points="0,-36 8,-8 0,0 -8,-8" fill="${goldColor}" stroke="none" />
          <polygon points="0,36 8,8 0,0 -8,8" fill="rgba(255,255,255,0.7)" stroke="none" />
          <polygon points="36,0 8,8 0,0 8,-8" fill="rgba(255,255,255,0.5)" stroke="none" />
          <polygon points="-36,0 -8,8 0,0 -8,-8" fill="rgba(255,255,255,0.5)" stroke="none" />
          <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="${goldColor}" stroke-width="2" />
        </g>
      `;
    case 'pen':
      return `
        <!-- Copywriting Pen Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <!-- Pen Body -->
          <path d="M-22 22 L18 -18 L30 -6 L-10 30 Z" fill="${glowColor}" fill-opacity="0.3" stroke="${goldColor}" />
          <!-- Nib -->
          <polygon points="-22,22 -34,34 -20,28" fill="${goldColor}" stroke="${goldColor}" />
          <line x1="-34" y1="34" x2="-22" y2="22" stroke="#ffffff" stroke-width="2" />
          <!-- Cap / Details -->
          <line x1="8" y1="-8" x2="20" y2="4" stroke="#ffffff" stroke-width="2" />
          <!-- Signature ink flourish -->
          <path d="M-36 38 C-24 44, -10 34, 4 40 C14 44, 28 36, 40 40" stroke="${glowColor}" stroke-width="2.5" />
        </g>
      `;
    case 'bot':
      return `
        <!-- AI Neural / Processor Icon -->
        <g stroke="${goldColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <rect x="-26" y="-26" width="52" height="52" rx="10" fill="${glowColor}" fill-opacity="0.25" stroke="${glowColor}" stroke-width="2.5" />
          <rect x="-14" y="-14" width="28" height="28" rx="4" fill="rgba(0,0,0,0.5)" stroke="${goldColor}" stroke-width="2" />
          <!-- Circuit pins -->
          <line x1="-34" y1="-12" x2="-26" y2="-12" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="-34" y1="12" x2="-26" y2="12" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="26" y1="-12" x2="34" y2="-12" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="26" y1="12" x2="34" y2="12" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="-12" y1="-34" x2="-12" y2="-26" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="12" y1="-34" x2="12" y2="-26" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="-12" y1="26" x2="-12" y2="34" stroke="${goldColor}" stroke-width="2.5" />
          <line x1="12" y1="26" x2="12" y2="34" stroke="${goldColor}" stroke-width="2.5" />
          <text x="0" y="5" font-family="system-ui, sans-serif" font-size="12" font-weight="900" fill="#ffffff" text-anchor="middle">AI</text>
        </g>
      `;
    case 'mail':
      return `
        <!-- Email Marketing Broadcast Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <rect x="-34" y="-22" width="68" height="46" rx="6" fill="${glowColor}" fill-opacity="0.25" stroke="${glowColor}" stroke-width="2.5" />
          <polyline points="-34,-20 0,6 34,-20" stroke="#ffffff" stroke-width="3" />
          <line x1="-34" y1="22" x2="-10" y2="0" stroke="rgba(255,255,255,0.3)" />
          <line x1="34" y1="22" x2="10" y2="0" stroke="rgba(255,255,255,0.3)" />
          <circle cx="20" cy="-14" r="8" fill="${goldColor}" stroke="#090d16" stroke-width="1.5" />
          <text x="20" y="-10" font-family="system-ui, sans-serif" font-size="10" font-weight="900" fill="#090d16" text-anchor="middle">₹</text>
        </g>
      `;
    case 'briefcase':
      return `
        <!-- Executive Briefcase Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <rect x="-34" y="-14" width="68" height="46" rx="6" fill="${glowColor}" fill-opacity="0.25" stroke="${glowColor}" stroke-width="2.5" />
          <!-- Handle -->
          <path d="M-14 -14 L-14 -24 C-14 -28, 14 -28, 14 -24 L14 -14" stroke="${goldColor}" stroke-width="3" />
          <!-- Brass Straps and Locks -->
          <line x1="-16" y1="-14" x2="-16" y2="32" stroke="${goldColor}" stroke-width="2" />
          <line x1="16" y1="-14" x2="16" y2="32" stroke="${goldColor}" stroke-width="2" />
          <rect x="-4" y="2" width="8" height="8" rx="2" fill="${goldColor}" stroke="none" />
        </g>
      `;
    case 'instagram':
      return `
        <!-- Instagram Story Reel Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <rect x="-30" y="-30" width="60" height="60" rx="16" stroke="${glowColor}" stroke-width="3" fill="${glowColor}" fill-opacity="0.2" />
          <circle cx="0" cy="0" r="15" stroke="#ffffff" stroke-width="3" />
          <circle cx="16" cy="-16" r="3.5" fill="${goldColor}" stroke="none" />
        </g>
      `;
    case 'crown':
    default:
      return `
        <!-- Imperial Crown Icon -->
        <g stroke="${goldColor}" stroke-width="2.5" stroke-linejoin="round" fill="${goldColor}">
          <polygon points="-36,18 -42,-14 -18,-2 0,-24 18,-2 42,-14 36,18" fill="url(#goldText)" stroke="#ffffff" stroke-width="1.5" />
          <rect x="-36" y="20" width="72" height="8" rx="3" fill="${goldColor}" stroke="#ffffff" stroke-width="1" />
          <circle cx="-42" cy="-15" r="3" fill="#ffffff" stroke="none" />
          <circle cx="0" cy="-25" r="3.5" fill="#ffffff" stroke="none" />
          <circle cx="42" cy="-15" r="3" fill="#ffffff" stroke="none" />
          <circle cx="-18" cy="-3" r="2.5" fill="#ffffff" stroke="none" />
          <circle cx="18" cy="-3" r="2.5" fill="#ffffff" stroke="none" />
        </g>
      `;
  }
}

function wrapText(text, maxChars = 40) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length <= maxChars) {
      currentLine = (currentLine + ' ' + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

export function generateBookSVG(book) {
  const iconMarkup = renderVectorIcon(book.icon, book.glow, book.gold);
  const descriptorLines = wrapText(book.descriptor, 38).slice(0, 3);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 850" width="100%" height="100%">
  <defs>
    <!-- Background Rich Radial / Linear Gradient -->
    <linearGradient id="bg-${book.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${book.accent1}" />
      <stop offset="55%" stop-color="${book.accent2}" />
      <stop offset="100%" stop-color="#080c14" />
    </linearGradient>

    <!-- 3D Book Spine Realistic Shadow and Crease -->
    <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.35)" />
      <stop offset="25%" stop-color="rgba(0,0,0,0.75)" />
      <stop offset="75%" stop-color="rgba(0,0,0,0.15)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.08)" />
    </linearGradient>

    <!-- Metallic Gold Gradient -->
    <linearGradient id="goldText" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${book.gold}" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="${book.gold}" />
    </linearGradient>

    <!-- Diagonal Gloss Sheen -->
    <linearGradient id="diagonalGloss" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.12)" />
      <stop offset="40%" stop-color="rgba(255,255,255,0.03)" />
      <stop offset="60%" stop-color="rgba(0,0,0,0)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.4)" />
    </linearGradient>

    <!-- Ambient Shadow Filter -->
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.7"/>
    </filter>
  </defs>

  <!-- Book Base Background -->
  <rect x="0" y="0" width="600" height="850" rx="14" fill="url(#bg-${book.slug})" />
  
  <!-- Subtle Blueprint Tech Matrix Grid -->
  <g opacity="0.06" stroke="#ffffff" stroke-width="1">
    <line x1="60" y1="0" x2="60" y2="850" />
    <line x1="160" y1="0" x2="160" y2="850" />
    <line x1="260" y1="0" x2="260" y2="850" />
    <line x1="360" y1="0" x2="360" y2="850" />
    <line x1="460" y1="0" x2="460" y2="850" />
    <line x1="560" y1="0" x2="560" y2="850" />
    <line x1="0" y1="90" x2="600" y2="90" />
    <line x1="0" y1="180" x2="600" y2="180" />
    <line x1="0" y1="320" x2="600" y2="320" />
    <line x1="0" y1="460" x2="600" y2="460" />
    <line x1="0" y1="600" x2="600" y2="600" />
    <line x1="0" y1="720" x2="600" y2="720" />
  </g>

  <!-- Ambient Glow Circle in Upper Right -->
  <circle cx="390" cy="310" r="240" fill="${book.glow}" opacity="0.16" />

  <!-- Diagonal Gloss Sheen Overlay -->
  <rect x="0" y="0" width="600" height="850" rx="14" fill="url(#diagonalGloss)" pointer-events="none" />

  <!-- 3D Book Spine Construction -->
  <rect x="0" y="0" width="40" height="850" fill="url(#spineGrad)" />
  <line x1="40" y1="0" x2="40" y2="850" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
  <line x1="44" y1="0" x2="44" y2="850" stroke="rgba(0,0,0,0.6)" stroke-width="2" />

  <!-- Top Brand Seal / Publisher -->
  <g transform="translate(68, 52)">
    <rect x="0" y="0" width="180" height="30" rx="6" fill="rgba(0,0,0,0.4)" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <text x="90" y="20" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11.5" font-weight="900" fill="#ffffff" letter-spacing="2.5" text-anchor="middle">ZEROTOTENK.IN</text>
  </g>

  <!-- Gold Star Rating Badge -->
  <g transform="translate(425, 50)">
    <rect x="0" y="0" width="125" height="32" rx="8" fill="rgba(0,0,0,0.55)" stroke="${book.gold}" stroke-width="1.5"/>
    <text x="62" y="21" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="900" fill="${book.gold}" letter-spacing="1" text-anchor="middle">★ 4.97 RATED</text>
  </g>

  <!-- Category Tag Line -->
  <g transform="translate(68, 114)">
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="900" fill="${book.glow}" letter-spacing="3.5">${book.tag}</text>
  </g>

  <!-- Center Decorative Emblem with Dynamic Icon -->
  <g transform="translate(320, 245)">
    <!-- Outer Orbit Ring -->
    <circle cx="0" cy="0" r="72" fill="none" stroke="${book.glow}" stroke-width="1.5" stroke-dasharray="6 6" opacity="0.6" />
    <!-- Inner Dark Circle -->
    <circle cx="0" cy="0" r="58" fill="rgba(6,10,18,0.7)" stroke="${book.gold}" stroke-width="2" />
    <!-- Render Icon Vector -->
    ${iconMarkup}
  </g>

  <!-- Main Title Block (Pure SVG Typography) -->
  <g transform="translate(68, 385)">
    <text x="0" y="0" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" fill="#e2e8f0" letter-spacing="1.5">${book.title}</text>
    <text x="0" y="54" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="950" fill="url(#goldText)" letter-spacing="-0.5">${book.titleHighlight}</text>
    <text x="0" y="98" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="30" font-weight="900" fill="#ffffff" letter-spacing="2">${book.subtitle}</text>
  </g>

  <!-- Golden Accent Divider Line -->
  <line x1="68" y1="510" x2="240" y2="510" stroke="${book.gold}" stroke-width="3.5" stroke-linecap="round" />

  <!-- Pure SVG Descriptor Paragraph (Guaranteed browser & mobile compatibility) -->
  <g transform="translate(68, 545)">
    ${descriptorLines.map((line, idx) => `
      <text x="0" y="${idx * 26}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="500" fill="#cbd5e1" letter-spacing="0.3">${line}</text>
    `).join('')}
  </g>

  <!-- Feature Value Pills -->
  <g transform="translate(68, 665)">
    <rect x="0" y="0" width="225" height="34" rx="17" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
    <text x="112" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#f8fafc" letter-spacing="1" text-anchor="middle">✔ ${book.badge}</text>
  </g>
  <g transform="translate(305, 665)">
    <rect x="0" y="0" width="235" height="34" rx="17" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
    <text x="117" y="22" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="800" fill="#f8fafc" letter-spacing="1" text-anchor="middle">⚡ INSTANT PDF + EPUB</text>
  </g>

  <!-- Barcode & Publisher Footer Block -->
  <g transform="translate(68, 770)">
    <line x1="0" y1="-20" x2="480" y2="-20" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
    
    <!-- Publisher Stamp -->
    <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="10.5" font-weight="800" fill="#94a3b8" letter-spacing="2">OFFICIAL AUTHOR &amp; PUBLISHER</text>
    <text x="0" y="20" font-family="system-ui, -apple-system, sans-serif" font-size="13.5" font-weight="900" fill="#ffffff" letter-spacing="0.5">ZEROTOTENK CREATOR LABS</text>
    
    <!-- Edition Tag on Right -->
    <text x="480" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="900" fill="${book.gold}" letter-spacing="1" text-anchor="end">${book.edition}</text>
    
    <!-- Mini Vector Barcode -->
    <g transform="translate(400, 10)" opacity="0.65">
      <line x1="0" y1="0" x2="0" y2="16" stroke="#ffffff" stroke-width="2" />
      <line x1="4" y1="0" x2="4" y2="16" stroke="#ffffff" stroke-width="1" />
      <line x1="7" y1="0" x2="7" y2="16" stroke="#ffffff" stroke-width="3" />
      <line x1="13" y1="0" x2="13" y2="16" stroke="#ffffff" stroke-width="1.5" />
      <line x1="17" y1="0" x2="17" y2="16" stroke="#ffffff" stroke-width="2" />
      <line x1="22" y1="0" x2="22" y2="16" stroke="#ffffff" stroke-width="4" />
      <line x1="29" y1="0" x2="29" y2="16" stroke="#ffffff" stroke-width="1" />
      <line x1="33" y1="0" x2="33" y2="16" stroke="#ffffff" stroke-width="2.5" />
      <line x1="39" y1="0" x2="39" y2="16" stroke="#ffffff" stroke-width="1.5" />
      <line x1="44" y1="0" x2="44" y2="16" stroke="#ffffff" stroke-width="3" />
      <line x1="50" y1="0" x2="50" y2="16" stroke="#ffffff" stroke-width="1" />
      <line x1="54" y1="0" x2="54" y2="16" stroke="#ffffff" stroke-width="2" />
      <line x1="59" y1="0" x2="59" y2="16" stroke="#ffffff" stroke-width="3.5" />
      <line x1="66" y1="0" x2="66" y2="16" stroke="#ffffff" stroke-width="1.5" />
      <line x1="72" y1="0" x2="72" y2="16" stroke="#ffffff" stroke-width="2" />
      <line x1="78" y1="0" x2="78" y2="16" stroke="#ffffff" stroke-width="1" />
    </g>
  </g>

  <!-- Top Right Book Corner Fold Illusion -->
  <polygon points="575,0 600,0 600,25" fill="rgba(255,255,255,0.12)" />
</svg>`;
}

const outDirs = [
  path.resolve('./public/images/books'),
  path.resolve('./public/covers'),
  path.resolve('./public/books')
];

for (const dir of outDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

console.log(`Generating cover images for all ${books.length} books...`);

for (const book of books) {
  const svg = generateBookSVG(book);
  for (const dir of outDirs) {
    const filePath = path.join(dir, `${book.slug}.svg`);
    fs.writeFileSync(filePath, svg, 'utf-8');
  }
  console.log(`✓ Generated cover for: ${book.slug}`);
}

console.log(`\nSuccess! All ${books.length} book covers successfully generated in:`);
outDirs.forEach(d => console.log(` - ${d}`));
