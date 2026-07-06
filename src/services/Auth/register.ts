import { api } from "../api";

type RegisterProps = {
  name: string;
  email: string;
  password: string;
};

export async function register({ name, email, password }: RegisterProps) {
  const { data } = await api.post("/auth/register", {
    name,
    email,
    password,
  });

  return data;
}
