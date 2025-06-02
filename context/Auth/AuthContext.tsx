"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { iAuthContext, iLoginFormData, iUser } from "./types";
import api from "@/lib/api";
import { useLoading } from "../Loading/LoadingContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const AuthContext = createContext<iAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<iUser | null>(null);
  const { setIsLoading } = useLoading();

  const router = useRouter();

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
  }, [setIsLoading]);

  const login = async (loginData: iLoginFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await api.post("api/Auth/signIn", loginData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      setToken(token);
      toast.success("Login feito com sucesso!");
      await getUser(token);
      router.push("/markets");
    } catch (err) {
      toast.error("Falha do login!");
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
    toast.success("Logout concluído!");
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
