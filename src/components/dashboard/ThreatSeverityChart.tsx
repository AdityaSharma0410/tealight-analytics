import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

const threatData = [
  { name: "Critical", count: 12, color: "hsl(0, 70%, 55%)" },
  { name: "High", count: 45, color: "hsl(25, 90%, 55%)" },
  { name: "Medium", count: 128, color: "hsl(45, 90%, 55%)" },
  { name: "Low", count: 234, color: "hsl(80, 60%, 50%)" },
  { name: "Info", count: 567, color: "hsl(145, 60%, 45%)" },
];

export function ThreatSeverityChart() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 300);
  }, []);

  return (
    <div className="panel h-full animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-foreground">Threat Severity Spectrum</h3>
        <span className="text-xs text-muted-foreground">Last 24 hours</span>
      </div>
      <div className="p-4 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={threatData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(180, 30%, 18%)" horizontal={false} />
            <XAxis
              type="number"
              stroke="hsl(175, 20%, 55%)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(175, 20%, 55%)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(180, 25%, 10%)",
                border: "1px solid hsl(180, 30%, 18%)",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelStyle={{ color: "hsl(175, 30%, 90%)" }}
              cursor={{ fill: "hsl(180, 25%, 15%)" }}
            />
            <Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              isAnimationActive={animated}
              animationDuration={1000}
            >
              {threatData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
