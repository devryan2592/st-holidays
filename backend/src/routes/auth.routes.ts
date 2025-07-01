import {
  registerUser,
  loginUser,
  twoFactorLogin,
  refreshToken,
} from "@/controllers/auth-controllers";

import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/2fa-login", twoFactorLogin);
router.post("/refresh-token", refreshToken);

export default router;
