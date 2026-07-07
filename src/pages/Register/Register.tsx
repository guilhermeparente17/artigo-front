import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field } from "../../components/Field";
import { TextInput } from "../../components/TextInput";
import { PasswordInput } from "../../components/PasswordInput";
import { Btn } from "../../components/Btn";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/Auth/register";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const mutation = useMutation({
    mutationFn: register,

    onSuccess: () => {
      navigate("/login");
    },

    onError: (error) => {
      console.error(error);
    },
  });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      name,
      email,
      password,
    });
  };
  return (
    <div className="w-full max-w-md mx-auto px-6 sm:px-8 lg:px-0">
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={13} /> Voltar ao login
      </button>

      <div className="mb-8">
        <h2
          className="text-2xl font-bold text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Criar conta
        </h2>
        <p className="text-muted-foreground text-sm mt-1">
          Junte-se à plataforma e comece a publicar
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4 mb-6">
        <Field label="Nome completo">
          <TextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Maria da Silva"
            autoComplete="name"
          />
        </Field>
        <Field label="E-mail">
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="maria@email.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Senha" hint="Mínimo de 6 caracteres">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </Field>
        <Field label="Confirmar senha">
          <PasswordInput
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </Field>
        <Btn fullWidth type="submit" className="mt-2">
          Criar conta
        </Btn>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <button
          onClick={() => navigate("/login")}
          className="text-foreground font-semibold hover:underline underline-offset-2"
        >
          Entrar
        </button>
      </p>
    </div>
  );
};

export default Register;
