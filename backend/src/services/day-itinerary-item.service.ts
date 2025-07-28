import { prisma } from "@/config/db";
import {
  CreateDayItineraryItemInput,
  UpdateDayItineraryItemInput,
} from "@/types/day-itinerary-item.types";

/**
 * Creates a new day itinerary item
 * @param data - The day itinerary item data
 * @returns The created day itinerary item
 */
export const createDayItineraryItem = async (data: CreateDayItineraryItemInput) => {
  // Check if the tour exists
  const tour = await prisma.tour.findUnique({
    where: {
      id: data.tourId,
    },
  });

  if (!tour) throw new Error("Tour not found");

  // If order is not provided, get the highest order for this day and add 1
  if (data.order === undefined) {
    const highestOrder = await prisma.dayItineraryItem.findFirst({
      where: {
        tourId: data.tourId,
        dayNumber: data.dayNumber,
      },
      orderBy: {
        order: 'desc',
      },
    });

    data.order = highestOrder ? highestOrder.order + 1 : 0;
  }

  const dayItineraryItem = await prisma.dayItineraryItem.create({
    data: {
      tourId: data.tourId,
      dayNumber: data.dayNumber,
      title: data.title,
      description: data.description,
      images: data.images || [],
      meals: data.meals || [],
      duration: data.duration,
      order: data.order,
    },
  });

  return dayItineraryItem;
};

/**
 * Updates an existing day itinerary item
 * @param data - The day itinerary item data with updates
 * @returns The updated day itinerary item
 */
export const updateDayItineraryItem = async (data: UpdateDayItineraryItemInput) => {
  // Check if the day itinerary item exists
  const existingItem = await prisma.dayItineraryItem.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!existingItem) throw new Error("Day itinerary item not found");

  // If tourId is provided, check if the tour exists
  if (data.tourId) {
    const tour = await prisma.tour.findUnique({
      where: {
        id: data.tourId,
      },
    });

    if (!tour) throw new Error("Tour not found");
  }

  const dayItineraryItem = await prisma.dayItineraryItem.update({
    where: {
      id: data.id,
    },
    data: {
      ...(data.tourId && { tourId: data.tourId }),
      ...(data.dayNumber !== undefined && { dayNumber: data.dayNumber }),
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.images && { images: data.images }),
      ...(data.meals && { meals: data.meals }),
      ...(data.duration !== undefined && { duration: data.duration }),
      ...(data.order !== undefined && { order: data.order }),
    },
  });

  return dayItineraryItem;
};

/**
 * Deletes a day itinerary item by ID
 * @param id - The day itinerary item ID
 */
export const deleteDayItineraryItem = async (id: string) => {
  await prisma.dayItineraryItem.delete({
    where: {
      id,
    },
  });
};

/**
 * Gets a day itinerary item by ID
 * @param id - The day itinerary item ID
 * @returns The day itinerary item with the specified ID
 */
export const getDayItineraryItemById = async (id: string) => {
  const dayItineraryItem = await prisma.dayItineraryItem.findUnique({
    where: {
      id,
    },
  });

  if (!dayItineraryItem) throw new Error("Day itinerary item not found");

  return dayItineraryItem;
};

/**
 * Gets all day itinerary items for a tour
 * @param tourId - The tour ID
 * @returns All day itinerary items for the specified tour
 */
export const getDayItineraryItemsByTourId = async (tourId: string) => {
  const dayItineraryItems = await prisma.dayItineraryItem.findMany({
    where: {
      tourId,
    },
    orderBy: [
      {
        dayNumber: 'asc',
      },
      {
        order: 'asc',
      },
    ],
  });

  return dayItineraryItems;
};