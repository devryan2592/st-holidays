import { User } from "../../../../generated/prisma";

export const verifyAuthService = async (user: User) => {
  return user;
};