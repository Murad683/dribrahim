import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiError, apiClient, authEvents } from '@/lib/api-client';

interface AuthUser {
  username: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

type LoginResponse = {
  token: string;
  username: string;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('admin_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('admin_token');
  });

  const navigate = useNavigate();

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<LoginResponse, { username: string; password: string }>(
        '/api/auth/login',
        { username, password },
      );
      const adminUser = { username: response.username };
      setUser(adminUser);
      setToken(response.token);
      localStorage.setItem('admin_user', JSON.stringify(adminUser));
      localStorage.setItem('admin_token', response.token);
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        return false;
      }

      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('admin_user');
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  }, [navigate]);

  useEffect(() => {
    const handleAuthExpired = () => {
      setUser(null);
      setToken(null);
      navigate('/admin/login');
    };

    window.addEventListener(authEvents.expired, handleAuthExpired);

    return () => {
      window.removeEventListener(authEvents.expired, handleAuthExpired);
    };
  }, [navigate]);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
