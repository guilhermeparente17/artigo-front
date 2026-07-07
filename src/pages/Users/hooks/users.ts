import { useMutation, useQuery } from "@tanstack/react-query";
import { getUsers, updateUserRole } from "../../../services/Users/Users";

type GetUsersType = {
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
};

export const useGetUsers = () =>
  useQuery<GetUsersType[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

export function useUpdateUserRole() {
  return useMutation({
    mutationFn: updateUserRole,
  });
}
