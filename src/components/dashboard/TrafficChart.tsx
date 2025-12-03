import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

const generateData = () => {
  const data = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: hour.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      requests: Math.floor(Math.random() * 5000) + 2000,
      threats: Math.floor(Math.random() * 200) + 50,
      blocked: Math.floor(Math.random() * 100) + 20,
    });
  }
  return data;
};

export function TrafficChart() {
  const [data, setData] = useState<any[]>([]);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setData(generateData());
    setTimeout(() => setAnimated(true), 100);
  }, []);

  return (
    <div className="panel h-full animate-fade-in" style={{ animationDelay: "200ms" }}>
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-foreground">Traffic Overview</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-primary"></span>
            <span className="text-muted-foreground">Requests</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-threat-medium"></span>
            <span className="text-muted-foreground">Threats</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-threat-high"></span>
            <span className="text-muted-foreground">Blocked</span>
          </div>
        </div>
      </div>
      <div className="p-4 h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(175, 60%, 45%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(175, 60%, 45%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(45, 90%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(45, 90%, 55%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(25, 90%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(25, 90%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 30%, 18%)" />
            <XAxis
              dataKey="time"
              stroke="hsl(175, 20%, 55%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(175, 20%, 55%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(180, 25%, 10%)",
                border: "1px solid hsl(180, 30%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(175, 30%, 90%)" }}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="hsl(175, 60%, 45%)"
              fillOpacity={1}
              fill="url(#colorRequests)"
              strokeWidth={2}
              isAnimationActive={animated}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="threats"
              stroke="hsl(45, 90%, 55%)"
              fillOpacity={1}
              fill="url(#colorThreats)"
              strokeWidth={2}
              isAnimationActive={animated}
              animationDuration={1500}
            />
            <Area
              type="monotone"
              dataKey="blocked"
              stroke="hsl(25, 90%, 55%)"
              fillOpacity={1}
              fill="url(#colorBlocked)"
              strokeWidth={2}
              isAnimationActive={animated}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
