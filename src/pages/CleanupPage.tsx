import { useState } from "react";
import { cleanupData } from "@/data/mock";
import { Button } from "@/components/ui/button";
import {
  Trash2, ChevronDown, ChevronRight, Shield, AlertTriangle, Eye,
  Sparkles, History,
} from "lucide-react";
import { cn } from "@/lib/utils";

const riskConfig = {
  safe: { icon: Shield, label: "Safe to clean", color: "text-success", bg: "bg-success/10" },
  caution: { icon: AlertTriangle, label: "Use caution", color: "text-warning", bg: "bg-warning/10" },
  manual: { icon: Eye, label: "Manual review", color: "text-info", bg: "bg-info/10" },
};

export default function CleanupPage() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["Project Artifacts"]));

  const toggle = (name: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Cleanup Center</h2>
          <p className="text-sm text-muted-foreground">Reclaim disk space by cleaning caches, artifacts, and unused files</p>
        </div>
        <Button size="sm" className="gap-2 text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Run Full Cleanup
        </Button>
      </div>

      {/* Big Reclaimable Number */}
      <div className="rounded-lg border border-warning/20 bg-warning/5 p-6 text-center">
        <p className="text-sm text-warning font-medium">Total Reclaimable Space</p>
        <p className="text-5xl font-bold text-warning mt-2">{cleanupData.totalReclaimable} GB</p>
        <p className="text-xs text-muted-foreground mt-2">Across {cleanupData.categories.length} categories</p>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        {cleanupData.categories.map((cat) => {
          const risk = riskConfig[cat.risk];
          const RiskIcon = risk.icon;
          const isOpen = expanded.has(cat.name);

          return (
            <div key={cat.name} className="rounded-lg border border-border bg-card overflow-hidden">
              <button
                onClick={() => toggle(cat.name)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/30 transition-colors text-left"
              >
                {isOpen ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{cat.name}</span>
                    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium", risk.bg, risk.color)}>
                      <RiskIcon className="w-2.5 h-2.5" />{risk.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{cat.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-lg font-semibold font-mono text-foreground">{cat.totalSize}</p>
                  <p className="text-[10px] text-muted-foreground">Last cleaned: {cat.lastCleaned}</p>
                </div>
                <Button variant="outline" size="sm" className="ml-2 text-xs h-7 gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <Trash2 className="w-3 h-3" />Clean All
                </Button>
              </button>

              {isOpen && (
                <div className="border-t border-border">
                  {cat.items.map((item, i) => (
                    <div key={item.name} className={cn("flex items-center justify-between px-4 py-2.5 pl-11", i < cat.items.length - 1 && "border-b border-border")}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-foreground">{item.name}</span>
                        {item.count > 1 && <span className="text-[10px] text-muted-foreground">({item.count} items)</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-warning">{item.size}</span>
                        <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">Clean</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* History */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <History className="w-3 h-3" />Cleanup History
        </h3>
        <div className="space-y-1">
          {cleanupData.history.map((h, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-2 rounded hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{h.date}</span>
                <span className="text-xs text-foreground">{h.action}</span>
              </div>
              <span className="text-xs font-mono text-success">+{h.reclaimed}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
