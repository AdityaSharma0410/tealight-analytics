import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Download, ChevronDown, Calendar, Filter } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "info" | "warn" | "error" | "debug";
  source: string;
  message: string;
  metadata: Record<string, string | number>;
}

const logs: LogEntry[] = [
  { id: "1", timestamp: "2024-01-15T14:32:45.123Z", level: "error", source: "auth-service", message: "Failed login attempt from blocked IP", metadata: { ip: "185.220.101.45", attempts: 5 } },
  { id: "2", timestamp: "2024-01-15T14:32:44.892Z", level: "warn", source: "rate-limiter", message: "Rate limit exceeded for endpoint", metadata: { endpoint: "/api/search", count: 150 } },
  { id: "3", timestamp: "2024-01-15T14:32:43.567Z", level: "info", source: "firewall", message: "New rule applied successfully", metadata: { rule_id: "FW-2341", action: "block" } },
  { id: "4", timestamp: "2024-01-15T14:32:42.234Z", level: "debug", source: "dns-resolver", message: "DNS query resolved", metadata: { domain: "api.example.com", ttl: 300 } },
  { id: "5", timestamp: "2024-01-15T14:32:41.890Z", level: "error", source: "waf", message: "SQL injection attempt blocked", metadata: { pattern: "UNION SELECT", ip: "103.45.67.89" } },
  { id: "6", timestamp: "2024-01-15T14:32:40.456Z", level: "info", source: "load-balancer", message: "Health check passed for backend", metadata: { server: "web-01", latency: "12ms" } },
  { id: "7", timestamp: "2024-01-15T14:32:39.123Z", level: "warn", source: "ssl-monitor", message: "Certificate expiring soon", metadata: { domain: "secure.example.com", days_left: 14 } },
  { id: "8", timestamp: "2024-01-15T14:32:38.789Z", level: "info", source: "bot-detector", message: "New bot signature identified", metadata: { user_agent: "ScrapeBot/1.0", confidence: 0.95 } },
  { id: "9", timestamp: "2024-01-15T14:32:37.456Z", level: "error", source: "ddos-protection", message: "DDoS attack mitigated", metadata: { attack_type: "SYN flood", blocked_ips: 1247 } },
  { id: "10", timestamp: "2024-01-15T14:32:36.123Z", level: "debug", source: "cache", message: "Cache invalidation triggered", metadata: { keys: 15, reason: "ttl_expired" } },
];

const levelStyles = {
  info: "bg-primary/20 text-primary",
  warn: "bg-threat-medium/20 text-threat-medium",
  error: "bg-threat-high/20 text-threat-high",
  debug: "bg-muted text-muted-foreground",
};

export default function LogsForensics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  const sources = [...new Set(logs.map((log) => log.source))];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    const matchesSource = sourceFilter === "all" || log.source === sourceFilter;
    return matchesSearch && matchesLevel && matchesSource;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Logs & Forensics</h1>
          <p className="text-sm text-muted-foreground">Detailed system logs and event analysis</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap animate-fade-in">
        <div className="flex-1 min-w-[300px] flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Level: {levelFilter}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem onClick={() => setLevelFilter("all")}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLevelFilter("info")}>Info</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLevelFilter("warn")}>Warning</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLevelFilter("error")}>Error</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLevelFilter("debug")}>Debug</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              Source: {sourceFilter}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-popover border-border">
            <DropdownMenuItem onClick={() => setSourceFilter("all")}>All Sources</DropdownMenuItem>
            {sources.map((source) => (
              <DropdownMenuItem key={source} onClick={() => setSourceFilter(source)}>
                {source}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Last 24 hours
        </Button>
      </div>

      {/* Log Stats */}
      <div className="grid grid-cols-4 gap-4">
        {["info", "warn", "error", "debug"].map((level, i) => (
          <div key={level} className="panel p-3 animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="flex items-center justify-between">
              <span className={cn("px-2 py-1 rounded text-xs font-semibold uppercase", levelStyles[level as keyof typeof levelStyles])}>
                {level}
              </span>
              <span className="text-lg font-bold font-mono text-foreground">
                {logs.filter((l) => l.level === level).length}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Logs Table */}
      <div className="panel animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-foreground">Event Log</h3>
          <span className="text-xs text-muted-foreground">{filteredLogs.length} entries</span>
        </div>
        <div className="divide-y divide-border max-h-[600px] overflow-auto">
          {filteredLogs.map((log, index) => (
            <div
              key={log.id}
              className="p-4 hover:bg-secondary/30 transition-colors animate-fade-in"
              style={{ animationDelay: `${250 + index * 20}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className={cn("px-2 py-1 rounded text-xs font-semibold uppercase shrink-0", levelStyles[log.level])}>
                  {log.level}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString("en-US", {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                    <span className="text-xs font-medium text-primary">[{log.source}]</span>
                  </div>
                  <p className="text-sm text-foreground mb-2">{log.message}</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(log.metadata).map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-0.5 rounded bg-secondary text-xs font-mono text-muted-foreground"
                      >
                        {key}=<span className="text-foreground">{String(value)}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
