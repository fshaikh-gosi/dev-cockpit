import { useState } from "react";
import { projects, type Project } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search, GitBranch, ExternalLink, Terminal, ChevronRight, X,
  FolderOpen, CheckCircle2, AlertCircle, XCircle, Circle, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

const langColors: Record<string, string> = {
  TypeScript: "bg-info/20 text-info",
  Go: "bg-primary/20 text-primary",
  Python: "bg-warning/20 text-warning",
  Java: "bg-destructive/20 text-destructive",
  Rust: "bg-[hsl(25,90%,55%)]/20 text-[hsl(25,90%,55%)]",
  Other: "bg-muted text-muted-foreground",
};

const gitStatusConfig = {
  synced: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  ahead: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10" },
  dirty: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10" },
  "no-remote": { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10" },
  "no-git": { icon: Circle, color: "text-muted-foreground", bg: "bg-muted" },
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState<string>("");
  const [gitFilter, setGitFilter] = useState<string>("");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (langFilter && p.language !== langFilter) return false;
    if (gitFilter && p.gitStatus !== gitFilter) return false;
    return true;
  });

  const languages = [...new Set(projects.map(p => p.language))];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">{projects.length} projects detected across your machine</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-xs bg-card"
          />
        </div>
        <div className="flex items-center gap-1">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLangFilter(langFilter === lang ? "" : lang)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors",
                langFilter === lang ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {lang}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 ml-2">
          {(["synced", "ahead", "dirty", "no-remote", "no-git"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setGitFilter(gitFilter === status ? "" : status)}
              className={cn(
                "px-2 py-1 rounded-md text-[11px] font-medium transition-colors",
                gitFilter === status ? gitStatusConfig[status].bg + " " + gitStatusConfig[status].color : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        {/* Project Table */}
        <div className="flex-1 min-w-0">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="grid grid-cols-[1fr_200px_120px_100px_80px_80px_80px] gap-2 px-4 py-2 text-[10px] uppercase tracking-wider text-muted-foreground font-medium border-b border-border bg-secondary/30">
              <span>Project</span>
              <span>Path</span>
              <span>Git Status</span>
              <span>Modified</span>
              <span>Size</span>
              <span>Artifacts</span>
              <span>Actions</span>
            </div>

            {filtered.map((project) => {
              const StatusIcon = gitStatusConfig[project.gitStatus].icon;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelected(project)}
                  className={cn(
                    "grid grid-cols-[1fr_200px_120px_100px_80px_80px_80px] gap-2 px-4 py-2.5 items-center border-b border-border last:border-0 hover:bg-secondary/30 cursor-pointer transition-colors",
                    selected?.id === project.id && "bg-primary/5 border-primary/20"
                  )}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", langColors[project.language] || langColors.Other)}>
                      {project.language}
                    </span>
                    <span className="text-sm font-medium text-foreground truncate">{project.name}</span>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground truncate">{project.path}</span>
                  <div className="flex items-center gap-1.5">
                    <StatusIcon className={cn("w-3 h-3", gitStatusConfig[project.gitStatus].color)} />
                    <span className={cn("text-[11px]", gitStatusConfig[project.gitStatus].color)}>{project.gitStatusLabel}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{project.lastModified}</span>
                  <span className="text-xs font-mono text-foreground">{project.totalSize}</span>
                  <span className="text-xs font-mono text-warning">{project.artifactSize}</span>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-secondary transition-colors" title="Open in Editor">
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </button>
                    <button className="p-1 rounded hover:bg-secondary transition-colors" title="Open Terminal">
                      <Terminal className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-[320px] rounded-lg border border-border bg-card p-4 space-y-4 animate-slide-up shrink-0 self-start sticky top-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="p-1 rounded hover:bg-secondary">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Path</p>
                <p className="text-xs font-mono text-foreground bg-secondary/50 px-2 py-1 rounded">{selected.path}</p>
              </div>

              {selected.branch && (
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Git Info</p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs">
                      <GitBranch className="w-3 h-3 text-muted-foreground" />
                      <span className="font-mono text-foreground">{selected.branch}</span>
                    </div>
                    {selected.remoteUrl && (
                      <div className="flex items-center gap-2 text-xs">
                        <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        <span className="font-mono text-muted-foreground truncate">{selected.remoteUrl}</span>
                      </div>
                    )}
                    {selected.lastCommit && (
                      <div className="mt-2 p-2 rounded bg-secondary/50">
                        <p className="text-[10px] text-muted-foreground">Last Commit</p>
                        <p className="text-xs text-foreground mt-0.5">{selected.lastCommit}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{selected.lastCommitAuthor} · {selected.lastCommitDate}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Size Breakdown</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-mono text-foreground">{selected.totalSize}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Artifacts</span>
                    <span className="font-mono text-warning">{selected.artifactSize}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden mt-1">
                    <div className="h-full rounded-full bg-warning" style={{ width: `${(selected.artifactSizeMB / selected.totalSizeMB) * 100}%` }} />
                  </div>
                </div>
              </div>

              {selected.tags.length > 0 && (
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {selected.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs h-8 gap-1.5">
                  <FolderOpen className="w-3 h-3" /> Open
                </Button>
                <Button variant="outline" size="sm" className="flex-1 text-xs h-8 gap-1.5">
                  <Terminal className="w-3 h-3" /> Terminal
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
