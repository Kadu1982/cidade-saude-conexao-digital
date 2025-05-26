
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout';
import Index from './pages/Index';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';
import Agendamento from './pages/Agendamento';
import AtendimentoMedico from './pages/AtendimentoMedico';
import AtendimentoOdontologico from './pages/AtendimentoOdontologico';
import Exames from './pages/Exames';
import Farmacia from './pages/Farmacia';
import Faturamento from './pages/Faturamento';
import Vacinas from './pages/Vacinas';
import Transporte from './pages/Transporte';
import VigilanciaSanitaria from './pages/VigilanciaSanitaria';
import VigilanciaAmbiental from './pages/VigilanciaAmbiental';
import Epidemiologia from './pages/Epidemiologia';
import Ouvidoria from './pages/Ouvidoria';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import Recepcao from './pages/Recepcao';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="login" element={<Login />} />
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="cadastro" element={
                <ProtectedRoute>
                  <Cadastro />
                </ProtectedRoute>
              } />
              <Route path="recepcao" element={
                <ProtectedRoute>
                  <Recepcao />
                </ProtectedRoute>
              } />
              <Route path="agendamento" element={
                <ProtectedRoute>
                  <Agendamento />
                </ProtectedRoute>
              } />
              <Route path="atendimento-medico" element={
                <ProtectedRoute>
                  <AtendimentoMedico />
                </ProtectedRoute>
              } />
              <Route path="atendimento-odontologico" element={
                <ProtectedRoute>
                  <AtendimentoOdontologico />
                </ProtectedRoute>
              } />
              <Route path="exames" element={
                <ProtectedRoute>
                  <Exames />
                </ProtectedRoute>
              } />
              <Route path="farmacia" element={
                <ProtectedRoute>
                  <Farmacia />
                </ProtectedRoute>
              } />
              <Route path="faturamento" element={
                <ProtectedRoute>
                  <Faturamento />
                </ProtectedRoute>
              } />
              <Route path="vacinas" element={
                <ProtectedRoute>
                  <Vacinas />
                </ProtectedRoute>
              } />
              <Route path="transporte" element={
                <ProtectedRoute>
                  <Transporte />
                </ProtectedRoute>
              } />
              <Route path="vigilancia-sanitaria" element={
                <ProtectedRoute>
                  <VigilanciaSanitaria />
                </ProtectedRoute>
              } />
              <Route path="vigilancia-ambiental" element={
                <ProtectedRoute>
                  <VigilanciaAmbiental />
                </ProtectedRoute>
              } />
              <Route path="epidemiologia" element={
                <ProtectedRoute>
                  <Epidemiologia />
                </ProtectedRoute>
              } />
              <Route path="ouvidoria" element={
                <ProtectedRoute>
                  <Ouvidoria />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
