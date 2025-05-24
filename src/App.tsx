
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Cadastro from "./pages/Cadastro";
import Agendamento from "./pages/Agendamento";
import AtendimentoMedico from "./pages/AtendimentoMedico";
import AtendimentoOdontologico from "./pages/AtendimentoOdontologico";
import Farmacia from "./pages/Farmacia";
import Ouvidoria from "./pages/Ouvidoria";
import VigilanciaAmbiental from "./pages/VigilanciaAmbiental";
import VigilanciaSanitaria from "./pages/VigilanciaSanitaria";
import Epidemiologia from "./pages/Epidemiologia";
import Vacinas from "./pages/Vacinas";
import Transporte from "./pages/Transporte";
import Faturamento from "./pages/Faturamento";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/" element={
        <Layout>
          <ProtectedRoute requiredPermission="dashboard">
            <Dashboard />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/cadastro" element={
        <Layout>
          <ProtectedRoute requiredPermission="cadastro">
            <Cadastro />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/agendamento" element={
        <Layout>
          <ProtectedRoute requiredPermission="agendamento">
            <Agendamento />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/atendimento-medico" element={
        <Layout>
          <ProtectedRoute requiredPermission="atendimento-medico">
            <AtendimentoMedico />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/atendimento-odontologico" element={
        <Layout>
          <ProtectedRoute requiredPermission="atendimento-odontologico">
            <AtendimentoOdontologico />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/farmacia" element={
        <Layout>
          <ProtectedRoute requiredPermission="farmacia">
            <Farmacia />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/ouvidoria" element={
        <Layout>
          <ProtectedRoute requiredPermission="ouvidoria">
            <Ouvidoria />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/vigilancia-ambiental" element={
        <Layout>
          <ProtectedRoute requiredPermission="vigilancia">
            <VigilanciaAmbiental />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/vigilancia-sanitaria" element={
        <Layout>
          <ProtectedRoute requiredPermission="vigilancia">
            <VigilanciaSanitaria />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/epidemiologia" element={
        <Layout>
          <ProtectedRoute requiredPermission="epidemiologia">
            <Epidemiologia />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/vacinas" element={
        <Layout>
          <ProtectedRoute requiredPermission="vacinas">
            <Vacinas />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/transporte" element={
        <Layout>
          <ProtectedRoute requiredPermission="transporte">
            <Transporte />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="/faturamento" element={
        <Layout>
          <ProtectedRoute requiredPermission="faturamento">
            <Faturamento />
          </ProtectedRoute>
        </Layout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
