import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;