
# Integração Frontend-Backend - Sistema SUS

Este documento descreve como conectar o frontend React/TypeScript ao backend Flask/Python do Sistema SUS.

## 🏗️ Arquitetura da Integração

```
Frontend (React/TS)  ←→  Backend API (Flask/Python)  ←→  Database (PostgreSQL)
     ↓                        ↓                           ↓
   Port 3000                Port 5000                  Port 5432
```

## 📡 Configuração da API Base

### 1. Service de Configuração da API

```typescript
// src/services/api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Interceptor para adicionar token JWT
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para tratar respostas
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiService = new ApiService();
```

### 2. Tipos TypeScript para as APIs

```typescript
// src/types/api.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
  per_page: number;
}

// Tipos para Pacientes
export interface Paciente {
  id: string;
  nome: string;
  cpf: string;
  cartaoSus: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  telefone?: string;
  endereco?: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Tipos para APAC
export interface APAC {
  id: string;
  numero: string;
  tipo: 'inicial' | 'continuacao' | 'unica';
  pacienteId: string;
  paciente: Paciente;
  cns: string;
  cid10: string;
  procedimento: string;
  unidadeId: string;
  profissionalId: string;
  dataInicio: string;
  dataFim?: string;
  competencia: string;
  status: 'gerada' | 'cancelada' | 'processada';
  arquivoPdf?: string;
  observacoes?: string;
  createdAt: string;
  updatedAt: string;
}

// Tipos para Ouvidoria
export interface Manifestacao {
  id: string;
  protocolo: string;
  tipo: 'reclamacao' | 'sugestao' | 'elogio' | 'denuncia';
  categoria: string;
  descricao: string;
  status: 'aberta' | 'em_andamento' | 'resolvida' | 'fechada';
  resposta?: string;
  dataResposta?: string;
  anexos?: string[];
  createdAt: string;
  updatedAt: string;
}
```

## 🔐 Autenticação

### 1. Service de Autenticação

```typescript
// src/services/authService.ts
import { apiService } from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    unidadeSaude: string;
    crmCoren?: string;
    permissions: string[];
  };
}

export class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiService.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );
    
    if (response.success) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
      return response.data;
    }
    
    throw new Error(response.message || 'Erro no login');
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
    }
  }

  getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}

export const authService = new AuthService();
```

## 👥 Serviços para Módulos Específicos

### 1. Service de Pacientes

```typescript
// src/services/pacienteService.ts
import { apiService } from './api';
import { Paciente, ApiResponse, PaginatedResponse } from '../types/api';

export interface PacienteFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface CreatePacienteRequest {
  nome: string;
  cpf: string;
  cartaoSus: string;
  dataNascimento: string;
  sexo: 'M' | 'F';
  telefone?: string;
  endereco?: {
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
  };
}

export class PacienteService {
  async listar(filters: PacienteFilters = {}): Promise<PaginatedResponse<Paciente>> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());

    const response = await apiService.get<ApiResponse<PaginatedResponse<Paciente>>>(
      `/pacientes?${params.toString()}`
    );
    
    return response.data;
  }

  async buscarPorCpf(cpf: string): Promise<Paciente | null> {
    try {
      const response = await apiService.get<ApiResponse<Paciente>>(
        `/pacientes/buscar?cpf=${cpf}`
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  async criar(dados: CreatePacienteRequest): Promise<Paciente> {
    const response = await apiService.post<ApiResponse<Paciente>>(
      '/pacientes',
      dados
    );
    return response.data;
  }

  async atualizar(id: string, dados: Partial<CreatePacienteRequest>): Promise<Paciente> {
    const response = await apiService.put<ApiResponse<Paciente>>(
      `/pacientes/${id}`,
      dados
    );
    return response.data;
  }
}

export const pacienteService = new PacienteService();
```

### 2. Service de APAC

