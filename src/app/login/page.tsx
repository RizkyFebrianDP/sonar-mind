"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Email atau password salah. Silakan coba lagi.");
      setLoading(false);
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent-blue/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/8 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent-blue/10 mb-4">
            <Icon id="101174" className="w-7 h-7 bg-accent-blue" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-text-strong tracking-tight">
            SONAR MIND
          </h1>
          <p className="text-sm text-text-muted mt-1">
            MIL-AI Competency Framework Dashboard
          </p>
        </div>

        {/* Card */}
        <div className="bg-panel border border-sidebar-border rounded-3xl p-8 shadow-xl">
          <h2 className="text-lg font-bold font-heading text-text-strong mb-6">
            Masuk ke Akun
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="nama@email.com"
                className="w-full bg-background border border-sidebar-border rounded-xl px-4 py-3 text-sm text-text-strong placeholder:text-text-muted/50 outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-text-muted mb-1.5 uppercase tracking-wide"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-background border border-sidebar-border rounded-xl px-4 py-3 pr-12 text-sm text-text-strong placeholder:text-text-muted/50 outline-none focus:border-accent-blue focus:ring-2 focus:ring-accent-blue/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-strong transition-colors p-1"
                >
                  {showPassword ? (
                    <Icon id="96151" className="w-4 h-4 bg-text-muted" />
                  ) : (
                    <Icon id="85028" className="w-4 h-4 bg-text-muted" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-red-500 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3"
              >
                <Icon id="82783" className="w-4 h-4 bg-red-500 shrink-0" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.01 } : {}}
              whileTap={!loading ? { scale: 0.99 } : {}}
              className="w-full py-3.5 bg-text-strong hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed text-background rounded-2xl font-semibold text-sm transition-all mt-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </motion.button>
          </form>

          <p className="text-xs text-text-muted text-center mt-6">
            Belum punya akun? Hubungi administrator untuk mendapatkan akses.
          </p>
        </div>

        <p className="text-xs text-text-muted text-center mt-6">
          © 2026 SONAR MIND · MIL-AI Competency Framework
        </p>
      </motion.div>
    </div>
  );
}
