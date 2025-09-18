"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { AuthService } from "@/services/auth-service";
import { getApiUrl } from "@/config/api-url";
import type { LoginResponse } from "@/types/api";

// Definindo o tipo para o usuário
interface User {
  id: string;
  nome: string;
  email: string;
  loja?: {
    id: string;
    nome: string;
    categoria: string;
    subdominio: string;
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
const manageLocalStorage = (action: "get" | "set" | "remove", key: string, value?: any) => {
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
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token no localStorage quando o componente é montado
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
      console.log("⚠️ Nenhum token encontrado - usuário não autenticado");
    }

    setLoading(false);

    // Testar conectividade com a API usando a configuração centralizada
    const testarAPI = async () => {
      try {
        const healthUrl = getApiUrl("usuario/health");

        const resposta = await fetch(healthUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          signal: AbortSignal.timeout(5000),
        });

        if (resposta.ok) {
          console.log("✅ API funcionando!");
        } else {
          console.log("❌ API respondeu com erro:", resposta.status);
        }
      } catch (error) {
        console.log("❌ Erro ao conectar com a API:", (error as Error).message);
      }
    };

    testarAPI();
  }, []);

  const login = (
    newToken: string,
    newRefreshToken: string | undefined,
    userData: LoginResponse["user"]
  ) => {
    manageLocalStorage("set", "token", newToken);
    manageLocalStorage("set", "user", userData);

    if (newRefreshToken) {
      manageLocalStorage("set", "refreshToken", newRefreshToken);
      setRefreshToken(newRefreshToken);
    }

    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      // Chama o serviço de logout
      await AuthService.logout();
      manageLocalStorage("remove", "token");
      manageLocalStorage("remove", "refreshToken");
      manageLocalStorage("remove", "user");
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      // Mesmo com erro, limpa os dados locais
      manageLocalStorage("remove", "token");
      manageLocalStorage("remove", "refreshToken");
      manageLocalStorage("remove", "user");
      setToken(null);
      setRefreshToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        refreshToken,
        user,
        login,
        logout,
        loading,
      }}
    >
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
