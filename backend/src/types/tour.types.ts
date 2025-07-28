import { Tour } from "@/generated/prisma";
import {
  createTourSchema,
  updateTourSchema,
  getTourByIdSchema,
} from "@/schemas/tour.schema";
import { z } from "zod";
import { ApiResponse } from "./api-response.types";

/**
 * Input type for creating a tour
 */
export type CreateTourInput = z.infer<typeof createTourSchema>;

/**
 * Input type for updating a tour
 */
export type UpdateTourInput = z.infer<typeof updateTourSchema>;

/**
 * Input type for getting a tour by ID
 */
export type GetTourByIdInput = z.infer<typeof getTourByIdSchema>;

/**
 * Service response for creating a tour
 */
export type CreateTourServiceResponse = {
  tour: Tour;
};

/**
 * Service response for updating a tour
 */
export type UpdateTourServiceResponse = {
  tour: Tour;
};

/**
 * Service response for getting a tour by ID
 */
export type GetTourByIdServiceResponse = {
  tour: Tour;
};

/**
 * Service response for getting all tours
 */
export type GetAllToursServiceResponse = {
  tours: Tour[];
};

/**
 * API response for creating a tour
 */
export type CreateTourResponse = ApiResponse<CreateTourServiceResponse>;

/**
 * API response for updating a tour
 */
export type UpdateTourResponse = ApiResponse<UpdateTourServiceResponse>;

/**
 * API response for getting a tour by ID
 */
export type GetTourByIdResponse = ApiResponse<GetTourByIdServiceResponse>;

/**
 * API response for getting all tours
 */
export type GetAllToursResponse = ApiResponse<GetAllToursServiceResponse>;