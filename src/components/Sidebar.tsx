import React from 'react';
import {
  LayoutDashboard,
  FolderPlus,
  ShoppingBag,
  Package,
  Activity,
  ChevronDown,
  Settings,
  PanelLeftClose,
  Code2,
} from 'lucide-react';
import { ScreenType, ProjectInstance } from '../types';

interface SidebarProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  activeProject: ProjectInstance;
  allProjects: ProjectInstance[];
  onSelectProject: (project: ProjectInstance) => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onSelectScreen,
  activeProject,
  allProjects,
  onSelectProject,
  onOpenSettings,
}) => {
  const [projectDropdownOpen, setProjectDropdownOpen] = React.useState(false);

  const navItems: {
    id: ScreenType;
    label: string;
    icon: React.ReactNode;
    shortcut?: string;
    badge?: string;
    hasLiveIndicator?: boolean;
  }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      shortcut: '⌘1',
    },
    {
      id: 'new-project',
      label: 'New Project',
      icon: <FolderPlus className="w-4 h-4" />,
      badge: 'Quick Build',
    },
    {
      id: 'tool-store',
      label: 'Tool Store',
      icon: <ShoppingBag className="w-4 h-4" />,
      shortcut: '⌘3',
    },
    {
      id: 'packages',
      label: 'Packages',
      icon: <Package className="w-4 h-4" />,
      shortcut: '⌘4',
    },
    {
      id: 'activity',
      label: 'Activity & Runs',
      icon: <Activity className="w-4 h-4" />,
      hasLiveIndicator: true,
    },
  ];

  return (
    <aside className="w-64 bg-[#0D1117] border-r border-[#21262D] flex flex-col justify-between select-none h-full shrink-0 z-30">
      {/* Top Header */}
      <div>
        <div className="p-3.5 border-b border-[#21262D] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-[#161B22] border border-[#30363D] flex items-center justify-center text-[#7bd0ff] shadow-inner">
              <Code2 className="w-4 h-4 text-[#7bd0ff]" />
            </div>
            <div>
              <div className="font-semibold text-xs text-[#dfe2ef] tracking-tight flex items-center gap-1.5">
                DevHub
              </div>
              <div className="text-[10px] text-[#908fa0] leading-none">
                Workspace Suite
              </div>
            </div>
          </div>
          <button
            className="text-[#908fa0] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#161B22] transition-colors"
            title="Toggle Sidebar Layout"
          >
            <PanelLeftClose className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Platform Scope Section */}
        <div className="px-3 pt-3">
          <div className="text-[10px] font-mono tracking-wider text-[#908fa0] uppercase px-2 mb-1.5 font-medium">
            Platform Scope
          </div>

          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectScreen(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded text-xs transition-colors cursor-pointer group ${
                    isActive
                      ? 'bg-[#1C1F29] text-[#dfe2ef] border border-[#30363D] font-medium'
                      : 'text-[#c7c4d7] hover:text-[#dfe2ef] hover:bg-[#161B22] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`${
                        isActive
                          ? 'text-[#7bd0ff]'
                          : 'text-[#908fa0] group-hover:text-[#c7c4d7]'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="tracking-tight">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
                        {item.badge}
                      </span>
                    )}

                    {item.shortcut && (
                      <kbd className="text-[10px] font-mono text-[#908fa0]">
                        {item.shortcut}
                      </kbd>
                    )}

                    {item.hasLiveIndicator && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#38BDF8]"></span>
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Area: Active Project Switcher & User Profile */}
      <div className="p-3 border-t border-[#21262D] space-y-2">
        {/* Active Project Switcher */}
        <div className="relative">
          <div className="text-[9px] font-mono tracking-wider text-[#908fa0] uppercase px-1 mb-1">
            Active Project
          </div>
          <button
            onClick={() => setProjectDropdownOpen(!projectDropdownOpen)}
            className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-[#161B22] border border-[#30363D] hover:border-[#484F58] text-xs text-left cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#10B981] shrink-0" />
              <span className="font-medium text-[11px] text-[#dfe2ef] truncate">
                {activeProject.name} ({activeProject.framework.split(' ')[0]})
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#908fa0] shrink-0" />
          </button>

          {/* Project Dropdown / Dropup */}
          {projectDropdownOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1.5 bg-[#1F242C] border border-[#30363D] rounded shadow-xl overflow-hidden z-50 p-1 space-y-0.5">
              <div className="text-[10px] font-mono px-2 py-1 text-[#908fa0] border-b border-[#30363D]">
                Switch Workspace Target
              </div>
              {allProjects.map((proj) => (
                <button
                  key={proj.id}
                  onClick={() => {
                    onSelectProject(proj);
                    setProjectDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[11px] text-left transition-colors ${
                    proj.id === activeProject.id
                      ? 'bg-[#6366F1]/20 text-[#c0c1ff] font-medium'
                      : 'text-[#c7c4d7] hover:bg-[#161B22] hover:text-[#dfe2ef]'
                  }`}
                >
                  <span className="truncate">{proj.name}</span>
                  <span className="text-[10px] font-mono text-[#908fa0]">
                    {proj.framework.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded bg-[#161B22]/70 border border-[#21262D]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#38BDF8] flex items-center justify-center text-[9px] font-mono font-bold text-white">
              GR
            </div>
            <div>
              <div className="text-[11px] font-medium text-[#dfe2ef] leading-tight">
                Gokul R.
              </div>
              <div className="text-[9px] text-[#4edea3] font-mono leading-none">
                Pro Developer
              </div>
            </div>
          </div>
          <button
            onClick={onOpenSettings}
            className="text-[#908fa0] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#1F242C] transition-colors cursor-pointer"
            title="Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
