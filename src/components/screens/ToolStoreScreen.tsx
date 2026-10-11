import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
  Shield,
  Layers,
  ArrowRight,
  Database,
  Container,
  Cpu,
  Code2,
  Terminal,
  ExternalLink,
  Package,
  Check,
} from 'lucide-react';
import { StoreToolItem, ProjectInstance } from '../../types';
import { STORE_TOOLS } from '../../data/mockData';

interface ToolStoreScreenProps {
  activeProject: ProjectInstance;
  onDeployToProject: (toolName: string) => void;
}

export const ToolStoreScreen: React.FC<ToolStoreScreenProps> = ({
  activeProject,
  onDeployToProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [tools, setTools] = useState<StoreToolItem[]>(STORE_TOOLS);
  const [installedNotice, setInstalledNotice] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All', count: 48 },
    { id: 'runtimes', label: 'Runtimes & SDKs', count: 14 },
    { id: 'frontend', label: 'Frontend Frameworks', count: 9 },
    { id: 'backend', label: 'Backend & APIs', count: 11 },
    { id: 'databases', label: 'Databases', count: 6 },
    { id: 'devops', label: 'DevOps & Cloud', count: 5 },
    { id: 'testing', label: 'Testing', count: 3 },
  ];

  const handleInstallClick = (toolName: string) => {
    onDeployToProject(toolName);
    setInstalledNotice(`Installed ${toolName} to ${activeProject.name}`);
    setTimeout(() => setInstalledNotice(null), 3000);
  };

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      activeCategory === 'all' || tool.category === activeCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getToolIcon = (iconType: string) => {
    switch (iconType) {
      case 'angular':
        return <span className="font-bold text-xs text-[#F43F5E]">A</span>;
      case 'react':
        return <span className="font-bold text-xs text-[#38BDF8]">⚛</span>;
      case 'python':
        return <span className="font-bold text-xs text-[#F59E0B]">🐍</span>;
      case 'java':
        return <span className="font-bold text-xs text-[#EF4444]">☕</span>;
      case 'node':
        return <span className="font-bold text-xs text-[#10B981]">⬢</span>;
      case 'docker':
        return <Container className="w-3.5 h-3.5 text-[#38BDF8]" />;
      case 'postgres':
        return <Database className="w-3.5 h-3.5 text-[#6366F1]" />;
      case 'terraform':
        return <Layers className="w-3.5 h-3.5 text-[#c0c1ff]" />;
      default:
        return <Code2 className="w-3.5 h-3.5 text-[#7bd0ff]" />;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0A0E17] text-[#dfe2ef]">
      {/* Header & Target Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#21262D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#7bd0ff] uppercase tracking-wider mb-1">
            <span>SANDBOXED TOOLING MARKETPLACE</span>
            <span className="text-[#30363D]">•</span>
            <span className="text-[#4edea3]">Registry Sync: OK</span>
          </div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#dfe2ef]">
            Developer Store & Tool Catalog
          </h1>
          <p className="text-xs text-[#908fa0] mt-0.5 max-w-2xl">
            Discover runtimes, frameworks, databases, and DevOps tools ready for instant sandbox
            installation without polluting your host machine.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="px-3 py-1.5 rounded bg-[#161B22] border border-[#30363D] text-left">
            <div className="text-[9px] font-mono uppercase text-[#908fa0]">
              ACTIVE TARGET
            </div>
            <div className="text-xs font-mono font-medium text-[#4edea3] flex items-center gap-1.5">
              <span>{activeProject.name}</span>
              <span className="text-[10px] text-[#908fa0]">({activeProject.framework.split(' ')[0]})</span>
            </div>
          </div>

          <div className="px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#21262D] text-[11px] font-mono text-[#7bd0ff] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>$ devhub install</span>
          </div>
        </div>
      </div>

      {installedNotice && (
        <div className="p-2.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono text-[#4edea3] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{installedNotice}</span>
        </div>
      )}

      {/* Search Input Bar */}
      <div className="flex items-center px-3 py-2 rounded-lg bg-[#161B22] border border-[#30363D] focus-within:border-[#6366F1] transition-colors">
        <Search className="w-4 h-4 text-[#908fa0] mr-2.5 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search developer tools, languages, runtimes, or CLI packages (e.g., Angular, Python, Docker)..."
          className="w-full bg-transparent text-xs text-[#dfe2ef] placeholder-[#484F58] focus:outline-none font-sans"
        />
        <div className="flex items-center gap-2 shrink-0">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[10px] font-mono text-[#908fa0] hover:text-[#dfe2ef] cursor-pointer"
            >
              Esc to clear
            </button>
          )}
          <kbd className="text-[10px] font-mono bg-[#0D1117] border border-[#30363D] px-1.5 py-0.5 rounded text-[#908fa0]">
            ⌘ F
          </kbd>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1C1F29] text-[#dfe2ef] border border-[#484F58] font-medium shadow-sm'
                  : 'bg-[#161B22] text-[#908fa0] hover:text-[#dfe2ef] border border-[#21262D]'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] font-mono px-1 rounded ${
                  isActive ? 'bg-[#0D1117] text-[#7bd0ff]' : 'text-[#908fa0]'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Featured Hero Banner Card */}
      <div className="relative overflow-hidden p-5 rounded-lg bg-gradient-to-r from-[#161B22] via-[#1A202C] to-[#161B22] border border-[#30363D] shadow-lg">
        {/* Giant subtle watermark outline text */}
        <div className="absolute right-6 -bottom-6 font-mono font-black text-7xl text-[#21262D]/40 pointer-events-none select-none tracking-tighter">
          NODE.JS
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981]">
                <span className="font-mono text-sm">⬢</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#4edea3] border border-[#10B981]/40">
                  LTS VERIFIED
                </span>
                <span className="text-[11px] font-mono text-[#908fa0]">
                  Engine v22.14.0 (Codename Jod)
                </span>
              </div>
            </div>

            <h2 className="text-lg md:text-xl font-bold text-[#dfe2ef] tracking-tight">
              Node.js 22 LTS is now ready for isolated project setups
            </h2>

            <p className="text-xs text-[#c7c4d7] leading-relaxed">
              Includes native ESM support, built-in WebSocket client, V8 12.4 update, and
              microsecond-level cold start sandboxing without npm global symlink drift.
            </p>

            <div className="flex items-center gap-3 text-[11px] font-mono text-[#908fa0] pt-1">
              <span>Sandboxed Footprint ~48.2 MB</span>
              <span>•</span>
              <span className="text-[#4edea3]">Zero Registry Lock</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
            <button className="px-3.5 py-2 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#484F58] text-xs font-medium text-[#dfe2ef] transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Sliders className="w-3.5 h-3.5 text-[#908fa0]" />
              <span>Configure Engine</span>
            </button>

            <button
              onClick={() => handleInstallClick('Node.js 22 LTS')}
              className="px-4 py-2 rounded bg-[#c0c1ff] hover:bg-[#a5a7ff] text-[#0d0096] text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>1-Click Deploy to {activeProject.name}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            className="p-3.5 rounded-lg bg-[#161B22] border border-[#21262D] hover:border-[#384050] transition-colors flex flex-col justify-between space-y-3 group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-[#0D1117] border border-[#30363D] flex items-center justify-center">
                    {getToolIcon(tool.iconType)}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#dfe2ef] group-hover:text-[#c0c1ff] transition-colors">
                      {tool.name}
                    </h3>
                    <div className="text-[10px] font-mono text-[#908fa0]">
                      {tool.version}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-mono text-[#7bd0ff] bg-[#7bd0ff]/10 px-1.5 py-0.5 rounded border border-[#7bd0ff]/20">
                    {tool.categoryLabel}
                  </span>
                  {tool.badgeType && (
                    <span className="text-[8px] font-mono text-[#4edea3]">
                      {tool.badgeType}
                    </span>
                  )}
                </div>
              </div>

              <p className="mt-2 text-[11px] text-[#908fa0] leading-snug line-clamp-2">
                {tool.description}
              </p>

              {/* Specs & Status Badge */}
              <div className="mt-2.5 pt-2 border-t border-[#21262D] flex items-center justify-between text-[10px] font-mono text-[#908fa0]">
                <span>{tool.specsSummary}</span>
                {tool.statusBadge && (
                  <span className="text-[#4edea3] flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{tool.statusBadge}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              {tool.actions.secondary && (
                <button className="flex-1 py-1.5 rounded bg-[#0D1117] border border-[#21262D] hover:border-[#30363D] text-[11px] text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors cursor-pointer text-center">
                  {tool.actions.secondary}
                </button>
              )}

              <button
                onClick={() => handleInstallClick(tool.name)}
                className={`flex-1 py-1.5 rounded text-[11px] font-medium transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                  tool.installed
                    ? 'bg-[#1C1F29] text-[#dfe2ef] border border-[#30363D]'
                    : 'bg-[#6366F1] hover:bg-[#4F46E5] text-white shadow-sm'
                }`}
              >
                {tool.installed ? (
                  <>
                    <Check className="w-3 h-3 text-[#10B981]" />
                    <span>{tool.actions.primary}</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-2.5 h-2.5" />
                    <span>{tool.actions.primary}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom 3 Security Assurance Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div className="p-3 rounded-lg bg-[#161B22] border border-[#21262D] flex items-start gap-3">
          <div className="p-2 rounded bg-[#0D1117] border border-[#30363D] text-[#7bd0ff] shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#dfe2ef]">
              Sandbox Sandboxed Storage
            </div>
            <div className="text-[11px] font-mono text-[#908fa0] mt-0.5">
              Isolated path redirection active: %APPDATA%/DevHub/sandbox
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#161B22] border border-[#21262D] flex items-start gap-3">
          <div className="p-2 rounded bg-[#0D1117] border border-[#30363D] text-[#4edea3] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#dfe2ef]">
              Deterministic Caching
            </div>
            <div className="text-[11px] font-mono text-[#908fa0] mt-0.5">
              Global binary deduplication saved 4.2 GB disk overhead
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-[#161B22] border border-[#21262D] flex items-start gap-3">
          <div className="p-2 rounded bg-[#0D1117] border border-[#30363D] text-[#c0c1ff] shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-semibold text-[#dfe2ef]">
              Zero Host Elevation
            </div>
            <div className="text-[11px] font-mono text-[#908fa0] mt-0.5">
              All catalog packages run without requiring Admin/UAC elevation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
