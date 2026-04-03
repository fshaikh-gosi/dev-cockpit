import { cn } from "@/lib/utils";

interface SparklineProps {
  data: { value: number }[];
  color?: string;
  className?: string;
}

export function Sparkline({ data, color = "text-primary", className }: SparklineProps) {
  const max = Math.max(...data.map(d => d.value));
  const min = Math.min(...data.map(d => d.value));
  const range = max - min || 1;
  const w = 120;
  const h = 28;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d.value - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("overflow-visible", className)} style={{ width: w, height: h }}>
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={color}
      />
    </svg>
  );
}
