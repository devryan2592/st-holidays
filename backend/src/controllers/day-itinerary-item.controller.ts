import { Request, Response } from "express";
import { HTTP_STATUS } from "@/constants/http-status";
import { catchAsync } from "@/utils/catch-async";
import { sendApiResponse, sendError, sendZodError } from "@/utils/api-response";
import {
  createDayItineraryItemSchema,
  updateDayItineraryItemSchema,
  getDayItineraryItemByIdSchema,
  getDayItineraryItemsByTourIdSchema,
} from "@/schemas/day-itinerary-item.schema";
import * as dayItineraryItemService from "@/services/day-itinerary-item.service";
import {
  CreateDayItineraryItemInput,
  UpdateDayItineraryItemInput,
  GetDayItineraryItemByIdInput,
  GetDayItineraryItemsByTourIdInput,
} from "@/types/day-itinerary-item.types";

/**
 * @desc    Create a new day itinerary item
 * @route   POST /api/day-itinerary-items
 * @access  Private/Admin
 */
export const createDayItineraryItem = catchAsync(async (req: Request, res: Response) => {
  // Validate input
  const validationResult = createDayItineraryItemSchema.safeParse(req.body);

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: CreateDayItineraryItemInput = validationResult.data;

  try {
    // Create day itinerary item
    const dayItineraryItem = await dayItineraryItemService.createDayItineraryItem(data);

    // Send response
    return sendApiResponse(res, {
      statusCode: HTTP_STATUS.CREATED,
      success: true,
      message: "Day itinerary item created successfully",
      data: {
        dayItineraryItem,
      },
    });
  } catch (error) {
    return sendError(res, {
      statusCode: HTTP_STATUS.BAD_REQUEST,
      message: error instanceof Error ? error.message : "Failed to create day itinerary item",
    });
  }
});

/**
 * @desc    Update an existing day itinerary item
 * @route   PUT /api/day-itinerary-items/:id
 * @access  Private/Admin
 */
export const updateDayItineraryItem = catchAsync(async (req: Request, res: Response) => {
  // Get ID from params and add to body for validation
  const id = req.params.id;
  const body = { ...req.body, id };

  // Validate input
  const validationResult = updateDayItineraryItemSchema.safeParse(body);

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: UpdateDayItineraryItemInput = validationResult.data;

  try {
    // Update day itinerary item
    const dayItineraryItem = await dayItineraryItemService.updateDayItineraryItem(data);

    // Send response
    return sendApiResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Day itinerary item updated successfully",
      data: {
        dayItineraryItem,
      },
    });
  } catch (error) {
    return sendError(res, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: error instanceof Error ? error.message : "Day itinerary item not found",
    });
  }
});

/**
 * @desc    Delete a day itinerary item
 * @route   DELETE /api/day-itinerary-items/:id
 * @access  Private/Admin
 */
export const deleteDayItineraryItem = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    // Check if day itinerary item exists
    await dayItineraryItemService.getDayItineraryItemById(id);

    // Delete day itinerary item
    await dayItineraryItemService.deleteDayItineraryItem(id);

    // Send response
    return sendApiResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Day itinerary item deleted successfully",
      data: null,
    });
  } catch (error) {
    return sendError(res, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: error instanceof Error ? error.message : "Day itinerary item not found",
    });
  }
});

/**
 * @desc    Get a day itinerary item by ID
 * @route   GET /api/day-itinerary-items/:id
 * @access  Public
 */
export const getDayItineraryItemById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  // Validate input
  const validationResult = getDayItineraryItemByIdSchema.safeParse({ id });

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: GetDayItineraryItemByIdInput = validationResult.data;

  try {
    // Get day itinerary item by ID
    const dayItineraryItem = await dayItineraryItemService.getDayItineraryItemById(data.id);

    // Send response
    return sendApiResponse(res, {
      statusCode: HTTP_STATUS.OK,
      success: true,
      message: "Day itinerary item retrieved successfully",
      data: {
        dayItineraryItem,
      },
    });
  } catch (error) {
    return sendError(res, {
      statusCode: HTTP_STATUS.NOT_FOUND,
      message: error instanceof Error ? error.message : "Day itinerary item not found",
    });
  }
});

/**
 * @desc    Get all day itinerary items for a tour
 * @route   GET /api/day-itinerary-items/tour/:tourId
 * @access  Public
 */
export const getDayItineraryItemsByTourId = catchAsync(async (req: Request, res: Response) => {
  const tourId = req.params.tourId;

  // Validate input
  const validationResult = getDayItineraryItemsByTourIdSchema.safeParse({ tourId });

  if (!validationResult.success) {
    return sendZodError(res, validationResult.error);
  }

  const data: GetDayItineraryItemsByTourIdInput = validationResult.data;

  // Get day itinerary items by tour ID
  const dayItineraryItems = await dayItineraryItemService.getDayItineraryItemsByTourId(data.tourId);

  // Send response
  return sendApiResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: "Day itinerary items retrieved successfully",
    data: {
      dayItineraryItems,
    },
  });
});