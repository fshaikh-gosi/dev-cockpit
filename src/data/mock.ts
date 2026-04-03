// Mock data for DevMap dashboard

export const machineInfo = {
  name: "MacBook-Pro-M2",
  os: "macOS Sonoma 14.3",
  cpu: "Apple M2 Pro",
  ram: "32 GB",
  uptime: "4d 7h 23m",
  cpuUsage: 34,
  ramUsage: 67,
  activeProcesses: 312,
};

export const diskUsage = {
  total: 1000,
  used: 687,
  free: 313,
  breakdown: [
    { name: "Project Artifacts", value: 142, color: "hsl(174, 72%, 46%)" },
    { name: "Package Caches", value: 89, color: "hsl(217, 91%, 60%)" },
    { name: "Applications", value: 186, color: "hsl(262, 83%, 58%)" },
    { name: "Media/Downloads", value: 124, color: "hsl(38, 92%, 50%)" },
    { name: "System", value: 98, color: "hsl(0, 72%, 51%)" },
    { name: "Other", value: 48, color: "hsl(240, 5%, 50%)" },
  ],
};

export const overviewMetrics = {
  totalProjects: 47,
  gitSynced: 38,
  gitUnsynced: 9,
  diskUsed: "687 GB",
  diskTotal: "1 TB",
  reclaimableSpace: "31.4 GB",
  runningProcesses: 312,
  healthScore: 74,
};

export const cpuHistory = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: 20 + Math.random() * 40,
}));

export const ramHistory = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  value: 55 + Math.random() * 25,
}));

export const recentActivity = [
  { type: "project", text: "Opened devmap-ui", time: "2 min ago", icon: "folder" },
  { type: "git", text: "Pushed 3 commits to api-gateway", time: "15 min ago", icon: "git" },
  { type: "cleanup", text: "Cleaned 2.3 GB from node_modules", time: "1 hour ago", icon: "trash" },
  { type: "project", text: "Opened cloud-functions", time: "2 hours ago", icon: "folder" },
  { type: "git", text: "Merged PR #42 in frontend-app", time: "3 hours ago", icon: "git" },
  { type: "scan", text: "Full system scan completed", time: "5 hours ago", icon: "scan" },
  { type: "project", text: "Created new project ml-pipeline", time: "Yesterday", icon: "folder" },
];

