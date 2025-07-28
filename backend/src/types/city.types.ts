import { City } from "@/generated/prisma";
import {
  createCitySchema,
  updateCitySchema,
  getCityByIdSchema,
} from "@/schemas/city.schema";
import { z } from "zod";
import { ApiResponse } from "./api-response.types";

/**
 * Input type for creating a city
 */
export type CreateCityInput = z.infer<typeof createCitySchema>;

/**
 * Input type for updating a city
 */
export type UpdateCityInput = z.infer<typeof updateCitySchema>;

/**
 * Input type for getting a city by ID
 */
export type GetCityByIdInput = z.infer<typeof getCityByIdSchema>;

/**
 * Service response for creating a city
 */
export type CreateCityServiceResponse = {
  city: City;
};

/**
 * Service response for updating a city
 */
export type UpdateCityServiceResponse = {
  city: City;
};

/**
 * Service response for getting a city by ID
 */
export type GetCityByIdServiceResponse = {
  city: City;
};

/**
 * Service response for getting all cities
 */
export type GetAllCitiesServiceResponse = {
  cities: City[];
};

/**
 * API response for creating a city
 */
export type CreateCityResponse = ApiResponse<CreateCityServiceResponse>;

/**
 * API response for updating a city
 */
export type UpdateCityResponse = ApiResponse<UpdateCityServiceResponse>;

/**
 * API response for getting a city by ID
 */
export type GetCityByIdResponse = ApiResponse<GetCityByIdServiceResponse>;

/**
 * API response for getting all cities
 */
export type GetAllCitiesResponse = ApiResponse<GetAllCitiesServiceResponse>;
