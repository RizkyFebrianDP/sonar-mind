"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BrainCircuit,
  History, 
  Settings,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Assessments', href: '/assessments', icon: BrainCircuit },
  { name: 'My Results', href: '/results', icon: History },
  { name: 'Learning', href: '/learning', icon: BookOpen },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-sidebar-bg border-r border-sidebar-border hidden md:flex flex-col h-full">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-text-strong mr-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 22h20L12 2z" />
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
                  ? 'bg-sidebar-active-bg text-sidebar-active' 
                  : 'text-sidebar-text hover:bg-black/5 hover:text-text-strong'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-accent-blue' : ''}`} />
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
            <HelpCircle className="w-5 h-5" />
            Support
          </Link>
          <ThemeToggle />
        </div>
        
        {/* User Profile Snippet */}
        <div className="flex items-center gap-3 px-6 py-2 mt-2">
          <div className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white font-heading font-bold text-sm shadow-sm">
            AL
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-text-strong">Alex Lee</span>
            <span className="text-xs text-text-muted">Senior Engineer</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
