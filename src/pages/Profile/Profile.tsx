import { UAv } from "../../components/Uav";
import { useAuthStore } from "../../store/authSotre";
import { Badge } from "../../components/Badger";
import { KeyRound } from "lucide-react";
import { toast } from "sonner";
import { Field } from "../../components/Field";
import { PasswordInput } from "../../components/PasswordInput";
import { Btn } from "../../components/Btn";
import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";
import { Toggle } from "../../components/Toggle";
import { Controller, useForm } from "react-hook-form";
import { resetPasswordSchema, type ResetPasswordFormData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResetPassword } from "./hooks/resetPassword";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthStore();
  const { mutateAsync, isPending } = useResetPassword();
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const { theme } = useThemeStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const darkMode = theme === "dark";

  if (!user) return null;

  const changePassword = async (data: ResetPasswordFormData) => {
    try {
      await mutateAsync({
        email: user.email,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Senha alterada com sucesso!");
      signOut();
      navigate("/login");
      reset();
    } catch (error) {
      toast.error("Erro ao alterar a senha.");
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Perfil
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Gerencie sua conta e preferências
        </p>
      </div>

      {/* User info card */}
      <div className="bg-card border border-border rounded-xl p-6 mb-5">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <UAv user={user} size="lg" />
          <div>
            <div
              className="font-bold text-foreground text-lg"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {user.name}
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div className="mt-1.5">
              <Badge red={user.role === "ADMIN"}>
                {user.role === "ADMIN" ? "Administrador" : "Usuário"}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Membro desde{" "}
          <span className="font-medium text-foreground">{user.createdAt}</span>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-card border border-border rounded-xl p-6 mb-5">
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
          {darkMode ? (
            <Moon size={16} className="text-muted-foreground" />
          ) : (
            <Sun size={16} className="text-muted-foreground" />
          )}
          dark mode
          <h2 className="font-semibold text-foreground text-sm">Aparência</h2>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Modo escuro</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Alterna o tema entre claro e escuro
            </p>
          </div>
          <Toggle />
        </div>
      </div>

      {/* Change password */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border">
          <KeyRound size={16} className="text-muted-foreground" />
          <h2 className="font-semibold text-foreground text-sm">
            Alterar senha
          </h2>
        </div>
        <form onSubmit={handleSubmit(changePassword)} className="space-y-4">
          <Controller
            control={control}
            name="currentPassword"
            render={({ field }) => (
              <Field label="Senha atual">
                <PasswordInput
                  {...field}
                  placeholder="••••••••"
                  autoComplete="current-password"
                />

                {errors.currentPassword && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.currentPassword.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="newPassword"
            render={({ field }) => (
              <Field label="Nova senha" hint="Mínimo de 6 caracteres">
                <PasswordInput
                  {...field}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />

                {errors.newPassword && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.newPassword.message}
                  </span>
                )}
              </Field>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <Field label="Confirmar nova senha">
                <PasswordInput
                  {...field}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />

                {errors.confirmPassword && (
                  <span className="mt-1 block text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </Field>
            )}
          />

          <div className="flex justify-end pt-1">
            <Btn type="submit" disabled={isPending}>
              {isPending ? "Salvando..." : "Salvar nova senha"}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
