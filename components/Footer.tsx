import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Video } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border-color)] py-12 text-[var(--text-primary)]/80 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[var(--border-color)]">
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg text-[var(--text-primary)]">StitchCraft</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-medium">Amigurumi Edition</span>
            </div>
            <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed max-w-sm">
              The purpose-built companion web app for amigurumi crocheters. Hands-free row tracking, voice controls, automatic safety eye scaling, and video-walkthrough patterns.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-xs">
            <h4 className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-[11px]">
              Core App Views
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/patterns" className="hover:text-[var(--color-accent)] transition-colors">
                  Pattern Library (View 1)
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[var(--color-accent)] transition-colors">
                  Project Tracker (View 3)
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[var(--color-accent)] transition-colors">
                  Safety Eye Matrix (View 4)
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-[var(--color-accent)] transition-colors">
                  Yarn & Eye Resizer (View 5)
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2 text-xs">
            <h4 className="font-semibold text-[var(--text-primary)] uppercase tracking-wider text-[11px]">
              Phase 1 Deliverables
            </h4>
            <p className="text-xs text-[var(--text-primary)]/70">
              Supabase PostgreSQL DDL migration, 8 seed patterns with verified YouTube tutorials, TypeScript types, and Auth middleware initialized.
            </p>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-primary)]/60 gap-4">
          <p>© {new Date().getFullYear()} StitchCraft. Built for the Amigurumi Community.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with tight stitches & safety washers</span>
            <Heart className="w-3.5 h-3.5 text-[var(--color-accent)] fill-[var(--color-accent)]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
