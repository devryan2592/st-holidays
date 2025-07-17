import { z } from "zod";
import { City } from "../../../generated/prisma";
import { ApiResponse } from "@/helpers/api-response";

export const createCitySchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  destinationId: z.string({ required_error: "Destination ID is required" }),
});

export const updateCitySchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
  destinationId: z.string().optional(),
});

export type CreateCityInput = z.infer<typeof createCitySchema>;
export type UpdateCityInput = z.infer<typeof updateCitySchema>;

export type CreateCityServiceResponse = {
  city: City;
};

export type UpdateCityServiceResponse = {
  city: City;
};

export type CreateCityResponse = ApiResponse<CreateCityServiceResponse>;

export type UpdateCityResponse = ApiResponse<UpdateCityServiceResponse>;