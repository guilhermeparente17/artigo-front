import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, updateUserRole } from "../../../services/Users/Users";

type GetUsersType = {
  data: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    password: string;
    createdAt: string;
    updatedAt: string;
    _count: {
      articles: number;
    };
  }[];

  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export const useGetUsers = (filters: {
  page: number;
  search: string;
  role: string;
}) =>
  useQuery<GetUsersType>({
    queryKey: ["users", filters],
    queryFn: () => getUsers(filters),
  });

export function useUpdateUserRole() {
  return useMutation({
    mutationFn: updateUserRole,
  });
}
