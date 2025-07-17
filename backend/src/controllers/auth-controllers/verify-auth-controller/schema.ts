import { ApiResponse } from "@/helpers/api-response";
import { User } from "../../../../generated/prisma";

export type VerifyAuthResponse = ApiResponse<Omit<User, "password">>;
