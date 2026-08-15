"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import Link from "next/link";
import type { AssessmentHistoryItem } from "@/types/assessment";

interface HistoryTableProps {
  data?: AssessmentHistoryItem[];
  loading?: boolean;
}

function SkeletonRow() {
  return (
    <tr className="border-b border-sidebar-border/50">
      <td className="px-5 py-4">
        <div className="h-4 w-24 bg-sidebar-border rounded animate-pulse" />
      </td>
      <td className="px-5 py-4">
        <div className="h-5 w-20 bg-sidebar-border rounded animate-pulse" />
      </td>
      <td className="px-5 py-4 hidden md:table-cell">
        <div className="h-4 w-16 bg-sidebar-border rounded animate-pulse" />
      </td>
      <td className="px-5 py-4 text-right">
        <div className="h-4 w-12 bg-sidebar-border rounded animate-pulse ml-auto" />
      </td>
    </tr>
  );
}

function formatDate(isoString: string) {
  return new Date(isoString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getLabel(score: number) {
  if (score >= 80) return { text: "Advanced", color: "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" };
  if (score >= 65) return { text: "Proficient", color: "text-blue-700 dark:text-blue-400 bg-accent-blue/10 border-accent-blue/20" };
  if (score >= 50) return { text: "Developing", color: "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" };
  return { text: "Beginner", color: "text-rose-700 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" };
}

export function HistoryTable({ data = [], loading = false }: HistoryTableProps) {
  return (
    <div className="bg-panel rounded-3xl overflow-hidden shadow-sm border border-sidebar-border h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-sidebar-border">
        <h3 className="text-sm font-heading font-bold text-text-strong flex items-center gap-2 uppercase tracking-wider">
          <Icon id="115230" className="w-4 h-4 bg-text-muted" />
          Assessment History
        </h3>
        <Link
          href="/results"
          className="text-xs font-mono text-accent-blue hover:underline"
        >
          VIEW ALL
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background border-b border-sidebar-border text-xs font-mono text-text-muted uppercase tracking-widest">
            <tr>
              <th className="px-5 py-3 font-medium">Tanggal</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium hidden md:table-cell">Kategori</th>
              <th className="px-5 py-3 font-medium text-right">Skor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sidebar-border/50">
            {loading ? (
              <>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3 text-text-muted">
                    <Icon id="82767" className="w-8 h-8 opacity-30 bg-text-muted" />
                    <p className="text-sm">Belum ada riwayat assessment.</p>
                    <Link
                      href="/assessments"
                      className="text-xs text-accent-blue hover:underline font-medium"
                    >
                      Mulai assessment pertama →
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const label = getLabel(item.overall_score);
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-background/50 transition-colors"
                  >
                    <td className="px-5 py-4 font-mono text-text-strong text-xs">
                      {formatDate(item.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        <Icon id="82766" className="w-3 h-3 bg-emerald-500" />
                        Completed
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border rounded ${label.color}`}
                      >
                        {label.text}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-mono font-bold text-text-strong">
                      {item.overall_score}
                      <span className="text-text-muted font-normal">/100</span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
