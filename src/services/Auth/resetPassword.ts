import { api } from "../api";

export type ResetPasswordPropos = {
  email: string;
  newPassword: string;
  currentPassword: string;
};

export async function resetPassword({
  email,
  newPassword,
  currentPassword,
}: ResetPasswordPropos) {
  const { data } = await api.patch("/auth/reset-password", {
    email,
    currentPassword,
    newPassword,
  });

  return data;
}
