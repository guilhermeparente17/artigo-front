import { api } from "../api";

export async function getSummary() {
  const { data } = await api.get("/users/summary");

  return data;
}
