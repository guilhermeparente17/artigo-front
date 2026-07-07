import { useEffect } from "react";
import type { User } from "../store/authSotre";
import { Modal } from "./Modal";
import { Field } from "./Field";
import { TextInput } from "./TextInput";
import { Btn } from "./Btn";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useUpdateUserRole } from "../pages/Users/hooks/users";
import { useQueryClient } from "@tanstack/react-query";

export const updateUserRoleSchema = z.object({
  role: z.enum(["USER", "ADMIN"], {
    message: "Selecione uma função válida.",
  }),
});

export type UpdateUserRoleFormData = z.infer<typeof updateUserRoleSchema>;

export function UserFormDialog({
  open,
  onClose,
  editUser,
}: {
  open: boolean;
  onClose: () => void;
  editUser?: User;
}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserRoleFormData>({
    resolver: zodResolver(updateUserRoleSchema),
    defaultValues: {
      role: editUser?.role ?? "USER",
    },
  });

  const { mutateAsync } = useUpdateUserRole();

  const queryClient = useQueryClient();

  const submit = async (data: UpdateUserRoleFormData) => {
    try {
      await mutateAsync({
        id: editUser!.id,
        role: data.role,
      });

      toast.success("Usuário editado com sucesso!");

      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      onClose();
    } catch {
      toast.error("Erro ao atualizar usuário.");
    }
  };

  useEffect(() => {
    if (editUser) {
      reset({
        role: editUser.role,
      });
    }
  }, [editUser, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editUser ? "Editar Usuário" : "Novo Usuário"}
    >
      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <Field label="Nome completo">
          <TextInput value={editUser?.name ?? ""} disabled />
        </Field>

        <Field label="E-mail">
          <TextInput type="email" value={editUser?.email ?? ""} disabled />
        </Field>

        <Controller
          control={control}
          name="role"
          render={({ field }) => (
            <Field label="Função">
              <>
                <select
                  {...field}
                  className="w-full px-3 py-2 text-sm bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring text-foreground"
                >
                  <option value="">Selecione</option>
                  <option value="USER">Usuário</option>
                  <option value="ADMIN">Administrador</option>
                </select>

                {errors.role && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.role.message}
                  </span>
                )}
              </>
            </Field>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Btn type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Btn>

          <Btn type="submit">Salvar</Btn>
        </div>
      </form>
    </Modal>
  );
}
