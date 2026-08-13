"use client";

import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Users } from "lucide-react";

interface Candidate {
  name: string;
  gender: string;
  school: string;
  gpa: number;
  extracurricular: string;
  achievements: string[];
  scholarshipEssayScore: number;
  aiRank: number;
  aiScore: number;
}

interface CandidateTableProps {
  candidates: Candidate[];
}

export function CandidateTable({ candidates }: CandidateTableProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600 dark:text-green-400 bg-green-500/10";
    if (score >= 70) return "text-yellow-700 dark:text-yellow-400 bg-yellow-500/10";
    return "text-red-500 bg-red-500/10";
  };

  const sorted = [...candidates].sort((a, b) => a.aiRank - b.aiRank);

  return (
    <div className="bg-panel rounded-2xl border border-sidebar-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-text-strong font-heading">
              Hasil Peringkat AI — Posisi: Software Engineer
            </h3>
            <p className="text-xs text-text-muted">
              Diurutkan berdasarkan skor sistem AI rekrutmen
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-sidebar-border bg-background/50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide w-10">
                #
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                Kandidat
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden md:table-cell">
                IPK
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">
                Pengalaman
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide hidden lg:table-cell">
                Proyek
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-text-muted uppercase tracking-wide">
                Skor AI
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((candidate) => (
              <tr
                key={candidate.name}
                className="border-b border-sidebar-border/50 hover:bg-background/40 transition-colors"
              >
                <td className="px-4 py-3.5">
                  <span className="w-6 h-6 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-bold flex items-center justify-center">
                    {candidate.aiRank}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-semibold text-text-strong">
                    {candidate.name}
                  </p>
                  <p className="text-xs text-text-muted">{candidate.school}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {candidate.achievements?.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-xs bg-accent-blue/8 text-accent-blue px-1.5 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {(candidate.achievements?.length || 0) > 3 && (
                      <span className="text-xs text-text-muted">
                        +{(candidate.achievements?.length || 0) - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 hidden md:table-cell">
                  <span className="font-semibold text-text-strong">
                    {candidate.gpa.toFixed(1)}
                  </span>
                  <span className="text-xs text-text-muted"> / 4.0</span>
                </td>
                <td className="px-4 py-3.5 text-sm text-text-body hidden lg:table-cell">
                  {candidate.extracurricular}
                </td>
                <td className="px-4 py-3.5 hidden lg:table-cell">
                  <div className="flex items-center gap-1 text-text-body">
                    <Icon id="82716" className="w-3.5 h-3.5 bg-text-muted" />
                    <span>{candidate.scholarshipEssayScore}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={`text-sm font-bold px-2.5 py-1 rounded-lg ${getScoreColor(
                      candidate.aiScore
                    )}`}
                  >
                    {candidate.aiScore}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
