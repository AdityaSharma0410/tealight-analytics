import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LogEntry {
  id: string;
  timestamp: string;
  ip: string;
  country: string;
  countryRiskScore: number;
  threatScore: number;
  isBot: boolean;
  isAutomated: boolean;
  endpoint: string;
  method: string;
  userAgent: string;
  ipRequestCount: number;
  ipHourlyRequests: number;
  ipUniqueEndpoints: number;
  suspiciousKeywords: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isMobile: boolean;
  isWindows: boolean;
  endpointDepth: number;
  hasQueryParams: boolean;
}

const generateLogs = (): LogEntry[] => {
  const countries = ["US", "CN", "RU", "DE", "BR", "IN", "UK", "FR", "JP", "KR"];
  const endpoints = ["/api/users", "/api/auth/login", "/api/data", "/admin", "/api/payments", "/api/search"];
  const methods = ["GET", "POST", "PUT", "DELETE"];
  
  return Array.from({ length: 20 }, (_, i) => ({
    id: `log-${i}`,
    timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    countryRiskScore: Math.floor(Math.random() * 100),
    threatScore: Math.floor(Math.random() * 100),
    isBot: Math.random() > 0.7,
    isAutomated: Math.random() > 0.8,
    endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
    method: methods[Math.floor(Math.random() * methods.length)],
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    ipRequestCount: Math.floor(Math.random() * 500),
    ipHourlyRequests: Math.floor(Math.random() * 100),
    ipUniqueEndpoints: Math.floor(Math.random() * 20),
    suspiciousKeywords: Math.random() > 0.9,
    isChrome: Math.random() > 0.3,
    isFirefox: Math.random() > 0.7,
    isMobile: Math.random() > 0.6,
    isWindows: Math.random() > 0.4,
    endpointDepth: Math.floor(Math.random() * 5) + 1,
    hasQueryParams: Math.random() > 0.5,
  }));
};

const getThreatLevel = (score: number) => {
  if (score >= 80) return { label: "Critical", class: "threat-critical" };
  if (score >= 60) return { label: "High", class: "threat-high" };
  if (score >= 40) return { label: "Medium", class: "threat-medium" };
  if (score >= 20) return { label: "Low", class: "threat-low" };
  return { label: "Safe", class: "threat-safe" };
};

export function LogFeed() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    setLogs(generateLogs());
    const interval = setInterval(() => {
      setLogs((prev) => {
        const newLog = generateLogs()[0];
        return [{ ...newLog, id: `log-${Date.now()}` }, ...prev.slice(0, 19)];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    if (filter === "bots") return log.isBot;
    if (filter === "threats") return log.threatScore >= 60;
    if (filter === "suspicious") return log.suspiciousKeywords;
    return true;
  });

  return (
    <div className="panel h-full flex flex-col animate-fade-in" style={{ animationDelay: "500ms" }}>
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-foreground">Real-Time Log Feed</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-3.5 w-3.5" />
              <span className="capitalize">{filter}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem onClick={() => setFilter("all")}>All Logs</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("bots")}>Bots Only</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("threats")}>High Threats</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("suspicious")}>Suspicious</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredLogs.map((log, index) => {
          const threat = getThreatLevel(log.threatScore);
          return (
            <div
              key={log.id}
              className={cn(
                "log-entry text-xs font-mono",
                index === 0 && "animate-slide-in-left"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={cn("px-2 py-0.5 rounded text-[10px] font-semibold", threat.class)}>
                    {threat.label}
                  </span>
                  <span className="text-muted-foreground">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {log.isBot && (
                    <span className="px-1.5 py-0.5 rounded bg-threat-medium/20 text-threat-medium text-[10px]">
                      BOT
                    </span>
                  )}
                  {log.isAutomated && (
                    <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary text-[10px]">
                      AUTO
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-muted-foreground">
                <div>
                  <span className="text-foreground">{log.ip}</span>
                  <span className="ml-2">({log.country})</span>
                </div>
                <div>
                  <span className="text-primary">{log.method}</span>
                  <span className="ml-1">{log.endpoint}</span>
                </div>
                <div>
                  req_count: <span className="text-foreground">{log.ipRequestCount}</span>
                </div>
                <div>
                  hourly: <span className="text-foreground">{log.ipHourlyRequests}</span>
                </div>
                <div>
                  risk_score: <span className="text-foreground">{log.countryRiskScore}</span>
                </div>
                <div>
                  depth: <span className="text-foreground">{log.endpointDepth}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
