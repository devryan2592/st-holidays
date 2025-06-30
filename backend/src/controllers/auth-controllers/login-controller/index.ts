import { loginUserService, twoFactorLoginService } from "./service";
import { Request, Response } from "express";
import { catchAsync } from "@/helpers/catch-async";
import {
  ApiResponse,
  sendError,
  sendSuccess,
  sendZodError,
} from "@/helpers/api-resonse";
import {
  LoginResponse,
  loginUserSchema,
  TwoFactorLoginResponse,
  twoFactorLoginSchema,
} from "./schema";
import { HTTP_STATUS } from "@/constants";
import { getClientIP, isMobile } from "@/services/ip-device.service";
import { getJWTTokens, handleJWTTokens } from "@/services/token.service";

export const loginUser = catchAsync(
  async (req: Request, res: Response<ApiResponse<LoginResponse>>) => {
    const { data, success, error } = loginUserSchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const response = await loginUserService(data);

    return sendSuccess(
      res,
      "Two-factor authentication code sent",
      response,
      HTTP_STATUS.OK
    );
  }
);

export const twoFactorLogin = catchAsync(
  async (req: Request, res: Response<ApiResponse<TwoFactorLoginResponse>>) => {
    const { refreshToken } = await getJWTTokens(req);

    const isDeviceMobile = await isMobile(req.headers["user-agent"] || "");

    const ipAddress = await getClientIP(req);
    const userAgent = req.headers["user-agent"] || "";

    const { data, success, error } = twoFactorLoginSchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const response = await twoFactorLoginService(
      data,
      refreshToken,
      ipAddress,
      userAgent
    );

    if (!response)
      return sendError(res, "Login Failed", HTTP_STATUS.UNAUTHORIZED);

    //  Handle Tokens
    handleJWTTokens(res, isDeviceMobile, response);

    return sendSuccess(
      res,
      "Successfully logged in",
      {
        user: response.user,
        session: response.session,
        ...(isDeviceMobile && {
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        }),
      },
      HTTP_STATUS.OK
    );
  }
);
