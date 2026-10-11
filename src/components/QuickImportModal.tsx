import React, { useState } from 'react';
import { GitBranch, FolderGit2, X, Check } from 'lucide-react';
import { ProjectInstance } from '../types';

interface QuickImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (project: ProjectInstance) => void;
}

export const QuickImportModal: React.FC<QuickImportModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [repoUrl, setRepoUrl] = useState('https://github.com/gokul/enterprise-microfrontend.git');
  const [branch, setBranch] = useState('main');
  const [detectStack, setDetectStack] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = repoUrl.split('/').pop()?.replace('.git', '') || 'ImportedProject';
    const newProject: ProjectInstance = {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name: name,
      path: `C:\\Users\\Gokul\\Projects\\${name}`,
      framework: 'React 19',
      runtime: 'Node 22.14 LTS',
      additionalStack: ['TS 5.4', 'Tailwind'],
      status: 'isolated',
      statusLabel: 'Isolated sandbox active',
      ide: 'VS Code',
      primaryAction: 'Run dev',
      secondaryAction: 'Inspect Packages',
      memoryUsage: '140 MB',
    };
    onImport(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-[#161B22] border border-[#30363D] rounded-lg p-5 shadow-2xl space-y-4 text-[#dfe2ef]">
        <div className="flex items-center justify-between border-b border-[#21262D] pb-3">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-[#7bd0ff]" />
            <h3 className="text-sm font-semibold">Quick Import Repository</h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#908fa0] hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[11px] font-mono text-[#908fa0] mb-1">
              Git Repository URL
            </label>
            <input
              type="text"
              required
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] focus:border-[#6366F1] text-xs font-mono text-[#dfe2ef] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono text-[#908fa0] mb-1">
              Branch / Ref
            </label>
            <input
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-1.5 rounded bg-[#0D1117] border border-[#30363D] focus:border-[#6366F1] text-xs font-mono text-[#dfe2ef] focus:outline-none"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-mono text-[#c7c4d7] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={detectStack}
              onChange={(e) => setDetectStack(e.target.checked)}
              className="rounded bg-[#0D1117] border-[#30363D] text-[#6366F1]"
            />
            <span>Auto-detect runtime dependencies & sandbox manifest</span>
          </label>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded bg-[#0D1117] border border-[#21262D] text-xs text-[#908fa0] hover:text-[#dfe2ef] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded bg-[#6366F1] hover:bg-[#4F46E5] text-xs font-medium text-white cursor-pointer shadow-sm"
            >
              Clone & Initialize Sandbox
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
