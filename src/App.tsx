import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Index from "./pages/Index";
import NetworkTraffic from "./pages/NetworkTraffic";
import ThreatIntelligence from "./pages/ThreatIntelligence";
import BotActivity from "./pages/BotActivity";
import UserAgentAnalyzer from "./pages/UserAgentAnalyzer";
import IPReputation from "./pages/IPReputation";
import LogsForensics from "./pages/LogsForensics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/network" element={<NetworkTraffic />} />
            <Route path="/threats" element={<ThreatIntelligence />} />
            <Route path="/bots" element={<BotActivity />} />
            <Route path="/user-agents" element={<UserAgentAnalyzer />} />
            <Route path="/ip-reputation" element={<IPReputation />} />
            <Route path="/logs" element={<LogsForensics />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
