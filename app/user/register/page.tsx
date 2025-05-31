"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/Input";
import { registerSchema, RegisterFormData } from "./schema";
// import { useAuth } from "@/context/Auth/AuthContext";

export default function Register() {
  // const { registerUser } = useAuth(); // <- ajuste conforme seu contexto

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log("Registro:", data);
    // registerUser(data); //
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo.svg"
            alt="Guren Logo"
            className="mb-4"
            height={60}
            width={60}
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Crie sua conta
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Preencha os campos abaixo
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input
              label="Nome"
              id="name"
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-contrast text-sm mt-1 px-2">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Input
              maxLength={11}
              label="CPF"
              id="cpf"
              type="number"
              placeholder="Digite seu nome"
              {...register("cpf")}
            />
            {errors.cpf && (
              <p className="text-contrast text-sm mt-1 px-2">
                {errors.cpf.message}
              </p>
            )}
          </div>

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
              placeholder="Crie uma senha"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-contrast text-sm mt-1 px-2">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Confirmar Senha"
              id="confirmPassword"
              type="password"
              placeholder="Repita sua senha"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-contrast text-sm mt-1 px-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-4 w-full border hover:border-white border-brand-200 hover:bg-brand-200 hover:text-white py-2 rounded-lg bg-white text-brand-200 transition-colors cursor-pointer duration-300"
          >
            Registrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem uma conta?{" "}
          <Link href="/user/login" className="text-brand-200 hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </section>
  );
}
