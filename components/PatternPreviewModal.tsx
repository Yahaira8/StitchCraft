'use client';

import React, { useState } from 'react';
import { X, Play, BookOpen, Layers, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Pattern } from '../types';

interface PatternPreviewModalProps {
  pattern: Pattern | null;
  onClose: () => void;
}

export const PatternPreviewModal: React.FC<PatternPreviewModalProps> = ({
  pattern,
  onClose,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'text' | 'video'>('both');
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});

  if (!pattern) return null;

  const parts = Object.entries(pattern.instructions);

  const togglePart = (partName: string) => {
    setExpandedParts((prev) => ({
      ...prev,
      [partName]: prev[partName] !== undefined ? !prev[partName] : false, // default was open
    }));
  };

  const isPartOpen = (partName: string) => {
    return expandedParts[partName] !== false; // open by default
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative bg-[var(--bg-surface)] rounded-2xl max-w-4xl w-full border border-[var(--border-color)] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-secondary)] font-semibold uppercase tracking-wider">
              <span>{pattern.category}</span>
              <span aria-hidden="true">·</span>
              <span>{pattern.difficulty}</span>
              <span aria-hidden="true">·</span>
              <span>Hook: {pattern.recommended_hook}</span>
              <span aria-hidden="true">·</span>
              <span>Eyes: {pattern.recommended_eye_size}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[var(--text-primary)] mt-0.5">
              {pattern.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close pattern modal"
            className="p-2 text-[var(--text-primary)]/70 hover:text-[var(--text-primary)] hover:bg-[var(--border-color)]/30 rounded-lg transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Switcher: Dual Mode, Written Only, Video Only */}
        <div className="px-6 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-color)] flex items-center justify-between gap-4">
          <span className="text-xs text-[var(--text-primary)]/70 font-medium hidden sm:inline">
            Choose your learning preference:
          </span>

          <div className="flex items-center gap-1 p-1 bg-[var(--bg-primary)] rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewMode('both')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'both'
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
              }`}
            >
              Side-by-Side (Dual)
            </button>
            <button
              onClick={() => setViewMode('text')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'text'
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
              }`}
            >
              Written Stitches Only
            </button>
            <button
              onClick={() => setViewMode('video')}
              className={`px-3 py-1 rounded-md transition-all ${
                viewMode === 'video'
                  ? 'bg-[var(--color-accent)] text-white shadow-xs'
                  : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
              }`}
            >
              Video Only
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className={`grid gap-8 ${viewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
            {/* Video Player Section */}
            {(viewMode === 'both' || viewMode === 'video') && (
              <div className={`${viewMode === 'both' ? 'lg:col-span-6' : 'max-w-3xl mx-auto w-full'} space-y-4`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>Video Walkthrough Tutorial</span>
                  </h3>
                  <a
                    href={pattern.video_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-[var(--color-accent)] hover:underline flex items-center gap-1"
                  >
                    <span>Open in YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="relative aspect-video rounded-xl overflow-hidden border border-[var(--border-color)] bg-black shadow-sm">
                  <iframe
                    src={pattern.video_url}
                    title={pattern.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)]/75 space-y-1">
                  <p className="font-semibold text-[var(--text-primary)]">Quick Specs:</p>
                  <p>• Recommended Yarn: {pattern.yarn_weight}</p>
                  <p>• Recommended Hook: {pattern.recommended_hook}</p>
                  <p>• Plastic Safety Eyes: {pattern.recommended_eye_size}</p>
                </div>
              </div>
            )}

            {/* Written Pattern Instructions Section (from SQL/JSON) */}
            {(viewMode === 'both' || viewMode === 'text') && (
              <div className={`${viewMode === 'both' ? 'lg:col-span-6' : 'max-w-3xl mx-auto w-full'} space-y-4`}>
                <div className="flex items-center justify-between pb-1 border-b border-[var(--border-color)]">
                  <h3 className="text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[var(--color-secondary)]" />
                    <span>Written Pattern Instructions (From SQL Data)</span>
                  </h3>
                  <span className="text-[11px] text-[var(--text-primary)]/60">
                    {parts.length} Body Part{parts.length > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-3">
                  {parts.map(([partName, rows]) => {
                    const open = isPartOpen(partName);
                    return (
                      <div
                        key={partName}
                        className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/50 overflow-hidden shadow-xs"
                      >
                        <button
                          type="button"
                          onClick={() => togglePart(partName)}
                          className="w-full px-4 py-3 bg-[var(--bg-surface)] hover:bg-[var(--bg-primary)] flex items-center justify-between transition-colors text-left"
                        >
                          <div className="flex items-center gap-2">
                            <Layers className="w-4 h-4 text-[var(--color-accent)]" />
                            <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">
                              Part: {partName.replace(/_/g, ' ')}
                            </span>
                            <span className="text-[11px] text-[var(--text-primary)]/60 font-mono">
                              ({rows.length} rounds)
                            </span>
                          </div>
                          {open ? (
                            <ChevronUp className="w-4 h-4 text-[var(--text-primary)]/60" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[var(--text-primary)]/60" />
                          )}
                        </button>

                        {open && (
                          <div className="p-4 space-y-2 border-t border-[var(--border-color)] bg-[var(--bg-surface)]">
                            {rows.map((rowText, rIdx) => (
                              <div
                                key={rIdx}
                                className="p-2.5 rounded-lg bg-[var(--bg-primary)] text-xs text-[var(--text-primary)] font-mono leading-relaxed border border-[var(--border-color)]/60 flex items-start gap-2"
                              >
                                <span className="text-[var(--color-accent)] font-bold shrink-0">
                                  #{rIdx + 1}
                                </span>
                                <span>{rowText}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
