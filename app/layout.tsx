import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "ZeroToTenK | The Blueprint & Playbooks to Earn ₹10,000/Day Selling eBooks",
  description: "Official digital store for ZeroToTenK. Practical, actionable playbooks, templates, and frameworks teaching ordinary creators and professionals how to launch, market, and scale high-demand digital eBooks to ₹10K daily.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "ZeroToTenK - Build Your ₹10K/Day Digital eBook Business",
    description: "Instant access to actionable eBooks, Notion blueprints, and automated UPI sales funnels. Start your digital publishing journey today.",
    images: [{ url: "/logo.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-[#0b0f19] text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950`}>
        {children}
      </body>
    </html>
  );
}
