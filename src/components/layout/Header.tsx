import { Bell, Menu, Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-1.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search logs, IPs, threats..."
              className="w-64 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Live Status Indicator */}
        <div className="flex items-center gap-2 rounded-md bg-threat-safe/10 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-threat-safe opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-threat-safe"></span>
          </span>
          <span className="text-xs font-medium text-threat-safe">LIVE</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          className={isRefreshing ? "animate-spin" : ""}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-threat-high text-[10px] font-bold text-foreground">
            3
          </span>
        </Button>

        <div className="ml-2 flex items-center gap-2 rounded-md bg-secondary/50 px-3 py-1.5">
          <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs font-semibold text-primary">AD</span>
          </div>
          <span className="text-sm font-medium text-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}
