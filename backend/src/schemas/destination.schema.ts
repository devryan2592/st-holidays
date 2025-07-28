import { z } from 'zod';

/**
 * Schema for validating destination creation input
 */
export const createDestinationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
});

/**
 * Schema for validating destination update input
 */
export const updateDestinationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
});

/**
 * Schema for validating destination retrieval by ID
 */
export const getDestinationByIdSchema = z.object({
  id: z.string(),
});