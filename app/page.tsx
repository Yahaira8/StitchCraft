'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Database,
  ShieldCheck,
  Code2,
  Sparkles,
  Video,
  Eye,
  Layers,
  ArrowRight,
  Compass,
  FileCode2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { SEED_PATTERNS } from '../lib/seedData';
import { Pattern } from '../types';
import { PatternPreviewModal } from '../components/PatternPreviewModal';

export default function HomePage() {
  const [activePatternPreview, setActivePatternPreview] = useState<Pattern | null>(null);

  const phase1Deliverables = [
    {
      title: 'PostgreSQL DDL Migration Script',
      file: 'supabase/schema.sql',
      desc: 'Users, patterns, user_projects with dynamic JSONB part_progress, and user_favorites tables with full RLS policies.',
      status: 'Ready',
    },
    {
      title: '8 Production Seed Patterns',
      file: 'supabase/seed.sql & lib/seedData.ts',
      desc: 'Single-part verified YouTube embed URLs and hqdefault thumbnails with structured JSON step-by-step instructions.',
      status: 'Ready',
    },
    {
      title: 'Next.js App Router Architecture',
      file: 'app/layout.tsx & next.config.mjs',
      desc: 'Standalone build output, YouTube remote image domains, Tailwind CSS design tokens, and modular folder structure.',
      status: 'Ready',
    },
    {
      title: 'Supabase Environment Configuration',
      file: '.env.local & .env.example',
      desc: 'NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY configured with graceful resilience fallbacks.',
      status: 'Ready',
    },
    {
      title: 'Strict TypeScript Domain Models',
      file: 'types/index.ts',
      desc: 'Interfaces for User, Pattern, UserProject, PartProgressMap, and ScaleCalculationResult.',
      status: 'Ready',
    },
    {
      title: 'Supabase Auth Middleware Guard',
      file: 'middleware.ts',
      desc: 'Redirects /projects to /login and enforces 401 Unauthorized on private /api/projects and /api/favorites routes.',
      status: 'Ready',
    },
    {
      title: 'Amigurumi Mathematics Engine',
      file: 'lib/amigurumiMath.ts',
      desc: 'Scaling ratios, hook adjustment formulas, safety eye sizing, and calculateOverallProgress() calculations.',
      status: 'Ready',
    },
  ];

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1: Database Setup & Infrastructure Foundation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[var(--text-primary)] tracking-tight [text-wrap:balance]">
            StitchCraft: The Amigurumi Companion
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-primary)]/75 leading-relaxed">
            Purpose-built for plushie and amigurumi crocheters. Engineered for hands-free crafting with voice-activated row tracking, safety eye sizing calculators, written stitch breakdowns, and video walkthroughs.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActivePatternPreview(SEED_PATTERNS[0])}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              <span>Preview Written Pattern & Video</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-primary)] text-xs font-semibold hover:border-[var(--color-accent)] transition-colors"
            >
              <span>Yarn & Eye Resizer</span>
            </Link>
          </div>
        </div>

        {/* Phase 1 Verification Checkpoint Card */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--border-color)] gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-accent)] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Phase 1 Checkpoint Deliverables</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-[var(--text-primary)] mt-1">
                Database Schema & Next.js Foundation
              </h2>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold self-start sm:self-auto">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>All 7 Checkpoint Items Complete</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {phase1Deliverables.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/50 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-[var(--text-primary)]">{item.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-primary)]/70 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--color-accent)] pt-2 border-t border-[var(--border-color)]/60">
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span className="truncate">{item.file}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8 Production Seed Patterns Preview */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-4 border-b border-[var(--border-color)] mb-6 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-wider">
                <Video className="w-4 h-4" />
                <span>Verified Video Tutorial & Written Pattern Database</span>
              </div>
              <h3 className="text-2xl font-serif font-bold text-[var(--text-primary)] mt-1">
                8 Amigurumi Seed Patterns
              </h3>
            </div>
            <p className="text-xs text-[var(--text-primary)]/70">
              Click any pattern card to view its written round-by-round stitches and embedded video player side-by-side.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SEED_PATTERNS.map((pattern) => (
              <div
                key={pattern.id}
                onClick={() => setActivePatternPreview(pattern)}
                className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-all shadow-xs flex flex-col cursor-pointer"
              >
                <div className="relative aspect-video bg-black/10 overflow-hidden">
                  <img
                    src={pattern.image_urls[0]}
                    alt={pattern.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-bold">
                    {pattern.difficulty}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] text-[var(--color-secondary)] font-medium">
                      {pattern.category}
                    </span>
                    <h4 className="text-sm font-semibold font-serif text-[var(--text-primary)] mt-0.5 line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {pattern.title}
                    </h4>

                    <div className="mt-3 pt-2 border-t border-[var(--border-color)]/60 text-[11px] text-[var(--text-primary)]/75 space-y-1">
                      <div className="flex justify-between">
                        <span>Hook:</span>
                        <span className="font-mono font-medium">{pattern.recommended_hook}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Safety Eyes:</span>
                        <span className="font-mono font-medium">{pattern.recommended_eye_size}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Yarn:</span>
                        <span className="font-mono font-medium truncate ml-2">{pattern.yarn_weight}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[var(--text-primary)]/60 font-medium">
                      {Object.keys(pattern.instructions).length} Parts
                    </span>
                    <span className="inline-flex items-center gap-1 text-[var(--color-accent)] font-semibold text-[11px] group-hover:translate-x-0.5 transition-transform">
                      <span>Written & Video</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Preview Modal (Written Pattern + Video Player) */}
      <PatternPreviewModal
        pattern={activePatternPreview}
        onClose={() => setActivePatternPreview(null)}
      />
    </div>
  );
}
