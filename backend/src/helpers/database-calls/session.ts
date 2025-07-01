import prisma from "@/config/db";
import { HTTP_STATUS } from "@/constants";
import { AppError } from "@/utils/error";

export const getSessionByRefreshToken = async (refreshToken: string) => {
  const session = await prisma.session.findFirst({
    where: {
      refreshToken: {
        token: refreshToken,
      },
    },
    include: {
      refreshToken: true,
      user: true,
    },
  });

  if (!session) {
    // We Delete the refresh token here
    throw new AppError("Session not found", HTTP_STATUS.UNAUTHORIZED);
  }

  if (session.refreshToken!.expiresAt < new Date(Date.now())) {
    // We Delete the refresh token here
    throw new AppError("Refresh token expired", HTTP_STATUS.UNAUTHORIZED);
  }

  return session;
};
