import { Request, Response } from "express";

import { catchAsync } from "@/helpers/catch-async";
import { ApiResponse, sendSuccess, sendZodError } from "@/helpers/api-resonse";
import {
  CreateDestinationResponse,
  createDestinationSchema,
  UpdateDestinationResponse,
  updateDestinationSchema,
} from "./schema";
import {
  createDestination,
  deleteDestinationService,
  updateDestination,
} from "./service";
import {
  getDestinationById,
  getDestinations,
} from "@/helpers/database-calls/destinations";

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

export const updateDestinationController = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<UpdateDestinationResponse>>
  ) => {
    const { data, success, error } = updateDestinationSchema.safeParse(
      req.body
    );

    if (!success) return sendZodError(res, error);

    const destination = await updateDestination(data);

    return sendSuccess(res, "Destination updated successfully", {
      destination,
    });
  }
);

export const deleteDestinationController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    await deleteDestinationService(id);

    return sendSuccess(res, "Destination deleted successfully");
  }
);

// Get Destinations

export const getAllDestinationsController = catchAsync(
  async (_: Request, res: Response<ApiResponse>) => {
    const destinations = await getDestinations();

    return sendSuccess(res, "Destinations retrieved successfully", {
      destinations,
    });
  }
);

// Get Destination by ID

export const getSingleDestinationController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    const destination = await getDestinationById(id);

    return sendSuccess(res, "Destination retrieved successfully", {
      destination,
    });
  }
);
