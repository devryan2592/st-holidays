import { ApiResponse } from "@/helpers/api-resonse";
import { User } from "../../../../generated/prisma";

export type VerifyAuthResponse = ApiResponse<Omit<User, "password">>;