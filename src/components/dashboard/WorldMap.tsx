import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ThreatOrigin {
  country: string;
  code: string;
  riskScore: number;
  requests: number;
  threats: number;
}

const threatOrigins: ThreatOrigin[] = [
  { country: "China", code: "CN", riskScore: 78, requests: 15234, threats: 892 },
  { country: "Russia", code: "RU", riskScore: 85, requests: 8921, threats: 654 },
  { country: "Brazil", code: "BR", riskScore: 45, requests: 6543, threats: 123 },
  { country: "United States", code: "US", riskScore: 25, requests: 45678, threats: 234 },
  { country: "India", code: "IN", riskScore: 55, requests: 12345, threats: 345 },
  { country: "Germany", code: "DE", riskScore: 20, requests: 8765, threats: 89 },
  { country: "Nigeria", code: "NG", riskScore: 72, requests: 3456, threats: 456 },
  { country: "Iran", code: "IR", riskScore: 88, requests: 2345, threats: 567 },
];

const getRiskColor = (score: number) => {
  if (score >= 80) return "text-threat-critical";
  if (score >= 60) return "text-threat-high";
  if (score >= 40) return "text-threat-medium";
  if (score >= 20) return "text-threat-low";
  return "text-threat-safe";
};

const getRiskBg = (score: number) => {
  if (score >= 80) return "bg-threat-critical/20";
  if (score >= 60) return "bg-threat-high/20";
  if (score >= 40) return "bg-threat-medium/20";
  if (score >= 20) return "bg-threat-low/20";
  return "bg-threat-safe/20";
};

export function WorldMap() {
  const [activeArcs, setActiveArcs] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomArcs = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * threatOrigins.length)
      );
      setActiveArcs(randomArcs);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="panel h-full animate-fade-in" style={{ animationDelay: "600ms" }}>
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-foreground">Geopolitical Threat Index</h3>
        <span className="text-xs text-muted-foreground">Global Traffic Origins</span>
      </div>
      <div className="p-4 flex gap-4">
        {/* Simplified Map Visualization */}
        <div className="flex-1 relative bg-secondary/30 rounded-lg overflow-hidden min-h-[300px]">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(hsl(175, 60%, 45%, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(175, 60%, 45%, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          
          {/* Animated Traffic Arcs */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
            {/* Simplified world map outline */}
            <path
              d="M50 80 Q100 60 150 80 T250 75 T350 85 M60 100 Q150 90 200 100 T300 95 M80 120 Q150 130 200 120 T320 125"
              stroke="hsl(175, 60%, 45%)"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            
            {/* Traffic arcs */}
            {activeArcs.map((idx, i) => (
              <g key={`arc-${i}-${idx}`}>
                <path
                  d={`M${350 - idx * 30} ${90 + idx * 5} Q${200 - idx * 10} ${50 + idx * 10} ${50 + idx * 15} ${100 - idx * 3}`}
                  stroke="hsl(175, 60%, 45%)"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="4 2"
                  className="animate-pulse-ring"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
                <circle
                  cx={50 + idx * 15}
                  cy={100 - idx * 3}
                  r="3"
                  fill="hsl(175, 60%, 45%)"
                  className="animate-pulse-ring"
                />
              </g>
            ))}
            
            {/* Central target */}
            <circle cx="200" cy="100" r="8" fill="hsl(175, 60%, 45%)" opacity="0.3" />
            <circle cx="200" cy="100" r="4" fill="hsl(175, 60%, 45%)" />
          </svg>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-threat-safe"></span>
              <span className="text-muted-foreground">Low Risk</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-threat-medium"></span>
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-threat-critical"></span>
              <span className="text-muted-foreground">Critical</span>
            </div>
          </div>
        </div>

        {/* Threat Origins List */}
        <div className="w-72 space-y-2 overflow-auto max-h-[320px]">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Top Threat Origins
          </div>
          {threatOrigins.map((origin, index) => (
            <div
              key={origin.code}
              className={cn(
                "p-3 rounded-md border border-border/50 transition-all duration-300",
                getRiskBg(origin.riskScore),
                activeArcs.includes(index) && "border-primary/50"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground">{origin.country}</span>
                <span className={cn("text-sm font-bold font-mono", getRiskColor(origin.riskScore))}>
                  {origin.riskScore}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{origin.requests.toLocaleString()} req</span>
                <span className="text-threat-high">{origin.threats} threats</span>
              </div>
              {/* Risk bar */}
              <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", getRiskBg(origin.riskScore).replace("/20", ""))}
                  style={{ width: `${origin.riskScore}%`, backgroundColor: `hsl(${Math.max(0, 145 - origin.riskScore * 1.5)}, 60%, 50%)` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
