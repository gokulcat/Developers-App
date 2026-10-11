import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  LayoutDashboard,
  FolderPlus,
  ShoppingBag,
  Package,
  Activity,
  Trash2,
  ShieldCheck,
  RefreshCw,
  FolderGit2,
  Terminal,
} from 'lucide-react';
import { ScreenType, ProjectInstance } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screen: ScreenType) => void;
  onSelectProject: (project: ProjectInstance) => void;
  projects: ProjectInstance[];
  onCleanCache: () => void;
  onTriggerAudit: () => void;
  onTriggerLockfileCheck: () => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Actions' | 'Projects';
  title: string;
  subtitle?: string;
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectScreen,
  onSelectProject,
  projects,
  onCleanCache,
  onTriggerAudit,
  onTriggerLockfileCheck,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'nav-dashboard',
      category: 'Navigation',
      title: 'Go to Dashboard',
      subtitle: 'Overview of runtimes, daemons, and projects',
      shortcut: '⌘ 1',
      icon: <LayoutDashboard className="w-4 h-4 text-[#7bd0ff]" />,
      action: () => {
        onSelectScreen('dashboard');
        onClose();
      },
    },
    {
      id: 'nav-new-project',
      category: 'Navigation',
      title: 'Create New Project',
      subtitle: 'Provision isolated runtime dependencies and stack templates',
      shortcut: '⌘ N',
      icon: <FolderPlus className="w-4 h-4 text-[#4edea3]" />,
      action: () => {
        onSelectScreen('new-project');
        onClose();
      },
    },
    {
      id: 'nav-tool-store',
      category: 'Navigation',
      title: 'Developer Store & Tool Catalog',
      subtitle: 'Discover runtimes, frameworks, and databases',
      shortcut: '⌘ 3',
      icon: <ShoppingBag className="w-4 h-4 text-[#c0c1ff]" />,
      action: () => {
        onSelectScreen('tool-store');
        onClose();
      },
    },
    {
      id: 'nav-packages',
      category: 'Navigation',
      title: 'Packages & Dependency Matrix',
      subtitle: 'Inspect direct & transitive packages and security audits',
      shortcut: '⌘ 4',
      icon: <Package className="w-4 h-4 text-[#fbbf24]" />,
      action: () => {
        onSelectScreen('packages');
        onClose();
      },
    },
    {
      id: 'nav-activity',
      category: 'Navigation',
      title: 'Activity & Runs',
      subtitle: 'Live provisioning pipeline and runner stdout log stream',
      shortcut: '⌘ 5',
      icon: <Activity className="w-4 h-4 text-[#38BDF8]" />,
      action: () => {
        onSelectScreen('activity');
        onClose();
      },
    },

    // Actions
    {
      id: 'act-clean-cache',
      category: 'Actions',
      title: 'Clean Unused Caches (2.4 GB)',
      subtitle: 'Deletes orphaned build packages and temporary lockfiles',
      icon: <Trash2 className="w-4 h-4 text-[#F43F5E]" />,
      action: () => {
        onCleanCache();
        onClose();
      },
    },
    {
      id: 'act-audit',
      category: 'Actions',
      title: 'Run npm audit',
      subtitle: 'Inspect active project dependency graph for CVE advisories',
      icon: <ShieldCheck className="w-4 h-4 text-[#10B981]" />,
      action: () => {
        onTriggerAudit();
        onClose();
      },
    },
    {
      id: 'act-lockfile',
      category: 'Actions',
      title: 'Verify Lockfile Integrity',
      subtitle: 'Cross-check pnpm/npm lock against sandbox registry checksums',
      icon: <RefreshCw className="w-4 h-4 text-[#38BDF8]" />,
      action: () => {
        onTriggerLockfileCheck();
        onClose();
      },
    },

    // Projects
    ...projects.map((proj) => ({
      id: `proj-${proj.id}`,
      category: 'Projects' as const,
      title: `Switch to ${proj.name}`,
      subtitle: `${proj.framework} · ${proj.path}`,
      icon: <FolderGit2 className="w-4 h-4 text-[#908fa0]" />,
      action: () => {
        onSelectProject(proj);
        onClose();
      },
    })),
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(query.toLowerCase())) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-100">
      <div
        className="w-full max-w-xl bg-[#161B22] border border-[#30363D] rounded-lg shadow-2xl overflow-hidden flex flex-col text-[#dfe2ef]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3 border-b border-[#21262D] flex items-center gap-3 bg-[#0D1117]">
          <Search className="w-4 h-4 text-[#7bd0ff] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search commands, runtimes, projects, or tasks..."
            className="w-full bg-transparent text-sm text-[#dfe2ef] placeholder-[#484F58] focus:outline-none"
          />
          <kbd className="text-[10px] font-mono bg-[#161B22] border border-[#30363D] px-2 py-0.5 rounded text-[#908fa0]">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#908fa0] font-mono">
              No matching command found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#1F242C] border border-[#484F58] text-white'
                      : 'hover:bg-[#1C1F29] text-[#c7c4d7] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-1.5 rounded bg-[#0D1117] border border-[#21262D]">
                      {item.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[#dfe2ef] truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[9px] font-mono text-[#908fa0] uppercase px-1 rounded bg-[#0D1117] border border-[#21262D]">
                          {item.category}
                        </span>
                      </div>
                      {item.subtitle && (
                        <div className="text-[11px] text-[#908fa0] truncate">
                          {item.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  {item.shortcut && (
                    <kbd className="text-[10px] font-mono bg-[#0D1117] px-2 py-0.5 rounded border border-[#30363D] text-[#908fa0]">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2 border-t border-[#21262D] bg-[#0D1117] flex items-center justify-between text-[10px] font-mono text-[#908fa0]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div>DevHub Native Shell</div>
        </div>
      </div>
    </div>
  );
};
