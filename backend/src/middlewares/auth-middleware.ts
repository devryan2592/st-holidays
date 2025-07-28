import { HTTP_STATUS } from "@/constants";
import { AppError } from "@/utils/error";
import { Request, Response, NextFunction } from "express";

// Only check for access token and if it is valid, set the user in the request object (else 401)

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next();
};
