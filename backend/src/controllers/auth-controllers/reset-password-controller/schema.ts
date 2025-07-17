import { ApiResponse } from "@/helpers/api-response";

import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  token: z.string().uuid("Invalid token format"),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordResponse = ApiResponse<{
  message: string;
}>;

export type ForgotPasswordResponse = ApiResponse<{
  token: string;
  message: string;
}>;
