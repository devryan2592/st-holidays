import { Request, Response } from "express";
import { catchAsync } from "@/helpers/catch-async";
import { changePasswordSchema } from "./schema";
import { sendError, sendSuccess, sendZodError } from "@/helpers/api-resonse";
import { changePasswordService } from "./service";
import { HTTP_STATUS } from "@/constants";

export const changePassword = catchAsync(
  async (req: Request, res: Response) => {
    // Since its an auth route, we can assume that the user is logged in and we can get the user from the request
    const user = req.user;

    if (!user)
      return sendError(
        res,
        "Something went wrong. Please try again later",
        500
      );

    const { data, success, error } = await changePasswordSchema.safeParseAsync(
      req.body
    );

    if (!success) return sendZodError(res, error);

    const response = await changePasswordService(user, data);

    return sendSuccess(res, response.message, HTTP_STATUS.OK);
  }
);
