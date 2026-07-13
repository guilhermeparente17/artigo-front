import { Newspaper } from "lucide-react";
import { Divider } from "../../components/Divider";
import { Field } from "../../components/Field";
import { TextInput } from "../../components/TextInput";
import { useState } from "react";
import { PasswordInput } from "../../components/PasswordInput";
import { Btn } from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/Auth/login";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authSotre";
import { GoogleLogin } from "@react-oauth/google";
import { googleLogin } from "../../services/Auth/google-login";
import Loading from "../../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      toast.success(`Bem vindo, ${data.user.name}`);
      signIn(data.user, data.token);

      if (data.user.role === "USER") {
        navigate("/feed");
      } else {
        navigate("/dashboard");
      }
    },

    onError: (error) => {
      console.error(error);
      toast.error("Usuário ou senha inválidos");
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      email,
      password,
    });
  };

  const handleGoogleLogin = async (credential?: string) => {
    if (!credential) return;

    setIsLoading(true);

    try {
      const data = await googleLogin(credential);

      signIn(data.user, data.token);

      navigate(data.user.role === "USER" ? "/feed" : "/dashboard");
    } catch (error) {
      console.error("Erro login google", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 sm:px-8 lg:px-0">
      <div className="mb-2 lg:hidden flex items-center gap-2">
        <Newspaper size={16} className="text-primary" />
        <span
          className="font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Artigo
        </span>
      </div>

      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Entrar
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Acesse sua conta para continuar
        </p>
      </div>

      <GoogleLogin
        onSuccess={(response) => handleGoogleLogin(response.credential)}
        onError={() => console.log("Login Failed")}
      />

      {isLoading && (
        <div className="mt-2">
          <Loading message="Aguarde...." />
        </div>
      )}

      <Divider label="ou entre com seu e-mail" />

      <form onSubmit={submit} className="space-y-4 mb-6" autoComplete="off">
        <Field label="E-mail">
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Senha">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <div className="flex justify-end mt-1.5">
            <button
              type="button"
              onClick={() => {}}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Esqueceu a senha?
            </button>
          </div>
        </Field>
        {mutation.isError && (
          <p className="text-sm text-red-500">E-mail ou senha inválidos.</p>
        )}
        <Btn
          fullWidth
          type="submit"
          className="mt-2"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Entrando..." : "Entrar"}
        </Btn>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Não tem uma conta?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-foreground font-semibold hover:underline underline-offset-2"
        >
          Criar conta
        </button>
      </p>
    </div>
  );
};

export default Login;
