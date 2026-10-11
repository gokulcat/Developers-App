import React from 'react';
import { Command, Search, User } from 'lucide-react';

interface TitleBarProps {
  onOpenCommandPalette: () => void;
  onOpenUserProfile?: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  onOpenCommandPalette,
  onOpenUserProfile,
}) => {
  return (
    <header className="h-10 bg-[#090D16] border-b border-[#21262D] px-3 flex items-center justify-between text-xs select-none shrink-0 z-40">
      {/* Left: Window controls and title */}
      <div className="flex items-center gap-3">
        {/* macOS traffic lights */}
        <div className="flex items-center gap-1.5 pr-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50 cursor-pointer hover:opacity-80 transition-opacity" title="Close" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50 cursor-pointer hover:opacity-80 transition-opacity" title="Minimize" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50 cursor-pointer hover:opacity-80 transition-opacity" title="Maximize" />
        </div>

        <div className="flex items-center gap-2 text-[#908fa0]">
          <span className="font-mono text-[11px] text-[#7bd0ff]">v2.4.0</span>
          <span className="text-[#30363D]">|</span>
          <span className="font-medium text-[#dfe2ef] tracking-tight">DevHub — Developer Environment Studio</span>
        </div>
      </div>

      {/* Right: Quick Command trigger & User Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#161B22] border border-[#30363D] hover:border-[#484F58] hover:bg-[#1F242C] text-[#c7c4d7] hover:text-[#dfe2ef] transition-colors group cursor-pointer"
          title="Open Command Palette (⌘K)"
        >
          <Search className="w-3 h-3 text-[#908fa0] group-hover:text-[#7bd0ff] transition-colors" />
          <span className="font-mono text-[11px]">Run Command</span>
          <kbd className="font-mono text-[10px] bg-[#0D1117] px-1.5 py-0.5 rounded border border-[#30363D] text-[#908fa0]">
            ⌘ K
          </kbd>
        </button>

        {/* User avatar */}
        <div
          onClick={onOpenUserProfile}
          className="flex items-center gap-2 cursor-pointer group"
          title="Gokul R. (Pro Developer)"
        >
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-[#262A34] border border-[#30363D] overflow-hidden flex items-center justify-center text-[10px] font-semibold text-[#dfe2ef] group-hover:border-[#7bd0ff] transition-colors">
              <span className="bg-gradient-to-tr from-[#6366F1] to-[#38BDF8] w-full h-full flex items-center justify-center text-[9px] text-white font-mono">
                GR
              </span>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] border border-[#090D16]" />
          </div>
        </div>
      </div>
    </header>
  );
};
