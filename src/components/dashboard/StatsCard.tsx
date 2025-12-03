import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  className?: string;
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "neutral",
  className,
  delay = 0,
}: StatsCardProps) {
  return (
    <div
      className={cn("panel p-4 animate-fade-in", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          <span className="text-2xl font-bold font-mono text-foreground">
            {value}
          </span>
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-threat-safe" />
              ) : trend === "down" ? (
                <TrendingDown className="h-3 w-3 text-threat-high" />
              ) : null}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend === "up" && "text-threat-safe",
                  trend === "down" && "text-threat-high",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {change > 0 ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-muted-foreground">vs last hour</span>
            </div>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}
