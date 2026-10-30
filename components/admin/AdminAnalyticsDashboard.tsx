"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import {
  TrendingUp,
  CreditCard,
  Package,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Search,
  Filter,
  Layers,
  Award,
  BarChart3,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Calendar,
  Check,
  RotateCcw,
  Clock,
  Download,
  Phone,
  ChevronLeft,
  Users,
} from "lucide-react";

export type MetaDatePreset =
  | "TODAY"
  | "YESTERDAY"
  | "LAST_7D"
  | "LAST_14D"
  | "LAST_30D"
  | "LAST_90D"
  | "LAST_6M"
  | "ALL"
  | "CUSTOM";

interface AdminAnalyticsProps {
  initialOrders: any[];
  initialUnits: any[];
  initialProducts: any[];
}

export function AdminAnalyticsDashboard({
  initialOrders,
  initialUnits,
  initialProducts,
}: AdminAnalyticsProps) {
  // Preset selector state (default to 6-month growth view)
  const [preset, setPreset] = useState<MetaDatePreset>("LAST_6M");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Custom date picker range (default to past 30 days)
  const defaultEnd = new Date().toISOString().slice(0, 10);
  const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10);

  const [customStart, setCustomStart] = useState<string>(defaultStart);
  const [customEnd, setCustomEnd] = useState<string>(defaultEnd);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 25;

  // Reset pagination when search or filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, preset]);

  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    revenue: number;
    orders: number;
    x: number;
    y: number;
  } | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute exact timestamp boundaries for current preset
  const dateRangeBounds = useMemo(() => {
    const now = new Date();
    // Start of today: 00:00:00
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0,
      0
    ).getTime();
    const endOfToday = now.getTime();

    // Start of yesterday: 00:00:00, End of yesterday: 23:59:59.999
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const endOfYesterday = startOfToday - 1;

    switch (preset) {
      case "TODAY":
        return {
          label: "Today",
          startMs: startOfToday,
          endMs: endOfToday,
          type: "hourly",
          formatted: new Date().toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
      case "YESTERDAY":
        return {
          label: "Yesterday",
          startMs: startOfYesterday,
          endMs: endOfYesterday,
          type: "hourly",
          formatted: new Date(startOfYesterday).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        };
      case "LAST_7D": {
        const start = now.getTime() - 7 * 24 * 60 * 60 * 1000;
        return {
          label: "Last 7 Days",
          startMs: start,
          endMs: now.getTime(),
          type: "daily",
          formatted: `${new Date(start).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })} – ${now.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`,
        };
      }
      case "LAST_14D": {
        const start = now.getTime() - 14 * 24 * 60 * 60 * 1000;
        return {
          label: "Last 14 Days",
          startMs: start,
          endMs: now.getTime(),
          type: "daily",
          formatted: `${new Date(start).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })} – ${now.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`,
        };
      }
      case "LAST_30D": {
        const start = now.getTime() - 30 * 24 * 60 * 60 * 1000;
        return {
          label: "Last 30 Days",
          startMs: start,
          endMs: now.getTime(),
          type: "daily",
          formatted: `${new Date(start).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })} – ${now.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`,
        };
      }
      case "LAST_90D": {
        const start = now.getTime() - 90 * 24 * 60 * 60 * 1000;
        return {
          label: "Last 3 Months",
          startMs: start,
          endMs: now.getTime(),
          type: "daily",
          formatted: `${new Date(start).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })} – ${now.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`,
        };
      }
      case "LAST_6M": {
        const start = now.getTime() - 180 * 24 * 60 * 60 * 1000;
        return {
          label: "Last 6 Months",
          startMs: start,
          endMs: now.getTime(),
          type: "daily",
          formatted: `${new Date(start).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })} – ${now.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`,
        };
      }
      case "CUSTOM": {
        const start = customStart
          ? new Date(`${customStart}T00:00:00`).getTime()
          : now.getTime() - 30 * 24 * 60 * 60 * 1000;
        const end = customEnd
          ? new Date(`${customEnd}T23:59:59.999`).getTime()
          : now.getTime();
        return {
          label: "Custom Range",
          startMs: Math.min(start, end),
          endMs: Math.max(start, end),
          type: "daily",
          formatted: `${new Date(start).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          })} – ${new Date(end).toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`,
        };
      }
      case "ALL":
      default:
        return {
          label: "All Time",
          startMs: 0,
          endMs: now.getTime(),
          type: "daily",
          formatted: "Lifetime All Records",
        };
    }
  }, [preset, customStart, customEnd]);

  // Filter orders strictly within the selected date window
  const filteredByDate = useMemo(() => {
    return initialOrders.filter((o) => {
      const orderTime = new Date(o.createdAt).getTime();
      return (
        orderTime >= dateRangeBounds.startMs && orderTime <= dateRangeBounds.endMs
      );
    });
  }, [initialOrders, dateRangeBounds]);

  // Compute Core Executive Metrics for the timeframe
  const metrics = useMemo(() => {
    const verifiedOrders = filteredByDate.filter((o) =>
      ["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)
    );
    const pendingOrders = filteredByDate.filter(
      (o) => o.status === "PAYMENT_SUBMITTED"
    );

    const totalRevenuePaise = verifiedOrders.reduce(
      (sum, o) => sum + (o.amountPaise || 0),
      0
    );

    const aovPaise =
      verifiedOrders.length > 0
        ? Math.round(totalRevenuePaise / verifiedOrders.length)
        : 0;

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
    const availableUnits = initialUnits.filter(
      (u) => u.status === "AVAILABLE"
    ).length;
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

  // Chart Data Aggregation (Adaptive: Hourly for Today/Yesterday, Daily for other ranges)
  const chartData = useMemo(() => {
    const map = new Map<
      string,
      { date: string; revenue: number; orders: number }
    >();

    if (dateRangeBounds.type === "hourly") {
      // 12 time blocks across the 24 hours: 12 AM, 2 AM, 4 AM, 6 AM, 8 AM, 10 AM, 12 PM, 2 PM, 4 PM, 6 PM, 8 PM, 10 PM
      const hours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
      hours.forEach((h) => {
        const timeStr = `${h === 0 ? "12" : h > 12 ? h - 12 : h}:00 ${
          h >= 12 ? "PM" : "AM"
        }`;
        map.set(h.toString(), {
          date: timeStr,
          revenue: 0,
          orders: 0,
        });
      });

      filteredByDate.forEach((o) => {
        const d = new Date(o.createdAt);
        const hour = d.getHours();
        // Bucket into the 2-hour window across 24h
        const bucket = Math.floor(hour / 2) * 2;
        const key = bucket.toString();
        if (map.has(key)) {
          const item = map.get(key)!;
          item.orders += 1;
          if (["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)) {
            item.revenue += (o.amountPaise || 0) / 100;
          }
        }
      });
    } else {
      // Daily intervals
      const startMs =
        dateRangeBounds.startMs === 0
          ? Date.now() - 30 * 24 * 60 * 60 * 1000
          : dateRangeBounds.startMs;
      const endMs = dateRangeBounds.endMs;
      const dayDiff = Math.max(
        1,
        Math.min(90, Math.ceil((endMs - startMs) / (24 * 60 * 60 * 1000)))
      );

      // Pre-fill daily slots
      for (let i = dayDiff - 1; i >= 0; i--) {
        const d = new Date(endMs - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        map.set(key, {
          date: d.toLocaleDateString("en-IN", {
            month: "short",
            day: "numeric",
          }),
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
    }

    return Array.from(map.values());
  }, [filteredByDate, dateRangeBounds]);

  // Top Selling Products Leaderboard for the active timeframe
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

    return Array.from(productSales.values())
      .sort((a, b) => b.revenuePaise - a.revenuePaise)
      .slice(0, 5);
  }, [filteredByDate]);

  // Category Revenue Distribution for the active timeframe
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
        color: "#ec4899", // Pink
      },
      "automation-and-scaling": {
        name: "Automation & Scale",
        revenuePaise: 0,
        count: 0,
        color: "#06b6d4", // Cyan
      },
    };

    filteredByDate.forEach((o) => {
      const cat = o.unit?.product?.category || "blueprint-courses";
      const bucket = categories[cat] || categories["blueprint-courses"];
      bucket.count += 1;
      if (["VERIFIED", "PAID", "SHIPPED", "DELIVERED"].includes(o.status)) {
        bucket.revenuePaise += o.amountPaise || 0;
      }
    });

    return Object.values(categories);
  }, [filteredByDate]);

  // Filtered orders table matching search and payment status
  const displayedOrders = useMemo(() => {
    return filteredByDate.filter((ord) => {
      if (statusFilter !== "ALL" && ord.status !== statusFilter) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();

      const idMatch = ord.id.toLowerCase().includes(q);
      const titleMatch = (ord.unit?.product?.title || "")
        .toLowerCase()
        .includes(q);
      const payerMatch = ord.payerName?.toLowerCase().includes(q);
      const utrMatch = ord.utr?.toLowerCase().includes(q);

      let shipName = "";
      let phoneMatch = false;
      try {
        const s = JSON.parse(ord.shippingJson);
        shipName = (s.name || "").toLowerCase();
        phoneMatch = (s.phone || "").toLowerCase().includes(q);
      } catch {}

      return (
        idMatch || titleMatch || payerMatch || utrMatch || shipName.includes(q) || phoneMatch
      );
    });
  }, [filteredByDate, statusFilter, searchQuery]);

  // Export full verified cohort to CSV for investor due-diligence
  const exportOrdersCSV = () => {
    const headers = [
      "Order ID",
      "Created At",
      "Customer Name",
      "Phone",
      "Playbook Title",
      "Amount INR",
      "Status",
      "Payment Mode",
      "UTR / Ref No",
      "City",
      "State",
      "Invoice No"
    ];

    const rows = filteredByDate.map((o) => {
      let ship: any = {};
      try {
        ship = JSON.parse(o.shippingJson);
      } catch {}

      return [
        o.id,
        new Date(o.createdAt).toISOString().slice(0, 19).replace("T", " "),
        `"${(o.payerName || ship.name || "Customer").replace(/"/g, '""')}"`,
        `"${ship.phone || ""}"`,
        `"${(o.unit?.product?.title || "Digital Playbook").replace(/"/g, '""')}"`,
        ((o.amountPaise || 0) / 100).toFixed(2),
        o.status,
        o.paymentMode || "MANUAL_UPI",
        `"${o.utr || ""}"`,
        `"${(ship.city || "").replace(/"/g, '""')}"`,
        `"${(ship.state || "").replace(/"/g, '""')}"`,
        o.invoiceNo || ""
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `ZeroToTenK_Verified_Sales_${filteredByDate.length}_Orders.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Chart SVG Coordinates Calculation with generous breathing room to avoid any clipping
  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 1000);
  const chartWidth = 900;
  const chartHeight = 280;
  const paddingLeft = 70; // Space for ₹ rupee labels so they never clip on left
  const paddingRight = 45; // Space for rightmost point & label
  const paddingTop = 45; // Space on top so curve peaks and tooltip never get cut off
  const paddingBottom = 42; // Space for X-axis date labels

  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;

  const points = chartData.map((d, index) => {
    const x =
      paddingLeft +
      (index / (chartData.length - 1 || 1)) * plotWidth;
    const y =
      chartHeight -
      paddingBottom -
      (d.revenue / maxRevenue) * plotHeight;
    return { ...d, x, y };
  });

  // Construct smooth Bezier SVG curve with clamped control points to avoid overshooting
  const pathD = points.reduce((acc, point, i, arr) => {
    if (i === 0) return `M ${point.x} ${point.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (point.x - prev.x) / 2;
    const cp1y = Math.max(paddingTop, Math.min(chartHeight - paddingBottom, prev.y));
    const cp2x = prev.x + (point.x - prev.x) / 2;
    const cp2y = Math.max(paddingTop, Math.min(chartHeight - paddingBottom, point.y));
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${point.x} ${point.y}`;
  }, "");

  const areaD = `${pathD} L ${points[points.length - 1]?.x || 0} ${
    chartHeight - paddingBottom
  } L ${points[0]?.x || 0} ${chartHeight - paddingBottom} Z`;

  const metaPresetsList: { id: MetaDatePreset; label: string; desc: string }[] =
    [
      { id: "TODAY", label: "Today", desc: "Since 12:00 AM today" },
      { id: "YESTERDAY", label: "Yesterday", desc: "Full day yesterday" },
      { id: "LAST_7D", label: "Last 7 Days", desc: "Past 7 days up to now" },
      { id: "LAST_14D", label: "Last 14 Days", desc: "Past 2 weeks" },
      { id: "LAST_30D", label: "Last 30 Days", desc: "Standard monthly cohort" },
      { id: "LAST_90D", label: "Last 3 Months", desc: "Quarterly trends (90 days)" },
      { id: "LAST_6M", label: "Last 6 Months", desc: "Past 180 days (Daily ₹10K+ run-rate)" },
      { id: "ALL", label: "All Time", desc: "Lifetime recorded orders" },
      { id: "CUSTOM", label: "Custom Range...", desc: "Select specific dates" },
    ];

  return (
    <div className="space-y-8 transition-colors">
      {/* Meta Ads Style Executive Header & Date Range Controller */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                Meta Ads Performance Filter
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                &bull;
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold hidden sm:inline">
                Real-time Cohort Velocity
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
              Sales, AOV &amp; Conversion Analytics
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Active Window:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-mono font-bold">
                {dateRangeBounds.formatted}
              </span>
              <span>&bull;</span>
              <span>{filteredByDate.length} orders in range</span>
              <span>&bull;</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                {formatINR(metrics.totalRevenuePaise)} settled
              </span>
            </div>
          </div>

          {/* Meta Ads Style Interactive Date Range Dropdown Popover */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center gap-2">
              {/* Quick Pills for 7D / 30D / 6M */}
              <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                {(["TODAY", "LAST_7D", "LAST_30D", "LAST_6M"] as MetaDatePreset[]).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPreset(p)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        preset === p
                          ? "bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-400 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      {p === "TODAY"
                        ? "Today"
                        : p === "LAST_7D"
                        ? "7D"
                        : p === "LAST_30D"
                        ? "30D"
                        : "6 Months"}
                    </button>
                  )
                )}
              </div>

              {/* Master Dropdown Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:border-emerald-500 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{dateRangeBounds.label}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Export CSV Action */}
              <button
                type="button"
                onClick={exportOrdersCSV}
                title={`Export ${filteredByDate.length} orders to CSV`}
                className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center gap-2 shadow-xs transition-all hover:border-emerald-500 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>

            {/* Dropdown Menu Modal (Meta Ads Style) */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 space-y-4 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-500">
                    Select Time Horizon
                  </div>
                  <button
                    onClick={() => setPreset("LAST_30D")}
                    className="text-[11px] text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset to 30D
                  </button>
                </div>

                {/* Preset List */}
                <div className="grid grid-cols-2 gap-1.5">
                  {metaPresetsList.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setPreset(item.id);
                        if (item.id !== "CUSTOM") {
                          setIsDropdownOpen(false);
                        }
                      }}
                      className={`text-left p-2.5 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                        preset === item.id
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent"
                      }`}
                    >
                      <div>
                        <div>{item.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {item.desc}
                        </div>
                      </div>
                      {preset === item.id && (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Custom Date Range Picker Fields */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Custom Date Span (Meta Ads Style)</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={customStart}
                        onChange={(e) => {
                          setCustomStart(e.target.value);
                          setPreset("CUSTOM");
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={customEnd}
                        onChange={(e) => {
                          setCustomEnd(e.target.value);
                          setPreset("CUSTOM");
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 text-xs focus:outline-hidden focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setPreset("CUSTOM");
                      setIsDropdownOpen(false);
                    }}
                    className="w-full py-2 rounded-xl btn-emerald text-xs font-bold text-white shadow-xs"
                  >
                    Apply Custom Date Range
                  </button>
                </div>
              </div>
            )}
          </div>
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
            <span>
              {metrics.verifiedCount} verified sales in {dateRangeBounds.label}
            </span>
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
            <span className="text-indigo-600 dark:text-indigo-400 font-bold">
              Benchmark: &gt; ₹500
            </span>
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
            <span className="text-amber-600 dark:text-amber-400">
              {metrics.pendingCount} pending UTR
            </span>
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
            {metrics.availableUnits}{" "}
            <span className="text-lg text-slate-500 dark:text-slate-400 font-normal">
              / {metrics.totalUnits}
            </span>
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
              <span>Sales &amp; Revenue Curve ({dateRangeBounds.label})</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Hover over graph data points to inspect {dateRangeBounds.type === "hourly" ? "hourly intraday" : "daily"} transaction volume and rupee collections.
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
        <div className="relative w-full pt-4 pb-2">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
            className="w-full h-72 sm:h-80 overflow-visible"
          >
            <defs>
              <linearGradient id="revenueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="60%" stopColor="#059669" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#047857" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
              const y = chartHeight - paddingBottom - pct * plotHeight;
              const val = Math.round(pct * maxRevenue);
              return (
                <g key={idx}>
                  <line
                    x1={paddingLeft}
                    y1={y}
                    x2={chartWidth - paddingRight}
                    y2={y}
                    stroke="#94a3b8"
                    strokeOpacity="0.25"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingLeft - 12}
                    y={y + 4}
                    textAnchor="end"
                    fill="#64748b"
                    fontSize="11"
                    fontFamily="monospace"
                    fontWeight="600"
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
                  fill="#ffffff"
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
              if (dateRangeBounds.type === "hourly") {
                // Show every 4 hours on the axis so labels remain spacious and clean
                if (idx % 2 !== 0) return null;
              } else {
                const step = Math.ceil(points.length / 7);
                if (idx % step !== 0 && idx !== points.length - 1) return null;
              }
              return (
                <text
                  key={idx}
                  x={pt.x}
                  y={chartHeight - 12}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="11"
                  fontWeight="600"
                >
                  {pt.date}
                </text>
              );
            })}
          </svg>

          {/* Hover Tooltip Box with Smart Auto-Flip */}
          {hoveredPoint && (
            <div
              className="absolute z-30 pointer-events-none bg-slate-900/95 dark:bg-slate-950/95 text-white border border-emerald-500/60 shadow-2xl px-3 py-2 rounded-xl text-xs space-y-1 backdrop-blur-md transition-all duration-150"
              style={{
                left: `${(hoveredPoint.x / chartWidth) * 100}%`,
                top: `${(hoveredPoint.y / chartHeight) * 100}%`,
                transform:
                  hoveredPoint.y < 90
                    ? "translate(-50%, 20px)" // Flip downwards if point is near the top edge
                    : "translate(-50%, -120%)", // Show upwards if point is lower
              }}
            >
              <div className="font-bold text-slate-300 border-b border-slate-800 pb-1 flex items-center justify-between gap-4">
                <span>{hoveredPoint.date}</span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold">
                  {hoveredPoint.orders} {hoveredPoint.orders === 1 ? "sale" : "sales"}
                </span>
              </div>
              <div className="text-emerald-400 font-extrabold text-sm">
                ₹{hoveredPoint.revenue.toLocaleString("en-IN")}
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
              <span>Top-Selling Playbooks ({dateRangeBounds.label})</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Ranked by Revenue
            </span>
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
                "bg-amber-700 text-white", // Bronze #3
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
                No verified sales recorded for {dateRangeBounds.label}.
              </div>
            )}
          </div>
        </div>

        {/* Category Revenue Breakdown */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <span>Category Revenue Share ({dateRangeBounds.label})</span>
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              Distribution
            </span>
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
                  ? Math.round(
                      (cat.revenuePaise / metrics.totalRevenuePaise) * 100
                    )
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
              <span>Real-Time Order Stream ({dateRangeBounds.label})</span>
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
                placeholder="Search name, phone (+91), UTR, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 transition-colors w-52 sm:w-72"
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

            {/* Export CSV Button */}
            <button
              type="button"
              onClick={exportOrdersCSV}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              title="Export all filtered orders to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-2.5">Order ID</th>
                <th className="py-2.5">Playbook / License</th>
                <th className="py-2.5">Customer &amp; Mobile</th>
                <th className="py-2.5">Amount</th>
                <th className="py-2.5">Status</th>
                <th className="py-2.5">Transaction Date</th>
                <th className="py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {displayedOrders
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((ord) => {
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
                            ? `License: ••••${(ord.unit.serialOrImei || "").slice(
                                -4
                              )}`
                            : "Instant Download Access"}
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="font-bold text-slate-800 dark:text-slate-200">
                          {ord.payerName || shipping.name || "Customer"}
                        </div>
                        <div className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5" />
                          <span>{shipping.phone ? `+91 ${shipping.phone}` : "Mobile Verified"}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {shipping.city
                            ? `${shipping.city}, ${shipping.state || ""}`
                            : "Online Access"}
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
                          {ord.status === "PAYMENT_SUBMITTED"
                            ? "PENDING UTR"
                            : ord.status}
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
                  <td
                    colSpan={7}
                    className="py-8 text-center text-slate-500 text-xs"
                  >
                    No matching orders found for {dateRangeBounds.label}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {displayedOrders.length > 0 && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {Math.min(currentPage * pageSize, displayedOrders.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {displayedOrders.length.toLocaleString("en-IN")}
              </span>{" "}
              orders
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <div className="px-3 py-1 font-mono text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg">
                Page {currentPage} of {Math.ceil(displayedOrders.length / pageSize) || 1}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(Math.ceil(displayedOrders.length / pageSize), p + 1)
                  )
                }
                disabled={
                  currentPage >= Math.ceil(displayedOrders.length / pageSize)
                }
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-850 flex items-center gap-1 transition-all"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
