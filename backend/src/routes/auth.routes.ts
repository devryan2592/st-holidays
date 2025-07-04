import {
  registerUser,
  loginUser,
  twoFactorLogin,
  refreshToken,
  forgotPassword,
  resetPassword,
} from "@/controllers/auth-controllers";

import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/2fa-login", twoFactorLogin);
router.post("/refresh-token", refreshToken);

// Password Management
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
