import { prisma } from "@/config/db";
import { createSlug } from "@/utils/slug";
import {
  CreateCityInput,
  UpdateCityInput,
} from "@/types/city.types";

/**
 * Checks if a slug is unique and generates a new one if it's not
 * @param baseSlug - The base slug to check
 * @returns A unique slug
 */
const checkAndReplaceSlug = async (baseSlug: string) => {
  let finalSlug = baseSlug;
  let counter = 0;

  while (true) {
    const existingSlug = await prisma.city.findUnique({
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
 * Creates a new city
 * @param data - The city data
 * @returns The created city
 */
export const createCity = async (data: CreateCityInput) => {
  // Check if slug is given
  if (!data.slug) {
    data.slug = createSlug(data.name);
  }

  // Check and replace slug if not unique
  const finalSlug = await checkAndReplaceSlug(data.slug);

  const city = await prisma.city.create({
    data: {
      name: data.name,
      slug: finalSlug,
      description: data.description,
      thumbnail: data.thumbnail,
      images: data.images || [],
      destinationId: data.destinationId,
    },
  });

  return city;
};

/**
 * Updates an existing city
 * @param data - The city data with updates
 * @returns The updated city
 */
export const updateCity = async (data: UpdateCityInput) => {
  let finalSlug = data.slug;

  if (data.slug) {
    finalSlug = await checkAndReplaceSlug(data.slug);
  }

  const city = await prisma.city.update({
    where: {
      id: data.id,
    },
    data: {
      ...(data.name && { name: data.name }),
      ...(finalSlug && { slug: finalSlug }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.thumbnail !== undefined && { thumbnail: data.thumbnail }),
      ...(data.images && { images: data.images }),
      ...(data.destinationId && { destinationId: data.destinationId }),
    },
  });

  return city;
};

/**
 * Deletes a city by ID
 * @param id - The city ID
 */
export const deleteCity = async (id: string) => {
  await prisma.city.delete({
    where: {
      id,
    },
  });
};

/**
 * Gets all cities
 * @returns All cities
 */
export const getCities = async () => {
  const cities = await prisma.city.findMany();
  return cities;
};

/**
 * Gets a city by ID
 * @param id - The city ID
 * @returns The city with the specified ID
 */
export const getCityById = async (id: string) => {
  const city = await prisma.city.findUnique({
    where: {
      id,
    },
  });

  if (!city) throw new Error("City not found");

  return city;
};