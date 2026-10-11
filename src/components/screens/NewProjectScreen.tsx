import React, { useState } from 'react';
import {
  Folder,
  Copy,
  Check,
  GitBranch,
  Sliders,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Shield,
  Zap,
  Box,
  FileCode,
  FolderOpen,
} from 'lucide-react';
import { ProjectInstance } from '../../types';

interface NewProjectScreenProps {
  onCreateProjectTriggered: (newProject: ProjectInstance) => void;
}

export const NewProjectScreen: React.FC<NewProjectScreenProps> = ({
  onCreateProjectTriggered,
}) => {
  const [projectName, setProjectName] = useState('MyAngularApp');
  const [parentDir, setParentDir] = useState('C:\\Users\\Gokul\\Projects\\');
  const [initGit, setInitGit] = useState(true);
  const [selectedStack, setSelectedStack] = useState<'angular' | 'react' | 'node' | 'python' | 'java' | 'spring' | 'dotnet' | 'flutter'>('angular');
  const [copiedPath, setCopiedPath] = useState(false);
  const [sandboxMode, setSandboxMode] = useState(true);

  // Scaffolding options
  const [eslintPrettier, setEslintPrettier] = useState(true);
  const [tailwindCss, setTailwindCss] = useState(true);
  const [vscodeExt, setVscodeExt] = useState(true);
  const [dockerContainer, setDockerContainer] = useState(false);

  const fullPath = `${parentDir}${projectName}\\`;

  const handleCopyPath = () => {
    navigator.clipboard?.writeText(fullPath);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  const handleCreateProject = () => {
    const newProj: ProjectInstance = {
      id: projectName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: projectName,
      path: fullPath,
      framework: selectedStack === 'angular' ? 'Angular 20.1' : selectedStack.toUpperCase(),
      runtime: 'Node 22.14 LTS',
      additionalStack: [tailwindCss ? 'Tailwind' : '', 'TS 5.4'].filter(Boolean),
      status: 'isolated',
      statusLabel: 'Isolated sandbox active',
      ide: 'VS Code',
      primaryAction: 'Run dev',
      secondaryAction: 'Terminal',
      memoryUsage: '112 MB',
    };
    onCreateProjectTriggered(newProj);
  };

  const stacks = [
    { id: 'angular', name: 'Angular', version: 'v20 LTS', color: '#F43F5E' },
    { id: 'react', name: 'React', version: 'v19.1', color: '#38BDF8' },
    { id: 'node', name: 'Node.js', version: 'v22.x', color: '#10B981' },
    { id: 'python', name: 'Python', version: 'v3.13', color: '#F59E0B' },
    { id: 'java', name: 'Java', version: 'JDK 21', color: '#EF4444' },
    { id: 'spring', name: 'Spring Boot', version: 'v3.3.4', color: '#10B981' },
    { id: 'dotnet', name: '.NET Core', version: 'v9.0', color: '#818CF8' },
    { id: 'flutter', name: 'Flutter', version: 'v3.27', color: '#38BDF8' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#0A0E17] text-[#dfe2ef]">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#21262D] pb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#7bd0ff] uppercase tracking-wider mb-1">
            <span>PROVISIONING STUDIO</span>
            <span className="text-[#30363D]">/</span>
            <span className="text-[#4edea3]">ENV_MATRIX_OK</span>
          </div>
          <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-[#dfe2ef]">
            Create New Project
          </h1>
          <p className="text-xs text-[#908fa0] mt-0.5">
            Configure project workspace and auto-resolve isolated runtime dependencies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSandboxMode(!sandboxMode)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs border transition-colors cursor-pointer ${
              sandboxMode
                ? 'bg-[#10B981]/15 text-[#4edea3] border-[#10B981]/30'
                : 'bg-[#161B22] text-[#908fa0] border-[#30363D]'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${sandboxMode ? 'bg-[#10B981]' : 'bg-[#908fa0]'}`} />
            <span>Virtual Sandbox Mode</span>
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#161B22] border border-[#30363D] hover:border-[#484F58] text-xs text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors cursor-pointer">
            <Sliders className="w-3.5 h-3.5 text-[#908fa0]" />
            <span>Presets</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Form & Configuration */}
        <div className="lg:col-span-7 space-y-4">
          {/* Section 01: Target Workspace & Directory */}
          <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#6366F1]/20 text-[#c0c1ff] flex items-center justify-center font-mono text-[10px] font-bold">
                  01
                </span>
                <span className="text-xs font-semibold text-[#dfe2ef]">
                  Target Workspace & Directory
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#908fa0]">Isolated fs_v2</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-[#c7c4d7] mb-1">
                  Project Name *
                </label>
                <div className="flex items-center px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#30363D] focus-within:border-[#6366F1]">
                  <Box className="w-3.5 h-3.5 text-[#908fa0] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-transparent text-xs text-[#dfe2ef] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#c7c4d7] mb-1">
                  Parent Directory
                </label>
                <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#30363D]">
                  <span className="text-xs font-mono text-[#dfe2ef] truncate mr-2">
                    {parentDir}
                  </span>
                  <button className="flex items-center gap-1 text-[10px] font-mono text-[#7bd0ff] hover:text-white shrink-0 cursor-pointer">
                    <FolderOpen className="w-3 h-3" />
                    <span>Browse</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Full Path display */}
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#21262D] text-[11px] font-mono">
              <div className="flex items-center gap-2 text-[#908fa0] truncate">
                <Folder className="w-3.5 h-3.5 text-[#7bd0ff] shrink-0" />
                <span className="text-[#dfe2ef] truncate">Full Path: {fullPath}</span>
              </div>
              <button
                onClick={handleCopyPath}
                className="text-[#908fa0] hover:text-[#dfe2ef] p-1 rounded hover:bg-[#161B22] transition-colors shrink-0 cursor-pointer"
                title="Copy full path"
              >
                {copiedPath ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Init Git Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={initGit}
                onChange={(e) => setInitGit(e.target.checked)}
                className="mt-0.5 rounded border-[#30363D] text-[#6366F1] focus:ring-0 bg-[#0D1117]"
              />
              <div>
                <div className="text-xs font-medium text-[#dfe2ef] flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Initialize Git repository</span>
                </div>
                <div className="text-[11px] text-[#908fa0]">
                  Automates initial commit with tailored .gitignore template
                </div>
              </div>
            </label>
          </div>

          {/* Section 02: Technology Stack & Engine */}
          <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#6366F1]/20 text-[#c0c1ff] flex items-center justify-center font-mono text-[10px] font-bold">
                  02
                </span>
                <span className="text-xs font-semibold text-[#dfe2ef]">
                  Technology Stack & Engine
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#4edea3] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/25 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Dynamic Solver Active
              </span>
            </div>

            {/* Stack Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {stacks.map((stk) => (
                <button
                  key={stk.id}
                  onClick={() => setSelectedStack(stk.id as any)}
                  className={`p-2.5 rounded text-left transition-colors cursor-pointer border ${
                    selectedStack === stk.id
                      ? 'bg-[#1F242C] border-[#6366F1] shadow-sm'
                      : 'bg-[#0D1117] border-[#21262D] hover:border-[#384050]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: stk.color }} />
                    <span className="text-[9px] font-mono text-[#908fa0]">{stk.version}</span>
                  </div>
                  <div className="text-xs font-semibold text-[#dfe2ef]">{stk.name}</div>
                </button>
              ))}
            </div>

            {/* Framework Version dropdown */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-medium text-[#c7c4d7] mb-1">
                <span>Framework Version Target</span>
                <span className="text-[10px] font-mono text-[#4edea3]">v20.1.3 Stable Core</span>
              </div>
              <select className="w-full px-2.5 py-1.5 rounded bg-[#0D1117] border border-[#30363D] text-xs font-mono text-[#dfe2ef] focus:outline-none focus:border-[#6366F1] cursor-pointer">
                <option>Angular 20.x (Latest LTS - Recommended)</option>
                <option>Angular 19.2.x (Current)</option>
                <option>Angular 18.2.x (Previous LTS)</option>
              </select>
            </div>

            {/* Dependency Matrix Resolution Box */}
            <div className="p-3 rounded bg-[#0D1117] border border-[#21262D] space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
                <span>DEPENDENCY MATRIX RESOLUTION</span>
                <span className="text-[#7bd0ff] flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Auto-Locked
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono">
                <div className="p-2 rounded bg-[#161B22] border border-[#21262D]">
                  <div className="flex items-center justify-between text-[10px] text-[#908fa0]">
                    <span>Node.js</span>
                    <span className="text-[#4edea3]">Recommended</span>
                  </div>
                  <div className="font-semibold text-[#dfe2ef] mt-0.5">22.14.0 LTS</div>
                </div>

                <div className="p-2 rounded bg-[#161B22] border border-[#21262D]">
                  <div className="flex items-center justify-between text-[10px] text-[#908fa0]">
                    <span>npm Package Mgr</span>
                    <span className="text-[#7bd0ff]">Bundled</span>
                  </div>
                  <div className="font-semibold text-[#dfe2ef] mt-0.5">10.9.2 (Compatible)</div>
                </div>

                <div className="p-2 rounded bg-[#161B22] border border-[#21262D]">
                  <div className="flex items-center justify-between text-[10px] text-[#908fa0]">
                    <span>Angular CLI</span>
                    <span className="text-[#c0c1ff]">Matched</span>
                  </div>
                  <div className="font-semibold text-[#dfe2ef] mt-0.5">20.0.x (Compatible)</div>
                </div>

                <div className="p-2 rounded bg-[#161B22] border border-[#21262D]">
                  <div className="flex items-center justify-between text-[10px] text-[#908fa0]">
                    <span>TypeScript</span>
                    <span className="text-[#F59E0B]">Auto-pinned</span>
                  </div>
                  <div className="font-semibold text-[#dfe2ef] mt-0.5">5.4.x (Strict TypeCheck)</div>
                </div>

                <div className="p-2 rounded bg-[#161B22] border border-[#21262D]">
                  <div className="flex items-center justify-between text-[10px] text-[#908fa0]">
                    <span>RxJS</span>
                    <span className="text-[#7bd0ff]">Reactive</span>
                  </div>
                  <div className="font-semibold text-[#dfe2ef] mt-0.5">7.8.x (Compatible)</div>
                </div>

                <div className="p-2 rounded bg-[#161B22] border border-[#21262D]">
                  <div className="flex items-center justify-between text-[10px] text-[#908fa0]">
                    <span>Reactivity Model</span>
                    <span className="text-[#4edea3]">New</span>
                  </div>
                  <div className="font-semibold text-[#dfe2ef] mt-0.5">Zoneless Signals (Exp)</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-[#4edea3] bg-[#10B981]/10 px-2.5 py-1.5 rounded border border-[#10B981]/25">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>All version dependencies resolved with zero conflicts</span>
              </div>
            </div>
          </div>

          {/* Section 03: Developer Tooling & Integrations */}
          <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#6366F1]/20 text-[#c0c1ff] flex items-center justify-center font-mono text-[10px] font-bold">
                  03
                </span>
                <span className="text-xs font-semibold text-[#dfe2ef]">
                  Developer Tooling & Integrations
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#908fa0]">Optional Scaffolding</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <label className="flex items-start gap-2.5 p-2 rounded bg-[#0D1117] border border-[#21262D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={eslintPrettier}
                  onChange={(e) => setEslintPrettier(e.target.checked)}
                  className="mt-0.5 rounded border-[#30363D] text-[#6366F1] bg-[#161B22]"
                />
                <div>
                  <div className="font-medium text-[#dfe2ef]">ESLint & Prettier config</div>
                  <div className="text-[11px] text-[#908fa0]">
                    Preconfigured angular-eslint rules with format-on-save
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded bg-[#0D1117] border border-[#21262D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={tailwindCss}
                  onChange={(e) => setTailwindCss(e.target.checked)}
                  className="mt-0.5 rounded border-[#30363D] text-[#6366F1] bg-[#161B22]"
                />
                <div>
                  <div className="font-medium text-[#dfe2ef]">Tailwind CSS v4 setup</div>
                  <div className="text-[11px] text-[#908fa0]">
                    Modern engine integration with PostCSS & autoprefixer
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded bg-[#0D1117] border border-[#21262D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={vscodeExt}
                  onChange={(e) => setVscodeExt(e.target.checked)}
                  className="mt-0.5 rounded border-[#30363D] text-[#6366F1] bg-[#161B22]"
                />
                <div>
                  <div className="font-medium text-[#dfe2ef]">VS Code & Extensions (.vscode/)</div>
                  <div className="text-[11px] text-[#908fa0]">
                    Includes Angular Language Service and debugger launches
                  </div>
                </div>
              </label>

              <label className="flex items-start gap-2.5 p-2 rounded bg-[#0D1117] border border-[#21262D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={dockerContainer}
                  onChange={(e) => setDockerContainer(e.target.checked)}
                  className="mt-0.5 rounded border-[#30363D] text-[#6366F1] bg-[#161B22]"
                />
                <div>
                  <div className="font-medium text-[#dfe2ef]">Docker Containerization</div>
                  <div className="text-[11px] text-[#908fa0]">
                    Multi-stage alpine Dockerfile and compose.dev.yml
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Dependency Graph */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#7bd0ff]" />
                <span className="text-xs font-semibold text-[#dfe2ef]">
                  Real-Time Dependency Graph
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#7bd0ff] bg-[#7bd0ff]/10 px-2 py-0.5 rounded border border-[#7bd0ff]/20">
                LIVE PREVIEW
              </span>
            </div>

            {/* Execution chain topology diagram */}
            <div className="p-3 rounded bg-[#0D1117] border border-[#21262D] space-y-2">
              <div className="text-[10px] font-mono text-[#908fa0] uppercase tracking-wider">
                EXECUTION CHAIN TOPOLOGY
              </div>

              <div className="space-y-2 py-1 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-[#F43F5E]/15 text-[#f87171] border border-[#F43F5E]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F43F5E]" />
                    <span>Angular 20.x</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#908fa0]" />
                  <div className="px-2 py-1 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    <span>Node 22.14</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#908fa0]" />
                  <div className="px-2 py-1 rounded bg-[#38BDF8]/15 text-[#7bd0ff] border border-[#38BDF8]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]" />
                    <span>npm 10.9</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-6">
                  <span className="text-[#908fa0]">└──</span>
                  <div className="px-2 py-1 rounded bg-[#161B22] text-[#dfe2ef] border border-[#30363D]">
                    CLI 20.x
                  </div>
                  <ArrowRight className="w-3 h-3 text-[#908fa0]" />
                  <div className="px-2 py-1 rounded bg-[#6366F1]/15 text-[#c0c1ff] border border-[#6366F1]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1]" />
                    <span>TS 5.4.x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Target Directory Layout Preview */}
            <div className="p-3 rounded bg-[#0D1117] border border-[#21262D] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#908fa0]">
                <span>Target Directory Layout</span>
                <span>8 files scheduled</span>
              </div>

              <div className="font-mono text-[11px] text-[#c7c4d7] space-y-1">
                <div className="flex items-center gap-1.5 text-[#dfe2ef] font-medium">
                  <Folder className="w-3.5 h-3.5 text-[#7bd0ff]" />
                  <span>{projectName}/</span>
                </div>
                <div className="pl-4 text-[#908fa0]">
                  ├─ <span className="text-[#c7c4d7]">.vscode/</span> (settings, launch, ext)
                </div>
                <div className="pl-4 text-[#908fa0]">
                  ├─ <span className="text-[#c7c4d7]">src/</span>
                </div>
                <div className="pl-8 text-[#908fa0]">
                  ├─ <span className="text-[#c7c4d7]">app/</span> (app.component.ts)
                </div>
                <div className="pl-8 text-[#908fa0]">
                  └─ <span className="text-[#7bd0ff]">main.ts</span>
                </div>
                <div className="pl-4 text-[#908fa0]">
                  ├─ <span className="text-[#dfe2ef]">angular.json</span>
                </div>
                <div className="pl-4 text-[#908fa0]">
                  ├─ <span className="text-[#dfe2ef]">package.json</span>
                </div>
                <div className="pl-4 text-[#908fa0]">
                  ├─ <span className="text-[#dfe2ef]">tsconfig.json</span>
                </div>
                <div className="pl-4 text-[#908fa0]">
                  └─ <span className="text-[#908fa0]">.gitignore</span>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-[#0D1117] border border-[#21262D]">
                <div className="text-[10px] text-[#908fa0]">Est. Download Size</div>
                <div className="text-sm font-bold text-[#dfe2ef] mt-0.5">~184 MB</div>
                <div className="text-[10px] text-[#4edea3] mt-0.5">
                  92% Cached in Local Registry
                </div>
              </div>

              <div className="p-2.5 rounded bg-[#0D1117] border border-[#21262D]">
                <div className="text-[10px] text-[#908fa0]">Est. Setup Time</div>
                <div className="text-sm font-bold text-[#dfe2ef] mt-0.5">~35 seconds</div>
                <div className="text-[10px] text-[#7bd0ff] mt-0.5">
                  Isolated Worker Thread
                </div>
              </div>
            </div>

            {/* Runtime Memory Overhead with radial progress */}
            <div className="flex items-center justify-between p-3 rounded bg-[#0D1117] border border-[#21262D]">
              <div>
                <div className="text-[10px] font-mono text-[#908fa0]">
                  Runtime Memory Overhead
                </div>
                <div className="text-xs font-semibold text-[#dfe2ef] mt-0.5">
                  112 MB Virtual Allocation
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-r-transparent border-[#4edea3] rotate-45 flex items-center justify-center">
                <span className="text-[9px] font-mono text-[#4edea3] -rotate-45">✓</span>
              </div>
            </div>

            {/* Banner illustration */}
            <div className="p-3 rounded bg-gradient-to-r from-[#161B22] to-[#1F242C] border border-[#30363D] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4edea3]">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                <span>DevHub Runtime Sandbox Ready</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleCreateProject}
              className="w-full py-2.5 rounded-lg bg-[#c0c1ff] hover:bg-[#a5a7ff] text-[#0d0096] font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Create Project & Install Environment</span>
            </button>
            <div className="text-[10px] text-center text-[#908fa0] flex items-center justify-center gap-1 font-mono">
              <Shield className="w-3 h-3 text-[#10B981]" />
              <span>Automated provisioning in isolated project directory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
