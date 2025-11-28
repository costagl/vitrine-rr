export const API_BASE_URL = "http://localhost:5000"
export const LOCAL_BASE_URL =  "http://localhost:3000"
// export const API_BASE_URL = "https://vitrineapi.duckdns.org";
// export const LOCAL_BASE_URL = "https://vitrinedev.vercel.app";

// Função para obter a URL base da API
export const getApiBaseUrl = (): string => {
  // Prioriza a variável de ambiente se estiver definida
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    console.log("🌍 Usando URL da variável de ambiente:");
    return apiUrl;
  }
  // Caso contrário, usa a URL configurada acima
  return API_BASE_URL;
};

// Função para verificar se a API está configurada
export const isApiConfigured = (): boolean => {
  const url = getApiBaseUrl();
  return !!url && url !== "";
};

// Função para obter URL completa de um endpoint
export const getApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
};

// Log da configuração atual (apenas em desenvolvimento)
if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
  console.log("🔧 API URL configurada:", getApiBaseUrl());
}
