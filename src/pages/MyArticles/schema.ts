import { z } from "zod";

export const articleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "O título deve possuir pelo menos 3 caracteres."),

  description: z
    .string()
    .trim()
    .max(200, "O resumo deve possuir no máximo 200 caracteres.")
    .optional(),

  content: z
    .string()
    .trim()
    .min(20, "O conteúdo deve possuir pelo menos 20 caracteres."),

  tagsRaw: z.string(),

  cover: z.string().min(1, "Selecione uma imagem de capa."),
});

export type ArticleFormData = z.infer<typeof articleSchema>;
