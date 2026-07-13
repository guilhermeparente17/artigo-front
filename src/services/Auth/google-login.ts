import { api } from "../api";

export async function googleLogin(credential: string) {
  const response = await api.post("/auth/google", {
    credential,
  });

  return response.data;
}
