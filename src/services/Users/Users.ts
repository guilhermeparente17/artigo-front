import { api } from "../api";

export async function getSummary() {
  const { data } = await api.get("/users/summary");

  return data;
}

type Filters = {
  search?: string;
  role?: string;
  page?: number;
};

export async function getUsers(filters: Filters) {
  const params = new URLSearchParams();

  if (filters.page) {
    params.append("page", String(filters.page));
  }

  if (filters.search) {
    params.append("search", filters.search);
  }

  if (filters.role) {
    params.append("role", filters.role);
  }

  const { data } = await api.get(`/users?${params.toString()}`);

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
