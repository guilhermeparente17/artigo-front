import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: "USER" | "ADMIN";
}

interface AuthStore {
  user: User | null;
  token: string | null;

  signIn: (user: User, token: string) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,

  signIn: (user, token) =>
    set({
      user,
      token,
    }),

  signOut: () =>
    set({
      user: null,
      token: null,
    }),
}));
