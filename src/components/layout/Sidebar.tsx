"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/ui/Icon";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navItems = [
  { name: "Dashboard", href: "/", icon: "aVHe2jHuORcA" },
  { name: "Assessments", href: "/assessments", icon: "101164" },
  { name: "My Results", href: "/results", icon: "100254" },
  { name: "Learning", href: "/learning", icon: "85767" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  // Tutup mobile drawer saat rute berubah
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    setLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "??";

  const displayName = user?.user_metadata?.full_name ?? user?.email ?? "User";

  // Jangan tampilkan sidebar di halaman login
  if (pathname === "/login") return null;

  return (
    <>
      {/* ============================================================ */}
      {/* MOBILE TOP BAR (< md) */}
      {/* ============================================================ */}
      <div className="md:hidden flex items-center justify-between h-16 px-4 bg-sidebar-bg border-b border-sidebar-border w-full shrink-0 z-40 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-text-strong hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <Icon id="82771" className="w-6 h-6" /> : <Icon id="82749" className="w-6 h-6" />}
          </button>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-text-strong mr-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2L2 22h20L12 2z"
                />
              </svg>
            </div>
            <span className="text-lg font-heading font-bold text-text-strong tracking-wide">
              MIL-AI
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE DRAWER OVERLAY (< md) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />

            {/* Slide-out Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-72 bg-sidebar-bg z-50 md:hidden flex flex-col border-r border-sidebar-border shadow-xl"
            >
              {/* Drawer Header */}
              <div className="h-20 flex items-center justify-between px-6 border-b border-sidebar-border">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-text-strong mr-3">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 2L2 22h20L12 2z"
                      />
                    </svg>
                  </div>
                  <span className="text-xl font-heading font-bold text-text-strong tracking-wide">
                    MIL-AI
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1 rounded-lg text-text-muted hover:text-text-strong transition-colors"
                  aria-label="Close menu"
                >
                  <Icon id="82771" className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Navigation */}
              <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-xl mx-2 ${
                        isActive
                          ? "bg-sidebar-active-bg text-sidebar-active"
                          : "text-sidebar-text hover:bg-black/5 hover:text-text-strong"
                      }`}
                    >
                      <Icon
                        id={item.icon}
                        className={`w-5 h-5 ${isActive ? "bg-accent-blue" : "bg-sidebar-text"}`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Drawer Footer */}
              <div className="p-4 space-y-4 border-t border-sidebar-border">
                <div className="flex items-center justify-between">
                  <Link
                    href="/support"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-sidebar-text hover:text-text-strong transition-colors rounded-xl mx-2 hover:bg-black/5"
                  >
                    <Icon id="83244" className="w-5 h-5 bg-sidebar-text group-hover:bg-text-strong" />
                    Support
                  </Link>
                  <ThemeToggle />
                </div>

                {/* User Profile + Logout */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-black/5 transition-colors group">
                  <div className="w-9 h-9 rounded-full bg-accent-blue flex items-center justify-center text-white font-heading font-bold text-xs shadow-sm shrink-0">
                    {initials}
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-sm font-semibold text-text-strong truncate">
                      {typeof displayName === "string"
                        ? displayName.split("@")[0]
                        : "User"}
                    </span>
                    <span className="text-xs text-text-muted truncate">
                      {user?.email ?? ""}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    title="Logout"
                    className="text-text-muted hover:text-red-500 transition-colors shrink-0"
                  >
                    {loggingOut ? (
                      <Icon id="93005" className="w-4 h-4 bg-text-muted animate-spin" />
                    ) : (
                      <Icon id="82792" className="w-4 h-4 bg-text-muted hover:bg-red-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* DESKTOP SIDEBAR (>= md) */}
      {/* ============================================================ */}
      <aside className="w-64 bg-sidebar-bg border-r border-sidebar-border hidden md:flex flex-col h-full shrink-0">
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-text-strong mr-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2L2 22h20L12 2z"
              />
            </svg>
          </div>
          <span className="text-xl font-heading font-bold text-text-strong tracking-wide">
            MIL-AI
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-xl mx-2 ${
                  isActive
                    ? "bg-sidebar-active-bg text-sidebar-active"
                    : "text-sidebar-text hover:bg-black/5 hover:text-text-strong"
                }`}
              >
                <Icon
                  id={item.icon}
                  className={`w-5 h-5 ${isActive ? "bg-accent-blue" : "bg-sidebar-text"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Footer Area */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/support"
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-sidebar-text hover:text-text-strong transition-colors rounded-xl mx-2 hover:bg-black/5"
            >
              <Icon id="83244" className="w-5 h-5 bg-sidebar-text group-hover:bg-text-strong" />
              Support
            </Link>
            <ThemeToggle />
          </div>

          {/* User Profile + Logout */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-black/5 transition-colors group">
            <div className="w-9 h-9 rounded-full bg-accent-blue flex items-center justify-center text-white font-heading font-bold text-xs shadow-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-sm font-semibold text-text-strong truncate">
                {typeof displayName === "string"
                  ? displayName.split("@")[0]
                  : "User"}
              </span>
              <span className="text-xs text-text-muted truncate">
                {user?.email ?? ""}
              </span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              title="Logout"
              className="text-text-muted hover:text-red-500 transition-colors shrink-0"
            >
              {loggingOut ? (
                <Icon id="93005" className="w-4 h-4 bg-text-muted animate-spin" />
              ) : (
                <Icon id="82792" className="w-4 h-4 bg-text-muted group-hover:bg-red-500 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
