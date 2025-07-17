import {
  registerUser,
  loginUser,
  twoFactorLogin,
  refreshToken,
  forgotPassword,
  resetPassword,
  changePassword,
  verifyAuth,
} from "@/controllers/auth-controllers";

import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/2fa-login", twoFactorLogin);

router.post("/refresh-token", refreshToken);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

router.post("/change-password", authMiddleware, changePassword);

router.get("/verify", authMiddleware, verifyAuth);

export default router;
