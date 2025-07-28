import { z } from 'zod';

/**
 * Enum for meal types
 */
export const MealsEnum = z.enum(['BREAKFAST', 'LUNCH', 'DINNER']);

/**
 * Schema for validating day itinerary item creation input
 */
export const createDayItineraryItemSchema = z.object({
  tourId: z.string({ required_error: "Tour ID is required" }),
  dayNumber: z.number({ required_error: "Day number is required" }).int().positive(),
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  images: z.array(z.string()).optional(),
  meals: z.array(MealsEnum).optional(),
  duration: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().optional(),
});

/**
 * Schema for validating day itinerary item update input
 */
export const updateDayItineraryItemSchema = z.object({
  id: z.string(),
  tourId: z.string().optional(),
  dayNumber: z.number().int().positive().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).optional(),
  meals: z.array(MealsEnum).optional(),
  duration: z.number().int().positive().optional(),
  order: z.number().int().nonnegative().optional(),
});

/**
 * Schema for validating day itinerary item retrieval by ID
 */
export const getDayItineraryItemByIdSchema = z.object({
  id: z.string(),
});

/**
 * Schema for validating day itinerary items retrieval by tour ID
 */
export const getDayItineraryItemsByTourIdSchema = z.object({
  tourId: z.string(),
});