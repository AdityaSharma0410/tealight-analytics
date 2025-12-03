import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";

const compositionData = [
  { name: "Legitimate", value: 68, color: "hsl(175, 60%, 45%)" },
  { name: "Bot Traffic", value: 15, color: "hsl(45, 90%, 55%)" },
  { name: "Suspicious", value: 12, color: "hsl(25, 90%, 55%)" },
  { name: "Blocked", value: 5, color: "hsl(0, 70%, 55%)" },
];

export function TrafficCompositionChart() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 400);
  }, []);

  return (
    <div className="panel h-full animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="panel-header">
        <h3 className="text-sm font-semibold text-foreground">Traffic Composition</h3>
        <span className="text-xs text-muted-foreground">Real-time</span>
      </div>
      <div className="p-4 flex items-center gap-4">
        <div className="w-1/2 h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={compositionData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                isAnimationActive={animated}
                animationDuration={1000}
                animationBegin={200}
              >
                {compositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(180, 25%, 10%)",
                  border: "1px solid hsl(180, 30%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`${value}%`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-3">
          {compositionData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-semibold font-mono text-foreground">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
