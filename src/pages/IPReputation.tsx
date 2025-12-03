import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Shield, AlertTriangle, Ban, CheckCircle } from "lucide-react";

interface IPEntry {
  ip: string;
  country: string;
  reputation: number;
  requests: number;
  threats: number;
  lastSeen: string;
  status: "clean" | "suspicious" | "blocked" | "whitelisted";
  asn: string;
  org: string;
}

const ipData: IPEntry[] = [
  { ip: "185.220.101.45", country: "DE", reputation: 15, requests: 45623, threats: 234, lastSeen: "2024-01-15T14:32:00Z", status: "blocked", asn: "AS60729", org: "Tor Exit Node" },
  { ip: "103.45.67.89", country: "CN", reputation: 25, requests: 12345, threats: 89, lastSeen: "2024-01-15T14:30:00Z", status: "suspicious", asn: "AS4134", org: "Chinanet" },
  { ip: "45.33.32.156", country: "US", reputation: 85, requests: 8923, threats: 12, lastSeen: "2024-01-15T14:28:00Z", status: "clean", asn: "AS63949", org: "Linode LLC" },
  { ip: "8.8.8.8", country: "US", reputation: 100, requests: 234567, threats: 0, lastSeen: "2024-01-15T14:35:00Z", status: "whitelisted", asn: "AS15169", org: "Google LLC" },
  { ip: "192.168.1.100", country: "US", reputation: 95, requests: 5678, threats: 0, lastSeen: "2024-01-15T14:20:00Z", status: "clean", asn: "Private", org: "Internal Network" },
  { ip: "91.92.109.24", country: "RU", reputation: 10, requests: 3456, threats: 156, lastSeen: "2024-01-15T14:15:00Z", status: "blocked", asn: "AS200000", org: "Unknown Proxy" },
  { ip: "203.0.113.50", country: "JP", reputation: 70, requests: 7890, threats: 23, lastSeen: "2024-01-15T14:10:00Z", status: "suspicious", asn: "AS2497", org: "IIJ" },
];

const getReputationColor = (score: number) => {
  if (score >= 80) return "text-threat-safe";
  if (score >= 60) return "text-threat-low";
  if (score >= 40) return "text-threat-medium";
  if (score >= 20) return "text-threat-high";
  return "text-threat-critical";
};

const statusConfig = {
  clean: { bg: "bg-threat-safe/20", text: "text-threat-safe", icon: CheckCircle },
  suspicious: { bg: "bg-threat-medium/20", text: "text-threat-medium", icon: AlertTriangle },
  blocked: { bg: "bg-threat-critical/20", text: "text-threat-critical", icon: Ban },
  whitelisted: { bg: "bg-primary/20", text: "text-primary", icon: Shield },
};

export default function IPReputation() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredIPs = ipData.filter((ip) => {
    const matchesSearch = ip.ip.includes(searchQuery) || ip.org.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || ip.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">IP Reputation Explorer</h1>
          <p className="text-sm text-muted-foreground">Analyze and manage IP addresses</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 animate-fade-in">
        <div className="flex-1 flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by IP address or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          {["all", "clean", "suspicious", "blocked", "whitelisted"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {ipData.filter((ip) => ip.status === "clean").length}
              </p>
              <p className="text-xs text-muted-foreground">Clean IPs</p>
            </div>
            <CheckCircle className="h-8 w-8 text-threat-safe/50" />
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {ipData.filter((ip) => ip.status === "suspicious").length}
              </p>
              <p className="text-xs text-muted-foreground">Suspicious</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-threat-medium/50" />
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {ipData.filter((ip) => ip.status === "blocked").length}
              </p>
              <p className="text-xs text-muted-foreground">Blocked</p>
            </div>
            <Ban className="h-8 w-8 text-threat-critical/50" />
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">
                {ipData.filter((ip) => ip.status === "whitelisted").length}
              </p>
              <p className="text-xs text-muted-foreground">Whitelisted</p>
            </div>
            <Shield className="h-8 w-8 text-primary/50" />
          </div>
        </div>
      </div>

      {/* IP Table */}
      <div className="panel animate-fade-in" style={{ animationDelay: "250ms" }}>
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-foreground">IP Addresses</h3>
          <span className="text-xs text-muted-foreground">{filteredIPs.length} results</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                <th className="text-left p-3">IP Address</th>
                <th className="text-left p-3">Country</th>
                <th className="text-left p-3">Organization</th>
                <th className="text-left p-3">Reputation</th>
                <th className="text-left p-3">Requests</th>
                <th className="text-left p-3">Threats</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIPs.map((ip, index) => {
                const status = statusConfig[ip.status];
                const StatusIcon = status.icon;
                return (
                  <tr
                    key={ip.ip}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${300 + index * 30}ms` }}
                  >
                    <td className="p-3 font-mono text-sm text-foreground">{ip.ip}</td>
                    <td className="p-3 text-sm text-muted-foreground">{ip.country}</td>
                    <td className="p-3 text-sm text-muted-foreground">{ip.org}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${ip.reputation}%`,
                              backgroundColor: ip.reputation >= 80 ? "hsl(145, 60%, 45%)" :
                                ip.reputation >= 60 ? "hsl(80, 60%, 50%)" :
                                ip.reputation >= 40 ? "hsl(45, 90%, 55%)" :
                                ip.reputation >= 20 ? "hsl(25, 90%, 55%)" : "hsl(0, 70%, 55%)"
                            }}
                          />
                        </div>
                        <span className={cn("font-mono text-sm", getReputationColor(ip.reputation))}>
                          {ip.reputation}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 font-mono text-sm text-muted-foreground">
                      {ip.requests.toLocaleString()}
                    </td>
                    <td className="p-3 font-mono text-sm text-threat-high">
                      {ip.threats}
                    </td>
                    <td className="p-3">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit capitalize", status.bg, status.text)}>
                        <StatusIcon className="h-3 w-3" />
                        {ip.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="sm" className="text-xs">
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
