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
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    throw new AppError("Session not found", HTTP_STATUS.UNAUTHORIZED);
  }

  if (session.refreshToken!.expiresAt < new Date()) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    throw new AppError("Refresh token expired", HTTP_STATUS.UNAUTHORIZED);
  }

  return session;
};
