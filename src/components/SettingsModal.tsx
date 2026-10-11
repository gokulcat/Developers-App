import React from 'react';
import { X, User, Shield, Terminal, HardDrive, Check } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-[#161B22] border border-[#30363D] rounded-lg p-5 shadow-2xl space-y-4 text-[#dfe2ef]">
        <div className="flex items-center justify-between border-b border-[#21262D] pb-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-[#7bd0ff]" />
            <h3 className="text-sm font-semibold">DevHub Studio Preferences</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#908fa0] hover:text-white cursor-pointer font-mono"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-3.5 rounded bg-[#0D1117] border border-[#21262D] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#6366F1] to-[#38BDF8] flex items-center justify-center text-sm font-mono font-bold text-white shadow-inner">
            GR
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#dfe2ef]">Gokul R.</div>
            <div className="text-xs font-mono text-[#4edea3]">Pro Developer • Workstation License Active</div>
            <div className="text-[11px] font-mono text-[#908fa0] truncate">gokulcat15@gmail.com</div>
          </div>
        </div>

        {/* Configurations */}
        <div className="space-y-2.5 text-xs font-mono">
          <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1117] border border-[#21262D]">
            <div>
              <div className="text-[#dfe2ef]">Sandbox Directory Base</div>
              <div className="text-[10px] text-[#908fa0]">%APPDATA%/DevHub/sandbox</div>
            </div>
            <span className="text-[#10B981] text-[10px]">Active</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1117] border border-[#21262D]">
            <div>
              <div className="text-[#dfe2ef]">Global PATH Pollution Protection</div>
              <div className="text-[10px] text-[#908fa0]">Symlinks isolated within project .devhub/bin</div>
            </div>
            <span className="text-[#10B981] text-[10px]">Strict</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded bg-[#0D1117] border border-[#21262D]">
            <div>
              <div className="text-[#dfe2ef]">Keyboard Accelerators</div>
              <div className="text-[10px] text-[#908fa0]">Raycast/Linear style command palette navigation</div>
            </div>
            <span className="text-[#7bd0ff] text-[10px]">Enabled</span>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-xs font-medium text-white cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
