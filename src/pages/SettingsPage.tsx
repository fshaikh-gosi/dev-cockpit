import { useState } from "react";
import { settingsData } from "@/data/mock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FolderSearch, Ban, Code2, Clock, Palette, FileDown, Info, Plus, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const [scanPaths, setScanPaths] = useState(settingsData.scanPaths);
  const [excludes, setExcludes] = useState(settingsData.excludePatterns);
  const [editor, setEditor] = useState(settingsData.defaultEditor);
  const [schedule, setSchedule] = useState(settingsData.scanSchedule);
  const [accentColor, setAccentColor] = useState(settingsData.accentColor);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Configure DevMap preferences</p>
      </div>

      {/* Scan Paths */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <FolderSearch className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Scan Paths</h3>
        </div>
        <div className="space-y-1.5">
          {scanPaths.map((p, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={p} readOnly className="h-8 text-xs font-mono bg-secondary/50 flex-1" />
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setScanPaths(scanPaths.filter((_, j) => j !== i))}>
                <X className="w-3 h-3 text-muted-foreground" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5 mt-1">
            <Plus className="w-3 h-3" />Add Path
          </Button>
        </div>
      </div>

      {/* Exclude Patterns */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Ban className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Exclude Patterns</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {excludes.map((p) => (
            <span key={p} className="inline-flex items-center gap-1 px-2 py-1 rounded bg-secondary text-xs font-mono text-muted-foreground">
              {p}
              <button onClick={() => setExcludes(excludes.filter(e => e !== p))}>
                <X className="w-2.5 h-2.5" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Default Editor</h3>
        </div>
        <div className="flex gap-2">
          {["VS Code", "IntelliJ IDEA", "Neovim", "WebStorm"].map(ed => (
            <button key={ed} onClick={() => setEditor(ed)}
              className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors", editor === ed ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-muted-foreground hover:text-foreground")}>
              {ed}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium text-foreground">Scan Schedule</h3>
        </div>
        <div className="flex gap-2">
          {[{ v: "manual", l: "Manual" }, { v: "on-startup", l: "On Startup" }, { v: "daily", l: "Daily" }].map(opt => (
            <button key={opt.v} onClick={() => setSchedule(opt.v)}
              className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-colors", schedule === opt.v ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary text-muted-foreground hover:text-foreground")}>
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      {/* Export & About */}
      <div className="flex gap-3">
        <div className="flex-1 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <FileDown className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">Data Export</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">Export all DevMap data as JSON</p>
          <Button variant="outline" size="sm" className="text-xs">Export JSON</Button>
        </div>
        <div className="flex-1 rounded-lg border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-medium text-foreground">About</h3>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <p>DevMap <span className="font-mono text-foreground">v1.0.0</span></p>
            <p>Open Source · MIT License</p>
          </div>
        </div>
      </div>
    </div>
  );
}
