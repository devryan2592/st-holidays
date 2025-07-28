import { Request, Response } from "express";
import { ApiResponse } from "@/types/api-response.types";
import { catchAsync } from "@/utils/catch-async";
import {
  createDestination,
  deleteDestination,
  getDestinationById,
  getDestinations,
  updateDestination,
} from "../services/destination.service";
import {
  createDestinationSchema,
  getDestinationByIdSchema,
  updateDestinationSchema,
} from "../schemas/destination.schema";
import {
  CreateDestinationResponse,
  GetAllDestinationsResponse,
  GetDestinationByIdResponse,
  UpdateDestinationResponse,
} from "../types/destination.types";
import { sendSuccess, sendZodError } from "@/utils/api-response";

/**
 * Controller for creating a new destination
 */
export const createDestinationController = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<CreateDestinationResponse>>
  ) => {
    const { data, success, error } = createDestinationSchema.safeParse(
      req.body
    );

    if (!success) return sendZodError(res, error);

    const destination = await createDestination(data);

    return sendSuccess(res, "Destination created successfully", {
      destination,
    });
  }
);

/**
 * Controller for updating an existing destination
 */
export const updateDestinationController = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<UpdateDestinationResponse>>
  ) => {
    const { id } = req.params;
    const { data, success, error } = updateDestinationSchema.safeParse({
      ...req.body,
      id,
    });

    if (!success) return sendZodError(res, error);

    const destination = await updateDestination(data);

    return sendSuccess(res, "Destination updated successfully", {
      destination,
    });
  }
);

/**
 * Controller for deleting a destination
 */
export const deleteDestinationController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    await deleteDestination(id);

    return sendSuccess(res, "Destination deleted successfully");
  }
);

/**
 * Controller for getting all destinations
 */
export const getAllDestinationsController = catchAsync(
  async (
    _: Request,
    res: Response<ApiResponse<GetAllDestinationsResponse>>
  ) => {
    const destinations = await getDestinations();

    return sendSuccess(res, "Destinations retrieved successfully", {
      destinations,
    });
  }
);

/**
 * Controller for getting a single destination by ID
 */
export const getDestinationByIdController = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<GetDestinationByIdResponse>>
  ) => {
    const { id } = req.params;

    const { data, success, error } = getDestinationByIdSchema.safeParse({ id });

    if (!success) return sendZodError(res, error);

    const destination = await getDestinationById(data.id);

    return sendSuccess(res, "Destination retrieved successfully", {
      destination,
    });
  }
);
