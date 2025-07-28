import { Response, Router } from "express";

import { HTTP_STATUS } from "@/constants";
import destinationRoutes from "./destination.routes";
import cityRoutes from "./city.routes";
import tourRoutes from "./tour.routes";
import dayItineraryItemRoutes from "./day-itinerary-item.routes";

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

// Tour Routes
router.use("/tours", tourRoutes);

// Day Itinerary Item Routes
router.use("/day-itinerary-items", dayItineraryItemRoutes);

export default router;
