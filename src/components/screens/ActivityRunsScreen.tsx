import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Cpu,
  Archive,
  CheckCircle2,
  Check,
  RotateCw,
  FolderOpen,
  Package,
  HardDrive,
  Shield,
  Download,
  Terminal,
  Play,
  Pause,
} from 'lucide-react';
import { ProjectInstance, PipelineStep, TerminalLogLine } from '../../types';
import { PIPELINE_STEPS, TERMINAL_LOGS } from '../../data/mockData';

interface ActivityRunsScreenProps {
  activeProject: ProjectInstance;
  onOpenFolder?: () => void;
  onOpenPackageManager?: () => void;
}

export const ActivityRunsScreen: React.FC<ActivityRunsScreenProps> = ({
  activeProject,
  onOpenFolder,
  onOpenPackageManager,
}) => {
  const [steps, setSteps] = useState<PipelineStep[]>(PIPELINE_STEPS);
  const [logs, setLogs] = useState<TerminalLogLine[]>(TERMINAL_LOGS);
  const [autoScroll, setAutoScroll] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(8);
  const [notification, setNotification] = useState<string | null>(null);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll]);

  const handleRerun = () => {
    setIsRunning(true);
    setLogs([]);
    setCurrentStepIndex(0);

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < PIPELINE_STEPS.length) {
        setCurrentStepIndex(stepIdx);
        // Add log lines corresponding to this step
        const logLinesToAdd = TERMINAL_LOGS.slice(stepIdx * 1, (stepIdx + 1) * 2);
        setLogs((prev) => [...prev, ...logLinesToAdd]);
        stepIdx++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setCurrentStepIndex(8);
        setLogs(TERMINAL_LOGS);
        setNotification('Provisioning and health checks verified successfully!');
        setTimeout(() => setNotification(null), 3000);
      }
    }, 600);
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'INFO':
        return 'text-[#38BDF8] bg-[#38BDF8]/10 border-[#38BDF8]/30';
      case 'SYS':
        return 'text-[#908fa0] bg-[#161B22] border-[#30363D]';
      case 'FETCH':
        return 'text-[#c0c1ff] bg-[#6366F1]/10 border-[#6366F1]/30';
      case 'VERIFY':
        return 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/30';
      case 'UNPACK':
        return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      case 'ISOLATE':
        return 'text-[#4edea3] bg-[#10B981]/15 border-[#10B981]/30';
      case 'NPM-LCL':
        return 'text-[#7bd0ff] bg-[#7bd0ff]/10 border-[#7bd0ff]/30';
      case 'EXEC':
        return 'text-[#dfe2ef] bg-[#1F242C] border-[#484F58]';
      case 'SCAFF':
        return 'text-[#c7c4d7] bg-[#161B22] border-[#30363D]';
      case 'NPM':
        return 'text-[#10B981] bg-[#10B981]/15 border-[#10B981]/30';
      case 'HEALTH':
        return 'text-[#4edea3] bg-[#10B981]/20 border-[#10B981]/40';
      case 'TEST':
        return 'text-[#7bd0ff] bg-[#38BDF8]/15 border-[#38BDF8]/30';
      case 'READY':
        return 'text-[#10B981] bg-[#10B981]/25 border-[#10B981]/50 font-bold';
      default:
        return 'text-[#908fa0] bg-[#161B22] border-[#30363D]';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#0A0E17] text-[#dfe2ef]">
      {/* Top Header & Telemetry Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#21262D] pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#dfe2ef]">
              Setting Up: {activeProject.name}
            </h1>
            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
              • Isolated Sandbox Active
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#908fa0]">
            <span className="px-1.5 py-0.5 rounded bg-[#161B22] border border-[#30363D] text-[#dfe2ef]">
              Angular 20.0.x LTS
            </span>
            <span className="truncate">{activeProject.path}</span>
            <span className="text-[#30363D]">|</span>
            <span>PID: 19842</span>
          </div>
        </div>

        {/* Telemetry chips on top right */}
        <div className="flex items-center gap-2.5 shrink-0 text-xs font-mono">
          <div className="px-3 py-1.5 rounded bg-[#161B22] border border-[#21262D] flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#7bd0ff]" />
            <div>
              <div className="text-[9px] text-[#908fa0]">ELAPSED</div>
              <div className="text-[#dfe2ef] font-bold">00:34.8s (Done)</div>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded bg-[#161B22] border border-[#21262D] flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[#c0c1ff]" />
            <div>
              <div className="text-[9px] text-[#908fa0]">HEAP PEAK</div>
              <div className="text-[#dfe2ef] font-bold">312.4 MB</div>
            </div>
          </div>

          <div className="px-3 py-1.5 rounded bg-[#161B22] border border-[#21262D] flex items-center gap-2">
            <Archive className="w-3.5 h-3.5 text-[#4edea3]" />
            <div>
              <div className="text-[9px] text-[#908fa0]">CACHED ASSETS</div>
              <div className="text-[#4edea3] font-bold">100% Verified</div>
            </div>
          </div>

          <button
            onClick={handleRerun}
            disabled={isRunning}
            className="p-2 rounded bg-[#161B22] border border-[#30363D] hover:border-[#484F58] hover:bg-[#1C1F29] text-[#7bd0ff] transition-colors cursor-pointer"
            title="Re-run provisioning pipeline simulation"
          >
            <RotateCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-2.5 rounded bg-[#10B981]/15 border border-[#10B981]/30 text-xs font-mono text-[#4edea3] flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Progress Bar Strip */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[#dfe2ef] font-semibold">
            Step {currentStepIndex + 1} of 9 Completed
            <span className="text-[#908fa0] font-normal ml-2">
              • Finalizing Health Checks & Dependency Trees
            </span>
          </span>
          <span className="text-[#4edea3] font-bold">
            {Math.round(((currentStepIndex + 1) / 9) * 100)}%
          </span>
        </div>

        <div className="w-full h-1.5 bg-[#161B22] rounded-full overflow-hidden border border-[#21262D]">
          <div
            className="h-full bg-gradient-to-r from-[#10B981] via-[#38BDF8] to-[#4edea3] transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / 9) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Split: Provisioning Pipeline (Left) & Terminal Output (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Provisioning Pipeline Steps */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#dfe2ef]">
                  Provisioning Pipeline
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#908fa0] bg-[#0D1117] px-2 py-0.5 rounded border border-[#21262D]">
                Deterministic Engine
              </span>
            </div>

            {/* Pipeline Stage Pills */}
            <div className="flex items-center gap-1 text-[10px] font-mono">
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
                DET ✓
              </span>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
                DL ✓
              </span>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
                VRF ✓
              </span>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
                INS ✓
              </span>
              <span className="px-2 py-0.5 rounded bg-[#10B981]/15 text-[#4edea3] border border-[#10B981]/30">
                CFG ✓
              </span>
              <span className="px-2 py-0.5 rounded bg-[#7bd0ff]/15 text-[#7bd0ff] border border-[#7bd0ff]/30">
                TEST ↺
              </span>
            </div>

            {/* List of 9 Pipeline Steps */}
            <div className="space-y-1.5 pt-1">
              {steps.map((step, idx) => {
                const isStepCompleted = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex && isRunning;
                return (
                  <div
                    key={step.id}
                    className={`p-2.5 rounded transition-colors flex items-start justify-between gap-3 text-xs ${
                      isCurrent
                        ? 'bg-[#1F242C] border border-[#6366F1]'
                        : isStepCompleted
                        ? 'bg-[#0D1117] border border-[#21262D]'
                        : 'bg-[#0D1117]/50 border border-transparent opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <div className="mt-0.5 shrink-0">
                        {isCurrent ? (
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-r-transparent border-[#6366F1] animate-spin" />
                        ) : isStepCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-[#484F58]" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-[#dfe2ef] truncate">
                          {step.title}
                        </div>
                        <div className="text-[11px] text-[#908fa0] truncate">
                          {step.description}
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-[#4edea3] shrink-0">
                      {step.duration}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Sandbox Manifest Snapshot */}
            <div className="p-3 rounded bg-[#0D1117] border border-[#21262D] space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#908fa0]">
                <span>SANDBOX MANIFEST SNAPSHOT</span>
                <span className="text-[#7bd0ff]">devhub.sandbox.json</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>Node.js: <strong className="text-[#dfe2ef]">v22.14.0</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>npm: <strong className="text-[#dfe2ef]">v10.9.2</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>NG CLI: <strong className="text-[#dfe2ef]">v20.0.1</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#c7c4d7]">
                  <Check className="w-3 h-3 text-[#10B981]" />
                  <span>TypeScript: <strong className="text-[#dfe2ef]">v5.7.2</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Terminal Runner Output */}
        <div className="lg:col-span-7 space-y-3 flex flex-col">
          <div className="rounded-lg bg-[#0D1117] border border-[#21262D] overflow-hidden flex flex-col flex-1">
            {/* Terminal Header */}
            <div className="px-3.5 py-2 bg-[#161B22] border-b border-[#21262D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#7bd0ff]" />
                <span className="font-mono text-[11px] text-[#dfe2ef]">
                  {activeProject.name} ~ devhub-runner:stdout
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] font-mono text-[#908fa0]">
                <span className="px-1.5 py-0.5 rounded bg-[#0D1117] border border-[#21262D]">
                  BASH
                </span>
                <button
                  onClick={() => {
                    const text = logs.map((l) => `${l.timestamp} [${l.tag}] ${l.text}`).join('\n');
                    const blob = new Blob([text], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${activeProject.id}-provision.log`;
                    a.click();
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                  title="Download Raw Log"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setAutoScroll(!autoScroll)}
                  className={`hover:text-white transition-colors cursor-pointer ${
                    autoScroll ? 'text-[#4edea3]' : 'text-[#908fa0]'
                  }`}
                  title="Toggle Auto Scroll"
                >
                  Auto-Scroll
                </button>
                <span>UTF-8</span>
              </div>
            </div>

            {/* Terminal Log Lines */}
            <div className="p-3.5 font-mono text-[11px] leading-relaxed max-h-[460px] min-h-[380px] overflow-y-auto space-y-1 bg-[#090D16]">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-2 hover:bg-[#161B22]/50 px-1 py-0.5 rounded">
                  <span className="text-[#908fa0] shrink-0 select-none">{log.timestamp}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded border text-[10px] shrink-0 font-medium ${getTagColor(
                      log.tag
                    )}`}
                  >
                    {log.tag}
                  </span>
                  <span className="text-[#c7c4d7] break-all">
                    {log.text}
                  </span>
                </div>
              ))}

              {/* Blinking prompt line */}
              <div className="flex items-center gap-2 pt-1 text-[#4edea3]">
                <span className="font-bold">&gt;</span>
                <span className="w-2 h-4 bg-[#10B981] animate-pulse inline-block" />
              </div>

              <div ref={terminalEndRef} />
            </div>

            {/* Telemetry Footer */}
            <div className="px-3.5 py-2 bg-[#161B22] border-t border-[#21262D] flex items-center justify-between text-[11px] font-mono text-[#908fa0]">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-[#7bd0ff]" />
                  <span>CPU THREADS <strong className="text-[#dfe2ef]">8 Active (14%)</strong></span>
                </div>

                <div className="flex items-center gap-1.5">
                  <HardDrive className="w-3 h-3 text-[#10B981]" />
                  <span>DISK I/O <strong className="text-[#dfe2ef]">184 MB/s Write</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[#4edea3]">
                <Shield className="w-3 h-3" />
                <span>SANDBOX STATUS: Clean (Zero Leaks)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Environment Active Banner */}
      <div className="p-4 rounded-lg bg-[#161B22] border border-[#21262D] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] shrink-0">
            <Check className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#dfe2ef]">
                Environment active and fully isolated!
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#4edea3] border border-[#10B981]/40">
                HEALTHY
              </span>
            </div>
            <div className="text-[11px] text-[#908fa0] mt-0.5">
              All sandboxed dependencies, Node 22 runtime, and Angular 20 libraries configured without host conflicts.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenFolder}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#0D1117] border border-[#30363D] hover:border-[#484F58] hover:bg-[#1C1F29] text-xs font-mono text-[#dfe2ef] transition-colors cursor-pointer"
          >
            <FolderOpen className="w-3.5 h-3.5 text-[#7bd0ff]" />
            <span>Open Folder</span>
          </button>

          <button
            onClick={onOpenPackageManager}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-xs font-medium text-white transition-colors cursor-pointer shadow-sm"
          >
            <Package className="w-3.5 h-3.5" />
            <span>Package Manager</span>
          </button>
        </div>
      </div>
    </div>
  );
};
