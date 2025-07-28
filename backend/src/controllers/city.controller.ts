import { Request, Response } from "express";
import { ApiResponse } from "@/types/api-response.types";
import { catchAsync } from "@/utils/catch-async";
import {
  createCity,
  deleteCity,
  getCityById,
  getCities,
  updateCity,
} from "../services/city.service";
import {
  createCitySchema,
  getCityByIdSchema,
  updateCitySchema,
} from "../schemas/city.schema";
import {
  CreateCityResponse,
  GetAllCitiesResponse,
  GetCityByIdResponse,
  UpdateCityResponse,
} from "../types/city.types";
import { sendSuccess, sendZodError } from "@/utils/api-response";

/**
 * Controller for creating a new city
 */
export const createCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse<CreateCityResponse>>) => {
    const { data, success, error } = createCitySchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const city = await createCity(data);

    return sendSuccess(res, "City created successfully", {
      city,
    });
  }
);

/**
 * Controller for updating an existing city
 */
export const updateCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse<UpdateCityResponse>>) => {
    const { id } = req.params;
    const { data, success, error } = updateCitySchema.safeParse({
      ...req.body,
      id,
    });

    if (!success) return sendZodError(res, error);

    const city = await updateCity(data);

    return sendSuccess(res, "City updated successfully", {
      city,
    });
  }
);

/**
 * Controller for deleting a city
 */
export const deleteCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    await deleteCity(id);

    return sendSuccess(res, "City deleted successfully");
  }
);

/**
 * Controller for getting all cities
 */
export const getAllCitiesController = catchAsync(
  async (_: Request, res: Response<ApiResponse<GetAllCitiesResponse>>) => {
    const cities = await getCities();

    return sendSuccess(res, "Cities retrieved successfully", {
      cities,
    });
  }
);

/**
 * Controller for getting a single city by ID
 */
export const getCityByIdController = catchAsync(
  async (req: Request, res: Response<ApiResponse<GetCityByIdResponse>>) => {
    const { id } = req.params;
    const { data, success, error } = getCityByIdSchema.safeParse({ id });

    if (!success) return sendZodError(res, error);

    const city = await getCityById(data.id);

    return sendSuccess(res, "City retrieved successfully", {
      city,
    });
  }
);
