import { findUserByEmail } from "@/helpers/database-calls/user";
import { RegisterServiceResponse, RegisterUserInput } from "./schema";
import { AppError } from "@/utils/error";
import { HTTP_STATUS } from "@/constants";
import bcrypt from "bcryptjs";
import prisma from "@/config/db";

export const registerUserService = async (
  data: RegisterUserInput
): Promise<RegisterServiceResponse | null> => {
  const { email, password } = data;

  // Check if user already exists
  const existingUser = await findUserByEmail(email.toLocaleLowerCase());

  if (existingUser) {
    throw new AppError("User already exists", HTTP_STATUS.BAD_REQUEST);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create User
  const newUser = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });

  return newUser;
};
