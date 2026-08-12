"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, CreditCard } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console or error reporting service
    console.error("App Error Boundary caught an error:", error);
  }, [error]);

  const is402 =
    error?.status === 402 ||
    error?.message?.includes("402") ||
    error?.message?.toLowerCase().includes("payment required") ||
    error?.message?.toLowerCase().includes("quota");

  return (
    <div className="min-h-full flex items-center justify-center p-6 bg-background">
      <div className="max-w-md w-full bg-panel border border-sidebar-border rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-accent-red/10 text-accent-red flex items-center justify-center mx-auto">
          {is402 ? (
            <CreditCard className="w-8 h-8 text-amber-500" />
          ) : (
            <AlertTriangle className="w-8 h-8" />
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-heading font-bold text-text-strong">
            {is402 ? "Akses Terbatas (402)" : "Terjadi Kesalahan"}
          </h2>
          <p className="text-sm text-text-muted">
            {is402
              ? "Layanan memerlukan lisensi atau kuota yang telah habis. Harap periksa status akun Anda."
              : error.message || "Aplikasi mengalami kendala yang tidak terduga saat memuat data."}
          </p>
          {error.digest && (
            <p className="text-xs font-mono text-text-muted/60 bg-black/5 p-2 rounded-lg break-all">
              Error Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-5 py-2.5 bg-text-strong hover:bg-black text-background rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 bg-black/5 hover:bg-black/10 text-text-strong rounded-full text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Ke Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
