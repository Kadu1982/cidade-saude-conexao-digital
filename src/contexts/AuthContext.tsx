import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'medico' | 'enfermeiro' | 'farmaceutico' | 'recepcionista' | 'vigilancia' | 'epidemiologia' | 'transporte';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unidadeSaude?: string;
  permissions: string[];
  crmCoren?: string; // CRM para médicos, COREN para enfermeiros
  perfis?: string[]; // Perfis adicionais do usuário
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users seguindo diretrizes do sistema
const mockUsers: { [key: string]: User } = {
  'admin@saude.gov': {
    id: '1',
    name: 'Administrador Municipal',
    email: 'admin@saude.gov',
    role: 'admin',
    permissions: ['*'], // Admin tem todos os acessos
    perfis: ['admin', 'ia', 'estoque']
  },
  'medico1@saude.gov': {
    id: '2',
    name: 'Dr. João Silva',
    email: 'medico1@saude.gov',
    role: 'medico',
    unidadeSaude: 'UBS Centro',
    permissions: ['atendimento-medico', 'agenda', 'prontuario', 'dashboard'],
    crmCoren: 'CRM/SP 123456',
    perfis: ['medico', 'ia']
  },
  'medico2@saude.gov': {
    id: '3',
    name: 'Dra. Maria Oliveira',
    email: 'medico2@saude.gov',
    role: 'medico',
    unidadeSaude: 'UBS Jardim das Flores',
    permissions: ['atendimento-medico', 'agenda', 'prontuario', 'dashboard'],
    crmCoren: 'CRM/SP 234567',
    perfis: ['medico']
  },
  'enfermeiro@saude.gov': {
    id: '4',
    name: 'Enf. Ana Santos',
    email: 'enfermeiro@saude.gov',
    role: 'enfermeiro',
    unidadeSaude: 'UBS Centro',
    permissions: ['vacinas', 'triagem', 'curativos', 'dashboard'],
    crmCoren: 'COREN/SP 345678',
    perfis: ['enfermeiro', 'triagem']
  },
  'farmaceutico@saude.gov': {
    id: '5',
    name: 'Farm. Carlos Ferreira',
    email: 'farmaceutico@saude.gov',
    role: 'farmaceutico',
    unidadeSaude: 'UBS Centro',
    permissions: ['farmacia', 'dispensacao', 'estoque', 'dashboard'],
    crmCoren: 'CRF/SP 12345',
    perfis: ['farmaceutico', 'estoque']
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar localStorage para sessão existente
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Autenticação mock - em produção seria uma API
    if (mockUsers[email] && password === '123456') {
      const loggedUser = mockUsers[email];
      setUser(loggedUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(loggedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
