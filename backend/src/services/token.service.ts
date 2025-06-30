import { Request, Response } from "express";
import { User } from "../../generated/prisma";
import jwt from "jsonwebtoken";
import {
  HTTP_STATUS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
} from "@/constants";

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
    { expiresIn: "1m", algorithm: "HS256" }
  );

  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });

  return { accessToken, refreshToken };
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

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  return;
};
