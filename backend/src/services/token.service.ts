import { CookieOptions, Request, Response } from "express";
import { User } from "../../generated/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  COOKIE_DOMAIN,
  FIFTEEN_MINUTES_IN_MS,
  FIVE_MINUTES_IN_MS,
  HTTP_STATUS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  ONE_WEEK_IN_MS,
} from "@/constants";
import { AppError } from "@/utils/error";

export const generateTwoFactorToken = async (length: number = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  return { code: code.toString().padStart(length, "0"), expiresAt };
};

export type JWTResponse = {
  accessToken: string;
  refreshToken: string;
};

export const createJWT = async (user: User): Promise<JWTResponse> => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email },
    JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: FIVE_MINUTES_IN_MS, algorithm: "HS256" }
  );

  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: FIFTEEN_MINUTES_IN_MS,
    algorithm: "HS256",
  });

  return { accessToken, refreshToken };
};

// Decoded Token Type

// Verify JWT
export const verifyJWTToken = async (
  token: string,
  type: "access" | "refresh"
): Promise<JwtPayload> => {
  const secret =
    type === "access" ? JWT_ACCESS_TOKEN_SECRET : JWT_REFRESH_TOKEN_SECRET;

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(`${type} Token expired`, HTTP_STATUS.UNAUTHORIZED);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Invalid token", HTTP_STATUS.UNAUTHORIZED);
    }

    throw new Error("Invalid token");
  }
};

// Get Access and Refresh Token from request
export const getJWTTokens = async (req: Request): Promise<JWTResponse> => {
  let accessToken = "";
  let refreshToken = "";

  accessToken =
    // 1. Check Cookies (HTTP Only - Web Application)
    req.cookies?.accessToken ||
    // 2. Check Authorization Header with Bearer Token
    (req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null) ||
    // 3. Check Custom Header (Mobile Application)
    (req.headers["x-access-token"] as string) ||
    // 4. Check URL Parameter
    (req.query?.access_token as string);

  refreshToken =
    // 1. Check HTTP Only Cookie (Web App)
    req.cookies?.refreshToken ||
    // 2. Check custom header (Mobile App)
    (req.headers["x-refresh-token"] as string) ||
    // 3. Check query parameter (Special cases like payment gateways/websocket/etc)
    (req.query.refresh_token as string);

  return { accessToken, refreshToken };
};

export const handleJWTTokens = (
  res: Response,
  isDeviceMobile: boolean,
  tokens: JWTResponse
) => {
  const { accessToken, refreshToken } = tokens;

  if (isDeviceMobile) {
    res.setHeader("Authorization", `Bearer ${accessToken}`);
    res.setHeader("x-access-token", accessToken);
    res.setHeader("x-refresh-token", refreshToken);
    return;
  }

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    domain: process.env.NODE_ENV === "production" ? COOKIE_DOMAIN : undefined,
    path: "/",
  };

  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    maxAge: ONE_WEEK_IN_MS, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    maxAge: FIVE_MINUTES_IN_MS, // 1 day
  });

  return;
};
