import { User } from "../../../../generated/prisma";
import { ChangePasswordInput } from "./schema";
import bcrypt from "bcryptjs";
import prisma from "@/config/db";

export const changePasswordService = async (
  user: User,
  data: ChangePasswordInput
): Promise<{ message: string }> => {
  //   Compare Old Password
  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new Error("Old password is incorrect");
  }

  //   Hash New Password
  const hashedPassword = await bcrypt.hash(data.newPassword, 12);

  //   Update Password
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  //   Delete All Sessions
  await prisma.session.deleteMany({
    where: {
      userId: user.id,
    },
  });

  return {
    message: "Password changed successfully. Please login with new password.",
  };
};
