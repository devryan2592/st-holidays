import { HTTP_STATUS } from "@/constants";
import { getSessionByEmail } from "@/helpers/database-calls/session";
import { findUserByEmail } from "@/helpers/database-calls/user";
import { getJWTTokens, verifyJWTToken } from "@/services/token.service";
import { AppError } from "@/utils/error";
import { Request, Response, NextFunction } from "express";

// Only check for access token and if it is valid, set the user in the request object (else 401)

export const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    console.log("Auth Middleware Running");
    const { accessToken } = await getJWTTokens(req);

    if (!accessToken) {
      throw new AppError(
        "Unauthorized from Middleware",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    // Check Token
    const decoded = await verifyJWTToken(accessToken, "access");

    // Find Session
    const existingSession = await getSessionByEmail(
      decoded.email.toLowerCase()
    );

    console.log("Session from Auth Middleware", existingSession);

    if (!existingSession) {
      throw new AppError(
        "Unauthorized from Middleware",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    if (existingSession.expiresAt < new Date()) {
      throw new AppError(
        "Session Expired, Please Login Again",
        HTTP_STATUS.UNAUTHORIZED
      );
    }

    req.user = existingSession.user;
    next();
  } catch (error) {
    next(error);
  }
};
