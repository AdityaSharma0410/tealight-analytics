import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Network,
  Shield,
  Bot,
  UserSearch,
  Globe,
  FileText,
  Settings,
  ChevronLeft,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/network", icon: Network, label: "Network Traffic" },
  { to: "/threats", icon: Shield, label: "Threat Intelligence" },
  { to: "/bots", icon: Bot, label: "Bot Activity" },
  { to: "/user-agents", icon: UserSearch, label: "User-Agent Analyzer" },
  { to: "/ip-reputation", icon: Globe, label: "IP Reputation" },
  { to: "/logs", icon: FileText, label: "Logs & Forensics" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex h-14 items-center border-b border-border px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-foreground animate-fade-in">
              SecureView
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/50 hover:text-foreground",
              collapsed && "justify-center px-2"
            )}
            activeClassName="bg-primary/10 text-primary border-l-2 border-primary"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && (
              <span className="animate-fade-in">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className={cn("w-full justify-center", collapsed && "px-0")}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </aside>
  );
}
