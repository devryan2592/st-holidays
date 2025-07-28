import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants/http-status";
import { catchAsync } from "@/utils/catch-async";
import { sendError, sendSuccess, sendZodError } from "@/utils/api-response";
import {
  createTourSchema,
  updateTourSchema,
  getTourByIdSchema,
} from "@/schemas/tour.schema";
import * as tourService from "@/services/tour.service";
import {
  CreateTourInput,
  UpdateTourInput,
  GetTourByIdInput,
} from "@/types/tour.types";

/**
 * @desc    Create a new tour
 * @route   POST /api/tours
 * @access  Private/Admin
 */
export const createTour = catchAsync(async (req: Request, res: Response) => {
  // Validate input
  const validationResult = createTourSchema.safeParse(req.body);

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: CreateTourInput = validationResult.data;

  // Create tour
  const tour = await tourService.createTour(data);

  // Send response
  return sendSuccess(res, "Tour created successfully", {
    tour,
  });
});

/**
 * @desc    Update an existing tour
 * @route   PUT /api/tours/:id
 * @access  Private/Admin
 */
export const updateTour = catchAsync(async (req: Request, res: Response) => {
  // Get ID from params and add to body for validation
  const id = req.params.id;
  const body = { ...req.body, id };

  // Validate input
  const validationResult = updateTourSchema.safeParse(body);

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: UpdateTourInput = validationResult.data;

  try {
    // Update tour
    const tour = await tourService.updateTour(data);

    // Send response
    return sendSuccess(res, "Tour updated successfully", {
      tour,
    });
  } catch (error) {
    return sendError(
      res,
      error instanceof Error ? error.message : "Tour not found",
      HTTP_STATUS.NOT_FOUND
    );
  }
});

/**
 * @desc    Delete a tour
 * @route   DELETE /api/tours/:id
 * @access  Private/Admin
 */
export const deleteTour = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Check if tour exists
    await tourService.getTourById(id);

    // Delete tour
    await tourService.deleteTour(id);

    // Send response
    return sendSuccess(res, "Tour deleted successfully");
  } catch (error) {
    return sendError(
      res,
      error instanceof Error ? error.message : "Tour not found",
      HTTP_STATUS.NOT_FOUND
    );
  }
});

/**
 * @desc    Get all tours
 * @route   GET /api/tours
 * @access  Public
 */
export const getTours = catchAsync(async (_req: Request, res: Response) => {
  // Get all tours
  const tours = await tourService.getTours();

  // Send response
  return sendSuccess(res, "Tours retrieved successfully", {
    tours,
  });
});

/**
 * @desc    Get a tour by ID
 * @route   GET /api/tours/:id
 * @access  Public
 */
export const getTourById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  // Validate input
  const validationResult = getTourByIdSchema.safeParse({ id });

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: GetTourByIdInput = validationResult.data;

  try {
    // Get tour by ID
    const tour = await tourService.getTourById(data.id);

    // Send response
    return sendSuccess(res, "Tour retrieved successfully", {
      tour,
    });
  } catch (error) {
    return sendError(
      res,
      error instanceof Error ? error.message : "Tour not found",
      HTTP_STATUS.NOT_FOUND
    );
  }
});
