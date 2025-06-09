"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/Input";
import { LoginFormData, loginSchema } from "./schema";
import { useAuth } from "@/context/Auth/AuthContext";
import { useLoading } from "@/context/Loading/LoadingContext";
import LoadingSpinner from "@/app/components/LoadingSpinner";

export default function Login() {
  const { isLoading } = useLoading();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: LoginFormData) => await login(data);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Link href="/" className="flex items-center mb-4">
          <Image
            src="/logo.svg"
            alt="Guren Logo"
            className="mb-4"
            height={60}
            width={60}
          />
          </Link>
          <h2 className="text-2xl font-semibold text-gray-800">
            Bem-vindo de volta!
          </h2>
          <p className="text-sm text-gray-500 mt-1">Entre para continuar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-contrast text-sm mt-1 px-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Senha"
              id="password"
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-contrast text-sm mt-1 px-2">
                {errors.password.message}
              </p>
            )}
          </div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button
              type="submit"
              className="mt-4 w-full border hover:border-white border-brand-200 hover:bg-brand-200 hover:text-white py-2 rounded-lg bg-white text-brand-200 transition-colors cursor-pointer duration-300"
            >
              Entrar
            </button>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem uma conta?{" "}
          <Link href="/register" className="text-brand-200 hover:underline">
            Registrar
          </Link>
        </p>
      </div>
    </section>
  );
}
