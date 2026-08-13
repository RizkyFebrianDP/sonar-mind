import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import { motion } from 'framer-motion';

const attempts = [
  {
    id: 2,
    date: 'Aug 10, 2026',
    score: '82/100',
    status: 'Completed'
  },
  {
    id: 1,
    date: 'Aug 03, 2026',
    score: '74/100',
    status: 'Completed'
  }
];

export function PreviousAttemptsWidget() {
  return (
    <div className="flex flex-col mb-6">
      <h3 className="text-xl font-heading font-bold text-text-strong mb-1">Previous Attempts</h3>
      <p className="text-sm text-transparent select-none" aria-hidden="true">Spacer to align with left column</p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-panel rounded-3xl shadow-sm border border-border-subtle overflow-hidden flex flex-col"
      >
        <div className="flex flex-col">
          {attempts.map((attempt, idx) => (
            <div 
              key={attempt.id} 
              className={`p-5 flex flex-col gap-3 ${idx !== attempts.length - 1 ? 'border-b border-border-subtle' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-text-strong">Attempt #{attempt.id}</h4>
                  <p className="text-sm text-text-muted">{attempt.date}</p>
                </div>
                <div className="bg-background px-2.5 py-1 rounded-md text-xs font-bold text-text-strong border border-border-subtle">
                  {attempt.score}
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-accent-green">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-green"></div>
                  {attempt.status}
                </div>
                
                <Link 
                  href={`/results?id=${attempt.id}`} 
                  className="text-xs font-bold text-accent-blue hover:text-accent-blue/80 transition-colors flex items-center"
                >
                  View Results
                  <Icon id="85463" className="w-3 h-3 ml-1 bg-accent-blue" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-background border-t border-border-subtle p-3 text-center hover:bg-black/5 transition-colors cursor-pointer">
          <Link href="/results" className="text-xs font-bold text-text-strong block w-full">
            View All History
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
