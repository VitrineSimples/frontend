"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { iAuthContext, iLoginFormData, iUser } from "./types";
import api from "@/lib/api";

const AuthContext = createContext<iAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<iUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setToken(storedToken);
      } catch (err) {
        console.error("Token inválido", err);
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (loginData: iLoginFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await api.post("api/Auth/signIn", loginData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      await getUser(token);
      console.log("Login bem-sucedido");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getUser = async (token: string): Promise<void> => {
    try {
      const response = await api.get<iUser>("api/Auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Erro ao obter usuário", err);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isLoading, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
