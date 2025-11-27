"use client"

import { useState, useEffect } from 'react';

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getToken = () => {
      try {
        const storedToken = localStorage.getItem('token');
        setToken(storedToken);
      } catch (error) {
        console.error('Erro ao acessar token:', error);
        setToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    getToken();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        setToken(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { token, isLoading };
}
