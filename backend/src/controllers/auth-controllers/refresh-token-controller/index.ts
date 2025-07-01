import { Request, Response } from "express";
import { catchAsync } from "@/helpers/catch-async";
import {
  createJWT,
  getJWTTokens,
  handleJWTTokens,
  verifyJWTToken,
  clearJWTCookies,
} from "@/services/token.service";
import { AppError } from "@/utils/error";
import { HTTP_STATUS, ONE_WEEK_IN_MS } from "@/constants";
import { getSessionByRefreshToken } from "@/helpers/database-calls/session";
import { getClientIP, isMobile } from "@/services/ip-device.service";
import prisma from "@/config/db";
import { sendSuccess } from "@/helpers/api-resonse";

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken: existingRefreshToken } = await getJWTTokens(req);
  const ipAddress = await getClientIP(req);
  const userAgent = req.headers["user-agent"];
  const isDeviceMobile = await isMobile(req.headers["user-agent"] || "");

  if (!existingRefreshToken) {
    clearJWTCookies(res);
    throw new AppError("Refresh token not found", HTTP_STATUS.UNAUTHORIZED);
  }

  const decoded = await verifyJWTToken(existingRefreshToken, "refresh");

  // First we get the session with refresh token
  const session = await getSessionByRefreshToken(existingRefreshToken);

  // Compare user id
  if (session.userId !== decoded.userId) {
    await prisma.session.delete({ where: { id: session.id } });
    clearJWTCookies(res);
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  //   Check IP and user agent mismatch
  if (session.ipAddress !== ipAddress || session.userAgent !== userAgent) {
    await prisma.session.delete({ where: { id: session.id } });
    clearJWTCookies(res);
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  //   Check if the session is valid
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } });
    clearJWTCookies(res);
    throw new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED);
  }

  //   Create new tokens
  const tokens = await createJWT(session.user);

  //   Update the session with new refresh token
  const updatedSession = await prisma.session.update({
    where: {
      id: session.id,
    },
    data: {
      lastUsed: new Date(),
      expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS),
      refreshToken: {
        update: {
          token: tokens.refreshToken,
          expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS),
        },
      },
    },
    include: {
      user: true,
      refreshToken: true,
    },
  });

  if (!updatedSession) {
    clearJWTCookies(res);
    throw new AppError(
      "Failed to refresh token, please login again",
      HTTP_STATUS.UNAUTHORIZED
    );
  }
  //   Handle Tokens
  handleJWTTokens(res, isDeviceMobile, tokens);

  return sendSuccess(
    res,
    "Tokens refreshed Successfully",
    {
      ...(isDeviceMobile && {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      }),
    },
    HTTP_STATUS.OK
  );
});
