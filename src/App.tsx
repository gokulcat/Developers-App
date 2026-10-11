/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenType, ProjectInstance } from './types';
import { INITIAL_PROJECTS } from './data/mockData';
import { TitleBar } from './components/TitleBar';
import { Sidebar } from './components/Sidebar';
import { StatusBar } from './components/StatusBar';
import { CommandPalette } from './components/CommandPalette';
import { QuickImportModal } from './components/QuickImportModal';
import { SettingsModal } from './components/SettingsModal';

import { DashboardScreen } from './components/screens/DashboardScreen';
import { NewProjectScreen } from './components/screens/NewProjectScreen';
import { ToolStoreScreen } from './components/screens/ToolStoreScreen';
import { PackagesScreen } from './components/screens/PackagesScreen';
import { ActivityRunsScreen } from './components/screens/ActivityRunsScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('new-project');
  const [projects, setProjects] = useState<ProjectInstance[]>(INITIAL_PROJECTS);
  const [activeProject, setActiveProject] = useState<ProjectInstance>(INITIAL_PROJECTS[0]);

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [quickImportOpen, setQuickImportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmdOrCtrl = e.metaKey || e.ctrlKey;

      if (isCmdOrCtrl && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'i') {
        e.preventDefault();
        setQuickImportOpen(true);
      } else if (isCmdOrCtrl && (e.key === '1' || e.key.toLowerCase() === 'd')) {
        e.preventDefault();
        setCurrentScreen('dashboard');
      } else if (isCmdOrCtrl && (e.key === '2' || e.key.toLowerCase() === 'n')) {
        e.preventDefault();
        setCurrentScreen('new-project');
      } else if (isCmdOrCtrl && e.key === '3') {
        e.preventDefault();
        setCurrentScreen('tool-store');
      } else if (isCmdOrCtrl && e.key === '4') {
        e.preventDefault();
        setCurrentScreen('packages');
      } else if (isCmdOrCtrl && e.key === '5') {
        e.preventDefault();
        setCurrentScreen('activity');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreateProjectTriggered = (newProj: ProjectInstance) => {
    setProjects([newProj, ...projects]);
    setActiveProject(newProj);
    setCurrentScreen('activity');
    showToast(`Provisioning pipeline initiated for ${newProj.name}`);
  };

  const handleImportProject = (importedProj: ProjectInstance) => {
    setProjects([importedProj, ...projects]);
    setActiveProject(importedProj);
    showToast(`Repository cloned into ${importedProj.path}`);
  };

  const handleDeployToolToProject = (toolName: string) => {
    showToast(`Deploying ${toolName} to ${activeProject.name}...`);
  };

  const handleCleanCache = () => {
    showToast('Deleted 2.4 GB of orphaned build artifacts and lockfiles.');
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#090D16] text-[#dfe2ef] overflow-hidden select-none">
      {/* Top native titlebar */}
      <TitleBar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenUserProfile={() => setSettingsOpen(true)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Primary Rail / Sidebar */}
        <Sidebar
          currentScreen={currentScreen}
          onSelectScreen={(s) => setCurrentScreen(s)}
          activeProject={activeProject}
          allProjects={projects}
          onSelectProject={(p) => {
            setActiveProject(p);
            showToast(`Switched active workspace to ${p.name}`);
          }}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        {/* Main Content Viewport */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0A0E17]">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={(s) => setCurrentScreen(s)}
              projects={projects}
              onSelectProject={(p) => setActiveProject(p)}
              onCleanCache={handleCleanCache}
              onQuickImport={() => setQuickImportOpen(true)}
            />
          )}

          {currentScreen === 'new-project' && (
            <NewProjectScreen
              onCreateProjectTriggered={handleCreateProjectTriggered}
            />
          )}

          {currentScreen === 'tool-store' && (
            <ToolStoreScreen
              activeProject={activeProject}
              onDeployToProject={handleDeployToolToProject}
            />
          )}

          {currentScreen === 'packages' && (
            <PackagesScreen
              activeProject={activeProject}
              onSwitchWorkspace={(p) => setActiveProject(p)}
              allProjects={projects}
            />
          )}

          {currentScreen === 'activity' && (
            <ActivityRunsScreen
              activeProject={activeProject}
              onOpenFolder={() => showToast(`Opened explorer at ${activeProject.path}`)}
              onOpenPackageManager={() => setCurrentScreen('packages')}
            />
          )}
        </main>
      </div>

      {/* Global Status Bar */}
      <StatusBar
        currentPath={activeProject.path}
        memoryUsage={activeProject.memoryUsage || '412 MB'}
      />

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectScreen={(s) => setCurrentScreen(s)}
        onSelectProject={(p) => setActiveProject(p)}
        projects={projects}
        onCleanCache={handleCleanCache}
        onTriggerAudit={() => {
          setCurrentScreen('packages');
          showToast('Audit report: 0 CVE advisories detected across 428 packages.');
        }}
        onTriggerLockfileCheck={() => {
          showToast('Lockfile sha512 integrity hashes: 100% matched.');
        }}
      />

      {/* Quick Import Modal */}
      <QuickImportModal
        isOpen={quickImportOpen}
        onClose={() => setQuickImportOpen(false)}
        onImport={handleImportProject}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Subtle Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-9 right-4 z-50 px-3.5 py-2 rounded-lg bg-[#161B22] border border-[#30363D] text-xs font-mono text-[#4edea3] shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
