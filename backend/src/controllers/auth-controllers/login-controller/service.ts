import { findUserByEmail } from "@/helpers/database-calls/user";
import { LoginUserInput, TwoFactorLoginInput } from "./schema";
import { HTTP_STATUS, ONE_WEEK_IN_MS } from "@/constants";
import { AppError } from "@/utils/error";
import bcrypt from "bcryptjs";
import { User } from "../../../../generated/prisma";
import { createJWT, generateTwoFactorToken } from "@/services/token.service";
import prisma from "@/config/db";
import { isMobile } from "@/services/ip-device.service";

export const loginUserService = async (data: LoginUserInput) => {
  const { email, password } = data;

  const user = await validateCredentials(email, password);

  const response = await initiateTwoFactorLogin(user);

  // Return response
  return response;
};

export const twoFactorLoginService = async (
  data: TwoFactorLoginInput,
  refreshToken: string,
  ipAddress: string,
  userAgent: string
) => {
  const { userId, token } = data;

  const twoFactorToken = await prisma.twoFactorToken.findFirst({
    where: { userId },
    include: {
      user: true,
    },
  });

  if (!twoFactorToken) {
    throw new AppError("Invalid 2FA code", HTTP_STATUS.BAD_REQUEST);
  }

  if (twoFactorToken.token !== token) {
    throw new AppError("Invalid 2FA code", HTTP_STATUS.BAD_REQUEST);
  }

  if (twoFactorToken.expiresAt < new Date()) {
    throw new AppError("2FA code has expired", HTTP_STATUS.BAD_REQUEST);
  }

  // Here we will check the refresh token and session. Then create or update session and return
  const response = await createAndSendTokensAndSession(
    twoFactorToken.user,
    ipAddress,
    userAgent,
    refreshToken
  );

  // Delete 2FA code
  await prisma.twoFactorToken.delete({
    where: {
      id: twoFactorToken.id,
    },
  });

  // Return response
  return {
    user: twoFactorToken.user,
    session: response.session,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
};

const createAndSendTokensAndSession = async (
  user: User,
  ipAddress: string,
  userAgent: string,
  refreshToken?: string
) => {
  const { accessToken, refreshToken: newRefreshToken } = await createJWT(user);

  const mobile = await isMobile(userAgent);

  let session;

  // Check for existing refresh token and session
  if (refreshToken && refreshToken !== "null" && refreshToken !== "") {
    const existingSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        refreshToken: {
          token: refreshToken,
        },
      },
    });

    if (existingSession) {
      // Update session and refresh token
      session = await prisma.session.update({
        where: {
          id: existingSession.id,
        },
        data: {
          lastUsed: new Date(),
          deviceType: mobile ? "mobile" : "desktop",
          userAgent: userAgent,
          ipAddress: ipAddress,
          expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS), // 1 week
          refreshToken: {
            update: {
              token: newRefreshToken,
              expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS), // 1 week
            },
          },
        },
      });
    }
  } else {
    // If no existing refresh token check for session wih same IP and user agent
    const existingSession = await prisma.session.findFirst({
      where: {
        userId: user.id,
        ipAddress,
        userAgent,
      },
    });

    if (existingSession) {
      // Update session and refresh token
      session = await prisma.session.update({
        where: {
          id: existingSession.id,
        },
        data: {
          lastUsed: new Date(),
          deviceType: mobile ? "mobile" : "desktop",
          userAgent: userAgent,
          ipAddress: ipAddress,
          expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS), // 1 week
          refreshToken: {
            update: {
              token: newRefreshToken,
              expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS), // 1 week
            },
          },
        },
      });
    }
  }

  if (!session) {
    // Create new session
    session = await prisma.session.create({
      data: {
        userId: user.id,
        ipAddress,
        userAgent,
        deviceType: mobile ? "mobile" : "desktop",
        expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS), // 1 week
        refreshToken: {
          create: {
            token: newRefreshToken,
            expiresAt: new Date(Date.now() + ONE_WEEK_IN_MS), // 1 week
          },
        },
      },
    });
  }

  return {
    accessToken,
    refreshToken: newRefreshToken,
    session,
  };
};

// Helper Functions
const validateCredentials = async (email: string, password: string) => {
  const user = await findUserByEmail(email.toLowerCase());

  if (!user) {
    throw new AppError("Invalid Credentials", HTTP_STATUS.BAD_REQUEST);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid Credentials", HTTP_STATUS.BAD_REQUEST);
  }

  return user;
};

const initiateTwoFactorLogin = async (
  user: User
): Promise<{ userId: string; token: string }> => {
  // Generate 6 Digit Code
  const { code, expiresAt } = await generateTwoFactorToken(6);

  // Save code to database
  const twoFactorCode = await prisma.twoFactorToken.upsert({
    where: { userId: user.id },
    create: {
      token: code,
      expiresAt,
      userId: user.id,
    },
    update: {
      token: code,
      expiresAt,
    },
    select: {
      userId: true,
      token: true,
      expiresAt: true,
    },
  });

  // Send the code to user's email
  return {
    userId: twoFactorCode.userId,
    token: twoFactorCode.token,
  };
};
