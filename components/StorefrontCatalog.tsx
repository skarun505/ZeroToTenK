"use client";

import React, { useState, useMemo } from "react";
import { ProductCard } from "./ProductCard";
import { BookOpen, Sparkles, Flame, ArrowUpDown } from "lucide-react";

interface StorefrontCatalogProps {
  initialProducts: any[];
}

export function StorefrontCatalog({ initialProducts }: StorefrontCatalogProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const filterOptions = [
    { id: "all", label: `📚 All eBooks (${initialProducts.length})` },
    { id: "high-value", label: "💎 Premium Masterclasses (> ₹2,999)" },
    { id: "blueprint-courses", label: "🚀 10K Blueprints" },
    { id: "creation-and-writing", label: "✍️ Creation & Writing" },
    { id: "funnels-and-sales", label: "💰 Funnels & Copy" },
    { id: "traffic-and-social", label: "📱 Traffic & Social" },
    { id: "automation-and-scaling", label: "⚡ Automation & Scale" },
    { id: "mega-bundles", label: "👑 All-Access Vault" },
    { id: "under-300", label: "🏷️ Under ₹300" },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedFilter !== "all") {
      if (selectedFilter === "under-300") {
        list = list.filter((p) => {
          const available = p.units?.filter((u: any) => u.status === "AVAILABLE") || [];
          const minPrice = available.length > 0 ? Math.min(...available.map((u: any) => u.pricePaise)) : p.mrp;
          return minPrice <= 30000;
        });
      } else if (selectedFilter === "high-value") {
        list = list.filter((p) => {
          const available = p.units?.filter((u: any) => u.status === "AVAILABLE") || [];
          const minPrice = available.length > 0 ? Math.min(...available.map((u: any) => u.pricePaise)) : p.mrp;
          return minPrice > 299900;
        });
      } else {
        list = list.filter((p) => p.category?.toLowerCase() === selectedFilter);
      }
    }

    // Sort based on selection
    if (sortBy === "price-asc") {
      list.sort((a, b) => (a.units?.[0]?.pricePaise || a.mrp) - (b.units?.[0]?.pricePaise || b.mrp));
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => (b.units?.[0]?.pricePaise || b.mrp) - (a.units?.[0]?.pricePaise || a.mrp));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }

    return list;
  }, [initialProducts, selectedFilter, sortBy]);

  return (
    <section id="deals" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {filterOptions.map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedFilter === f.id
                ? "btn-emerald text-white shadow-md scale-105"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold shadow-xs"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bar: Results count & Sort */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Showing {filteredProducts.length} Premium Digital Playbooks</span>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg px-3 py-1.5 shadow-xs focus:outline-none focus:border-emerald-500"
          >
            <option value="featured">Featured Best Sellers</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Title (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center text-slate-400 space-y-2">
          <p className="text-base font-bold text-slate-200">No eBooks found in this category.</p>
          <button
            onClick={() => setSelectedFilter("all")}
            className="text-emerald-400 underline font-semibold text-xs"
          >
            View all eBooks
          </button>
        </div>
      )}
    </section>
  );
}
