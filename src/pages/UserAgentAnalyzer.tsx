import { cn } from "@/lib/utils";
import { Monitor, Smartphone, Globe, Apple, Chrome } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const browserData = [
  { name: "Chrome", value: 58, color: "hsl(175, 60%, 45%)" },
  { name: "Safari", value: 18, color: "hsl(165, 70%, 40%)" },
  { name: "Firefox", value: 12, color: "hsl(145, 60%, 45%)" },
  { name: "Edge", value: 8, color: "hsl(45, 90%, 55%)" },
  { name: "Other", value: 4, color: "hsl(180, 30%, 30%)" },
];

const osData = [
  { name: "Windows", percentage: 45, count: 234567 },
  { name: "macOS", percentage: 22, count: 114523 },
  { name: "Android", percentage: 18, count: 93782 },
  { name: "iOS", percentage: 12, count: 62456 },
  { name: "Linux", percentage: 3, count: 15632 },
];

const deviceData = [
  { name: "Desktop", value: 62, color: "hsl(175, 60%, 45%)" },
  { name: "Mobile", value: 32, color: "hsl(165, 70%, 40%)" },
  { name: "Tablet", value: 6, color: "hsl(145, 60%, 45%)" },
];

const suspiciousUAs = [
  { ua: "python-requests/2.28.0", count: 4523, risk: "high" },
  { ua: "curl/7.81.0", count: 3421, risk: "medium" },
  { ua: "HeadlessChrome/119.0.0.0", count: 2890, risk: "high" },
  { ua: "Go-http-client/1.1", count: 1234, risk: "medium" },
  { ua: "Apache-HttpClient/4.5.13", count: 987, risk: "low" },
];

const riskStyles = {
  high: "threat-high",
  medium: "threat-medium",
  low: "threat-low",
};

export default function UserAgentAnalyzer() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">User-Agent Analyzer</h1>
        <p className="text-sm text-muted-foreground">Browser, OS, and device fingerprint analysis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="panel p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center">
              <Monitor className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">62%</p>
              <p className="text-xs text-muted-foreground">Desktop Users</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-accent/20 flex items-center justify-center">
              <Smartphone className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">32%</p>
              <p className="text-xs text-muted-foreground">Mobile Users</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-medium/20 flex items-center justify-center">
              <Globe className="h-5 w-5 text-threat-medium" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">847</p>
              <p className="text-xs text-muted-foreground">Unique UAs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Browser Distribution */}
        <div className="panel animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Browser Distribution</h3>
          </div>
          <div className="p-4">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {browserData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(180, 25%, 10%)",
                      border: "1px solid hsl(180, 30%, 18%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {browserData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-mono text-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Device Types */}
        <div className="panel animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Device Types</h3>
          </div>
          <div className="p-4">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(180, 25%, 10%)",
                      border: "1px solid hsl(180, 30%, 18%)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {deviceData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-muted-foreground">{item.name}</span>
                  <span className="font-mono text-foreground ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* OS Distribution */}
        <div className="panel animate-fade-in" style={{ animationDelay: "250ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Operating Systems</h3>
          </div>
          <div className="p-4 space-y-3">
            {osData.map((os) => (
              <div key={os.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{os.name}</span>
                  <span className="font-mono text-foreground">{os.percentage}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${os.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suspicious User Agents */}
      <div className="panel animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-foreground">Suspicious User-Agents</h3>
          <span className="text-xs text-muted-foreground">Potentially automated or malicious</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                <th className="text-left p-3">User-Agent String</th>
                <th className="text-left p-3">Request Count</th>
                <th className="text-left p-3">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousUAs.map((ua, index) => (
                <tr
                  key={ua.ua}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                  style={{ animationDelay: `${350 + index * 30}ms` }}
                >
                  <td className="p-3 font-mono text-xs text-foreground">{ua.ua}</td>
                  <td className="p-3 font-mono text-sm text-muted-foreground">
                    {ua.count.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className={cn("px-2 py-1 rounded text-xs font-semibold capitalize", riskStyles[ua.risk as keyof typeof riskStyles])}>
                      {ua.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
