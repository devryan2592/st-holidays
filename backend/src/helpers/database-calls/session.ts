import prisma from "@/config/db";
import { HTTP_STATUS } from "@/constants";
import { AppError } from "@/utils/error";

export const getSessionByRefreshToken = async (refreshToken: string) => {
  const session = await prisma.session.findFirst({
    where: {
      refreshToken: refreshToken,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    throw new AppError("Session not found", HTTP_STATUS.UNAUTHORIZED);
  }

  return session;
};

export const getSessionByEmail = async (email: string) => {
  const session = await prisma.session.findFirst({
    where: {
      user: {
        email: email,
      },
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    throw new AppError("Session not found", HTTP_STATUS.UNAUTHORIZED);
  }

  return session;
};

export const deleteSessionByEmail = async (email: string) => {
  await prisma.session.deleteMany({
    where: {
      user: {
        email: email.toLowerCase(),
      },
    },
  });
};
