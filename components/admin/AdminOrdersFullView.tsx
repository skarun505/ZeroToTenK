"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import {
  Search,
  Download,
  Phone,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
  ExternalLink,
  Sparkles,
} from "lucide-react";

interface AdminOrdersFullViewProps {
  initialOrders: any[];
}

export function AdminOrdersFullView({ initialOrders }: AdminOrdersFullViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 50;

  const filteredOrders = useMemo(() => {
    return initialOrders.filter((o) => {
      if (statusFilter !== "ALL" && o.status !== statusFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const idMatch = (o.id || "").toLowerCase().includes(q);
      const titleMatch = (o.unit?.product?.title || "").toLowerCase().includes(q);
      const payerMatch = (o.payerName || "").toLowerCase().includes(q);
      const utrMatch = (o.utr || "").toLowerCase().includes(q);

      let shipName = "";
      let phoneMatch = false;
      try {
        const s = JSON.parse(o.shippingJson);
        shipName = (s.name || "").toLowerCase();
        phoneMatch = (s.phone || "").toLowerCase().includes(q);
      } catch {}

      return idMatch || titleMatch || payerMatch || utrMatch || shipName.includes(q) || phoneMatch;
    });
  }, [initialOrders, searchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / pageSize) || 1;
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Created At",
      "Customer Name",
      "Phone",
      "Playbook",
      "Amount INR",
      "Status",
      "Payment Mode",
      "UTR",
      "City",
      "State",
      "Invoice No"
    ];

    const rows = filteredOrders.map((o) => {
      let ship: any = {};
      try { ship = JSON.parse(o.shippingJson); } catch {}
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
    link.setAttribute("download", `ZeroToTenK_Orders_Export_${filteredOrders.length}_Records.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Search, Filter & Export Controls Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2.5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search customer name, mobile (+91), UTR, order ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 transition-colors"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
          >
            <option value="ALL">All Payment Statuses</option>
            <option value="VERIFIED">Verified / Paid</option>
            <option value="PAYMENT_SUBMITTED">Pending Verification</option>
            <option value="AWAITING_PAYMENT">Awaiting Payment</option>
          </select>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export {filteredOrders.length.toLocaleString("en-IN")} Records (CSV)</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px]">
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Customer &amp; Mobile</th>
                <th className="p-3.5">Playbook / License</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment / UTR</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedOrders.map((o) => {
                let ship: any = {};
                try {
                  ship = JSON.parse(o.shippingJson);
                } catch {
                  ship = {};
                }

                return (
                  <tr key={o.id} className="hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {o.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-slate-100">
                        {o.payerName || ship.name || "Customer"}
                      </div>
                      <div className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1">
                        <Phone className="w-2.5 h-2.5" />
                        <span>{ship.phone ? `+91 ${ship.phone}` : "Verified Mobile"}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {ship.city ? `${ship.city}, ${ship.state || ""}` : "Digital Delivery"}
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-800 dark:text-slate-200">
                        {o.unit?.product?.title || "Digital Playbook"}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        License: ••••{(o.unit?.serialOrImei || "").slice(-4)} &bull; {o.unit?.grade || "MASTER"}
                      </div>
                    </td>
                    <td className="p-3.5 font-black text-slate-900 dark:text-slate-100 font-mono">
                      {formatINR(o.amountPaise)}
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-700 dark:text-slate-300">
                        {o.paymentMode || "MANUAL_UPI"}
                      </div>
                      {o.utr && (
                        <div className="font-mono text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold">
                          UTR: {o.utr}
                        </div>
                      )}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.status === "VERIFIED" || o.status === "PAID"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : o.status === "PAYMENT_SUBMITTED"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                        }`}
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-500 text-[11px]">
                      {new Date(o.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </td>
                    <td className="p-3.5 text-right font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {o.invoiceNo || "-"}
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 text-xs">
                    No orders match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {filteredOrders.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 dark:bg-slate-950">
            <div className="text-slate-600 dark:text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {(currentPage - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-bold text-slate-900 dark:text-white">
                {Math.min(currentPage * pageSize, filteredOrders.length)}
              </span>{" "}
              of{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {filteredOrders.length.toLocaleString("en-IN")}
              </span>{" "}
              orders
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              <span className="px-3 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 font-mono font-bold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-bold disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1 transition-all"
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
