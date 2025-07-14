import { findUserByEmail } from "@/helpers/database-calls/user";
import { ForgotPasswordInput, ResetPasswordInput } from "./schema";
import { generateVerificationToken } from "@/services/token.service";
import prisma from "@/config/db";
import bcrypt from "bcryptjs";

export const forgotPasswordService = async (
  data: ForgotPasswordInput
): Promise<{ message: string; token: string }> => {
  const { email } = data;

  //   Find User
  const user = await findUserByEmail(email.toLowerCase());

  //   We can have a generic message return for user not found. i.e A reset link will be sent if this email is registered
  if (!user) {
    throw new Error("A reset link will be sent if this email is registered");
  }

  //  Generate Reset Token
  const existingToken = await prisma.resetPasswordToken.findFirst({
    where: { userId: user.id },
  });

  if (existingToken) {
    await prisma.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  const resetToken = await generateVerificationToken();

  // Send Email

  // Update user table with reset token
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: {
        create: {
          token: resetToken.token,
          expiresAt: resetToken.expiresAt,
        },
      },
    },
  });

  return {
    token: resetToken.token,
    message: "A reset link will be sent if this email is registered",
  };
};

export const resetPasswordService = async (
  data: ResetPasswordInput
): Promise<{ message: string }> => {
  const { token, password } = data;

  //   Find User
  const resetToken = await prisma.resetPasswordToken.findFirst({
    where: { token: token },
    include: {
      user: true,
    },
  });

  //   Validate Reset Token
  if (!resetToken || resetToken.expiresAt < new Date()) {
    throw new Error("Reset token is invalid or has expired");
  }

  //   Password Compare
  const isSame = await bcrypt.compare(password, resetToken.user.password);

  if (isSame) {
    throw new Error("New password must be different from the old password");
  }

  //   Password Hash
  const hashedPassword = await bcrypt.hash(password, 10);

  //   Update User Password
  await prisma.user.update({
    where: {
      id: resetToken.user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  //   Delete Reset Token
  await prisma.resetPasswordToken.delete({
    where: {
      id: resetToken.id,
    },
  });

  //   Delete All Sessions
  await prisma.session.deleteMany({
    where: {
      userId: resetToken.user.id,
    },
  });

  return {
    message: "Password reset successfully, Please login with new password",
  };
};
