import { toast } from "sonner";
import { Modal } from "./Modal";
import { Field } from "./Field";
import { TextInput } from "./TextInput";
import { TextArea } from "./TextArea";
import { COVER_OPTIONS } from "../utils/consts";
import { cn } from "./utils";
import { Btn } from "./Btn";
import {
  articleSchema,
  type ArticleFormData,
} from "../pages/MyArticles/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createArticle } from "../services/Articles/createArticle";
import { useQueryClient } from "@tanstack/react-query";
import type { ArticlesMeTypes } from "../pages/MyArticles/types";
import { useEffect } from "react";
import { updateArticle } from "../services/Articles/updateArticle";

export function ArticleForm({
  open,
  onClose,
  article,
}: {
  open: boolean;
  onClose: () => void;
  article?: ArticlesMeTypes | null;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tagsRaw: "",
      cover: COVER_OPTIONS[0],
    },
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (article) {
      reset({
        title: article.title,
        description: article.description,
        content: article.content,
        tagsRaw: article.tags.join(", "),
        cover: article.cover,
      });
    }
  }, [article]);

  async function onSubmit(data: ArticleFormData) {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        content: data.content,
        tags: data.tagsRaw
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        cover: data.cover,
        id: article?.id,
      };

      if (!!article) {
        await updateArticle({ payload });
        toast.success("Artigo editado!");
      } else {
        await createArticle({ payload });
        toast.success("Artigo publicado!");
      }

      queryClient.invalidateQueries({
        queryKey: ["articles-me"],
      });

      reset({
        title: "",
        description: "",
        content: "",
        tagsRaw: "",
        cover: "",
      });
      onClose();
    } catch (error) {
      toast.error("Erro ao publicar artigo.");
      console.error(error);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={!!article ? "Editar Artigo" : "Novo Artigo"}
      wide
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Título">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <>
                <TextInput {...field} placeholder="Título do artigo" />

                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </>
            )}
          />
        </Field>

        <Field label="Resumo">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <>
                <TextArea
                  {...field}
                  rows={2}
                  placeholder="Uma frase que capture a essência do artigo"
                />

                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </>
            )}
          />
        </Field>

        <Field label="Conteúdo">
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <>
                <TextArea
                  {...field}
                  rows={8}
                  placeholder="Escreva o conteúdo completo aqui..."
                />

                {errors.content && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.content.message}
                  </p>
                )}
              </>
            )}
          />
        </Field>

        <Field label="Tags (separadas por vírgula)">
          <Controller
            control={control}
            name="tagsRaw"
            render={({ field }) => (
              <TextInput {...field} placeholder="React, Typescript, CSS" />
            )}
          />
        </Field>

        <Field label="Imagem de capa">
          <Controller
            control={control}
            name="cover"
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-2 mt-1">
                {COVER_OPTIONS.map((cover) => (
                  <button
                    key={cover}
                    type="button"
                    onClick={() => field.onChange(cover)}
                    className={cn(
                      "rounded-lg overflow-hidden h-16 border-2 transition-all",
                      field.value === cover
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-muted-foreground/30",
                    )}
                  >
                    <img
                      src={cover}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          />
        </Field>

        <div className="flex justify-end gap-2 pt-2">
          <Btn type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Btn>

          <Btn type="submit" disabled={isSubmitting}>
            {!!article ? "Salvar" : "Publicar"}
          </Btn>
        </div>
      </form>
    </Modal>
  );
}
