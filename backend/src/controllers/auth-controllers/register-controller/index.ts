import { Request, Response } from "express";
import {
  ApiResponse,
  sendError,
  sendSuccess,
  sendZodError,
} from "@/helpers/api-resonse";
import { catchAsync } from "@/helpers/catch-async";
import { RegisterUserResponse, registerUserSchema } from "./schema";
import { registerUserService } from "./service";
import { HTTP_STATUS } from "@/constants";

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
