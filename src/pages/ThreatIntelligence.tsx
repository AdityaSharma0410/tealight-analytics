import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Eye, Clock, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Threat {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low";
  source: string;
  target: string;
  timestamp: string;
  status: "active" | "mitigated" | "investigating";
  description: string;
}

const threats: Threat[] = [
  {
    id: "THR-001",
    type: "SQL Injection",
    severity: "critical",
    source: "103.45.67.89",
    target: "/api/users",
    timestamp: "2024-01-15T14:32:00Z",
    status: "active",
    description: "Attempted SQL injection attack detected on user authentication endpoint",
  },
  {
    id: "THR-002",
    type: "DDoS Attack",
    severity: "high",
    source: "Multiple IPs",
    target: "CDN Edge",
    timestamp: "2024-01-15T14:28:00Z",
    status: "mitigated",
    description: "Distributed denial of service attack from botnet cluster",
  },
  {
    id: "THR-003",
    type: "Brute Force",
    severity: "high",
    source: "45.123.89.12",
    target: "/admin/login",
    timestamp: "2024-01-15T14:25:00Z",
    status: "investigating",
    description: "Multiple failed login attempts on admin panel",
  },
  {
    id: "THR-004",
    type: "XSS Attempt",
    severity: "medium",
    source: "78.92.134.56",
    target: "/api/comments",
    timestamp: "2024-01-15T14:20:00Z",
    status: "mitigated",
    description: "Cross-site scripting payload detected in comment submission",
  },
  {
    id: "THR-005",
    type: "Path Traversal",
    severity: "medium",
    source: "92.168.45.78",
    target: "/api/files",
    timestamp: "2024-01-15T14:15:00Z",
    status: "mitigated",
    description: "Directory traversal attempt blocked",
  },
  {
    id: "THR-006",
    type: "Suspicious Bot",
    severity: "low",
    source: "34.67.89.123",
    target: "/sitemap.xml",
    timestamp: "2024-01-15T14:10:00Z",
    status: "investigating",
    description: "Unusual crawling pattern detected from unidentified bot",
  },
];

const severityStyles = {
  critical: "threat-critical",
  high: "threat-high",
  medium: "threat-medium",
  low: "threat-low",
};

const statusStyles = {
  active: "bg-threat-critical/20 text-threat-critical",
  mitigated: "bg-threat-safe/20 text-threat-safe",
  investigating: "bg-threat-medium/20 text-threat-medium",
};

export default function ThreatIntelligence() {
  const [filter, setFilter] = useState("all");

  const filteredThreats = threats.filter((threat) => {
    if (filter === "all") return true;
    return threat.severity === filter;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Threat Intelligence</h1>
          <p className="text-sm text-muted-foreground">Active threat monitoring and analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                Severity: {filter}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("critical")}>Critical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("high")}>High</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("medium")}>Medium</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter("low")}>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-critical/20 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-threat-critical" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {threats.filter((t) => t.severity === "critical").length}
              </p>
              <p className="text-xs text-muted-foreground">Critical Threats</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-high/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-threat-high" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {threats.filter((t) => t.status === "active").length}
              </p>
              <p className="text-xs text-muted-foreground">Active Threats</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-safe/20 flex items-center justify-center">
              <Eye className="h-5 w-5 text-threat-safe" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {threats.filter((t) => t.status === "mitigated").length}
              </p>
              <p className="text-xs text-muted-foreground">Mitigated</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-medium/20 flex items-center justify-center">
              <Clock className="h-5 w-5 text-threat-medium" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {threats.filter((t) => t.status === "investigating").length}
              </p>
              <p className="text-xs text-muted-foreground">Investigating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Threats List */}
      <div className="panel animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-foreground">Active Threats</h3>
          <span className="text-xs text-muted-foreground">{filteredThreats.length} threats</span>
        </div>
        <div className="divide-y divide-border">
          {filteredThreats.map((threat, index) => (
            <div
              key={threat.id}
              className="p-4 hover:bg-secondary/30 transition-colors duration-200 animate-fade-in"
              style={{ animationDelay: `${250 + index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={cn("px-2 py-1 rounded text-xs font-semibold", severityStyles[threat.severity])}>
                    {threat.severity.toUpperCase()}
                  </span>
                  <span className="font-mono text-sm text-foreground">{threat.id}</span>
                  <span className="text-sm font-medium text-foreground">{threat.type}</span>
                </div>
                <span className={cn("px-2 py-1 rounded text-xs font-medium capitalize", statusStyles[threat.status])}>
                  {threat.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{threat.description}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                <span>Source: <span className="text-foreground">{threat.source}</span></span>
                <span>Target: <span className="text-primary">{threat.target}</span></span>
                <span>{new Date(threat.timestamp).toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
