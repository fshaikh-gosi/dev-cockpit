import { toolchainData } from "@/data/mock";
import {
  CheckCircle2, AlertTriangle, Layers, Package, Terminal, Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  "up-to-date": { icon: CheckCircle2, label: "Up to date", color: "text-success" },
  "update-available": { icon: AlertTriangle, label: "Update available", color: "text-warning" },
  multiple: { icon: Layers, label: "Multiple versions", color: "text-info" },
  conflicting: { icon: AlertTriangle, label: "Conflicting", color: "text-destructive" },
};

export default function ToolchainPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Toolchain</h2>
        <p className="text-sm text-muted-foreground">Developer tools and runtimes installed on your machine</p>
      </div>

      {/* Runtimes */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Runtimes & Languages</h3>
        <div className="grid grid-cols-3 gap-3">
          {toolchainData.runtimes.map((rt) => {
            const cfg = statusConfig[rt.status as keyof typeof statusConfig];
            const StatusIcon = cfg.icon;
            return (
              <div key={rt.name} className="rounded-lg border border-border bg-card p-4 hover:border-primary/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                      <Code2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{rt.name}</p>
                      <p className="text-xs font-mono text-primary">{rt.active}</p>
                    </div>
                  </div>
                  <div className={cn("flex items-center gap-1", cfg.color)}>
                    <StatusIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
                {rt.versions.length > 1 && (
                  <div className="mt-3 pt-2 border-t border-border">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">All Versions</p>
                    <div className="flex flex-wrap gap-1">
                      {rt.versions.map((v) => (
                        <span key={v} className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-mono",
                          v === rt.active ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                        )}>
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-2">
                  <span className={cn("text-[10px] font-medium", cfg.color)}>{cfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Package Managers */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Package Managers</h3>
        <div className="grid grid-cols-3 gap-3">
          {toolchainData.packageManagers.map((pm) => (
            <div key={pm.name} className="rounded-lg border border-border bg-card p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{pm.name}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">v{pm.version}</span>
                <span className="text-xs text-muted-foreground">{pm.globalPackages} global pkgs</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CLIs */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Developer CLIs</h3>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          {toolchainData.clis.map((cli, i) => (
            <div key={cli.name} className={cn("flex items-center justify-between px-4 py-3", i < toolchainData.clis.length - 1 && "border-b border-border")}>
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{cli.name}</span>
                <span className="text-xs font-mono text-muted-foreground">{cli.version}</span>
              </div>
              <span className="text-xs text-muted-foreground">Last used: {cli.lastUsed}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editors */}
      <div>
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Editors & IDEs</h3>
        <div className="grid grid-cols-3 gap-3">
          {toolchainData.editors.map((ed) => (
            <div key={ed.name} className="rounded-lg border border-border bg-card p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-info" />
                <span className="text-sm font-medium text-foreground">{ed.name}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground">v{ed.version}</span>
                <span className="text-xs text-muted-foreground">{ed.extensions} extensions</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
