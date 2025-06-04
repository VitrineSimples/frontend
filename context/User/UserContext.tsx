"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserContextType } from "./types";
import api from "@/lib/api";
import { useAuth } from "../Auth/AuthContext";
import { useLoading } from "../Loading/LoadingContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const router = useRouter();

  const { setIsLoading } = useLoading();
  const { user } = useAuth();

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const response = await api.get("api/Users");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserById = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await api.get(`api/Users/${id}`);
      setSelectedUser(response.data);
    } catch (error) {
      console.error(`Erro ao buscar usuário com id ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const createUser = async (data: Omit<User, "id">) => {
    try {
      setIsLoading(true);
      await api.post("api/Users", data);
      await getUsers();
      toast.success("Conta criada com sucesso!");
      toast.success("Redirecionando pro login");
      router.push("/login");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, data: Omit<User, "id">) => {
    try {
      setIsLoading(true);
      if (id != user!.id) throw new Error("Sem permissão!");
      await api.put(`api/Users/${id}`, data);
      await getUsers();
      toast.success("Usuário editado com sucesso!");
    } catch (error) {
      toast.error("Erro ao editar usuário!");
      console.error(`Erro ao atualizar usuário com id ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      if (id != user!.id) throw new Error("Sem permissão!");
      await api.delete(`api/Users/${id}`);
      await getUsers();
      toast.success("Usuário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar usuário!");
      console.error(`Erro ao deletar usuário com id ${id}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        selectedUser,
        getUsers,
        getUserById,
        createUser,
        updateUser,
        deleteUser,
        clearSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextType {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
