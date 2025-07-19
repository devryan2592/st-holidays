import { z } from 'zod';

export const createDayItineraryItemSchema = z.object({
  dayNumber: z.number().int().positive(),
  title: z.string().min(3),
  description: z.string(),
  images: z.array(z.string().url()).optional(),
  meals: z.array(z.enum(['BREAKFAST', 'LUNCH', 'DINNER'])).optional(),
  duration: z.number().int().positive().optional(),
});

export const updateDayItineraryItemSchema = z.object({
  dayNumber: z.number().int().positive().optional(),
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  images: z.array(z.string().url()).optional(),
  meals: z.array(z.enum(['BREAKFAST', 'LUNCH', 'DINNER'])).optional(),
  duration: z.number().int().positive().optional(),
});