import { Request, Response } from "express";

import { catchAsync } from "@/helpers/catch-async";
import { ApiResponse, sendSuccess, sendZodError } from "@/helpers/api-response";
import {
  CreateDestinationResponse,
  createDestinationSchema,
  UpdateDestinationResponse,
  updateDestinationSchema,
} from "./schema";
import { createDestination, deleteDestinationService, updateDestination,
} from "./service";

/**
 * @swagger
 *   components:
 *     schemas:
 *       Destination:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string
 *           slug:
 *             type: string
 *           description:
 *             type: string
 *           thumbnail:
 *             type: string
 *           images:
 *             type: array
 *             items:
 *               type: string
 *           createdAt:
 *             type: string
 *             format: date-time
 *           updatedAt:
 *             type: string
 *             format: date-time
 *       CreateDestinationInput:
 *         type: object
 *         required:
 *           - name
 *         properties:
 *           name:
 *             type: string
 *           slug:
 *             type: string
 *             nullable: true
 *           description:
 *             type: string
 *             nullable: true
 *           thumbnail:
 *             type: string
 *             nullable: true
 *           images:
 *             type: array
 *             items:
 *               type: string
 *             nullable: true
 *       CreateDestinationResponse:
 *         type: object
 *         properties:
 *           destination:
 *             $ref: '#/components/schemas/Destination'
 *       UpdateDestinationInput:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string
 *             nullable: true
 *           slug:
 *             type: string
 *             nullable: true
 *           description:
 *             type: string
 *             nullable: true
 *           thumbnail:
 *             type: string
 *             nullable: true
 *           images:
 *             type: array
 *             items:
 *               type: string
 *             nullable: true
 *       UpdateDestinationResponse:
 *         type: object
 *         properties:
 *           destination:
 *             $ref: '#/components/schemas/Destination'
 */
import {
  getDestinationById,
  getDestinations,
} from "@/helpers/database-calls/destinations";

/**
 * @swagger
 * /api/v1/destinations:
 *   post:
 *     tags: [Destination]
 *     summary: Create a new destination
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDestinationInput'
 *     responses:
 *       201:
 *         description: Destination created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateDestinationResponse'
 *       400:
 *         description: Invalid input
 */
export const createDestinationController = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<CreateDestinationResponse>>
  ) => {
    const { data, success, error } = createDestinationSchema.safeParse(
      req.body
    );

    console.log(error);

    if (!success) return sendZodError(res, error);

    const destination = await createDestination(data);

    return sendSuccess(res, "Destination created successfully", {
      destination,
    });
  }
);

/**
 * @swagger
 * /api/v1/destinations/{id}:
 *   patch:
 *     tags: [Destination]
 *     summary: Update an existing destination
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the destination to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDestinationInput'
 *     responses:
 *       200:
 *         description: Destination updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UpdateDestinationResponse'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Destination not found
 */
export const updateDestinationController = catchAsync(
  async (
    req: Request,
    res: Response<ApiResponse<UpdateDestinationResponse>>
  ) => {
    const { data, success, error } = updateDestinationSchema.safeParse(
      req.body
    );

    if (!success) return sendZodError(res, error);

    const destination = await updateDestination(data);

    return sendSuccess(res, "Destination updated successfully", {
      destination,
    });
  }
);

/**
 * @swagger
 * /api/v1/destinations/{id}:
 *   delete:
 *     tags: [Destination]
 *     summary: Delete a destination by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the destination to delete
 *     responses:
 *       200:
 *         description: Destination deleted successfully
 *       404:
 *         description: Destination not found
 */
export const deleteDestinationController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    await deleteDestinationService(id);

    return sendSuccess(res, "Destination deleted successfully");
  }
);

/**
 * @swagger
 * /api/v1/destinations:
 *   get:
 *     tags: [Destination]
 *     summary: Get all destinations
 *     responses:
 *       200:
 *         description: Destinations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destinations:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Destination'
 */
export const getAllDestinationsController = catchAsync(
  async (_: Request, res: Response<ApiResponse>) => {
    const destinations = await getDestinations();

    return sendSuccess(res, "Destinations retrieved successfully", {
      destinations,
    });
  }
);

/**
 * @swagger
 * /api/v1/destinations/{id}:
 *   get:
 *     tags: [Destination]
 *     summary: Get a single destination by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the destination to retrieve
 *     responses:
 *       200:
 *         description: Destination retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 destination:
 *                   $ref: '#/components/schemas/Destination'
 *       404:
 *         description: Destination not found
 */
export const getSingleDestinationController = catchAsync(
  async (req: Request, res: Response<ApiResponse>) => {
    const id = req.params.id;

    const destination = await getDestinationById(id);

    return sendSuccess(res, "Destination retrieved successfully", {
      destination,
    });
  }
);
