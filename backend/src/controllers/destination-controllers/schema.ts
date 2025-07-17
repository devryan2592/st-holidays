import { z } from "zod";
import { Destination } from "../../../generated/prisma";
import { ApiResponse } from "@/helpers/api-resonse";

export const createDestinationSchema = z.object({
  name: z.string(),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export const updateDestinationSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional(),
  images: z.array(z.string()).optional(),
});

export type CreateDestinationInput = z.infer<typeof createDestinationSchema>;
export type UpdateDestinationInput = z.infer<typeof updateDestinationSchema>;

export type CreateDestinationServiceResponse = {
  destination: Destination;
};

export type UpdateDestinationServiceResponse = {
  destination: Destination;
};

export type CreateDestinationResponse =
  ApiResponse<CreateDestinationServiceResponse>;

export type UpdateDestinationResponse =
  ApiResponse<UpdateDestinationServiceResponse>;
