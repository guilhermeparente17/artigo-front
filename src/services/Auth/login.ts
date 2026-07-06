import { api } from "../api";

type LoginProps = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginProps) {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
}
