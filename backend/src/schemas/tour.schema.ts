import { z } from 'zod';

/**
 * Schema for validating tour creation input
 */
export const createTourSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  slug: z.string().optional(),
  description: z.string({ required_error: "Description is required" }),
  featured: z.boolean().optional().default(false),
  duration: z.number({ required_error: "Duration is required" }).int().positive(),
  category: z.string().optional(),
  packageType: z.string().optional(),
  price: z.number({ required_error: "Price is required" }).positive(),
  offerPrice: z.number().positive().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  terms: z.array(z.string()).optional(),
  destinationId: z.string({ required_error: "Destination ID is required" }),
  cityIds: z.array(z.string()).optional(),
});

/**
 * Schema for validating tour update input
 */
export const updateTourSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  featured: z.boolean().optional(),
  duration: z.number().int().positive().optional(),
  category: z.string().optional(),
  packageType: z.string().optional(),
  price: z.number().positive().optional(),
  offerPrice: z.number().positive().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  highlights: z.array(z.string()).optional(),
  inclusions: z.array(z.string()).optional(),
  exclusions: z.array(z.string()).optional(),
  terms: z.array(z.string()).optional(),
  destinationId: z.string().optional(),
  cityIds: z.array(z.string()).optional(),
});

/**
 * Schema for validating tour retrieval by ID
 */
export const getTourByIdSchema = z.object({
  id: z.string(),
});