export type Project = {
  id: string;
  name: string;
  path: string;
  language: string;
  gitStatus: "synced" | "ahead" | "dirty" | "no-remote" | "no-git";
  gitStatusLabel: string;
  branch: string;
  remoteUrl: string;
  lastCommit: string;
  lastCommitAuthor: string;
  lastCommitDate: string;
  lastModified: string;
  totalSize: string;
  totalSizeMB: number;
  artifactSize: string;
  artifactSizeMB: number;
  activity: "active" | "stale-30" | "stale-90" | "archived";
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "1", name: "devmap-ui", path: "~/Projects/devmap-ui", language: "TypeScript",
    gitStatus: "synced", gitStatusLabel: "Synced", branch: "main",
    remoteUrl: "github.com/user/devmap-ui", lastCommit: "feat: add cleanup center UI",
    lastCommitAuthor: "Sarah Chen", lastCommitDate: "2024-01-15",
    lastModified: "2 min ago", totalSize: "1.2 GB", totalSizeMB: 1200,
    artifactSize: "890 MB", artifactSizeMB: 890, activity: "active",
    tags: ["Has Docker", "Has CI", "Has Tests"],
  },
  {
    id: "2", name: "api-gateway", path: "~/Projects/api-gateway", language: "Go",
    gitStatus: "ahead", gitStatusLabel: "3 commits ahead", branch: "develop",
    remoteUrl: "github.com/user/api-gateway", lastCommit: "fix: rate limiting middleware",
    lastCommitAuthor: "Alex Kim", lastCommitDate: "2024-01-14",
    lastModified: "15 min ago", totalSize: "340 MB", totalSizeMB: 340,
    artifactSize: "120 MB", artifactSizeMB: 120, activity: "active",
    tags: ["Has Docker", "Has CI", "Has Tests", "Monorepo"],
  },
  {
    id: "3", name: "ml-pipeline", path: "~/Projects/ml-pipeline", language: "Python",
    gitStatus: "dirty", gitStatusLabel: "Uncommitted changes", branch: "feature/v2",
    remoteUrl: "github.com/user/ml-pipeline", lastCommit: "refactor: data preprocessing",
    lastCommitAuthor: "Sarah Chen", lastCommitDate: "2024-01-13",
    lastModified: "1 hour ago", totalSize: "4.7 GB", totalSizeMB: 4700,
    artifactSize: "3.2 GB", artifactSizeMB: 3200, activity: "active",
    tags: ["Has Tests", "Has Docker"],
  },
  {
    id: "4", name: "frontend-app", path: "~/Projects/frontend-app", language: "TypeScript",
    gitStatus: "synced", gitStatusLabel: "Synced", branch: "main",
    remoteUrl: "github.com/user/frontend-app", lastCommit: "chore: update deps",
    lastCommitAuthor: "Jordan Lee", lastCommitDate: "2024-01-10",
    lastModified: "2 days ago", totalSize: "2.1 GB", totalSizeMB: 2100,
    artifactSize: "1.8 GB", artifactSizeMB: 1800, activity: "active",
    tags: ["Has CI", "Has Tests", "Monorepo"],
  },
  {
    id: "5", name: "infra-terraform", path: "~/Projects/infra-terraform", language: "Other",
    gitStatus: "synced", gitStatusLabel: "Synced", branch: "main",
    remoteUrl: "github.com/user/infra-terraform", lastCommit: "add: staging environment",
    lastCommitAuthor: "Alex Kim", lastCommitDate: "2024-01-08",
    lastModified: "1 week ago", totalSize: "45 MB", totalSizeMB: 45,
    artifactSize: "2 MB", artifactSizeMB: 2, activity: "active",
    tags: ["Has CI"],
  },
  {
    id: "6", name: "legacy-cms", path: "~/Projects/legacy-cms", language: "Java",
    gitStatus: "no-remote", gitStatusLabel: "No remote", branch: "master",
    remoteUrl: "", lastCommit: "fix: auth module",
    lastCommitAuthor: "Sarah Chen", lastCommitDate: "2023-09-15",
    lastModified: "4 months ago", totalSize: "3.8 GB", totalSizeMB: 3800,
    artifactSize: "2.9 GB", artifactSizeMB: 2900, activity: "stale-90",
    tags: [],
  },
  {
    id: "7", name: "rust-cli-tool", path: "~/Projects/rust-cli-tool", language: "Rust",
    gitStatus: "synced", gitStatusLabel: "Synced", branch: "main",
    remoteUrl: "github.com/user/rust-cli-tool", lastCommit: "release: v2.1.0",
    lastCommitAuthor: "Jordan Lee", lastCommitDate: "2024-01-05",
    lastModified: "10 days ago", totalSize: "890 MB", totalSizeMB: 890,
    artifactSize: "650 MB", artifactSizeMB: 650, activity: "active",
    tags: ["Has CI", "Has Tests"],
  },
  {
    id: "8", name: "mobile-app", path: "~/Projects/mobile-app", language: "TypeScript",
    gitStatus: "dirty", gitStatusLabel: "5 uncommitted files", branch: "feature/auth",
    remoteUrl: "github.com/user/mobile-app", lastCommit: "wip: login screen",
    lastCommitAuthor: "Sarah Chen", lastCommitDate: "2024-01-12",
    lastModified: "3 hours ago", totalSize: "1.6 GB", totalSizeMB: 1600,
    artifactSize: "1.1 GB", artifactSizeMB: 1100, activity: "active",
    tags: ["Has Tests"],
  },
  {
    id: "9", name: "data-scraper", path: "~/Projects/data-scraper", language: "Python",
    gitStatus: "no-git", gitStatusLabel: "Not a repo", branch: "",
    remoteUrl: "", lastCommit: "",
    lastCommitAuthor: "", lastCommitDate: "",
    lastModified: "2 months ago", totalSize: "120 MB", totalSizeMB: 120,
    artifactSize: "45 MB", artifactSizeMB: 45, activity: "stale-30",
    tags: [],
  },
  {
    id: "10", name: "blog-nextjs", path: "~/Projects/blog-nextjs", language: "TypeScript",
    gitStatus: "synced", gitStatusLabel: "Synced", branch: "main",
    remoteUrl: "github.com/user/blog-nextjs", lastCommit: "post: new article on rust",
    lastCommitAuthor: "Sarah Chen", lastCommitDate: "2024-01-02",
    lastModified: "2 weeks ago", totalSize: "560 MB", totalSizeMB: 560,
    artifactSize: "420 MB", artifactSizeMB: 420, activity: "active",
    tags: ["Has CI"],
  },
];

