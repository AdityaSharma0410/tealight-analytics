import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Shield, Database, Key, User, Globe } from "lucide-react";

interface SettingSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  settings: {
    id: string;
    label: string;
    description: string;
    type: "toggle" | "select" | "input";
    value?: boolean | string;
  }[];
}

const settingSections: SettingSection[] = [
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    settings: [
      { id: "email_alerts", label: "Email Alerts", description: "Receive email notifications for critical threats", type: "toggle", value: true },
      { id: "slack_integration", label: "Slack Integration", description: "Send alerts to Slack channels", type: "toggle", value: false },
      { id: "sms_alerts", label: "SMS Alerts", description: "Receive SMS for high-severity incidents", type: "toggle", value: true },
    ],
  },
  {
    id: "security",
    title: "Security Settings",
    icon: Shield,
    settings: [
      { id: "auto_block", label: "Auto-Block Threats", description: "Automatically block IPs with high threat scores", type: "toggle", value: true },
      { id: "rate_limiting", label: "Rate Limiting", description: "Enable request rate limiting per IP", type: "toggle", value: true },
      { id: "geo_blocking", label: "Geo-Blocking", description: "Block traffic from high-risk countries", type: "toggle", value: false },
    ],
  },
  {
    id: "data",
    title: "Data & Storage",
    icon: Database,
    settings: [
      { id: "log_retention", label: "Log Retention", description: "Days to retain log data", type: "select", value: "30" },
      { id: "data_export", label: "Automatic Export", description: "Export data to external storage", type: "toggle", value: false },
      { id: "compression", label: "Data Compression", description: "Compress stored data to save space", type: "toggle", value: true },
    ],
  },
  {
    id: "api",
    title: "API Configuration",
    icon: Key,
    settings: [
      { id: "api_access", label: "API Access", description: "Enable external API access", type: "toggle", value: true },
      { id: "webhook_enabled", label: "Webhooks", description: "Enable webhook notifications", type: "toggle", value: true },
    ],
  },
];

export default function Settings() {
  const [settings, setSettings] = useState(settingSections);

  const handleToggle = (sectionId: string, settingId: string) => {
    setSettings((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              settings: section.settings.map((setting) =>
                setting.id === settingId
                  ? { ...setting, value: !setting.value }
                  : setting
              ),
            }
          : section
      )
    );
  };

  return (
    <div className="space-y-4 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your security dashboard preferences</p>
      </div>

      {/* Settings Sections */}
      {settings.map((section, sectionIndex) => (
        <div
          key={section.id}
          className="panel animate-fade-in"
          style={{ animationDelay: `${sectionIndex * 100}ms` }}
        >
          <div className="panel-header">
            <div className="flex items-center gap-3">
              <section.icon className="h-5 w-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            </div>
          </div>
          <div className="divide-y divide-border">
            {section.settings.map((setting, settingIndex) => (
              <div
                key={setting.id}
                className="p-4 flex items-center justify-between animate-fade-in"
                style={{ animationDelay: `${(sectionIndex * 100) + (settingIndex * 50)}ms` }}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{setting.label}</p>
                  <p className="text-xs text-muted-foreground">{setting.description}</p>
                </div>
                {setting.type === "toggle" && (
                  <Switch
                    checked={setting.value as boolean}
                    onCheckedChange={() => handleToggle(section.id, setting.id)}
                  />
                )}
                {setting.type === "select" && (
                  <select className="bg-secondary border border-border rounded-md px-3 py-1.5 text-sm text-foreground">
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="365">1 year</option>
                  </select>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* User Profile Section */}
      <div className="panel animate-fade-in" style={{ animationDelay: "400ms" }}>
        <div className="panel-header">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">User Profile</h3>
          </div>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">AD</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Admin User</p>
              <p className="text-sm text-muted-foreground">admin@secureview.io</p>
              <p className="text-xs text-primary">Super Administrator</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Edit Profile</Button>
            <Button variant="outline" size="sm">Change Password</Button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="ghost">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
