import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Obrigado from "./pages/Obrigado";
import ClarityRouteTags from "@/components/clarity/ClarityRouteTags";
import ClickTracker from "@/components/clarity/ClickTracker";
import { UtmCollector } from "@/components/clarity/UtmCollector";

const queryClient = new QueryClient();

// Configuração padrão para page_type do Clarity
if (typeof window !== "undefined" && !(window as any).__clarityRouteConfig) {
  (window as any).__clarityRouteConfig = {
    pageTypeFrom: (pathname: string | null) => {
      const p = pathname || "/";
      if (p === "/") return "form";
      return "other";
    },
    enableViewEvent: true,
  };
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ClarityRouteTags />
        <UtmCollector />
        <ClickTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/obrigado" element={<Obrigado />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;