export const toolchainData = {
  runtimes: [
    { name: "Node.js", versions: ["v20.11.0", "v18.19.0", "v16.20.2"], active: "v20.11.0", status: "up-to-date", icon: "node" },
    { name: "Python", versions: ["3.12.1", "3.11.7", "3.9.18"], active: "3.12.1", status: "up-to-date", icon: "python" },
    { name: "Go", versions: ["1.21.6"], active: "1.21.6", status: "update-available", icon: "go" },
    { name: "Rust", versions: ["1.75.0"], active: "1.75.0", status: "up-to-date", icon: "rust" },
    { name: "Java", versions: ["21.0.1", "17.0.9", "11.0.21"], active: "21.0.1", status: "multiple", icon: "java" },
    { name: "Ruby", versions: ["3.3.0"], active: "3.3.0", status: "up-to-date", icon: "ruby" },
  ],
  packageManagers: [
    { name: "npm", version: "10.2.4", globalPackages: 23 },
    { name: "pnpm", version: "8.14.1", globalPackages: 8 },
    { name: "yarn", version: "4.0.2", globalPackages: 5 },
    { name: "bun", version: "1.0.21", globalPackages: 3 },
    { name: "pip", version: "23.3.2", globalPackages: 47 },
    { name: "cargo", version: "1.75.0", globalPackages: 12 },
  ],
  clis: [
    { name: "git", version: "2.43.0", lastUsed: "Just now" },
    { name: "gh", version: "2.42.0", lastUsed: "2 hours ago" },
    { name: "docker", version: "24.0.7", lastUsed: "1 hour ago" },
    { name: "kubectl", version: "1.29.0", lastUsed: "Yesterday" },
    { name: "terraform", version: "1.6.6", lastUsed: "3 days ago" },
    { name: "aws", version: "2.15.8", lastUsed: "1 week ago" },
  ],
  editors: [
    { name: "VS Code", version: "1.85.1", extensions: 47 },
    { name: "IntelliJ IDEA", version: "2023.3.2", extensions: 12 },
    { name: "Neovim", version: "0.9.4", extensions: 34 },
  ],
};

export type InstalledApp = {
  id: string;
  name: string;
  publisher: string;
  version: string;
  installDate: string;
  lastUsed: string;
  size: string;
  sizeMB: number;
  category: string;
  neverUsed?: boolean;
};

