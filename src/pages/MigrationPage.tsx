import { migrationData } from "@/data/mock";
import { HealthGauge } from "@/components/HealthGauge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2, AlertTriangle, Info, FileDown, Package, Terminal,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
  ok: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
  info: { icon: Info, color: "text-info", bg: "bg-info/10" },
};

export default function MigrationPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Migration Assistant</h2>
          <p className="text-sm text-muted-foreground">Prepare your machine for a smooth migration to new hardware</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <FileDown className="w-3.5 h-3.5" />Export Report
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-xs">
            <Package className="w-3.5 h-3.5" />Export Dotfiles
          </Button>
          <Button size="sm" className="gap-2 text-xs">
            <Terminal className="w-3.5 h-3.5" />Generate Setup Script
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Readiness Score */}
        <div className="col-span-1 rounded-lg border border-border bg-card p-6 flex flex-col items-center">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Migration Readiness</h3>
          <HealthGauge score={migrationData.readinessScore} />
          <p className="mt-3 text-xs text-muted-foreground text-center">
            Resolve warnings to increase your score
          </p>
        </div>

        {/* Unpushed Projects */}
        <div className="col-span-2 rounded-lg border border-warning/20 bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-warning" />
            <h3 className="text-sm font-medium text-foreground">Unpushed Projects</h3>
            <span className="text-[10px] text-warning bg-warning/10 px-2 py-0.5 rounded-full font-medium">
              {migrationData.unpushedProjects.length} at risk
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">These projects have no remote Git repository. They will be lost if not backed up.</p>
          <div className="space-y-1">
            {migrationData.unpushedProjects.map((p) => (
              <div key={p.name} className="flex items-center justify-between px-3 py-2 rounded-md bg-secondary/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{p.name}</span>
                  <span className="text-xs text-muted-foreground">· {p.lastModified}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">{p.size}</span>
                  <Button variant="outline" size="sm" className="h-6 text-[10px] px-2">Push to GitHub</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-secondary/20">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pre-Migration Checklist</h3>
        </div>
        {migrationData.checklist.map((item, i) => {
          const cfg = statusConfig[item.status];
          const StatusIcon = cfg.icon;
          return (
            <div key={item.name} className={cn("flex items-center gap-4 px-4 py-3", i < migrationData.checklist.length - 1 && "border-b border-border")}>
              <div className={cn("w-7 h-7 rounded-md flex items-center justify-center", cfg.bg)}>
                <StatusIcon className={cn("w-3.5 h-3.5", cfg.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{item.name}</p>
                <p className="text-[11px] text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-xs font-mono text-muted-foreground shrink-0">{item.count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
