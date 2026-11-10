'use client';

import React, { useState } from 'react';
import { Play, ChevronDown, ChevronUp, BookOpen, Layers, ExternalLink } from 'lucide-react';
import { Pattern } from '../types';

interface PatternCardProps {
  pattern: Pattern;
}

export const PatternCard: React.FC<PatternCardProps> = ({ pattern }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [selectedPart, setSelectedPart] = useState<string>(
    Object.keys(pattern.instructions)[0] || ''
  );

  const parts = Object.entries(pattern.instructions);

  return (
    <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden shadow-sm hover:border-[var(--color-accent)] transition-all flex flex-col">
      {/* 1. Video Player Area: Thumbnail with 1-click play or active iframe */}
      <div className="relative aspect-video bg-black overflow-hidden">
        {isPlayingVideo ? (
          <iframe
            src={`${pattern.video_url}?autoplay=1`}
            title={pattern.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <div
            onClick={() => setIsPlayingVideo(true)}
            className="relative w-full h-full cursor-pointer group"
          >
            <img
              src={pattern.image_urls[0]}
              alt={pattern.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-5 h-5 fill-white ml-0.5" />
              </div>
            </div>

            <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-bold">
              {pattern.difficulty}
            </div>
            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] flex items-center gap-1 font-medium">
              <Play className="w-3 h-3 fill-white" />
              <span>Click to Play Video</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Specs & Metadata underneath the video */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--color-secondary)] font-medium">
            <span>{pattern.category}</span>
            <span className="font-mono text-[var(--text-primary)]/60">
              {parts.length} Part{parts.length > 1 ? 's' : ''}
            </span>
          </div>

          <h4 className="text-base font-serif font-bold text-[var(--text-primary)] mt-1">
            {pattern.title}
          </h4>

          {/* Quick Specifications */}
          <div className="mt-2.5 pt-2 border-t border-[var(--border-color)]/60 text-[11px] text-[var(--text-primary)]/80 space-y-1">
            <div className="flex justify-between">
              <span className="text-[var(--text-primary)]/60">Recommended Hook:</span>
              <span className="font-mono font-semibold">{pattern.recommended_hook}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-primary)]/60">Safety Eye Size:</span>
              <span className="font-mono font-semibold">{pattern.recommended_eye_size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-primary)]/60">Yarn Weight:</span>
              <span className="font-mono truncate ml-2 font-medium">{pattern.yarn_weight}</span>
            </div>
          </div>
        </div>

        {/* 3. Written Pattern directly underneath the video & specs */}
        <div className="pt-3 border-t border-[var(--border-color)]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-primary)]">
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Written Pattern (from SQL)</span>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-[var(--color-accent)] font-semibold hover:underline flex items-center gap-0.5 focus:outline-none"
            >
              <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Part Selection Pills if multiple parts */}
          {parts.length > 1 && (
            <div className="flex items-center gap-1 p-1 bg-[var(--bg-primary)] rounded-lg overflow-x-auto mb-2.5 text-[11px]">
              {parts.map(([partName]) => (
                <button
                  key={partName}
                  onClick={() => {
                    setSelectedPart(partName);
                    setIsExpanded(true);
                  }}
                  className={`px-2 py-0.5 rounded capitalize whitespace-nowrap font-medium transition-colors ${
                    selectedPart === partName
                      ? 'bg-[var(--color-accent)] text-white shadow-xs'
                      : 'text-[var(--text-primary)]/70 hover:text-[var(--text-primary)]'
                  }`}
                >
                  {partName.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          )}

          {/* Written Rows List (preview 2 rows if collapsed, full rows if expanded) */}
          <div className="space-y-1.5 font-mono text-[11px] bg-[var(--bg-primary)]/70 p-2.5 rounded-xl border border-[var(--border-color)]/70 max-h-64 overflow-y-auto">
            {(() => {
              const currentRows = pattern.instructions[selectedPart] || parts[0]?.[1] || [];
              const rowsToShow = isExpanded ? currentRows : currentRows.slice(0, 2);

              return (
                <>
                  <div className="flex items-center justify-between text-[10px] text-[var(--text-primary)]/50 uppercase font-sans font-semibold pb-1 border-b border-[var(--border-color)]/50">
                    <span>Part: {selectedPart.replace(/_/g, ' ')}</span>
                    <span>{currentRows.length} rounds</span>
                  </div>

                  {rowsToShow.map((row, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)]/40 text-[var(--text-primary)] leading-relaxed"
                    >
                      {row}
                    </div>
                  ))}

                  {!isExpanded && currentRows.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setIsExpanded(true)}
                      className="w-full text-center py-1 text-[10px] font-sans font-semibold text-[var(--color-accent)] hover:underline"
                    >
                      + {currentRows.length - 2} more rounds (Click to expand)
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