```typescript
// src/services/apacService.ts
import { apiService } from './api';
import { APAC, ApiResponse, PaginatedResponse } from '../types/api';

export interface CreateAPACRequest {
  tipo: 'inicial' | 'continuacao' | 'unica';
  pacienteId: string;
  cns: string;
  cid10: string;
  procedimento: string;
  unidadeId: string;
  profissionalId: string;
  dataInicio: string;
  dataFim?: string;
  observacoes?: string;
}

export class APACService {
  async gerar(dados: CreateAPACRequest): Promise<APAC> {
    const response = await apiService.post<ApiResponse<APAC>>(
      '/apac/gerar',
      dados
    );
    return response.data;
  }

  async listar(page = 1, limit = 10): Promise<PaginatedResponse<APAC>> {
    const response = await apiService.get<ApiResponse<PaginatedResponse<APAC>>>(
      `/apacs?page=${page}&limit=${limit}`
    );
    return response.data;
  }

  async buscarPorPaciente(cns: string): Promise<APAC[]> {
    const response = await apiService.get<ApiResponse<APAC[]>>(
      `/paciente/${cns}/apacs`
    );
    return response.data;
  }

  async downloadPdf(apacId: string): Promise<Blob> {
    const response = await apiService.get(`/apac/${apacId}/pdf`, {
      responseType: 'blob'
    });
    return response;
  }
}

export const apacService = new APACService();
```

### 3. Service de Ouvidoria

```typescript
// src/services/ouvidoriaService.ts
import { apiService } from './api';
import { Manifestacao, ApiResponse } from '../types/api';

export interface CreateManifestacaoRequest {
  tipo: 'reclamacao' | 'sugestao' | 'elogio' | 'denuncia';
  categoria: string;
  descricao: string;
  anexos?: File[];
  aceitaTermos: boolean;
}

export class OuvidoriaService {
  async criarManifestacao(dados: CreateManifestacaoRequest): Promise<{ protocolo: string }> {
    const formData = new FormData();
    formData.append('tipo', dados.tipo);
    formData.append('categoria', dados.categoria);
    formData.append('descricao', dados.descricao);
    formData.append('aceitaTermos', dados.aceitaTermos.toString());
    
    dados.anexos?.forEach((arquivo, index) => {
      formData.append(`anexo_${index}`, arquivo);
    });

    const response = await apiService.post<ApiResponse<{ protocolo: string }>>(
      '/ouvidoria/manifestacoes',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    return response.data;
  }

  async buscarPorProtocolo(protocolo: string): Promise<Manifestacao> {
    const response = await apiService.get<ApiResponse<Manifestacao>>(
      `/ouvidoria/manifestacoes/${protocolo}`
    );
    return response.data;
  }
}

export const ouvidoriaService = new OuvidoriaService();
```

## 🪝 React Hooks para Integração

### 1. Hook de Pacientes

```typescript
// src/hooks/usePacientes.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pacienteService, CreatePacienteRequest, PacienteFilters } from '../services/pacienteService';
import { useToast } from './use-toast';

export function usePacientes(filters: PacienteFilters = {}) {
  return useQuery({
    queryKey: ['pacientes', filters],
    queryFn: () => pacienteService.listar(filters),
  });
}

export function usePacientePorCpf(cpf: string) {
  return useQuery({
    queryKey: ['paciente', 'cpf', cpf],
    queryFn: () => pacienteService.buscarPorCpf(cpf),
    enabled: !!cpf && cpf.length === 11,
  });
}

export function useCriarPaciente() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (dados: CreatePacienteRequest) => pacienteService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pacientes'] });
      toast({
        title: "Sucesso",
        description: "Paciente cadastrado com sucesso",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao cadastrar paciente",
        variant: "destructive",
      });
    },
  });
}
```

### 2. Hook de APAC

```typescript
// src/hooks/useAPAC.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apacService, CreateAPACRequest } from '../services/apacService';
import { useToast } from './use-toast';

export function useAPACs(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['apacs', page, limit],
    queryFn: () => apacService.listar(page, limit),
  });
}

export function useGerarAPAC() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (dados: CreateAPACRequest) => apacService.gerar(dados),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['apacs'] });
      toast({
        title: "APAC Gerada",
        description: `APAC ${data.numero} gerada com sucesso`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.response?.data?.message || "Erro ao gerar APAC",
        variant: "destructive",
      });
    },
  });
}
```

## 🌐 Exemplo de Uso em Componentes

