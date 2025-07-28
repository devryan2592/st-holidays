import { Destination } from "@/generated/prisma";
import { ApiResponse } from "@/utils/api-response";
import {
  createDestinationSchema,
  updateDestinationSchema,
  getDestinationByIdSchema,
} from "@/schemas/destination.schema";
import { z } from "zod";

/**
 * Input type for creating a destination
 */
export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;

/**
 * Input type for updating a destination
 */
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;

/**
 * Input type for getting a destination by ID
 */
export type GetDestinationByIdInput = z.infer<typeof getDestinationByIdSchema>;

/**
 * Service response for creating a destination
 */
export type CreateDestinationServiceResponse = {
  destination: Destination;
};

/**
 * Service response for updating a destination
 */
export type UpdateDestinationServiceResponse = {
  destination: Destination;
};

/**
 * Service response for getting a destination by ID
 */
export type GetDestinationByIdServiceResponse = {
  destination: Destination;
};

/**
 * Service response for getting all destinations
 */
export type GetAllDestinationsServiceResponse = {
  destinations: Destination[];
};

/**
 * API response for creating a destination
 */
export type CreateDestinationResponse =
  ApiResponse<CreateDestinationServiceResponse>;

/**
 * API response for updating a destination
 */
export type UpdateDestinationResponse =
  ApiResponse<UpdateDestinationServiceResponse>;

/**
 * API response for getting a destination by ID
 */
export type GetDestinationByIdResponse =
  ApiResponse<GetDestinationByIdServiceResponse>;

/**
 * API response for getting all destinations
 */
export type GetAllDestinationsResponse =
  ApiResponse<GetAllDestinationsServiceResponse>;
