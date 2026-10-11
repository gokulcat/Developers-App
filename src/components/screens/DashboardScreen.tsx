import React, { useState } from 'react';
import {
  FolderGit2,
  Plus,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Filter,
  ChevronDown,
  ExternalLink,
  Terminal,
  Play,
  RotateCw,
  HardDrive,
  Trash2,
  Sparkles,
  ArrowUpRight,
  Database,
  Container,
  Box,
} from 'lucide-react';
import { ScreenType, ProjectInstance, ToolchainRow } from '../../types';
import { TOOLCHAIN_ROWS } from '../../data/mockData';

interface DashboardScreenProps {
  onNavigate: (screen: ScreenType) => void;
  projects: ProjectInstance[];
  onSelectProject: (proj: ProjectInstance) => void;
  onCleanCache: () => void;
  onQuickImport: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  projects,
  onSelectProject,
  onCleanCache,
  onQuickImport,
}) => {
  const [toolchains, setToolchains] = useState<ToolchainRow[]>(TOOLCHAIN_ROWS);
  const [recentFilter, setRecentFilter] = useState('all');
  const [cacheCleaned, setCacheCleaned] = useState(false);
  const [runningProjectId, setRunningProjectId] = useState<string | null>(null);

  const handleUpgradeCli = (id: string) => {
    setToolchains((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              activeVersion: 'v20.1.0',
              registryStatus: '✓ Up to Date',
              registryStatusType: 'stable',
              operationType: 'manage',
            }
          : item
      )
    );
  };

  const handleClean = () => {
    onCleanCache();
    setCacheCleaned(true);
    setTimeout(() => setCacheCleaned(false), 3000);
  };

  const handleRunProjectDev = (proj: ProjectInstance) => {
    setRunningProjectId(proj.id);
    onSelectProject(proj);
    // Switch to activity screen or notify
    setTimeout(() => {
      onNavigate('activity');
    }, 400);
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0A0E17] text-[#dfe2ef]">
      {/* Top Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#21262D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#4edea3] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider">
              DEVHUB WORKSTATION ENGINE ONLINE
            </span>
            <span className="text-[#908fa0]">PID: 14820</span>
          </div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#dfe2ef]">
            Welcome back, Gokul
          </h1>
          <p className="text-xs text-[#908fa0] mt-0.5">
            Your sandbox runtimes, package matrices, and containerized daemons are running nominally.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onQuickImport}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#161B22] border border-[#30363D] hover:border-[#484F58] hover:bg-[#1F242C] text-xs text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors cursor-pointer"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#7bd0ff]" />
            <span>Quick Import Repo</span>
            <kbd className="text-[10px] font-mono text-[#908fa0] bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#21262D]">
              ⌘ I
            </kbd>
          </button>

          <button
            onClick={() => onNavigate('new-project')}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-xs font-medium text-white transition-colors cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Project</span>
            <kbd className="text-[10px] font-mono text-[#c0c1ff] bg-[#4338CA] px-1.5 py-0.5 rounded">
              ⌘ N
            </kbd>
          </button>
        </div>
      </div>

      {/* 4 Metric Counter Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] hover:border-[#30363D] transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#908fa0] uppercase tracking-wider">
            <span>PROJECTS ACTIVE</span>
            <Layers className="w-3.5 h-3.5 text-[#7bd0ff]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dfe2ef]">6</span>
            <span className="text-[11px] text-[#4edea3] font-mono">all synchronized</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] hover:border-[#30363D] transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#908fa0] uppercase tracking-wider">
            <span>ISOLATED RUNTIMES</span>
            <Cpu className="w-3.5 h-3.5 text-[#c0c1ff]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dfe2ef]">14</span>
            <span className="text-[11px] text-[#7bd0ff] font-mono">zero cross-leak</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] hover:border-[#30363D] transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#908fa0] uppercase tracking-wider">
            <span>SECURITY ADVISORIES</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dfe2ef]">0</span>
            <span className="text-[11px] text-[#10B981] font-mono">clean audit</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] hover:border-[#30363D] transition-colors">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#908fa0] uppercase tracking-wider">
            <span>DEPENDENCY HEALTH</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#4edea3]" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dfe2ef]">99.4%</span>
            <span className="text-[11px] text-[#908fa0] font-mono">942 pkgs</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Projects (left) & System Storage & Local Services (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Recent Projects & Workspaces */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#dfe2ef]">
                Recent Projects & Workspaces
              </span>
              <span className="text-[10px] font-mono text-[#908fa0] bg-[#161B22] px-1.5 py-0.5 rounded border border-[#21262D]">
                4 active instances
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 text-[11px] text-[#908fa0] hover:text-[#dfe2ef] px-2 py-1 rounded bg-[#161B22] border border-[#21262D] cursor-pointer">
                <Filter className="w-3 h-3" />
                <span>Filter</span>
              </button>
              <button className="flex items-center gap-1.5 text-[11px] text-[#908fa0] hover:text-[#dfe2ef] px-2 py-1 rounded bg-[#161B22] border border-[#21262D] cursor-pointer">
                <span>Recent</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] hover:border-[#384050] transition-colors flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-[#0D1117] border border-[#30363D] flex items-center justify-center text-[#7bd0ff]">
                        <Box className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h2 className="text-xs font-semibold text-[#dfe2ef] group-hover:text-[#c0c1ff] transition-colors">
                          {proj.name}
                        </h2>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#908fa0]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                          <span>{proj.statusLabel}</span>
                        </div>
                      </div>
                    </div>

                    {proj.port && (
                      <span className="text-[10px] font-mono text-[#7bd0ff] bg-[#7bd0ff]/10 px-1.5 py-0.5 rounded border border-[#7bd0ff]/20">
                        {proj.port}
                      </span>
                    )}
                    {proj.typeBadge && (
                      <span className="text-[10px] font-mono text-[#c0c1ff] bg-[#c0c1ff]/10 px-1.5 py-0.5 rounded border border-[#c0c1ff]/20">
                        {proj.typeBadge}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 text-[10px] font-mono text-[#908fa0] bg-[#0D1117] px-2 py-1 rounded border border-[#21262D] truncate">
                    {proj.path}
                  </div>

                  {/* Technology badges */}
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1F29] text-[#dfe2ef] border border-[#30363D]">
                      {proj.framework}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1F29] text-[#908fa0] border border-[#21262D]">
                      {proj.runtime}
                    </span>
                    {proj.additionalStack.map((stk, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1C1F29] text-[#908fa0] border border-[#21262D]"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card actions */}
                <div className="pt-2 border-t border-[#21262D] flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProject(proj)}
                      className="flex items-center gap-1 text-[#908fa0] hover:text-[#dfe2ef] cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>{proj.ide}</span>
                    </button>
                    {proj.secondaryAction && (
                      <button
                        onClick={() => {
                          onSelectProject(proj);
                          onNavigate('packages');
                        }}
                        className="flex items-center gap-1 text-[#908fa0] hover:text-[#dfe2ef] cursor-pointer"
                      >
                        <Terminal className="w-3 h-3" />
                        <span>{proj.secondaryAction}</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleRunProjectDev(proj)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#10B981]/15 text-[#4edea3] hover:bg-[#10B981]/25 border border-[#10B981]/30 font-mono text-[10px] cursor-pointer transition-colors"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{proj.primaryAction}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: System Storage & Local Services Watcher */}
        <div className="lg:col-span-4 space-y-3">
          {/* System Storage & Cache Card */}
          <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#dfe2ef]">
                <HardDrive className="w-3.5 h-3.5 text-[#7bd0ff]" />
                <span>System Storage & Cache</span>
              </div>
              <span className="text-[10px] font-mono text-[#908fa0]">NVMe SSD</span>
            </div>

            <div>
              <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
                DEV ENVIRONMENTS DISK ALLOCATION
              </div>
              <div className="flex items-center justify-between mt-1">
                <div>
                  <span className="text-lg font-bold font-mono text-[#dfe2ef]">14.8 GB</span>
                  <span className="text-[11px] font-mono text-[#908fa0] ml-1.5">
                    used / 250 GB free
                  </span>
                </div>
                {/* 6% Circular badge */}
                <div className="w-9 h-9 rounded-full border-2 border-[#10B981] flex items-center justify-center text-[10px] font-mono font-bold text-[#10B981] bg-[#10B981]/10">
                  6%
                </div>
              </div>
            </div>

            {/* Breakdown item list */}
            <div className="space-y-1.5 text-[11px] font-mono border-t border-[#21262D] pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                  <span>Node Modules & NPM Cache</span>
                </div>
                <span className="text-[#dfe2ef]">8.4 GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                  <span>Docker Images & Layers</span>
                </div>
                <span className="text-[#dfe2ef]">4.1 GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Pip .venv Runtimes</span>
                </div>
                <span className="text-[#dfe2ef]">1.9 GB</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                  <span>Maven .m2 Repository</span>
                </div>
                <span className="text-[#dfe2ef]">0.4 GB</span>
              </div>
            </div>

            <button
              onClick={handleClean}
              className="w-full py-2 rounded bg-[#1C1F29] border border-[#30363D] hover:border-[#F43F5E]/60 hover:bg-[#F43F5E]/10 text-xs font-medium text-[#dfe2ef] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5 text-[#F43F5E]" />
              <span>
                {cacheCleaned ? 'Caches Purged Successfully!' : 'Clean Unused Caches (2.4 GB)'}
              </span>
            </button>
            <div className="text-[10px] text-center text-[#908fa0]">
              Safe clean: deletes orphaned build packages only
            </div>
          </div>

          {/* Local Services Watcher Card */}
          <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] space-y-2.5">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#908fa0]">
              LOCAL SERVICES WATCHER
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <span className="text-[#dfe2ef]">Docker Engine v28</span>
                </div>
                <span className="text-[10px] font-mono text-[#10B981] uppercase font-medium">
                  ACTIVE
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                  <span className="text-[#dfe2ef]">WSL2 Ubuntu 24.04</span>
                </div>
                <span className="text-[10px] font-mono text-[#F59E0B] uppercase font-medium">
                  STANDBY
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                  <span className="text-[#dfe2ef]">PostgreSQL 16 Daemon</span>
                </div>
                <span className="text-[10px] font-mono text-[#38BDF8] uppercase font-medium">
                  PORT 5432
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Global & Installed Toolchain Matrix */}
      <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#dfe2ef] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#c0c1ff]" />
              Global & Installed Toolchain Matrix
            </span>
            <span className="text-[10px] font-mono text-[#908fa0] bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#21262D]">
              6 Verified Runtimes
            </span>
          </div>

          <button
            onClick={() => onNavigate('tool-store')}
            className="flex items-center gap-1.5 text-xs text-[#7bd0ff] hover:text-white transition-colors cursor-pointer"
          >
            <span>Manage Runtimes & Global PATH</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* High-density Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#21262D] text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
                <th className="py-2 px-2.5 font-medium">TOOL / BINARY</th>
                <th className="py-2 px-2.5 font-medium">ACTIVE VERSION</th>
                <th className="py-2 px-2.5 font-medium">ISOLATION SCOPE</th>
                <th className="py-2 px-2.5 font-medium">PROJECT DEPENDENCIES</th>
                <th className="py-2 px-2.5 font-medium">REGISTRY STATUS</th>
                <th className="py-2 px-2.5 font-medium text-right">OPERATIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262D]">
              {toolchains.map((tool) => (
                <tr
                  key={tool.id}
                  className="hover:bg-[#1C1F29]/60 transition-colors group text-[11px]"
                >
                  <td className="py-2.5 px-2.5 font-medium text-[#dfe2ef] flex items-center gap-2">
                    <span className="w-4 h-4 rounded bg-[#0D1117] flex items-center justify-center text-[10px] font-mono text-[#7bd0ff] border border-[#21262D]">
                      {tool.name.substring(0, 1)}
                    </span>
                    <span>{tool.name}</span>
                  </td>

                  <td className="py-2.5 px-2.5 font-mono text-[#dfe2ef]">
                    {tool.activeVersion}
                  </td>

                  <td className="py-2.5 px-2.5 text-[#c7c4d7]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                      <span>{tool.isolationScope}</span>
                    </span>
                  </td>

                  <td className="py-2.5 px-2.5 text-[#908fa0]">
                    {tool.projectDependencies}
                  </td>

                  <td className="py-2.5 px-2.5 font-mono">
                    {tool.registryStatusType === 'update' ? (
                      <span className="text-[#F59E0B] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
                        {tool.registryStatus}
                      </span>
                    ) : (
                      <span className="text-[#10B981] font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                        {tool.registryStatus}
                      </span>
                    )}
                  </td>

                  <td className="py-2.5 px-2.5 text-right">
                    {tool.operationType === 'upgrade' ? (
                      <button
                        onClick={() => handleUpgradeCli(tool.id)}
                        className="px-2.5 py-1 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[10px] font-mono font-medium transition-colors cursor-pointer"
                      >
                        Upgrade
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('tool-store')}
                        className="text-[#908fa0] hover:text-[#dfe2ef] px-2 py-0.5 rounded hover:bg-[#0D1117] transition-colors cursor-pointer font-mono text-[10px]"
                      >
                        Manage
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
