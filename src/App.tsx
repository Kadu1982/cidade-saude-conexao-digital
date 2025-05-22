
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import AtendimentoMedico from "./pages/AtendimentoMedico";
import AtendimentoOdontologico from "./pages/AtendimentoOdontologico";
import Faturamento from "./pages/Faturamento";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/cadastro" element={<Layout><Cadastro /></Layout>} />
          <Route path="/agendamento" element={<Layout><Agendamento /></Layout>} />
          <Route path="/atendimento-medico" element={<Layout><AtendimentoMedico /></Layout>} />
          <Route path="/atendimento-odontologico" element={<Layout><AtendimentoOdontologico /></Layout>} />
          <Route path="/faturamento" element={<Layout><Faturamento /></Layout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
