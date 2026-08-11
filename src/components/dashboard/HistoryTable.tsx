import React from 'react';
import { History } from 'lucide-react';
import Link from 'next/link';

const mockHistory = [
  { id: 1, date: '2026-10-12', score: '82/100', status: 'COMPLETED' },
  { id: 2, date: '2026-10-05', score: '72/100', status: 'COMPLETED' },
  { id: 3, date: '2026-09-28', score: '--/100', status: 'IN PROGRESS' },
];

export function HistoryTable() {
  return (
    <div className="bg-panel rounded-3xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-border-subtle">
        <h3 className="text-sm font-heading font-bold text-text-strong flex items-center gap-2 uppercase tracking-wider">
          <History className="w-4 h-4 text-text-muted" />
          Assessment History
        </h3>
        <Link href="/history" className="text-xs font-mono text-accent-blue hover:underline">
          VIEW ALL
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-background border-b border-border-subtle text-xs font-mono text-text-muted uppercase tracking-widest">
            <tr>
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {mockHistory.map((item) => (
              <tr key={item.id} className="hover:bg-background/50 transition-colors">
                <td className="px-5 py-4 font-mono text-text-strong">
                  {item.date}
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border ${
                    item.status === 'COMPLETED' 
                      ? 'text-accent-green border-accent-green/30 bg-accent-green/5' 
                      : 'text-accent-blue border-accent-blue/30 bg-accent-blue/5'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right font-mono font-bold text-text-strong">
                  {item.score}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
