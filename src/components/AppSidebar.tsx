import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  Wrench,
  AppWindow,
  Trash2,
  Truck,
  Settings,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Overview" },
  { to: "/projects", icon: FolderGit2, label: "Projects" },
  { to: "/toolchain", icon: Wrench, label: "Toolchain" },
  { to: "/applications", icon: AppWindow, label: "Applications" },
  { to: "/cleanup", icon: Trash2, label: "Cleanup Center" },
  { to: "/migration", icon: Truck, label: "Migration" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function AppSidebar() {
  return (
    <aside className="w-[220px] min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground tracking-tight">DevMap</h1>
            <p className="text-[10px] text-muted-foreground font-mono">v1.0.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )
            }
          >
            <item.icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="px-3 py-2 rounded-md bg-secondary/50">
          <p className="text-[10px] text-muted-foreground font-mono">DISK USAGE</p>
          <div className="mt-1.5 h-1.5 rounded-full bg-secondary overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: "68.7%" }} />
          </div>
          <p className="mt-1 text-[10px] text-muted-foreground font-mono">687 GB / 1 TB</p>
        </div>
      </div>
    </aside>
  );
}
