import { DayItineraryItem } from "@/generated/prisma";
import {
  createDayItineraryItemSchema,
  updateDayItineraryItemSchema,
  getDayItineraryItemByIdSchema,
  getDayItineraryItemsByTourIdSchema,
} from "@/schemas/day-itinerary-item.schema";
import { z } from "zod";
import { ApiResponse } from "./api-response.types";

/**
 * Input type for creating a day itinerary item
 */
export type CreateDayItineraryItemInput = z.infer<typeof createDayItineraryItemSchema>;

/**
 * Input type for updating a day itinerary item
 */
export type UpdateDayItineraryItemInput = z.infer<typeof updateDayItineraryItemSchema>;

/**
 * Input type for getting a day itinerary item by ID
 */
export type GetDayItineraryItemByIdInput = z.infer<typeof getDayItineraryItemByIdSchema>;

/**
 * Input type for getting day itinerary items by tour ID
 */
export type GetDayItineraryItemsByTourIdInput = z.infer<typeof getDayItineraryItemsByTourIdSchema>;

/**
 * Service response for creating a day itinerary item
 */
export type CreateDayItineraryItemServiceResponse = {
  dayItineraryItem: DayItineraryItem;
};

/**
 * Service response for updating a day itinerary item
 */
export type UpdateDayItineraryItemServiceResponse = {
  dayItineraryItem: DayItineraryItem;
};

/**
 * Service response for getting a day itinerary item by ID
 */
export type GetDayItineraryItemByIdServiceResponse = {
  dayItineraryItem: DayItineraryItem;
};

/**
 * Service response for getting day itinerary items by tour ID
 */
export type GetDayItineraryItemsByTourIdServiceResponse = {
  dayItineraryItems: DayItineraryItem[];
};

/**
 * API response for creating a day itinerary item
 */
export type CreateDayItineraryItemResponse = ApiResponse<CreateDayItineraryItemServiceResponse>;

/**
 * API response for updating a day itinerary item
 */
export type UpdateDayItineraryItemResponse = ApiResponse<UpdateDayItineraryItemServiceResponse>;

/**
 * API response for getting a day itinerary item by ID
 */
export type GetDayItineraryItemByIdResponse = ApiResponse<GetDayItineraryItemByIdServiceResponse>;

/**
 * API response for getting day itinerary items by tour ID
 */
export type GetDayItineraryItemsByTourIdResponse = ApiResponse<GetDayItineraryItemsByTourIdServiceResponse>;