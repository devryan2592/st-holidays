import { z } from 'zod';

/**
 * Schema for validating city creation input
 */
export const createCitySchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  destinationId: z.string({ required_error: "Destination ID is required" }),
});

/**
 * Schema for validating city update input
 */
export const updateCitySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  destinationId: z.string().optional(),
});

/**
 * Schema for validating city retrieval by ID
 */
export const getCityByIdSchema = z.object({
  id: z.string(),
});