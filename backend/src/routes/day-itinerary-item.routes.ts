import express from "express";
import * as dayItineraryItemController from "@/controllers/day-itinerary-item.controller";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = express.Router();

/**
 * @route   POST /api/day-itinerary-items
 * @desc    Create a new day itinerary item
 * @access  Private/Admin
 */
router.post(
  "/",
  authMiddleware,
  dayItineraryItemController.createDayItineraryItem
);

/**
 * @route   GET /api/day-itinerary-items/:id
 * @desc    Get a day itinerary item by ID
 * @access  Public
 */
router.get("/:id", dayItineraryItemController.getDayItineraryItemById);

/**
 * @route   GET /api/day-itinerary-items/tour/:tourId
 * @desc    Get all day itinerary items for a specific tour
 * @access  Public
 */
router.get(
  "/tour/:tourId",
  dayItineraryItemController.getDayItineraryItemsByTourId
);

/**
 * @route   PUT /api/day-itinerary-items/:id
 * @desc    Update an existing day itinerary item
 * @access  Private/Admin
 */
router.put(
  "/:id",
  authMiddleware,
  dayItineraryItemController.updateDayItineraryItem
);

/**
 * @route   DELETE /api/day-itinerary-items/:id
 * @desc    Delete a day itinerary item
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  authMiddleware,
  dayItineraryItemController.deleteDayItineraryItem
);

export default router;
