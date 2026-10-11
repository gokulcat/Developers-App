export type ScreenType = 'dashboard' | 'new-project' | 'tool-store' | 'packages' | 'activity';

export interface ProjectInstance {
  id: string;
  name: string;
  path: string;
  port?: string;
  framework: string;
  runtime: string;
  additionalStack: string[];
  status: 'active' | 'standby' | 'daemon' | 'isolated';
  statusLabel: string;
  typeBadge?: string;
  ide: string;
  primaryAction: string;
  secondaryAction?: string;
  thirdAction?: string;
  memoryUsage?: string;
}

export interface ToolchainRow {
  id: string;
  name: string;
  icon: string;
  activeVersion: string;
  isolationScope: string;
  isolationScopeBadge?: string;
  projectDependencies: string;
  registryStatus: string;
  registryStatusType: 'stable' | 'latest' | 'certified' | 'update' | 'warning';
  operationType: 'manage' | 'upgrade' | 'details';
  upgradeVersion?: string;
}

export interface StoreToolItem {
  id: string;
  name: string;
  version: string;
  category: 'runtimes' | 'frontend' | 'backend' | 'databases' | 'devops' | 'testing';
  categoryLabel: string;
  badgeType?: string;
  description: string;
  statusText?: string;
  specsSummary?: string;
  installed?: boolean;
  statusBadge?: string;
  iconType: string;
  actions: {
    primary: string;
    secondary?: string;
  };
}

export interface PackageDependency {
  name: string;
  type: 'Direct' | 'DevDependency' | 'Peer';
  installedVersion: string;
  latestVersion: string;
  versionStatus: 'Match' | 'Update' | 'Pinned' | 'LTS';
  auditStatus: string;
  auditStatusColor: 'emerald' | 'amber' | 'rose' | 'slate';
  locked?: boolean;
}

export interface PipelineStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  status: 'completed' | 'running' | 'pending';
}

export interface TerminalLogLine {
  id: string;
  timestamp: string;
  tag: 'INFO' | 'SYS' | 'FETCH' | 'VERIFY' | 'UNPACK' | 'ISOLATE' | 'NPM-LCL' | 'EXEC' | 'SCAFF' | 'NPM' | 'HEALTH' | 'TEST' | 'READY';
  text: string;
  highlight?: string;
}
