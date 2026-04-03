import { cn } from "@/lib/utils";

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: "default" | "warning" | "success" | "info";
}

export function MetricCard({ label, value, subtitle, icon, variant = "default" }: MetricCardProps) {
  return (
    <div className={cn(
      "rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/20 hover:shadow-sm",
      variant === "warning" && "border-warning/20"
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className={cn(
            "mt-1 text-2xl font-semibold tracking-tight",
            variant === "warning" ? "text-warning" : "text-foreground"
          )}>{value}</p>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        <div className={cn(
          "w-8 h-8 rounded-md flex items-center justify-center",
          variant === "warning" ? "bg-warning/10 text-warning" :
          variant === "success" ? "bg-success/10 text-success" :
          variant === "info" ? "bg-info/10 text-info" :
          "bg-primary/10 text-primary"
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
