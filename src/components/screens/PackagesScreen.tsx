import React, { useState } from 'react';
import {
  RotateCcw,
  ShieldCheck,
  Search,
  Plus,
  ArrowDownToLine,
  Trash2,
  Lock,
  Layers,
  CheckCircle2,
  Check,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { ProjectInstance, PackageDependency } from '../../types';
import { INITIAL_PACKAGES } from '../../data/mockData';

interface PackagesScreenProps {
  activeProject: ProjectInstance;
  onSwitchWorkspace: (project: ProjectInstance) => void;
  allProjects: ProjectInstance[];
}

export const PackagesScreen: React.FC<PackagesScreenProps> = ({
  activeProject,
  onSwitchWorkspace,
  allProjects,
}) => {
  const [packages, setPackages] = useState<PackageDependency[]>(INITIAL_PACKAGES);
  const [registryMode, setRegistryMode] = useState<'npm' | 'pypi'>('npm');
  const [searchQuery, setSearchQuery] = useState('');
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedPackageForDetails, setSelectedPackageForDetails] = useState<PackageDependency | null>(null);
  const [customDepModalOpen, setCustomDepModalOpen] = useState(false);
  const [customDepName, setCustomDepName] = useState('');
  const [customDepVersion, setCustomDepVersion] = useState('latest');

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3000);
  };

  const handleUpdatePackage = (pkgName: string) => {
    setPackages((prev) =>
      prev.map((p) =>
        p.name === pkgName
          ? {
              ...p,
              installedVersion: 'v4.0.8',
              latestVersion: 'v4.0.8 Match',
              versionStatus: 'Match',
            }
          : p
      )
    );
    showNotice(`Updated ${pkgName} to latest version.`);
  };

  const handleDeletePackage = (pkgName: string) => {
    setPackages((prev) => prev.filter((p) => p.name !== pkgName));
    showNotice(`Uninstalled ${pkgName} from project manifest.`);
  };

  const handleInstallAxios = () => {
    if (!packages.some((p) => p.name === 'axios')) {
      const newPkg: PackageDependency = {
        name: 'axios',
        type: 'Direct',
        installedVersion: 'v1.7.9',
        latestVersion: 'v1.7.9 Match',
        versionStatus: 'Match',
        auditStatus: 'Healthy (0 CVE)',
        auditStatusColor: 'emerald',
      };
      setPackages([newPkg, ...packages]);
      showNotice('Installed axios v1.7.9 to package.json dependencies.');
    } else {
      showNotice('axios is already installed in active project.');
    }
  };

  const handleAddCustomDep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDepName.trim()) return;
    const newPkg: PackageDependency = {
      name: customDepName.trim(),
      type: 'Direct',
      installedVersion: customDepVersion.startsWith('v') ? customDepVersion : `v${customDepVersion}`,
      latestVersion: 'Latest Match',
      versionStatus: 'Match',
      auditStatus: 'Healthy',
      auditStatusColor: 'emerald',
    };
    setPackages([newPkg, ...packages]);
    setCustomDepName('');
    setCustomDepModalOpen(false);
    showNotice(`Installed ${newPkg.name} successfully.`);
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0A0E17] text-[#dfe2ef]">
      {/* Scope Header Banner */}
      <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[#dfe2ef] tracking-tight">
              {activeProject.name}
            </span>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
              • ACTIVE SCOPE
            </span>

            {/* Switch Workspace Dropdown */}
            <div className="relative">
              <button
                onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
                className="flex items-center gap-1 text-[11px] font-medium text-[#7bd0ff] hover:text-white px-2 py-0.5 rounded hover:bg-[#0D1117] transition-colors cursor-pointer"
              >
                <span>Switch Workspace</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {workspaceMenuOpen && (
                <div className="absolute left-0 top-full mt-1 w-52 bg-[#1F242C] border border-[#30363D] rounded shadow-2xl z-50 p-1 space-y-0.5">
                  {allProjects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSwitchWorkspace(p);
                        setWorkspaceMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                        p.id === activeProject.id
                          ? 'bg-[#6366F1]/20 text-[#c0c1ff]'
                          : 'text-[#c7c4d7] hover:bg-[#161B22] hover:text-white'
                      }`}
                    >
                      <span className="truncate">{p.name}</span>
                      <span className="text-[10px] font-mono text-[#908fa0]">
                        {p.framework.split(' ')[0]}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#908fa0] flex flex-wrap items-center gap-2">
            <span>{activeProject.framework}</span>
            <span>•</span>
            <span>{activeProject.runtime}</span>
            <span className="text-[#30363D]">|</span>
            <span className="truncate">{activeProject.path}</span>
            <span className="text-[#30363D]">|</span>
            <span className="text-[#7bd0ff]">pnpm-lock.yaml (v9.0)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => showNotice('Manifest synchronized with isolated registry checksums.')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#484F58] text-xs font-mono text-[#dfe2ef] hover:bg-[#1C1F29] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#7bd0ff]" />
            <span>Sync Manifest</span>
          </button>

          <button
            onClick={() => showNotice('npm audit complete: 0 vulnerabilities found in 428 packages.')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-[#c0c1ff] hover:bg-[#a5a7ff] text-[#0d0096] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 fill-current" />
            <span>Run npm audit</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="p-2.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono text-[#4edea3] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {/* 4 Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D]">
          <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
            DIRECT DEPS
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dfe2ef]">
              {packages.length}
            </span>
            <span className="text-[11px] text-[#908fa0] font-mono">manifest level</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D]">
          <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
            TRANSITIVE GRAPH
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#dfe2ef]">428</span>
            <span className="text-[11px] text-[#7bd0ff] font-mono">isolated pkgs</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D]">
          <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
            VULNERABILITIES
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#10B981]">0</span>
            <span className="text-[11px] text-[#10B981] font-mono">Passing Audit</span>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D]">
          <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
            UPDATES AVAILABLE
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-[#F59E0B]">
              {packages.filter((p) => p.versionStatus === 'Update').length}
            </span>
            <span className="text-[11px] text-[#F59E0B] font-mono">Patch / Safe</span>
          </div>
        </div>
      </div>

      {/* Search & Custom Dependency Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1 flex items-center px-3 py-1.5 rounded-lg bg-[#161B22] border border-[#30363D] focus-within:border-[#6366F1]">
          <Search className="w-4 h-4 text-[#908fa0] mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search npm / pip / Maven packages (e.g. axios, tailwindcss)..."
            className="w-full bg-transparent text-xs text-[#dfe2ef] placeholder-[#484F58] focus:outline-none font-sans"
          />
          <kbd className="text-[10px] font-mono text-[#908fa0] bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#21262D] shrink-0">
            ⌘ K
          </kbd>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center p-0.5 rounded bg-[#0D1117] border border-[#21262D]">
            <button
              onClick={() => setRegistryMode('npm')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                registryMode === 'npm'
                  ? 'bg-[#161B22] text-[#dfe2ef] border border-[#30363D]'
                  : 'text-[#908fa0] hover:text-[#dfe2ef]'
              }`}
            >
              NPM (Active)
            </button>
            <button
              onClick={() => setRegistryMode('pypi')}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                registryMode === 'pypi'
                  ? 'bg-[#161B22] text-[#dfe2ef] border border-[#30363D]'
                  : 'text-[#908fa0] hover:text-[#dfe2ef]'
              }`}
            >
              PyPI / Wheel
            </button>
          </div>

          <button
            onClick={() => setCustomDepModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161B22] border border-[#30363D] hover:border-[#6366F1] text-xs font-medium text-[#c0c1ff] hover:bg-[#1C1F29] transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Custom Dependency</span>
          </button>
        </div>
      </div>

      {/* SPOTLIGHT CANDIDATES & SEARCH PREVIEWS */}
      <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
        <div className="flex items-center justify-between text-[10px] font-mono text-[#908fa0]">
          <div className="flex items-center gap-2">
            <span className="uppercase tracking-wider font-semibold">
              SPOTLIGHT CANDIDATES & SEARCH PREVIEWS
            </span>
            <span className="bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#21262D]">
              2 Found
            </span>
          </div>
          <div>Registry Sync: 48ms ping</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Card 1: axios */}
          <div className="p-3.5 rounded bg-[#0D1117] border border-[#21262D] hover:border-[#384050] transition-colors flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#161B22] border border-[#30363D] font-mono text-[9px] text-[#7bd0ff]">
                    HTTP
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#dfe2ef]">axios</span>
                      <span className="text-[9px] font-mono text-[#908fa0]">npm core</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#908fa0]">
                      by axios • weekly: 58,410,210
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#4edea3] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/25">
                  1.7.9 Latest ▾
                </span>
              </div>

              <p className="mt-2 text-[11px] text-[#c7c4d7] leading-relaxed">
                Promise based HTTP client for the browser and node.js with interceptors, cancellation,
                and TypeScript support.
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="text-[#4edea3]">✓ Compatible with Node.js 22 & Angular 20</span>
                <span className="text-[#908fa0]">License: MIT • Bundle: 12.4 kB minified</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#21262D] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#908fa0]">
                Target: package.json → dependencies
              </span>
              <button
                onClick={handleInstallAxios}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[11px] font-medium transition-colors cursor-pointer"
              >
                <ArrowDownToLine className="w-3 h-3" />
                <span>Install to Project</span>
              </button>
            </div>
          </div>

          {/* Card 2: pandas */}
          <div className="p-3.5 rounded bg-[#0D1117] border border-[#21262D] hover:border-[#384050] transition-colors flex flex-col justify-between space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#161B22] border border-[#30363D] font-mono text-[9px] text-[#F59E0B]">
                    田
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#dfe2ef]">pandas</span>
                      <span className="text-[9px] font-mono text-[#7bd0ff]">PyPI Wheel</span>
                    </div>
                    <div className="text-[10px] font-mono text-[#908fa0]">
                      by pydata • Python Data Ops
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono text-[#7bd0ff] bg-[#7bd0ff]/10 px-2 py-0.5 rounded border border-[#7bd0ff]/25">
                  2.2.3 Stable ▾
                </span>
              </div>

              <p className="mt-2 text-[11px] text-[#c7c4d7] leading-relaxed">
                Powerful data structures and data analysis toolkit designed for tabular,
                multi-dimensional execution and analytics.
              </p>

              <div className="mt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                <span className="text-[#4edea3]">✓ Compatible with Python 3.13 & NumPy 2.x</span>
                <span className="text-[#908fa0]">License: BSD-3 • Binary Wheel Ready</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#21262D] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#908fa0]">
                Target: pyproject.toml / requirements.txt
              </span>
              <button
                onClick={() => showNotice('Added pandas candidate to requirements queue.')}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#161B22] border border-[#30363D] hover:border-[#484F58] text-[#c7c4d7] hover:text-[#dfe2ef] text-[11px] font-medium transition-colors cursor-pointer"
              >
                <span>Switch & Add</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Installed Dependencies Matrix Table */}
      <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#dfe2ef] flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#7bd0ff]" />
              Installed Dependencies Matrix
            </span>
            <span className="text-[10px] font-mono text-[#908fa0] bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#21262D]">
              {packages.length} In Focus
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-[#4edea3]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Manifest Synced</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#21262D] text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
                <th className="py-2 px-2.5 font-medium">PACKAGE NAME</th>
                <th className="py-2 px-2.5 font-medium">TYPE</th>
                <th className="py-2 px-2.5 font-medium">INSTALLED</th>
                <th className="py-2 px-2.5 font-medium">LATEST AVAILABLE</th>
                <th className="py-2 px-2.5 font-medium">AUDIT STATUS</th>
                <th className="py-2 px-2.5 font-medium text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#21262D]">
              {packages
                .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((pkg) => (
                  <tr
                    key={pkg.name}
                    className="hover:bg-[#1C1F29]/60 transition-colors group text-[11px]"
                  >
                    <td className="py-2.5 px-2.5 font-medium text-[#dfe2ef] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                      <span className="font-mono">{pkg.name}</span>
                    </td>

                    <td className="py-2.5 px-2.5 font-mono text-[#908fa0]">
                      {pkg.type}
                    </td>

                    <td className="py-2.5 px-2.5 font-mono text-[#dfe2ef]">
                      {pkg.installedVersion}
                    </td>

                    <td className="py-2.5 px-2.5 font-mono">
                      {pkg.versionStatus === 'Update' ? (
                        <span className="text-[#F59E0B] font-medium">{pkg.latestVersion}</span>
                      ) : pkg.versionStatus === 'Pinned' ? (
                        <span className="text-[#908fa0] flex items-center gap-1">
                          <span>{pkg.latestVersion}</span>
                          <Lock className="w-2.5 h-2.5" />
                        </span>
                      ) : (
                        <span className="text-[#4edea3]">{pkg.latestVersion}</span>
                      )}
                    </td>

                    <td className="py-2.5 px-2.5 font-mono">
                      {pkg.locked ? (
                        <span className="text-[#908fa0] flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          <span>{pkg.auditStatus}</span>
                        </span>
                      ) : (
                        <span className="text-[#10B981] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{pkg.auditStatus}</span>
                        </span>
                      )}
                    </td>

                    <td className="py-2.5 px-2.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {pkg.versionStatus === 'Update' ? (
                          <button
                            onClick={() => handleUpdatePackage(pkg.name)}
                            className="px-2.5 py-1 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[10px] font-mono font-medium transition-colors cursor-pointer"
                          >
                            Update
                          </button>
                        ) : pkg.locked ? (
                          <span className="text-[10px] font-mono text-[#908fa0] px-2 py-0.5 rounded bg-[#0D1117] border border-[#21262D]">
                            Locked
                          </span>
                        ) : (
                          <button
                            onClick={() => setSelectedPackageForDetails(pkg)}
                            className="text-[#908fa0] hover:text-[#dfe2ef] px-2 py-0.5 rounded hover:bg-[#0D1117] transition-colors cursor-pointer font-mono text-[10px]"
                          >
                            Details
                          </button>
                        )}

                        <button
                          onClick={() => handleDeletePackage(pkg.name)}
                          className="text-[#908fa0] hover:text-[#F43F5E] p-1 rounded hover:bg-[#0D1117] transition-colors cursor-pointer"
                          title={`Uninstall ${pkg.name}`}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer Actions Strip */}
      <div className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-[#10B981]/20 flex items-center justify-center text-[#10B981] text-[10px]">
            ✓
          </span>
          <div>
            <div className="text-xs font-medium text-[#dfe2ef]">
              Isolated Node Modules Active
            </div>
            <div className="text-[10px] font-mono text-[#4edea3]">
              Zero Global Pollution • C:\Users\Gokul\Projects\CustomerPortal\node_modules
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showNotice('Lockfile verified against sha512 integrity hashes: PASS')}
            className="px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#484F58] text-[#c7c4d7] hover:text-[#dfe2ef] font-mono text-xs cursor-pointer transition-colors"
          >
            Verify Lockfile Integrity
          </button>

          <button
            onClick={() => showNotice('All dependency graph nodes clean of vulnerability reports.')}
            className="px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#484F58] text-[#c7c4d7] hover:text-[#dfe2ef] font-mono text-xs cursor-pointer transition-colors"
          >
            Audit Dependencies
          </button>
        </div>
      </div>

      {/* Custom Dependency Modal */}
      {customDepModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-lg p-5 shadow-2xl space-y-4 text-[#dfe2ef]">
            <div className="flex items-center justify-between border-b border-[#21262D] pb-3">
              <h3 className="text-sm font-semibold">Install Custom Dependency</h3>
              <button
                onClick={() => setCustomDepModalOpen(false)}
                className="text-[#908fa0] hover:text-white text-xs cursor-pointer font-mono"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomDep} className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono text-[#908fa0] mb-1">
                  Package Name (e.g. zod, lodash-es, date-fns)
                </label>
                <input
                  type="text"
                  required
                  placeholder="package-name"
                  value={customDepName}
                  onChange={(e) => setCustomDepName(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] focus:border-[#6366F1] text-xs font-mono text-[#dfe2ef] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#908fa0] mb-1">
                  Target Version or Tag
                </label>
                <input
                  type="text"
                  placeholder="latest or 1.2.3"
                  value={customDepVersion}
                  onChange={(e) => setCustomDepVersion(e.target.value)}
                  className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] focus:border-[#6366F1] text-xs font-mono text-[#dfe2ef] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCustomDepModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-[#0D1117] border border-[#21262D] text-xs text-[#908fa0] hover:text-[#dfe2ef] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-xs font-medium text-white cursor-pointer"
                >
                  Install to Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Package Details Modal */}
      {selectedPackageForDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-[#161B22] border border-[#30363D] rounded-lg p-5 shadow-2xl space-y-4 text-[#dfe2ef]">
            <div className="flex items-center justify-between border-b border-[#21262D] pb-3">
              <div>
                <h3 className="text-sm font-bold font-mono text-[#7bd0ff]">
                  {selectedPackageForDetails.name}
                </h3>
                <div className="text-[10px] font-mono text-[#908fa0]">
                  Type: {selectedPackageForDetails.type}
                </div>
              </div>
              <button
                onClick={() => setSelectedPackageForDetails(null)}
                className="text-[#908fa0] hover:text-white text-xs cursor-pointer font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 rounded bg-[#0D1117] border border-[#21262D]">
                <span className="text-[#908fa0]">Installed Version:</span>
                <span className="text-[#dfe2ef] font-bold">
                  {selectedPackageForDetails.installedVersion}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#0D1117] border border-[#21262D]">
                <span className="text-[#908fa0]">Latest Registry Version:</span>
                <span className="text-[#4edea3] font-bold">
                  {selectedPackageForDetails.latestVersion}
                </span>
              </div>
              <div className="flex justify-between p-2 rounded bg-[#0D1117] border border-[#21262D]">
                <span className="text-[#908fa0]">Security Audit:</span>
                <span className="text-[#10B981] font-bold">
                  {selectedPackageForDetails.auditStatus}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPackageForDetails(null)}
                className="px-4 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-xs font-mono text-[#dfe2ef] hover:bg-[#1C1F29] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
