import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Save, Trash2, CheckCircle2, BookmarkPlus } from 'lucide-react';
import { ActiveProjectCounter } from '../types';

interface RowCounterToolProps {
  initialProject?: {
    name: string;
    section: string;
    totalRounds: number;
  } | null;
}

const DEFAULT_PROJECTS: ActiveProjectCounter[] = [
  {
    id: 'proj-1',
    name: 'Flora Cardigan (Right Sleeve)',
    currentSection: 'Motif Row 3',
    round: 14,
    totalRounds: 36,
    stitchCount: 56,
    notes: 'Remember to switch to 3.5mm hook for ribbed cuff at row 32.',
  },
  {
    id: 'proj-2',
    name: 'Amigurumi Fox (Head)',
    currentSection: 'Spiral Increases',
    round: 6,
    totalRounds: 18,
    stitchCount: 24,
    notes: 'Insert safety eyes between rounds 7 and 8 with 6 stitches between them.',
  },
];

export const RowCounterTool: React.FC<RowCounterToolProps> = ({ initialProject }) => {
  const [projects, setProjects] = useState<ActiveProjectCounter[]>(() => {
    try {
      const saved = localStorage.getItem('stitchcraft_counters');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch {
      return DEFAULT_PROJECTS;
    }
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    return projects[0]?.id || 'proj-1';
  });

  const [newProjectName, setNewProjectName] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [pulse, setPulse] = useState<boolean>(false);

  // Sync initial project if passed from pattern modal
  useEffect(() => {
    if (initialProject) {
      const newProj: ActiveProjectCounter = {
        id: `proj-${Date.now()}`,
        name: initialProject.name,
        currentSection: initialProject.section,
        round: 1,
        totalRounds: initialProject.totalRounds || 20,
        stitchCount: 0,
        notes: 'Loaded from pattern specifications.',
      };
      setProjects((prev) => [newProj, ...prev]);
      setActiveProjectId(newProj.id);
    }
  }, [initialProject]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stitchcraft_counters', JSON.stringify(projects));
    } catch (e) {
      console.warn('Could not save counters to localStorage', e);
    }
  }, [projects]);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const triggerFeedback = () => {
    setPulse(true);
    setTimeout(() => setPulse(false), 200);
  };

  const handleUpdate = (fields: Partial<ActiveProjectCounter>) => {
    if (!activeProject) return;
    setProjects((prev) =>
      prev.map((p) => (p.id === activeProject.id ? { ...p, ...fields } : p))
    );
  };

  const handleIncrementRound = (amount = 1) => {
    if (!activeProject) return;
    triggerFeedback();
    handleUpdate({ round: Math.max(0, activeProject.round + amount) });
  };

  const handleDecrementRound = () => {
    if (!activeProject || activeProject.round <= 0) return;
    triggerFeedback();
    handleUpdate({ round: activeProject.round - 1 });
  };

  const handleIncrementStitch = (amount = 1) => {
    if (!activeProject) return;
    triggerFeedback();
    handleUpdate({ stitchCount: Math.max(0, activeProject.stitchCount + amount) });
  };

  const handleDecrementStitch = () => {
    if (!activeProject || activeProject.stitchCount <= 0) return;
    triggerFeedback();
    handleUpdate({ stitchCount: activeProject.stitchCount - 1 });
  };

  const handleResetRound = () => {
    if (window.confirm('Reset round counter to 0 for this project?')) {
      handleUpdate({ round: 0, stitchCount: 0 });
    }
  };

  const handleAddNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const newProj: ActiveProjectCounter = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      currentSection: 'Foundation',
      round: 1,
      totalRounds: 24,
      stitchCount: 0,
      notes: '',
    };
    setProjects((prev) => [...prev, newProj]);
    setActiveProjectId(newProj.id);
    setNewProjectName('');
    setShowAddForm(false);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (projects.length <= 1) {
      alert('You must keep at least one active project tracker.');
      return;
    }
    const remaining = projects.filter((p) => p.id !== id);
    setProjects(remaining);
    if (activeProjectId === id) {
      setActiveProjectId(remaining[0].id);
    }
  };

  const progressPercentage = activeProject?.totalRounds
    ? Math.min(100, Math.round((activeProject.round / activeProject.totalRounds) * 100))
    : 0;

  return (
    <section id="row-counter" className="py-16 bg-[#F5F2EB] border-b border-[#EBE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider mb-2">
            <span>Studio Tools</span>
            <span aria-hidden="true">·</span>
            <span>Focus Mode</span>
            <span aria-hidden="true">·</span>
            <span>Auto-Saved</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#292524] tracking-tight">
            Digital Row & Stitch Counter
          </h2>
          <p className="text-sm text-[#78716C] mt-2">
            Never lose your place again. Keep track of current rounds, stitch repeats, and custom project reminders while you crochet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Project Selector List */}
          <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-[#E5DFD5] shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#F0EBE3]">
              <span className="text-xs font-semibold text-[#292524] uppercase tracking-wider">
                My Projects ({projects.length})
              </span>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs font-medium text-[#B45309] hover:text-[#92400E] flex items-center gap-1 focus:outline-none"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>New Project</span>
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleAddNewProject} className="mb-4 p-3 bg-[#FAF7F2] rounded-lg border border-[#E0D8CE] space-y-2">
                <input
                  type="text"
                  placeholder="e.g. Waffle Blanket Center"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#DDD6CB] rounded-md focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-2.5 py-1 text-xs text-[#78716C] hover:text-[#292524]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-semibold text-white bg-[#B45309] rounded-md hover:bg-[#92400E]"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {projects.map((proj) => {
                const isActive = proj.id === activeProjectId;
                const pct = proj.totalRounds ? Math.round((proj.round / proj.totalRounds) * 100) : 0;

                return (
                  <div
                    key={proj.id}
                    onClick={() => setActiveProjectId(proj.id)}
                    className={`p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#FAF4ED] border-[#B45309] shadow-xs'
                        : 'bg-white border-[#EAE3D9] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className={`text-xs font-semibold truncate ${isActive ? 'text-[#B45309]' : 'text-[#292524]'}`}>
                        {proj.name}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-[#78716C] mt-0.5">
                        <span>Round {proj.round} / {proj.totalRounds}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{pct}%</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleDeleteProject(proj.id, e)}
                      title="Delete project tracker"
                      className="opacity-0 group-hover:opacity-100 p-1 text-[#A8A29E] hover:text-red-600 transition-opacity focus:outline-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Active Project Interactive Canvas */}
          {activeProject && (
            <div className="lg:col-span-8 bg-white rounded-xl p-6 sm:p-8 border border-[#E5DFD5] shadow-sm">
              {/* Project Title & Section Editable */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EBE5DC]">
                <div className="flex-1">
                  <input
                    type="text"
                    value={activeProject.name}
                    onChange={(e) => handleUpdate({ name: e.target.value })}
                    className="text-xl sm:text-2xl font-serif text-[#292524] font-semibold bg-transparent border-b border-transparent hover:border-[#DDD6CB] focus:border-[#B45309] focus:outline-none w-full"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[#78716C]">Current Section:</span>
                    <input
                      type="text"
                      value={activeProject.currentSection}
                      onChange={(e) => handleUpdate({ currentSection: e.target.value })}
                      placeholder="e.g. Body repeat"
                      className="text-xs font-medium text-[#8C5E3D] bg-transparent border-b border-transparent hover:border-[#DDD6CB] focus:border-[#B45309] focus:outline-none px-1"
                    />
                  </div>
                </div>

                <button
                  onClick={handleResetRound}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#78716C] hover:text-[#292524] hover:bg-[#F5F2EB] rounded-lg transition-colors border border-[#EAE3D9] self-start sm:self-auto"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Counters</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="my-6">
                <div className="flex justify-between text-xs text-[#78716C] mb-1.5 font-medium">
                  <span>Project Completion</span>
                  <span className="tabular-nums">{progressPercentage}% ({activeProject.round} of {activeProject.totalRounds} rounds)</span>
                </div>
                <div className="w-full h-2.5 bg-[#EFECE6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#B45309] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Dual Counter Wheels: Rounds & Stitches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
                {/* 1. Main Round / Row Counter */}
                <div
                  className={`bg-[#FAF7F2] rounded-2xl p-6 border border-[#E0D8CE] flex flex-col items-center justify-between text-center transition-transform ${
                    pulse ? 'scale-[1.01]' : 'scale-100'
                  }`}
                >
                  <span className="text-xs font-semibold text-[#8C5E3D] uppercase tracking-wider">
                    Current Round / Row
                  </span>

                  <div className="my-4">
                    <span className="text-6xl sm:text-7xl font-serif font-bold text-[#292524] tabular-nums tracking-tight">
                      {activeProject.round}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full justify-center">
                    <button
                      onClick={handleDecrementRound}
                      disabled={activeProject.round <= 0}
                      className="w-12 h-12 rounded-xl bg-white border border-[#DCD5C9] text-[#292524] hover:bg-[#F0EBE3] flex items-center justify-center font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleIncrementRound(1)}
                      className="flex-1 py-3 px-6 rounded-xl bg-[#B45309] hover:bg-[#92400E] text-white flex items-center justify-center gap-2 font-semibold text-base transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#B45309]"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Next Row</span>
                    </button>
                  </div>
                </div>

                {/* 2. Micro Stitch In Row Counter */}
                <div className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E0D8CE] flex flex-col items-center justify-between text-center">
                  <span className="text-xs font-semibold text-[#78716C] uppercase tracking-wider">
                    Stitches In This Row
                  </span>

                  <div className="my-4">
                    <span className="text-6xl sm:text-7xl font-serif font-bold text-[#57534E] tabular-nums tracking-tight">
                      {activeProject.stitchCount}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full justify-center">
                    <button
                      onClick={handleDecrementStitch}
                      disabled={activeProject.stitchCount <= 0}
                      className="w-12 h-12 rounded-xl bg-white border border-[#DCD5C9] text-[#292524] hover:bg-[#F0EBE3] flex items-center justify-center font-bold text-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-xs"
                    >
                      <Minus className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => handleIncrementStitch(1)}
                      className="flex-1 py-3 px-6 rounded-xl bg-[#292524] hover:bg-[#44403C] text-white flex items-center justify-center gap-2 font-semibold text-base transition-colors shadow-sm focus:outline-none"
                    >
                      <Plus className="w-5 h-5" />
                      <span>+1 Stitch</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Pattern Reminders & Notes Area */}
              <div className="pt-4 border-t border-[#EBE5DC]">
                <label className="block text-xs font-semibold text-[#292524] uppercase tracking-wider mb-1.5">
                  Pattern Notes & Markers
                </label>
                <textarea
                  value={activeProject.notes}
                  onChange={(e) => handleUpdate({ notes: e.target.value })}
                  placeholder="Record stitch counts, increases, or color changes here..."
                  rows={2}
                  className="w-full p-3 text-xs bg-[#FAF7F2] border border-[#DDD6CB] rounded-lg text-[#292524] placeholder-[#A8A29E] focus:outline-none focus:ring-1 focus:ring-[#B45309]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
