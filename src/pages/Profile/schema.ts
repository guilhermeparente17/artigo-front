import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "A senha atual é obrigatória."),

    newPassword: z
      .string()
      .min(6, "A nova senha deve ter no mínimo 6 caracteres."),

    confirmPassword: z.string().min(1, "Confirme sua nova senha."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem.",
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
