import {
  registerUser,
  loginUser,
  twoFactorLogin,
} from "@/controllers/auth-controllers";

import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/2fa-login", twoFactorLogin);

export default router;
