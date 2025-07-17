import { Request, Response } from "express";
import {
  ApiResponse,
  sendError,
  sendSuccess,
  sendZodError,
} from "@/helpers/api-response";
import { catchAsync } from "@/helpers/catch-async";
import { RegisterUserResponse, registerUserSchema } from "./schema";
import { registerUserService } from "./service";
import { HTTP_STATUS } from "@/constants";

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags: [Authentication]
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input or user already exists
 */
export const registerUser = catchAsync(
  async (req: Request, res: Response<ApiResponse<RegisterUserResponse>>) => {
    // Validate Request Body
    const { data, success, error } = registerUserSchema.safeParse(req.body);

    if (!success) {
      return sendZodError(res, error);
    }

    const user = await registerUserService(data);

    if (!user) {
      return sendError(
        res,
        "Registration Failed. Please try again later",
        HTTP_STATUS.BAD_REQUEST
      );
    }

    return sendSuccess(
      res,
      "User registered successfully",
      user,
      HTTP_STATUS.CREATED
    );
  }
);
