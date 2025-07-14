import { Request, Response } from "express";
import { catchAsync } from "@/helpers/catch-async";
import { ApiResponse, sendSuccess, sendZodError } from "@/helpers/api-resonse";
import { forgotPasswordSchema, resetPasswordSchema } from "./schema";
import { HTTP_STATUS } from "@/constants";
import { forgotPasswordService, resetPasswordService } from "./service";

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     tags: [Password Management]
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset link sent if email exists
 */
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

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     tags: [Password Management]
 *     summary: Reset password with token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 format: uuid
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
export const resetPassword = catchAsync(
  async (req: Request, res: Response<ApiResponse<null>>) => {
    const { data, success, error } = resetPasswordSchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const response = await resetPasswordService(data);

    return sendSuccess(res, response.message, null, HTTP_STATUS.OK);
  }
);
