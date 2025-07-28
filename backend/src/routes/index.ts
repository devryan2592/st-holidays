import { Response, Router } from "express";

import { HTTP_STATUS } from "@/constants";
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

// Destination Routes
router.use("/destinations", destinationRoutes);

// City Routes
router.use("/cities", cityRoutes);

// Day Itinerary Routes

export default router;
