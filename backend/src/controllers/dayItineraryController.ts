import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createDayItineraryItemSchema } from '../validation/dayItinerarySchemas';

const prisma = new PrismaClient();

export const createDayItineraryItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tourId } = req.params;
    const validatedData = createDayItineraryItemSchema.parse(req.body);

    const tourExists = await prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tourExists) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const existingItineraryItem = await prisma.dayItineraryItem.findFirst({
      where: {
        tourId: tourId,
        dayNumber: validatedData.dayNumber,
      },
    });

    if (existingItineraryItem) {
      return res.status(409).json({ message: `Day number ${validatedData.dayNumber} already exists for this tour.` });
    }

    const newDayItineraryItem = await prisma.dayItineraryItem.create({
      data: {
        ...validatedData,
        tourId: tourId,
      },
    });

    res.status(201).json(newDayItineraryItem);
  } catch (error) {
    next(error);
  }
};

export const getAllDayItineraryItemsForTour = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tourId } = req.params;

    const tourExists = await prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tourExists) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    const dayItineraryItems = await prisma.dayItineraryItem.findMany({
      where: { tourId: tourId },
      orderBy: { dayNumber: 'asc' },
    });

    res.status(200).json(dayItineraryItems);
  } catch (error) {
    next(error);
  }
};

export const getSingleDayItineraryItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tourId, id } = req.params;

    const dayItineraryItem = await prisma.dayItineraryItem.findUnique({
      where: { id: id, tourId: tourId },
    });

    if (!dayItineraryItem) {
      return res.status(404).json({ message: 'Day Itinerary Item not found' });
    }

    res.status(200).json(dayItineraryItem);
  } catch (error) {
    next(error);
  }
};

export const updateDayItineraryItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tourId, id } = req.params;
    const validatedData = updateDayItineraryItemSchema.parse(req.body);

    const existingItem = await prisma.dayItineraryItem.findUnique({
      where: { id: id, tourId: tourId },
    });

    if (!existingItem) {
      return res.status(404).json({ message: 'Day Itinerary Item not found' });
    }

    // Check for dayNumber uniqueness if dayNumber is being updated
    if (validatedData.dayNumber && validatedData.dayNumber !== existingItem.dayNumber) {
      const dayNumberExists = await prisma.dayItineraryItem.findFirst({
        where: {
          tourId: tourId,
          dayNumber: validatedData.dayNumber,
          NOT: { id: id }, // Exclude current item from check
        },
      });

      if (dayNumberExists) {
        return res.status(409).json({ message: `Day number ${validatedData.dayNumber} already exists for this tour.` });
      }
    }

    const updatedItem = await prisma.dayItineraryItem.update({
      where: { id: id },
      data: validatedData,
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    next(error);
  }
};

export const deleteDayItineraryItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { tourId, id } = req.params;

    const existingItem = await prisma.dayItineraryItem.findUnique({
      where: { id: id, tourId: tourId },
    });

    if (!existingItem) {
      return res.status(404).json({ message: 'Day Itinerary Item not found' });
    }

    await prisma.dayItineraryItem.delete({
      where: { id: id },
    });

    res.status(204).send(); // No content for successful deletion
  } catch (error) {
    next(error);
  }
};