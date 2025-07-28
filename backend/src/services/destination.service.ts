import { prisma } from "@/config/db";
import { createSlug } from "@/utils/slug";
import {
  CreateDestinationInput,
  UpdateDestinationInput,
} from "@/types/destination.types";

/**
 * Checks if a slug is unique and generates a new one if it's not
 * @param baseSlug - The base slug to check
 * @returns A unique slug
 */
export const checkAndReplaceSlug = async (baseSlug: string) => {
  let finalSlug = baseSlug;
  let counter = 0;

  while (true) {
    const existingSlug = await prisma.destination.findUnique({
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
 * Creates a new destination
 * @param data - The destination data
 * @returns The created destination
 */
export const createDestination = async (data: CreateDestinationInput) => {
  // Check if slug is given
  if (!data.slug) {
    data.slug = createSlug(data.name);
  }

  // Check and replace slug if not unique
  const finalSlug = await checkAndReplaceSlug(data.slug);

  const destination = await prisma.destination.create({
    data: {
      name: data.name,
      slug: finalSlug,
      description: data.description,
      thumbnail: data.thumbnail,
      images: data.images || [],
      faqs: data.faqs || [],
    },
  });

  return destination;
};

/**
 * Updates an existing destination
 * @param data - The destination data with updates
 * @returns The updated destination
 */
export const updateDestination = async (data: UpdateDestinationInput) => {
  let finalSlug = data.slug;

  if (data.slug) {
    finalSlug = await checkAndReplaceSlug(data.slug);
  }

  const destination = await prisma.destination.update({
    where: {
      id: data.id,
    },
    data: {
      ...(data.name && { name: data.name }),
      ...(finalSlug && { slug: finalSlug }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
      ...(data.images && { images: data.images }),
      ...(data.faqs && { faqs: data.faqs }),
    },
  });

  return destination;
};

/**
 * Deletes a destination by ID
 * @param id - The destination ID
 */
export const deleteDestination = async (id: string) => {
  await prisma.destination.delete({
    where: {
      id,
    },
  });
};

/**
 * Gets all destinations
 * @returns Array of all destinations
 */
export const getDestinations = async () => {
  const destinations = await prisma.destination.findMany();
  return destinations;
};

/**
 * Gets a destination by ID
 * @param id - The destination ID
 * @returns The destination if found
 * @throws Error if destination not found
 */
export const getDestinationById = async (id: string) => {
  const destination = await prisma.destination.findUnique({
    where: {
      id,
    },
  });

  if (!destination) throw new Error("Destination not found");

  return destination;
};
