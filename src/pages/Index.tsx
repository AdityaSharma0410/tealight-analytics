import { Activity, Shield, Users, AlertTriangle } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { ThreatSeverityChart } from "@/components/dashboard/ThreatSeverityChart";
import { TrafficCompositionChart } from "@/components/dashboard/TrafficCompositionChart";
import { LogFeed } from "@/components/dashboard/LogFeed";
import { WorldMap } from "@/components/dashboard/WorldMap";

const Index = () => {
  return (
    <div className="space-y-4">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Requests"
          value="1.2M"
          change={12.5}
          trend="up"
          icon={Activity}
          delay={0}
        />
        <StatsCard
          title="Threats Detected"
          value="2,847"
          change={-8.3}
          trend="down"
          icon={Shield}
          delay={50}
        />
        <StatsCard
          title="Active Sessions"
          value="14,892"
          change={5.2}
          trend="up"
          icon={Users}
          delay={100}
        />
        <StatsCard
          title="Blocked IPs"
          value="486"
          change={23.1}
          trend="up"
          icon={AlertTriangle}
          delay={150}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <div className="space-y-4">
          <ThreatSeverityChart />
        </div>
      </div>

      {/* Map and Composition Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <WorldMap />
        </div>
        <TrafficCompositionChart />
      </div>

      {/* Log Feed */}
      <div className="h-[400px]">
        <LogFeed />
      </div>
    </div>
  );
};

export default Index;
