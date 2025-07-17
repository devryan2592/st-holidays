import { Request, Response } from "express";

import { catchAsync } from "@/helpers/catch-async";
import { ApiResponse, sendSuccess, sendZodError } from "@/helpers/api-response";
import {
  CreateCityResponse,
  createCitySchema,
  UpdateCityResponse,
  updateCitySchema,
} from "./schema";
import { createCity, deleteCityService, updateCity } from "./service";
import { getCityById, getCities } from "@/helpers/database-calls/cities";

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *         description:
 *           type: string
 *         thumbnail:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         destinationId:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateCityInput:
 *       type: object
 *       required:
 *         - name
 *         - destinationId
 *       properties:
 *         name:
 *           type: string
 *         slug:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         thumbnail:
 *           type: string
 *           nullable: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *         destinationId:
 *           type: string
 *     CreateCityResponse:
 *       type: object
 *       properties:
 *         city:
 *           $ref: '#/components/schemas/City'
 *     UpdateCityInput:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *           nullable: true
 *         slug:
 *           type: string
 *           nullable: true
 *         description:
 *           type: string
 *           nullable: true
 *         thumbnail:
 *           type: string
 *           nullable: true
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           nullable: true
 *         destinationId:
 *           type: string
 *           nullable: true
 *     UpdateCityResponse:
 *       type: object
 *       properties:
 *         city:
 *           $ref: '#/components/schemas/City'
 */

/**
 * @swagger
 * /api/v1/cities:
 *   post:
 *     tags: [City]
 *     summary: Create a new city
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCityInput'
 *     responses:
 *       201:
 *         description: City created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCityResponse'
 *       400:
 *         description: Invalid input
 */
export const createCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse<CreateCityResponse>>) => {
    const { data, success, error } = createCitySchema.safeParse(req.body);

    console.log(error);

    if (!success) return sendZodError(res, error);

    const city = await createCity(data);

    return sendSuccess(res, "City created successfully", {
      city,
    });
  }
);

/**
 * @swagger
 * /api/v1/cities/{id}:
 *   patch:
 *     tags: [City]
 *     summary: Update an existing city
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the city to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCityInput'
 *     responses:
 *       200:
 *         description: City updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateCityResponse'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: City not found
 */
export const updateCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse<UpdateCityResponse>>) => {
    const { data, success, error } = updateCitySchema.safeParse(req.body);

    if (!success) return sendZodError(res, error);

    const city = await updateCity(data);

    return sendSuccess(res, "City updated successfully", {
      city,
    });
  }
);

/**
 * @swagger
 * /api/v1/cities/{id}:
 *   delete:
 *     tags: [City]
 *     summary: Delete a city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the city to delete
 *     responses:
 *       200:
 *         description: City deleted successfully
 *       404:
 *         description: City not found
 */
export const deleteCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    await deleteCityService(id);

    return sendSuccess(res, "City deleted successfully");
  }
);

/**
 * @swagger
 * /api/v1/cities:
 *   get:
 *     tags: [City]
 *     summary: Get all cities
 *     responses:
 *       200:
 *         description: Cities retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cities:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/City'
 */
export const getAllCitiesController = catchAsync(
  async (_: Request, res: Response<ApiResponse>) => {
    const cities = await getCities();

    return sendSuccess(res, "Cities retrieved successfully", {
      cities,
    });
  }
);

/**
 * @swagger
 * /api/v1/cities/{id}:
 *   get:
 *     tags: [City]
 *     summary: Get a single city by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the city to retrieve
 *     responses:
 *       200:
 *         description: City retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 city:
 *                   $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found
 */
export const getSingleCityController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    const city = await getCityById(id);

    return sendSuccess(res, "City retrieved successfully", {
      city,
    });
  }
);
