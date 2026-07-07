import { api } from "../api";

export async function getSummary() {
  const { data } = await api.get("/users/summary");

  return data;
}

export async function getUsers() {
  const { data } = await api.get("/users");

  return data;
}

export type UpdateUserRoleProps = {
  id: string;
  role: "USER" | "ADMIN";
};

export async function updateUserRole({ id, role }: UpdateUserRoleProps) {
  const { data } = await api.patch(`/users/${id}`, {
    role,
  });

  return data;
}