### 1. Componente de Lista de Pacientes

```typescript
// src/components/pacientes/ListaPacientes.tsx
import React, { useState } from 'react';
import { usePacientes } from '../../hooks/usePacientes';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ListaPacientes() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const { data, isLoading, error } = usePacientes({ search, page, limit: 10 });

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar pacientes</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacientes</CardTitle>
        <Input
          placeholder="Buscar por nome, CPF ou CNS"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </CardHeader>
      <CardContent>
        {data?.data.map((paciente) => (
          <div key={paciente.id} className="p-4 border-b">
            <h3 className="font-medium">{paciente.nome}</h3>
            <p className="text-sm text-gray-600">CPF: {paciente.cpf}</p>
            <p className="text-sm text-gray-600">CNS: {paciente.cartaoSus}</p>
          </div>
        ))}
        
        <div className="flex justify-between mt-4">
          <Button 
            disabled={page === 1} 
            onClick={() => setPage(page - 1)}
          >
            Anterior
          </Button>
          <Button 
            disabled={!data || page >= data.pages} 
            onClick={() => setPage(page + 1)}
          >
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

## ⚙️ Configurações de Ambiente

### 1. Arquivo .env.local (Frontend)

```bash
# API Backend
REACT_APP_API_URL=http://localhost:5000/api

# Configurações de Upload
REACT_APP_MAX_FILE_SIZE=16777216

# URLs de Integração
REACT_APP_N8N_WEBHOOK_URL=http://localhost:5678/webhook

# Configurações de Debug
REACT_APP_DEBUG=true
```

### 2. Configuração do Vite/React

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

## 🔧 Tratamento de Erros

### 1. Service de Erro Global

```typescript
// src/services/errorService.ts
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  status?: number;
}

export class ErrorService {
  static handleApiError(error: any): ApiError {
    if (error.response) {
      return {
        message: error.response.data?.message || 'Erro no servidor',
        code: error.response.data?.code,
        status: error.response.status,
      };
    }
    
    if (error.request) {
      return {
        message: 'Erro de conexão com o servidor',
        code: 'NETWORK_ERROR',
      };
    }
    
    return {
      message: error.message || 'Erro desconhecido',
      code: 'UNKNOWN_ERROR',
    };
  }
}
```

## 📋 Checklist de Integração

### ✅ Configuração Inicial
- [ ] Configurar variáveis de ambiente
- [ ] Instalar dependências (axios, @tanstack/react-query)
- [ ] Configurar proxy no Vite para desenvolvimento
- [ ] Criar service base da API

### ✅ Autenticação
- [ ] Implementar service de login/logout
- [ ] Configurar interceptors para JWT
- [ ] Criar context de autenticação
- [ ] Proteger rotas com ProtectedRoute

### ✅ Serviços por Módulo
- [ ] Criar services para cada módulo (Pacientes, APAC, Ouvidoria)
- [ ] Definir tipos TypeScript para todas as APIs
- [ ] Implementar hooks personalizados com React Query
- [ ] Adicionar tratamento de erros

### ✅ Testes de Integração
- [ ] Testar conexão com backend
- [ ] Validar autenticação
- [ ] Testar CRUD de cada módulo
- [ ] Verificar upload de arquivos

## 🚀 Comandos para Desenvolvimento

```bash
# Instalar dependências
npm install axios @tanstack/react-query

# Iniciar frontend (modo desenvolvimento)
npm run dev

# Iniciar backend (Flask)
cd backend && python run.py

# Docker Compose (ambiente completo)
docker-compose up -d
```

## 📞 Endpoints de Teste

```bash
# Testar conexão
curl http://localhost:5000/health

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sus.gov.br","password":"admin123"}'

# Listar pacientes
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/pacientes

# Gerar APAC
curl -X POST http://localhost:5000/api/apac/gerar \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "tipo": "inicial",
    "pacienteId": "uuid-aqui",
    "cns": "123456789012345",
    "cid10": "I10",
    "procedimento": "0301010010"
  }'
```

---

**Versão**: 1.0.0  
**Última Atualização**: 2025-01-27  
**Responsável**: Equipe Frontend SUS
