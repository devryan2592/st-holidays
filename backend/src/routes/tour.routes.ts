import express from "express";
import * as tourController from "@/controllers/tour.controller";
import { authMiddleware } from "@/middlewares/auth-middleware";

const router = express.Router();

/**
 * @route   POST /api/tours
 * @desc    Create a new tour
 * @access  Private/Admin
 */
router.post("/", authMiddleware, tourController.createTour);

/**
 * @route   GET /api/tours
 * @desc    Get all tours
 * @access  Public
 */
router.get("/", tourController.getTours);

/**
 * @route   GET /api/tours/:id
 * @desc    Get a tour by ID
 * @access  Public
 */
router.get("/:id", tourController.getTourById);

/**
 * @route   PUT /api/tours/:id
 * @desc    Update an existing tour
 * @access  Private/Admin
 */
router.put("/:id", authMiddleware, tourController.updateTour);

/**
 * @route   DELETE /api/tours/:id
 * @desc    Delete a tour
 * @access  Private/Admin
 */
router.delete("/:id", authMiddleware, tourController.deleteTour);

export default router;
