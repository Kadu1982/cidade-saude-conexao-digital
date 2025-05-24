
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'medico' | 'enfermeiro' | 'farmaceutico' | 'recepcionista' | 'vigilancia' | 'epidemiologia' | 'transporte';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  unidadeSaude?: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: { [key: string]: User } = {
  'admin@saude.gov': {
    id: '1',
    name: 'Administrador',
    email: 'admin@saude.gov',
    role: 'admin',
    permissions: ['*'] // Admin has all permissions
  },
  'medico@saude.gov': {
    id: '2',
    name: 'Dr. João Silva',
    email: 'medico@saude.gov',
    role: 'medico',
    unidadeSaude: 'UBS Centro',
    permissions: ['atendimento-medico', 'agenda', 'prontuario', 'dashboard']
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - in real app, this would call an API
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
