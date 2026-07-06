import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
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

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      signIn: (user, token) => {
        console.log("Usuário logado:", user);
        console.log("Token:", token);

        set({
          user,
          token,
        });

        localStorage.setItem("token", token);
      },

      signOut() {
        set({
          user: null,
          token: null,
        });

        localStorage.clear();
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
