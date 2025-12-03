import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, BarChart3, Table } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const generateNetworkData = () => {
  return Array.from({ length: 60 }, (_, i) => ({
    time: `${i}s`,
    inbound: Math.floor(Math.random() * 1000) + 500,
    outbound: Math.floor(Math.random() * 800) + 300,
    packets: Math.floor(Math.random() * 5000) + 2000,
  }));
};

const networkData = generateNetworkData();

const protocolData = [
  { protocol: "HTTPS", percentage: 68, requests: 845234 },
  { protocol: "HTTP", percentage: 12, requests: 148923 },
  { protocol: "WebSocket", percentage: 8, requests: 99234 },
  { protocol: "DNS", percentage: 7, requests: 86892 },
  { protocol: "SSH", percentage: 3, requests: 37234 },
  { protocol: "Other", percentage: 2, requests: 24823 },
];

export default function NetworkTraffic() {
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [timeRange, setTimeRange] = useState("1h");

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Network Traffic</h1>
          <p className="text-sm text-muted-foreground">Real-time network analysis and monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                {timeRange}
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem onClick={() => setTimeRange("15m")}>15 minutes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("1h")}>1 hour</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("24h")}>24 hours</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("7d")}>7 days</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === "chart" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("chart")}
              className="rounded-r-none"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-l-none"
            >
              <Table className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Bandwidth Chart */}
      <div className="panel animate-fade-in">
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-foreground">Bandwidth Usage</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span className="text-muted-foreground">Inbound</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-accent"></span>
              <span className="text-muted-foreground">Outbound</span>
            </div>
          </div>
        </div>
        <div className="p-4 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={networkData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 30%, 18%)" />
              <XAxis
                dataKey="time"
                stroke="hsl(175, 20%, 55%)"
                fontSize={10}
                tickLine={false}
                interval={9}
              />
              <YAxis
                stroke="hsl(175, 20%, 55%)"
                fontSize={10}
                tickLine={false}
                tickFormatter={(v) => `${v} KB/s`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(180, 25%, 10%)",
                  border: "1px solid hsl(180, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="inbound"
                stroke="hsl(175, 60%, 45%)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="outbound"
                stroke="hsl(165, 70%, 40%)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Protocol Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="panel animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Protocol Distribution</h3>
          </div>
          <div className="p-4 space-y-3">
            {protocolData.map((item) => (
              <div key={item.protocol} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-mono text-foreground">{item.protocol}</span>
                  <span className="text-muted-foreground">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Connection Statistics</h3>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase">Active Connections</span>
              <p className="text-2xl font-bold font-mono text-foreground">24,892</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase">Avg Latency</span>
              <p className="text-2xl font-bold font-mono text-foreground">42ms</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase">Packet Loss</span>
              <p className="text-2xl font-bold font-mono text-threat-safe">0.02%</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground uppercase">Throughput</span>
              <p className="text-2xl font-bold font-mono text-foreground">1.2 GB/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
