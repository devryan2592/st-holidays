import { ApiResponse } from "@/helpers/api-resonse";
import { z } from "zod";

export const changePasswordSchema = z
  .object({
    password: z.string().min(6),
    newPassword: z.string().min(6),
  })
  .superRefine(({ newPassword, password }, ctx) => {
    if (newPassword === password) {
      ctx.addIssue({
        code: "custom",
        message: "New password must be different from old password",
        path: ["newPassword"],
      });
    }
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export type ChangePasswordResponse = ApiResponse<{
  message: string;
}>;
