"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, ArrowRight, Check, BookOpen } from "lucide-react";

export function ExitIntentOffer() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem("exit_ebook_seen")) {
        setShow(true);
        sessionStorage.setItem("exit_ebook_seen", "true");
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  if (!show) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("ZEROTOTENK");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 p-6 sm:p-8 space-y-5 text-center shadow-2xl">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 p-0.5 mx-auto">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
            CREATOR LAUNCH EXCLUSIVE
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Get An Extra 15% OFF Your First eBook!
          </h3>
          <p className="text-xs text-slate-300">
            Apply the code below at checkout to save an additional 15% on any individual playbook or bundle.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
          <div className="font-mono text-base font-black text-emerald-300 tracking-wider">
            ZEROTOTENK
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl btn-emerald text-white font-bold text-xs flex items-center gap-1 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>

        <button
          onClick={() => setShow(false)}
          className="w-full py-3 rounded-xl btn-emerald text-white font-black text-xs uppercase tracking-wide hover:opacity-95 transition-all shadow-md"
        >
          Continue Exploring Playbooks
        </button>
      </div>
    </div>
  );
}
