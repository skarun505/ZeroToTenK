"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Zap, X, Download, BookOpen } from "lucide-react";

export function MobileSearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const lower = query.toLowerCase();

    if (lower.includes("blueprint") || lower.includes("playbook") || lower.includes("10k") || lower.includes("freelance")) {
      router.push("/category/blueprint-courses");
    } else if (lower.includes("writ") || lower.includes("micro") || lower.includes("prompt") || lower.includes("niche")) {
      router.push("/category/creation-and-writing");
    } else if (lower.includes("landing") || lower.includes("copy") || lower.includes("funnel") || lower.includes("page")) {
      router.push("/category/funnels-and-sales");
    } else if (lower.includes("traffic") || lower.includes("reel") || lower.includes("story") || lower.includes("organic") || lower.includes("social")) {
      router.push("/category/traffic-and-social");
    } else if (lower.includes("whatsapp") || lower.includes("email") || lower.includes("auto") || lower.includes("scale")) {
      router.push("/category/automation-and-scaling");
    } else if (lower.includes("bundle") || lower.includes("vault") || lower.includes("all")) {
      router.push("/category/mega-bundles");
    } else {
      router.push("/#deals");
    }
  };

  return (
    <div className="md:hidden px-3 pt-2.5 pb-2 space-y-2 bg-slate-950 border-b border-slate-800">
      {/* Digital Access Status Bar */}
      <div className="flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 text-slate-300 font-bold truncate">
          <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate text-[11px]">
            Delivery Mode:{" "}
            <strong className="text-emerald-400 font-extrabold">
              Instant Download Link
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-1 text-[9px] font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800 shrink-0">
          <Zap className="w-3 h-3 fill-emerald-400 text-emerald-400" />
          <span>24/7 Access</span>
        </div>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5 pointer-events-none" />
        <input
          type="text"
          placeholder="Search '10K Playbook', 'Micro-eBook', 'Funnels', 'WhatsApp'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </form>
    </div>
  );
}
