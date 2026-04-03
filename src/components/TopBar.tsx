import { Search, Cpu } from "lucide-react";
import { machineInfo } from "@/data/mock";
import { useClock } from "@/hooks/use-clock";
import { useState, useEffect } from "react";

export function TopBar() {
  const clock = useClock();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <header className="h-12 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Cpu className="w-3.5 h-3.5" />
            <span className="text-xs font-mono">{machineInfo.name}</span>
          </div>
          <span className="text-border">|</span>
          <span className="text-xs text-muted-foreground">{machineInfo.os}</span>
        </div>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary/50 border border-border hover:border-primary/30 transition-colors w-[280px]"
        >
          <Search className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground flex-1 text-left">Search projects, tools, actions...</span>
          <kbd className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">⌘K</kbd>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground tabular-nums">{clock}</span>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => setSearchOpen(false)}>
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div
            className="relative w-[560px] bg-card border border-border rounded-xl shadow-2xl animate-slide-up overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                autoFocus
                placeholder="Search projects, tools, actions..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <kbd className="text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">ESC</kbd>
            </div>
            <div className="p-2">
              <p className="px-2 py-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Quick Actions</p>
              {["Scan Now", "Run Cleanup", "Export Migration Report", "Open Project"].map((action) => (
                <button key={action} className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-secondary transition-colors text-left">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
