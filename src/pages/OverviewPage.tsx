import {
  FolderGit2, GitBranch, HardDrive, Recycle, Activity,
  Zap, ScanLine, Trash2, FileDown, Play, Cpu, MemoryStick, Clock,
} from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { HealthGauge } from "@/components/HealthGauge";
import { Sparkline } from "@/components/Sparkline";
import { overviewMetrics, diskUsage, recentActivity, cpuHistory, ramHistory, machineInfo } from "@/data/mock";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

export default function OverviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-lg font-semibold text-foreground">Overview</h2>
        <p className="text-sm text-muted-foreground">Machine intelligence at a glance</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-5 gap-3">
        <MetricCard label="Total Projects" value={overviewMetrics.totalProjects} icon={<FolderGit2 className="w-4 h-4" />} />
        <MetricCard label="Git Synced" value={`${overviewMetrics.gitSynced} / ${overviewMetrics.totalProjects}`} subtitle={`${overviewMetrics.gitUnsynced} unsynced`} icon={<GitBranch className="w-4 h-4" />} variant="success" />
        <MetricCard label="Disk Used" value={overviewMetrics.diskUsed} subtitle={`of ${overviewMetrics.diskTotal}`} icon={<HardDrive className="w-4 h-4" />} />
        <MetricCard label="Reclaimable" value={overviewMetrics.reclaimableSpace} icon={<Recycle className="w-4 h-4" />} variant="warning" />
        <MetricCard label="Processes" value={overviewMetrics.runningProcesses} icon={<Activity className="w-4 h-4" />} variant="info" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-4">
        {/* Disk Chart + Health */}
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Disk Breakdown</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={diskUsage.breakdown}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={75}
                  dataKey="value"
                  strokeWidth={2}
                  stroke="hsl(var(--card))"
                >
                  {diskUsage.breakdown.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                  formatter={(value: number) => [`${value} GB`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {diskUsage.breakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-mono text-foreground">{item.value} GB</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4 flex flex-col items-center">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 self-start">Machine Health</h3>
            <HealthGauge score={overviewMetrics.healthScore} />
            <p className="mt-2 text-xs text-muted-foreground text-center">
              {overviewMetrics.gitUnsynced} unsynced repos, {overviewMetrics.reclaimableSpace} reclaimable
            </p>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="col-span-1 rounded-lg border border-border bg-card p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Recent Activity</h3>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 py-2 px-2 rounded-md hover:bg-secondary/50 transition-colors">
                <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  {item.type === "git" ? <GitBranch className="w-3 h-3 text-success" /> :
                   item.type === "cleanup" ? <Trash2 className="w-3 h-3 text-warning" /> :
                   item.type === "scan" ? <ScanLine className="w-3 h-3 text-info" /> :
                   <FolderGit2 className="w-3 h-3 text-primary" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-foreground truncate">{item.text}</p>
                  <p className="text-[10px] text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions + Vitals */}
        <div className="col-span-1 space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start gap-2 text-xs h-9">
                <ScanLine className="w-3.5 h-3.5 text-primary" />Scan Now
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-xs h-9">
                <Trash2 className="w-3.5 h-3.5 text-warning" />Cleanup
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-xs h-9">
                <FileDown className="w-3.5 h-3.5 text-info" />Export
              </Button>
              <Button variant="outline" size="sm" className="justify-start gap-2 text-xs h-9">
                <Play className="w-3.5 h-3.5 text-success" />Open Project
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">System Vitals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Cpu className="w-3 h-3" /> CPU
                  </div>
                  <span className="text-xs font-mono text-foreground">{machineInfo.cpuUsage}%</span>
                </div>
                <Sparkline data={cpuHistory} />
                <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${machineInfo.cpuUsage}%` }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MemoryStick className="w-3 h-3" /> RAM
                  </div>
                  <span className="text-xs font-mono text-foreground">{machineInfo.ramUsage}%</span>
                </div>
                <Sparkline data={ramHistory} color="text-info" />
                <div className="mt-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-info transition-all" style={{ width: `${machineInfo.ramUsage}%` }} />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Activity className="w-3 h-3" /> Processes
                </div>
                <span className="text-xs font-mono text-foreground">{machineInfo.activeProcesses}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> Uptime
                </div>
                <span className="text-xs font-mono text-foreground">{machineInfo.uptime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
