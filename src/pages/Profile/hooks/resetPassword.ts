import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../services/Auth/resetPassword";

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
