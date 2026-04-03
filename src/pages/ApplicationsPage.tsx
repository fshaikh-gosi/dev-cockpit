import { useState } from "react";
import { installedApps } from "@/data/mock";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search, AppWindow, Trash2, ExternalLink, HardDrive,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const categoryColors: Record<string, string> = {
  "Developer Tool": "bg-primary/20 text-primary",
  Browser: "bg-info/20 text-info",
  Communication: "bg-success/20 text-success",
  Media: "bg-warning/20 text-warning",
  Utility: "bg-secondary text-secondary-foreground",
  Game: "bg-destructive/20 text-destructive",
  Unknown: "bg-muted text-muted-foreground",
};

const chartColors: Record<string, string> = {
  "Developer Tool": "hsl(174, 72%, 46%)",
  Browser: "hsl(217, 91%, 60%)",
  Communication: "hsl(142, 71%, 45%)",
  Media: "hsl(38, 92%, 50%)",
  Utility: "hsl(240, 5%, 50%)",
  Game: "hsl(0, 72%, 51%)",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "size" | "lastUsed">("size");

  const categories = [...new Set(installedApps.map(a => a.category))];

  const categoryData = categories.map(cat => ({
    name: cat,
    size: installedApps.filter(a => a.category === cat).reduce((s, a) => s + a.sizeMB, 0),
  })).sort((a, b) => b.size - a.size);

  const filtered = installedApps
    .filter(a => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (catFilter && a.category !== catFilter) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "size") return b.sizeMB - a.sizeMB;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const totalSize = installedApps.reduce((s, a) => s + a.sizeMB, 0);
  const neverUsed = installedApps.filter(a => a.neverUsed).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Applications</h2>
          <p className="text-sm text-muted-foreground">All installed applications on your machine</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Apps</p>
          <p className="text-xl font-semibold text-foreground mt-1">{installedApps.length}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Size</p>
          <p className="text-xl font-semibold text-foreground mt-1">{(totalSize / 1000).toFixed(1)} GB</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Never Used</p>
          <p className="text-xl font-semibold text-warning mt-1">{neverUsed}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-3">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Categories</p>
          <p className="text-xl font-semibold text-foreground mt-1">{categories.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Size by Category</h3>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={categoryData} layout="vertical" margin={{ left: 100 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              formatter={(v: number) => [`${(v / 1000).toFixed(1)} GB`, "Size"]}
            />
            <Bar dataKey="size" radius={[0, 4, 4, 0]}>
              {categoryData.map((entry) => (
                <Cell key={entry.name} fill={chartColors[entry.name] || "hsl(240, 5%, 50%)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input placeholder="Search apps..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-8 text-xs bg-card" />
        </div>
        {categories.map((cat) => (
          <button key={cat} onClick={() => setCatFilter(catFilter === cat ? "" : cat)}
            className={cn("px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors", catFilter === cat ? categoryColors[cat] : "bg-secondary text-muted-foreground hover:text-foreground")}>
            {cat}
          </button>
        ))}
        <div className="ml-auto flex gap-1">
          {(["name", "size", "lastUsed"] as const).map(s => (
            <button key={s} onClick={() => setSortBy(s)}
              className={cn("px-2 py-1 rounded text-[10px] font-medium uppercase", sortBy === s ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground")}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* App List */}
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        {filtered.map((app, i) => (
          <div key={app.id} className={cn("flex items-center gap-4 px-4 py-3 hover:bg-secondary/30 transition-colors", i < filtered.length - 1 && "border-b border-border")}>
            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <AppWindow className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{app.name}</span>
                <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-medium", categoryColors[app.category])}>{app.category}</span>
                {app.neverUsed && <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-warning/10 text-warning">Never Used</span>}
              </div>
              <p className="text-[11px] text-muted-foreground">{app.publisher} · v{app.version}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-xs font-mono text-foreground">{app.size}</p>
              <p className="text-[10px] text-muted-foreground">Last: {app.lastUsed}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Button variant="ghost" size="icon" className="h-7 w-7"><ExternalLink className="w-3 h-3" /></Button>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive"><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
