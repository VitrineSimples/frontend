import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "Nome é obrigatório"),
    cpf: z.string().min(11 ,"CPF inválido"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha precisa ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
