'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Heart, FolderKanban, BookOpen, Scale, Calculator, Sparkles, UserCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check saved theme preference
    const savedTheme = localStorage.getItem('stitchcraft_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('stitchcraft_theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('stitchcraft_theme', 'dark');
      setIsDark(true);
    }
  };

  const navLinks = [
    { href: '/', label: 'Overview' },
    { href: '/patterns', label: 'Pattern Library' },
    { href: '/projects', label: 'Project Tracker' },
    { href: '/compare', label: 'Safety Eye Matrix' },
    { href: '/calculator', label: 'Yarn Resizer' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg-surface)] border-b border-[var(--border-color)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Brand Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-[var(--text-primary)] hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-serif leading-none text-lg">StitchCraft</span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-secondary)]">Amigurumi Companion</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--text-primary)]/80">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`hover:text-[var(--color-accent)] transition-colors whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[var(--color-accent)] font-semibold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster: Theme Toggle & Auth */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--color-accent)] transition-all focus:outline-none"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* Auth Link Button */}
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:opacity-90 rounded-lg transition-opacity whitespace-nowrap shadow-xs"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
