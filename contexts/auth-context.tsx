"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react";
import { AuthService } from "@/services/auth-service";
import { getApiUrl } from "@/config/api-url";
import type { LoginResponse } from "@/types/api";

interface User {
  id: string;
  nome: string;
  email: string;
  cpfCnpj: string;
  telefone?: string;
  dataNascimento?: string;
  loja?: {
    id: string;
    nomeLoja: string;
    idCategoria: string;
    categoria: string;
    subdominio: string;
    descricao?: string;
    avaliacao?: number;
    logo?: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (
    token: string,
    refreshToken: string | undefined,
    userData: LoginResponse["user"]
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Função para gerenciar localStorage de maneira centralizada
export const manageLocalStorage = (
  action: "get" | "set" | "remove",
  key: string,
  value?: any
) => {
  if (typeof window !== "undefined") {
    switch (action) {
      case "get":
        return localStorage.getItem(key);
      case "set":
        localStorage.setItem(key, JSON.stringify(value));
        break;
      case "remove":
        localStorage.removeItem(key);
        break;
    }
  }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (typeof window !== "undefined") {
        const storedToken = manageLocalStorage("get", "token");
        const storedRefreshToken = manageLocalStorage("get", "refreshToken") || null;
        const storedUser = manageLocalStorage("get", "user");

        if (storedToken && storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            setToken(storedToken);
            setRefreshToken(storedRefreshToken);
            setUser(userData);
            setIsAuthenticated(true);
            console.log("✅ Usuário autenticado automaticamente");
          } catch (error) {
            console.error("❌ Erro ao carregar dados do usuário:", error);
            manageLocalStorage("remove", "token");
            manageLocalStorage("remove", "refreshToken");
            manageLocalStorage("remove", "user");
          }
        } else {
          // console.log("⚠️ Nenhum token encontrado - usuário não autenticado");
        }
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Função de login
  const login = useCallback((
    newToken: string,
    newRefreshToken: string | undefined,
    userData: LoginResponse["user"]
  ) => {
    if (typeof window !== "undefined") {
      manageLocalStorage("set", "token", newToken); // Armazena o token no localStorage
      manageLocalStorage("set", "user", userData); // Armazena os dados do usuário no localStorage

      if (newRefreshToken) {
        manageLocalStorage("set", "refreshToken", newRefreshToken);
        setRefreshToken(newRefreshToken);
      }

      setToken(newToken);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (typeof window !== "undefined") {
        // Chama o serviço de logout
        await AuthService.logout();
        manageLocalStorage("remove", "token");
        manageLocalStorage("remove", "refreshToken");
        manageLocalStorage("remove", "user");
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      // Mesmo com erro, limpa os dados locais
      if (typeof window !== "undefined") {
        manageLocalStorage("remove", "token");
        manageLocalStorage("remove", "refreshToken");
        manageLocalStorage("remove", "user");
        setToken(null);
        setRefreshToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    }
  }, []);

  const authContextValue = useMemo(() => ({
    isAuthenticated,
    token,
    refreshToken,
    user,
    login,
    logout,
    loading,
  }), [isAuthenticated, token, refreshToken, user, loading, login, logout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
