"use client";

import { useAuth } from "@/context/Auth/AuthContext";
import { useUser } from "@/context/User/UserContext";

export default function DeleteUserModal() {
  const { user } = useAuth();
  const { deleteUser } = useUser();
  return (
    <div className="h-full flex flex-col">
      <h4 className="text-brand-200 text-xl">Deletar Usuário</h4>
      <div className="flex w-full items-center justify-center flex-col h-[350px] gap-4">
        <p className="text-xl text-gray-600">
          Você deseja realmente deletar sua conta?
        </p>
        <button
          onClick={() => deleteUser(user!.id)}
          className="text-red-600 border border-red-600 hover:text-white hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded-lg cursor-pointer"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
