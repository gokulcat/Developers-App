import React from 'react';
import { Folder, CheckCircle2, Cpu, Check } from 'lucide-react';

interface StatusBarProps {
  currentPath?: string;
  memoryUsage?: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  currentPath = 'C:\\Users\\Gokul\\Projects',
  memoryUsage = '412 MB',
}) => {
  return (
    <footer className="h-6 bg-[#090D16] border-t border-[#21262D] px-3 flex items-center justify-between text-[11px] font-mono text-[#908fa0] select-none shrink-0 z-40">
      {/* Left: Active workspace root & status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors cursor-pointer">
          <Folder className="w-3 h-3 text-[#7bd0ff]" />
          <span>{currentPath}</span>
        </div>
        <span className="text-[#30363D]">|</span>
        <div className="flex items-center gap-1.5 text-[#4edea3]">
          <CheckCircle2 className="w-3 h-3" />
          <span>v2.4 connected</span>
        </div>
      </div>

      {/* Right: Runtime telemetry & readiness */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-[#dfe2ef]">
          <Cpu className="w-3 h-3 text-[#908fa0]" />
          <span>{memoryUsage}</span>
        </div>
        <span className="text-[#30363D]">·</span>
        <div className="hover:text-[#dfe2ef] transition-colors cursor-pointer">
          Node <span className="text-[#7bd0ff]">v22.14</span>
        </div>
        <span className="text-[#30363D]">·</span>
        <div className="hover:text-[#dfe2ef] transition-colors cursor-pointer">
          Python <span className="text-[#7bd0ff]">3.13</span>
        </div>
        <span className="text-[#30363D]">·</span>
        <div className="flex items-center gap-1 text-[#4edea3] font-medium">
          <Check className="w-3 h-3" />
          <span>Ready</span>
        </div>
      </div>
    </footer>
  );
};
