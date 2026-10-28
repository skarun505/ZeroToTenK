"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import {
  TrendingUp,
  CreditCard,
  Package,
  ShoppingBag,
  Clock,
  Sparkles,
  ArrowUpRight,
  Search,
  Filter,
  Layers,
  Award,
  BarChart3,
  Flame,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  BookOpen,
} from "lucide-react";

interface AdminAnalyticsProps {
  initialOrders: any[];
  initialUnits: any[];
  initialProducts: any[];
}

type TimeRange = "7D" | "30D" | "ALL";

export function AdminAnalyticsDashboard({
  initialOrders,
  initialUnits,
  initialProducts,
}: AdminAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("30D");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    revenue: number;
    orders: number;
    x: number;
    y: number;
  } | null>(null);

  // Filter orders by selected time range
  const filteredByDate = useMemo(() => {
    if (timeRange === "ALL") return initialOrders;

    const now = Date.now();
    const days = timeRange === "7D" ? 7 : 30;
    const cutoff = now - days * 24 * 60 * 60 * 1000;

    return initialOrders.filter((o) => {
      const orderTime = new Date(o.createdAt).getTime();
      return orderTime >= cutoff;
    });
  }, [initialOrders, timeRange]);

  // Compute Core Executive Metrics
  const metrics = useMemo(() => {
    const verifiedOrders = filteredByDate.filter((o) =>
      ["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)
    );
    const pendingOrders = filteredByDate.filter((o) => o.status === "PAYMENT_SUBMITTED");

    const totalRevenuePaise = verifiedOrders.reduce(
      (sum, o) => sum + (o.amountPaise || 0),
      0
    );

    const aovPaise =
      verifiedOrders.length > 0
        ? Math.round(totalRevenuePaise / verifiedOrders.length)
        : 0;

    // High ticket sales (items >= ₹2,999 / 299,900 paise)
    const highTicketOrders = verifiedOrders.filter(
      (o) => (o.amountPaise || 0) >= 299900
    );
    const highTicketShare =
      verifiedOrders.length > 0
        ? Math.round((highTicketOrders.length / verifiedOrders.length) * 100)
        : 0;

    const paidRate =
      filteredByDate.length > 0
        ? Math.round((verifiedOrders.length / filteredByDate.length) * 100)
        : 0;

    const totalUnits = initialUnits.length;
    const availableUnits = initialUnits.filter((u) => u.status === "AVAILABLE").length;
    const soldUnits = initialUnits.filter((u) => u.status === "SOLD").length;

    return {
      totalRevenuePaise,
      totalOrdersCount: filteredByDate.length,
      verifiedCount: verifiedOrders.length,
      pendingCount: pendingOrders.length,
      aovPaise,
      paidRate,
      highTicketShare,
      totalUnits,
      availableUnits,
      soldUnits,
    };
  }, [filteredByDate, initialUnits]);

  // Daily Chart Aggregation
  const chartData = useMemo(() => {
    const days = timeRange === "7D" ? 7 : timeRange === "30D" ? 30 : 60;
    const map = new Map<string, { date: string; revenue: number; orders: number }>();

    const now = new Date();
    // Pre-populate days
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const key = d.toISOString().slice(0, 10);
      map.set(key, {
        date: d.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
        revenue: 0,
        orders: 0,
      });
    }

    filteredByDate.forEach((o) => {
      const key = new Date(o.createdAt).toISOString().slice(0, 10);
      if (map.has(key)) {
        const item = map.get(key)!;
        item.orders += 1;
        if (["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)) {
          item.revenue += (o.amountPaise || 0) / 100;
        }
      }
    });

    return Array.from(map.values());
  }, [filteredByDate, timeRange]);

  // Top Selling Products Leaderboard
  const topSellers = useMemo(() => {
    const productSales = new Map<
      string,
      {
        product: any;
        salesCount: number;
        revenuePaise: number;
      }
    >();

    filteredByDate.forEach((o) => {
      const prod = o.unit?.product;
      if (!prod) return;

      const curr = productSales.get(prod.id) || {
        product: prod,
        salesCount: 0,
        revenuePaise: 0,
      };

      curr.salesCount += 1;
      if (["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)) {
        curr.revenuePaise += o.amountPaise || 0;
      }
      productSales.set(prod.id, curr);
    });

    const list = Array.from(productSales.values()).sort(
      (a, b) => b.revenuePaise - a.revenuePaise
    );

    return list.slice(0, 5);
  }, [filteredByDate]);

  // Category Revenue Distribution
  const categoryStats = useMemo(() => {
    const categories: Record<
      string,
      { name: string; revenuePaise: number; count: number; color: string }
    > = {
      "mega-bundles": {
        name: "Mega Bundles",
        revenuePaise: 0,
        count: 0,
        color: "#10b981", // Emerald
      },
      "blueprint-courses": {
        name: "Blueprint Courses",
        revenuePaise: 0,
        count: 0,
        color: "#6366f1", // Indigo
      },
      "traffic-and-social": {
        name: "Traffic & Social",
        revenuePaise: 0,
        count: 0,
        color: "#f59e0b", // Amber
      },
      "funnels-and-sales": {
        name: "Funnels & Copy",
        revenuePaise: 0,
        count: 0,
        color: "#8b5cf6", // Violet
      },
      "automation-and-scaling": {
        name: "Automation & Scale",
        revenuePaise: 0,
        count: 0,
        color: "#06b6d4", // Cyan
      },
      "creation-and-writing": {
        name: "Creation & Writing",
        revenuePaise: 0,
        count: 0,
        color: "#ec4899", // Pink
      },
    };

    filteredByDate.forEach((o) => {
      const cat = o.unit?.product?.category;
      if (cat && categories[cat]) {
        categories[cat].count += 1;
        if (["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)) {
          categories[cat].revenuePaise += o.amountPaise || 0;
        }
      }
    });

    return Object.values(categories).filter((c) => c.count > 0 || c.revenuePaise > 0);
  }, [filteredByDate]);

  // Filtered recent orders
  const displayedOrders = useMemo(() => {
    return initialOrders.filter((ord) => {
      const matchesStatus =
        statusFilter === "ALL" || ord.status === statusFilter;

      if (!matchesStatus) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const idMatch = ord.id.toLowerCase().includes(q);
      const titleMatch = ord.unit?.product?.title?.toLowerCase().includes(q);
      const payerMatch = ord.payerName?.toLowerCase().includes(q);
      const utrMatch = ord.utr?.toLowerCase().includes(q);

      let shipName = "";
      try {
        const s = JSON.parse(ord.shippingJson);
        shipName = (s.name || "").toLowerCase();
      } catch {}

      return idMatch || titleMatch || payerMatch || utrMatch || shipName.includes(q);
    });
  }, [initialOrders, statusFilter, searchQuery]);

  // Chart SVG Coordinates Calculation
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 1000);
  const chartWidth = 800;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = chartData.map((d, index) => {
    const x =
      paddingX +
      (index / (chartData.length - 1 || 1)) * (chartWidth - paddingX * 2);
    const y =
      chartHeight -
      paddingY -
      (d.revenue / maxRevenue) * (chartHeight - paddingY * 2);
    return { ...d, x, y };
  });

  // Construct smooth Bezier SVG curve
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = point.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${
    chartHeight - paddingY
  } L ${points[0]?.x || 0} ${chartHeight - paddingY} Z`;

  return (
    <div className="space-y-8 transition-colors">
      {/* Top Bar with Time Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs transition-colors">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Executive Performance Analytics</span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400">
                Live Data
              </span>
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Real-time revenue, average order value, conversion trends, and catalog velocity.
            </p>
          </div>
        </div>

        {/* Time Period Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          {(["7D", "30D", "ALL"] as TimeRange[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setTimeRange(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                timeRange === tab
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/60"
              }`}
            >
              {tab === "7D" ? "Last 7 Days" : tab === "30D" ? "Last 30 Days" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core Executive Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Revenue */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-emerald-50/20 dark:from-emerald-950/40 dark:via-slate-900/90 dark:to-slate-950 border border-emerald-200 dark:border-emerald-600/30 shadow-md space-y-3 transition-colors">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Gross Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatINR(metrics.totalRevenuePaise)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>{metrics.verifiedCount} paid customer orders</span>
          </div>
        </div>

        {/* Metric 2: AOV (Average Order Value) */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-indigo-50/20 dark:from-indigo-950/40 dark:via-slate-900/90 dark:to-slate-950 border border-indigo-200 dark:border-indigo-600/30 shadow-md space-y-3 transition-colors">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>AOV (Average Order Value)</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {formatINR(metrics.aovPaise)}
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <span>Revenue ÷ Paid Orders</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">Target: &gt; ₹500</span>
          </div>
        </div>

        {/* Metric 3: Paid Conversion & High Ticket Share */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/20 dark:from-amber-950/40 dark:via-slate-900/90 dark:to-slate-950 border border-amber-200 dark:border-amber-600/30 shadow-md space-y-3 transition-colors">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Verification Rate</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.paidRate}%
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <span>{metrics.highTicketShare}% Masterclass &gt;₹2,999</span>
            <span className="text-amber-600 dark:text-amber-400">{metrics.pendingCount} in queue</span>
          </div>
        </div>

        {/* Metric 4: Inventory Licenses */}
        <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-cyan-50/20 dark:from-cyan-950/40 dark:via-slate-900/90 dark:to-slate-950 border border-cyan-200 dark:border-cyan-600/30 shadow-md space-y-3 transition-colors">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Available Licenses</span>
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {metrics.availableUnits} <span className="text-lg text-slate-500 dark:text-slate-400 font-normal">/ {metrics.totalUnits}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-semibold">
            <span>{metrics.soldUnits} fulfilled devices/units</span>
            <span className="text-cyan-600 dark:text-cyan-400">100% Ready</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Revenue Trend Chart */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
              <span>Daily Sales &amp; Revenue Trend</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Hover over graph data points to inspect daily transaction volume and rupee collections.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Gross Sales (₹)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span>Order Count</span>
            </div>
          </div>
        </div>

        {/* SVG Area Chart */}
        <div className="relative w-full overflow-x-auto pt-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-56 min-w-[600px] overflow-visible"
          >
            <defs>
              <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
              const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
              const val = Math.round(maxRevenue * ratio);
              return (
                <g key={ratio}>
                  <line
                    x1={paddingX}
                    y1={y}
                    x2={chartWidth - paddingX}
                    y2={y}
                    stroke="#1e293b"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={y + 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    ₹{val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
                  </text>
                </g>
              );
            })}

            {/* Area Fill */}
            <path d={areaD} fill="url(#revenueGlow)" />

            {/* Main Curved Path */}
            <path
              d={pathD}
              fill="none"
              stroke="#10b981"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Interactive Data Points */}
            {points.map((pt, idx) => (
              <g key={idx} className="cursor-pointer group">
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="5"
                  fill="#090d16"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-150"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
                {/* Invisible larger hover hit target */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="16"
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(pt)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}

            {/* Date labels on X Axis */}
            {points.map((pt, idx) => {
              // Show label every few points to avoid crowding
              const step = Math.ceil(points.length / 7);
              if (idx % step !== 0 && idx !== points.length - 1) return null;
              return (
                <text
                  key={idx}
                  x={pt.x}
                  y={chartHeight - 6}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="10"
                  fontWeight="600"
                >
                  {pt.date}
                </text>
              );
            })}
          </svg>

          {/* Hover Tooltip Box */}
          {hoveredPoint && (
            <div
              className="absolute z-20 pointer-events-none bg-slate-950/95 border border-emerald-500/50 shadow-2xl p-2.5 rounded-xl text-xs space-y-1 backdrop-blur-md"
              style={{
                left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                top: `${(hoveredPoint.y / chartHeight) * 100}%`,
                transform: "translate(-50%, -120%)",
              }}
            >
              <div className="font-bold text-slate-300 border-b border-slate-800 pb-1">
                {hoveredPoint.date}
              </div>
              <div className="text-emerald-400 font-extrabold text-sm">
                ₹{hoveredPoint.revenue.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-slate-400">
                {hoveredPoint.orders} {hoveredPoint.orders === 1 ? "order" : "orders"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2-Column Section: Top Selling Leaderboard & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Selling Products Leaderboard */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Top-Selling Digital Playbooks</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Ranked by Revenue</span>
          </div>

          <div className="space-y-3">
            {topSellers.map((item, idx) => {
              const share =
                metrics.totalRevenuePaise > 0
                  ? Math.round(
                      (item.revenuePaise / metrics.totalRevenuePaise) * 100
                    )
                  : 0;

              let coverImage = "";
              try {
                const imgs = JSON.parse(item.product.images);
                coverImage = imgs[0];
              } catch {}

              const badgeColors = [
                "bg-amber-500 text-slate-950", // Gold #1
                "bg-slate-300 text-slate-950", // Silver #2
                "bg-amber-700 text-white",     // Bronze #3
                "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
                "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
              ];

              return (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${badgeColors[idx]}`}
                    >
                      {idx + 1}
                    </span>

                    {coverImage && (
                      <img
                        src={coverImage}
                        alt={item.product.title}
                        className="w-8 h-10 object-cover rounded shadow-xs shrink-0"
                      />
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                        {item.product.title}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
                        {item.product.category}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-black text-xs text-emerald-600 dark:text-emerald-400">
                        {formatINR(item.revenuePaise)}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400">
                        {item.salesCount} copies sold
                      </div>
                    </div>
                  </div>

                  {/* Revenue Contribution Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
                      style={{ width: `${Math.max(share, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}

            {topSellers.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-xs">
                No orders recorded in this date range.
              </div>
            )}
          </div>
        </div>

        {/* Category Revenue Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <span>Category Revenue Share</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Distribution</span>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-950 flex overflow-hidden border border-slate-200 dark:border-slate-800">
            {categoryStats.map((cat, idx) => {
              const pct =
                metrics.totalRevenuePaise > 0
                  ? (cat.revenuePaise / metrics.totalRevenuePaise) * 100
                  : 0;
              if (pct <= 0) return null;
              return (
                <div
                  key={idx}
                  style={{ width: `${pct}%`, backgroundColor: cat.color }}
                  title={`${cat.name}: ${pct.toFixed(1)}%`}
                />
              );
            })}
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {categoryStats.map((cat, idx) => {
              const pct =
                metrics.totalRevenuePaise > 0
                  ? Math.round((cat.revenuePaise / metrics.totalRevenuePaise) * 100)
                  : 0;

              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-xs font-bold text-slate-800 dark:text-white truncate max-w-[120px]">
                        {cat.name}
                      </span>
                    </div>
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                      {pct}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{formatINR(cat.revenuePaise)}</span>
                    <span>{cat.count} orders</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Real-Time Order Activity Table with Search & Status Filter */}
      <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Real-Time Order Stream</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Live transaction records, instant UTR status, customer details, and invoice links.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search orders, UTR, buyer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 transition-colors w-48 sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 transition-colors"
            >
              <option value="ALL">All Statuses</option>
              <option value="VERIFIED">Paid / Verified</option>
              <option value="PAYMENT_SUBMITTED">Pending Verification</option>
              <option value="AWAITING_PAYMENT">Awaiting Payment</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5">Order ID</th>
                <th className="py-2.5">Playbook / License</th>
                <th className="py-2.5">Customer / City</th>
                <th className="py-2.5">Amount</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Transaction Date</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {displayedOrders.slice(0, 15).map((ord) => {
                let shipping: any = {};
                try {
                  shipping = JSON.parse(ord.shippingJson);
                } catch {}

                return (
                  <tr
                    key={ord.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {ord.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="py-3">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {ord.unit?.product?.title || "Digital Playbook Order"}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {ord.unit
                          ? `License: ••••${(ord.unit.serialOrImei || "").slice(-4)}`
                          : "Instant Download Access"}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="text-slate-700 dark:text-slate-300 font-medium">
                        {ord.payerName || shipping.name || "Customer"}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {shipping.city ? `${shipping.city}, ${shipping.state || ""}` : "Online Access"}
                      </div>
                    </td>
                    <td className="py-3 font-black text-slate-900 dark:text-white">
                      {formatINR(ord.amountPaise)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === "VERIFIED" || ord.status === "PAID"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:border-emerald-700/60 dark:text-emerald-400"
                            : ord.status === "PAYMENT_SUBMITTED"
                            ? "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:border-amber-700/60 dark:text-amber-300"
                            : ord.status === "REJECTED"
                            ? "bg-red-100 text-red-800 border border-red-300 dark:bg-red-950 dark:border-red-700/60 dark:text-red-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {ord.status === "PAYMENT_SUBMITTED" ? "PENDING UTR" : ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {new Date(ord.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/order/${ord.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 hover:underline"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                );
              })}

              {displayedOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 text-xs">
                    No matching orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
