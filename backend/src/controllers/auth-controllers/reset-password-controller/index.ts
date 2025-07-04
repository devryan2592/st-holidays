import { Request, Response } from "express";
import { catchAsync } from "@/helpers/catch-async";
import { ApiResponse, sendSuccess, sendZodError } from "@/helpers/api-resonse";
import { forgotPasswordSchema, resetPasswordSchema } from "./schema";
import { HTTP_STATUS } from "@/constants";
import { forgotPasswordService, resetPasswordService } from "./service";

export const forgotPassword = catchAsync(
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const { data, success, error } = forgotPasswordSchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const response = await forgotPasswordService(data);

    return sendSuccess(
      res,
      response.message,
      { token: response.token },
      HTTP_STATUS.OK
    );
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const { data, success, error } = resetPasswordSchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const response = await resetPasswordService(data);

    return sendSuccess(res, response.message, null, HTTP_STATUS.OK);
  }
);
