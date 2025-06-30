import { ApiResponse } from "@/helpers/api-resonse";

import { z } from "zod";
import { Session, User } from "../../../../generated/prisma";

export const loginUserSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email format"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters"),
});

export const twoFactorLoginSchema = z.object({
  userId: z
    .string({ required_error: "User ID is required" })
    .uuid("Invalid user ID format"),
  token: z
    .string({ required_error: "2FA code is required" })
    .length(6, "2FA code must be 6 characters"),
  refreshToken: z.string().optional(),
});

export type TwoFactorLoginInput = z.infer<typeof twoFactorLoginSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;

export type LoginServiceResponse = {
  userId: string;
  token?: string;
};

export type LoginResponse = ApiResponse<LoginServiceResponse>;

export type TwoFactorInitalServiceResponse = z.infer<
  typeof twoFactorLoginSchema
>;

export type TwoFactorLoginServiceResponse = {
  user: Omit<User, "password">;
  session: Omit<Session, "userId">;
  accessToken?: string;
  refreshToken?: string;
};

export type TwoFactorLoginResponse = ApiResponse<TwoFactorLoginServiceResponse>;