export const installedApps: InstalledApp[] = [
  { id: "1", name: "Visual Studio Code", publisher: "Microsoft", version: "1.85.1", installDate: "2023-06-15", lastUsed: "Just now", size: "420 MB", sizeMB: 420, category: "Developer Tool" },
  { id: "2", name: "Docker Desktop", publisher: "Docker", version: "4.27.1", installDate: "2023-08-20", lastUsed: "1 hour ago", size: "2.1 GB", sizeMB: 2100, category: "Developer Tool" },
  { id: "3", name: "IntelliJ IDEA", publisher: "JetBrains", version: "2023.3.2", installDate: "2023-03-10", lastUsed: "Yesterday", size: "1.8 GB", sizeMB: 1800, category: "Developer Tool" },
  { id: "4", name: "Google Chrome", publisher: "Google", version: "120.0.6099", installDate: "2022-01-05", lastUsed: "Just now", size: "890 MB", sizeMB: 890, category: "Browser" },
  { id: "5", name: "Firefox", publisher: "Mozilla", version: "121.0", installDate: "2022-01-05", lastUsed: "3 days ago", size: "520 MB", sizeMB: 520, category: "Browser" },
  { id: "6", name: "Slack", publisher: "Slack Technologies", version: "4.36.138", installDate: "2023-02-14", lastUsed: "Just now", size: "340 MB", sizeMB: 340, category: "Communication" },
  { id: "7", name: "Figma", publisher: "Figma", version: "116.15.4", installDate: "2023-05-22", lastUsed: "2 days ago", size: "280 MB", sizeMB: 280, category: "Developer Tool" },
  { id: "8", name: "Spotify", publisher: "Spotify", version: "1.2.28", installDate: "2023-01-10", lastUsed: "Yesterday", size: "450 MB", sizeMB: 450, category: "Media" },
  { id: "9", name: "Postman", publisher: "Postman", version: "10.21.0", installDate: "2023-04-18", lastUsed: "1 week ago", size: "380 MB", sizeMB: 380, category: "Developer Tool" },
  { id: "10", name: "TablePlus", publisher: "TablePlus", version: "5.8.2", installDate: "2023-07-01", lastUsed: "3 hours ago", size: "95 MB", sizeMB: 95, category: "Developer Tool" },
  { id: "11", name: "VLC Media Player", publisher: "VideoLAN", version: "3.0.20", installDate: "2023-01-15", lastUsed: "1 month ago", size: "210 MB", sizeMB: 210, category: "Media" },
  { id: "12", name: "Zoom", publisher: "Zoom Video", version: "5.17.5", installDate: "2023-03-01", lastUsed: "2 days ago", size: "180 MB", sizeMB: 180, category: "Communication" },
  { id: "13", name: "Notion", publisher: "Notion Labs", version: "3.1.0", installDate: "2023-06-01", lastUsed: "4 hours ago", size: "260 MB", sizeMB: 260, category: "Utility" },
  { id: "14", name: "Alfred", publisher: "Running with Crayons", version: "5.5", installDate: "2023-01-01", lastUsed: "Just now", size: "48 MB", sizeMB: 48, category: "Utility" },
  { id: "15", name: "Steam", publisher: "Valve", version: "2.0", installDate: "2023-08-01", lastUsed: "2 weeks ago", size: "1.2 GB", sizeMB: 1200, category: "Game", neverUsed: false },
  { id: "16", name: "Blender", publisher: "Blender Foundation", version: "4.0.2", installDate: "2023-11-01", lastUsed: "Never", size: "890 MB", sizeMB: 890, category: "Media", neverUsed: true },
];

