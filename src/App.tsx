import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import OverviewPage from "@/pages/OverviewPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ToolchainPage from "@/pages/ToolchainPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import CleanupPage from "@/pages/CleanupPage";
import MigrationPage from "@/pages/MigrationPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/toolchain" element={<ToolchainPage />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/cleanup" element={<CleanupPage />} />
            <Route path="/migration" element={<MigrationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
