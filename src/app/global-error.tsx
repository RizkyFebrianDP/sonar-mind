"use client";

import React, { useEffect } from "react";

import { handleError } from "@/lib/error-handler";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string; status?: number; code?: string };
  reset: () => void;
}) {
  useEffect(() => {
    handleError(error, "GlobalErrorBoundary");
  }, [error]);

  const is402 =
    error?.status === 402 ||
    error?.message?.includes("402") ||
    error?.message?.toLowerCase().includes("payment required");

  return (
    <html lang="en">
      <body className="bg-[#09090b] text-[#f8fafc] min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-[#18181b] border border-[#27272a] rounded-3xl p-8 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto text-2xl font-bold">
            !
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {is402 ? "Akses Terbatas (402)" : "Fatal Application Error"}
            </h1>
            <p className="text-sm text-zinc-400">
              {is402
                ? "Layanan memerlukan lisensi atau kuota yang telah habis."
                : "Terjadi kesalahan sistem fatal pada tingkat root aplikasi."}
            </p>
            {error.digest && (
              <p className="text-xs font-mono text-zinc-500 bg-black/40 p-2 rounded-lg break-all">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-full text-sm font-semibold transition-all"
            >
              Muat Ulang Aplikasi
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
