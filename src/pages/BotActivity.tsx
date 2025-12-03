import { cn } from "@/lib/utils";
import { Bot, User, AlertCircle, CheckCircle } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const botData = [
  { name: "Human", value: 72, color: "hsl(175, 60%, 45%)" },
  { name: "Good Bots", value: 15, color: "hsl(145, 60%, 45%)" },
  { name: "Bad Bots", value: 10, color: "hsl(25, 90%, 55%)" },
  { name: "Unknown", value: 3, color: "hsl(45, 90%, 55%)" },
];

const botTypeData = [
  { type: "Googlebot", count: 12450, status: "verified" },
  { type: "Bingbot", count: 8230, status: "verified" },
  { type: "GPTBot", count: 5670, status: "verified" },
  { type: "AhrefsBot", count: 4320, status: "verified" },
  { type: "Unknown Scraper", count: 3890, status: "suspicious" },
  { type: "Headless Chrome", count: 2340, status: "suspicious" },
  { type: "Selenium", count: 1890, status: "blocked" },
  { type: "Curl/wget", count: 1230, status: "suspicious" },
];

const hourlyBotData = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  human: Math.floor(Math.random() * 5000) + 3000,
  bot: Math.floor(Math.random() * 1500) + 500,
}));

const statusStyles = {
  verified: { bg: "bg-threat-safe/20", text: "text-threat-safe", icon: CheckCircle },
  suspicious: { bg: "bg-threat-medium/20", text: "text-threat-medium", icon: AlertCircle },
  blocked: { bg: "bg-threat-high/20", text: "text-threat-high", icon: AlertCircle },
};

export default function BotActivity() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Bot Activity Monitor</h1>
        <p className="text-sm text-muted-foreground">Automated traffic detection and classification</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="panel p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-primary/20 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">72%</p>
              <p className="text-xs text-muted-foreground">Human Traffic</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "50ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-safe/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-threat-safe" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">15%</p>
              <p className="text-xs text-muted-foreground">Good Bots</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-high/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-threat-high" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">10%</p>
              <p className="text-xs text-muted-foreground">Bad Bots</p>
            </div>
          </div>
        </div>
        <div className="panel p-4 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-threat-medium/20 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-threat-medium" />
            </div>
            <div>
              <p className="text-2xl font-bold font-mono text-foreground">3%</p>
              <p className="text-xs text-muted-foreground">Unknown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Traffic Distribution */}
        <div className="panel animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Traffic Distribution</h3>
          </div>
          <div className="p-4 flex items-center">
            <div className="w-1/2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={botData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {botData.map((entry, index) => (
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
            <div className="flex-1 space-y-3">
              {botData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold font-mono text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hourly Bot Activity */}
        <div className="panel animate-fade-in" style={{ animationDelay: "250ms" }}>
          <div className="panel-header">
            <h3 className="text-sm font-semibold text-foreground">Hourly Activity</h3>
          </div>
          <div className="p-4 h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyBotData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 30%, 18%)" />
                <XAxis dataKey="hour" stroke="hsl(175, 20%, 55%)" fontSize={9} interval={3} />
                <YAxis stroke="hsl(175, 20%, 55%)" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(180, 25%, 10%)",
                    border: "1px solid hsl(180, 30%, 18%)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="human" fill="hsl(175, 60%, 45%)" stackId="a" />
                <Bar dataKey="bot" fill="hsl(45, 90%, 55%)" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bot Types Table */}
      <div className="panel animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-foreground">Detected Bot Types</h3>
          <span className="text-xs text-muted-foreground">{botTypeData.length} types identified</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                <th className="text-left p-3">Bot Type</th>
                <th className="text-left p-3">Requests</th>
                <th className="text-left p-3">Status</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {botTypeData.map((bot, index) => {
                const status = statusStyles[bot.status as keyof typeof statusStyles];
                const StatusIcon = status.icon;
                return (
                  <tr
                    key={bot.type}
                    className="border-b border-border/50 hover:bg-secondary/30 transition-colors animate-fade-in"
                    style={{ animationDelay: `${350 + index * 30}ms` }}
                  >
                    <td className="p-3 font-mono text-sm text-foreground">{bot.type}</td>
                    <td className="p-3 font-mono text-sm text-muted-foreground">
                      {bot.count.toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className={cn("px-2 py-1 rounded text-xs font-medium flex items-center gap-1 w-fit", status.bg, status.text)}>
                        <StatusIcon className="h-3 w-3" />
                        {bot.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-xs text-primary hover:underline">View Details</button>
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