export const cleanupData = {
  totalReclaimable: 31.4,
  categories: [
    {
      name: "Project Artifacts",
      description: "node_modules, target/, build/, dist/, .next/, .gradle/",
      totalSize: "14.2 GB",
      sizeMB: 14200,
      projectsAffected: 12,
      lastModified: "Various",
      risk: "safe" as const,
      lastCleaned: "3 days ago",
      items: [
        { name: "node_modules", count: 8, size: "8.4 GB" },
        { name: "target/", count: 2, size: "3.1 GB" },
        { name: ".next/", count: 3, size: "1.8 GB" },
        { name: "dist/", count: 5, size: "0.9 GB" },
      ],
    },
    {
      name: "Package Manager Caches",
      description: "npm, pnpm, yarn, pip, cargo, Maven caches",
      totalSize: "8.7 GB",
      sizeMB: 8700,
      projectsAffected: 0,
      lastModified: "Various",
      risk: "caution" as const,
      lastCleaned: "2 weeks ago",
      items: [
        { name: "~/.npm", count: 1, size: "2.1 GB" },
        { name: "~/.pnpm-store", count: 1, size: "3.4 GB" },
        { name: "~/.m2/repository", count: 1, size: "1.8 GB" },
        { name: "~/.cargo/registry", count: 1, size: "1.4 GB" },
      ],
    },
    {
      name: "System & App Caches",
      description: "Browser caches, temp files, logs, thumbnails",
      totalSize: "4.8 GB",
      sizeMB: 4800,
      projectsAffected: 0,
      lastModified: "Ongoing",
      risk: "safe" as const,
      lastCleaned: "1 week ago",
      items: [
        { name: "Browser Caches", count: 3, size: "2.1 GB" },
        { name: "System Temp", count: 1, size: "1.4 GB" },
        { name: "Log Files", count: 1, size: "0.8 GB" },
        { name: "Thumbnail Cache", count: 1, size: "0.5 GB" },
      ],
    },
    {
      name: "Downloads Folder",
      description: "Installers, archives, duplicates, large files",
      totalSize: "3.7 GB",
      sizeMB: 3700,
      projectsAffected: 0,
      lastModified: "Various",
      risk: "manual" as const,
      lastCleaned: "Never",
      items: [
        { name: "Installers (already installed)", count: 14, size: "1.8 GB" },
        { name: "Archives (.zip, .tar.gz)", count: 23, size: "1.2 GB" },
        { name: "Duplicate files", count: 8, size: "0.4 GB" },
        { name: "Large files (>100MB)", count: 3, size: "0.3 GB" },
      ],
    },
  ],
  history: [
    { date: "Jan 12, 2024", action: "Cleaned project artifacts", reclaimed: "4.2 GB" },
    { date: "Jan 5, 2024", action: "Cleared package caches", reclaimed: "2.8 GB" },
    { date: "Dec 28, 2023", action: "System cache cleanup", reclaimed: "1.5 GB" },
    { date: "Dec 15, 2023", action: "Full cleanup run", reclaimed: "8.1 GB" },
  ],
};

export const migrationData = {
  readinessScore: 72,
  checklist: [
    { name: "Git Repositories", status: "warning" as const, detail: "9 of 47 projects have no remote", count: "38/47" },
    { name: "SSH Keys", status: "ok" as const, detail: "2 keys found at ~/.ssh/", count: "2 found" },
    { name: "GPG Keys", status: "ok" as const, detail: "1 key configured", count: "1 found" },
    { name: "Shell Profiles", status: "ok" as const, detail: ".zshrc, .zprofile detected", count: "2 files" },
    { name: "VS Code Extensions", status: "ok" as const, detail: "47 extensions exportable", count: "47 ext" },
    { name: "Environment Variables", status: "warning" as const, detail: "3 custom env vars detected", count: "3 vars" },
    { name: "Config Files", status: "ok" as const, detail: ".gitconfig, .npmrc, .yarnrc found", count: "5 files" },
    { name: "Local Databases", status: "warning" as const, detail: "2 SQLite files, PostgreSQL running", count: "3 found" },
    { name: "Hosts File", status: "ok" as const, detail: "4 custom entries", count: "4 entries" },
    { name: "License Keys", status: "info" as const, detail: "3 software activations detected", count: "3 found" },
  ],
  unpushedProjects: [
    { name: "legacy-cms", size: "3.8 GB", lastModified: "4 months ago" },
    { name: "data-scraper", size: "120 MB", lastModified: "2 months ago" },
    { name: "experiment-ml", size: "2.1 GB", lastModified: "6 months ago" },
  ],
};

export const settingsData = {
  scanPaths: ["~/Projects", "~/Developer", "~/Code"],
  excludePatterns: ["**/node_modules", "**/target", "**/.git", "**/dist"],
  defaultEditor: "VS Code",
  scanSchedule: "on-startup",
  theme: "dark",
  accentColor: "teal",
};
