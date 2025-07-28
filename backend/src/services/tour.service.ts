import { prisma } from "@/config/db";
import { createSlug } from "@/utils/slug";
import { CreateTourInput, UpdateTourInput } from "@/types/tour.types";

/**
 * Checks if a slug is unique and generates a new one if it's not
 * @param baseSlug - The base slug to check
 * @returns A unique slug
 */
const checkAndReplaceSlug = async (baseSlug: string) => {
  let finalSlug = baseSlug;
  let counter = 0;

  while (true) {
    const existingSlug = await prisma.tour.findUnique({
      where: {
        slug: finalSlug,
      },
    });

    if (!existingSlug) {
      break;
    }

    counter++;
    finalSlug = baseSlug + "-" + counter;
  }
  return finalSlug;
};

/**
 * Creates a new tour
 * @param data - The tour data
 * @returns The created tour
 */
export const createTour = async (data: CreateTourInput) => {
  // Check if slug is given
  if (!data.slug) {
    data.slug = createSlug(data.name);
  }

  // Check and replace slug if not unique
  const finalSlug = await checkAndReplaceSlug(data.slug);

  const tour = await prisma.tour.create({
    data: {
      name: data.name,
      slug: finalSlug,
      description: data.description,
      featured: data.featured,
      duration: data.duration,
      category: data.category,
      packageType: data.packageType,
      price: data.price,
      offerPrice: data.offerPrice,
      thumbnail: data.thumbnail,
      images: data.images || [],
      highlights: data.highlights || [],
      inclusions: data.inclusions || [],
      exclusions: data.exclusions || [],
      terms: data.terms || [],
      destinationId: data.destinationId,
      ...(data.cityIds && {
        cities: {
          connect: data.cityIds.map((id) => ({ id })),
        },
      }),
    },
    include: {
      cities: true,
      itinerary: true,
    },
  });

  return tour;
};

/**
 * Updates an existing tour
 * @param data - The tour data with updates
 * @returns The updated tour
 */
export const updateTour = async (data: UpdateTourInput) => {
  let finalSlug = data.slug;

  if (data.slug) {
    finalSlug = await checkAndReplaceSlug(data.slug);
  }

  // Handle city connections/disconnections if cityIds is provided
  let cityOperations = {};
  if (data.cityIds) {
    // Get current cities
    const currentTour = await prisma.tour.findUnique({
      where: { id: data.id },
      include: { cities: true },
    });

    if (!currentTour) throw new Error("Tour not found");

    const currentCityIds = currentTour.cities.map((city) => city.id);

    // Determine which cities to connect and disconnect
    const citiesToConnect = data.cityIds.filter(
      (id) => !currentCityIds.includes(id)
    );
    const citiesToDisconnect = currentCityIds.filter(
      (id) => data.cityIds && !data.cityIds.includes(id)
    );

    cityOperations = {
      cities: {
        ...(citiesToConnect.length > 0 && {
          connect: citiesToConnect.map((id) => ({ id })),
        }),
        ...(citiesToDisconnect.length > 0 && {
          disconnect: citiesToDisconnect.map((id) => ({ id })),
        }),
      },
    };
  }

  const tour = await prisma.tour.update({
    where: {
      id: data.id,
    },
    data: {
      ...(data.name && { name: data.name }),
      ...(finalSlug && { slug: finalSlug }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.featured !== undefined && { featured: data.featured }),
      ...(data.duration !== undefined && { duration: data.duration }),
      ...(data.category !== undefined && { category: data.category }),
      ...(data.packageType !== undefined && { packageType: data.packageType }),
      ...(data.price !== undefined && { price: data.price }),
      ...(data.offerPrice !== undefined && { offerPrice: data.offerPrice }),
      ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
      ...(data.images && { images: data.images }),
      ...(data.highlights && { highlights: data.highlights }),
      ...(data.inclusions && { inclusions: data.inclusions }),
      ...(data.exclusions && { exclusions: data.exclusions }),
      ...(data.terms && { terms: data.terms }),
      ...(data.destinationId && { destinationId: data.destinationId }),
      ...cityOperations,
    },
    include: {
      cities: true,
      itinerary: true,
    },
  });

  return tour;
};

/**
 * Deletes a tour by ID
 * @param id - The tour ID
 */
export const deleteTour = async (id: string) => {
  await prisma.tour.delete({
    where: {
      id,
    },
  });
};

/**
 * Gets all tours
 * @returns All tours
 */
export const getTours = async () => {
  const tours = await prisma.tour.findMany({
    include: {
      cities: true,
      itinerary: {
        orderBy: {
          dayNumber: "asc",
        },
      },
    },
  });
  return tours;
};

/**
 * Gets a tour by ID
 * @param id - The tour ID
 * @returns The tour with the specified ID
 */
export const getTourById = async (id: string) => {
  const tour = await prisma.tour.findUnique({
    where: {
      id,
    },
    include: {
      cities: true,
      itinerary: {
        orderBy: {
          dayNumber: "asc",
        },
      },
    },
  });

  if (!tour) throw new Error("Tour not found");

  return tour;
};
