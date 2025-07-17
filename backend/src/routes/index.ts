import { Response, Router } from "express";

import { HTTP_STATUS } from "@/constants";
import authRoutes from "./auth.routes";
// import userRoutes from "./user.routes";
import destinationRoutes from "./destination.routes";
import cityRoutes from "./city.routes";

const router = Router();

// Health Check Route
router.get("/health", (_, res: Response) => {
  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "OK",
  });
});

// Auth Routes
router.use("/auth", authRoutes);

// User Routes
// router.use("/user", userRoutes);

// Destination Routes
router.use("/destinations", destinationRoutes);

// City Routes
router.use("/cities", cityRoutes);

export default router;
