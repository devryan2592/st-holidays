import { CreateCityInput, UpdateCityInput } from "./schema";
import prisma from "@/config/db";
import { createSlug } from "@/helpers/slug";

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

export const createCity = async (data: CreateCityInput) => {
  //   Check if slug is given
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
      images: data.images,
      destinationId: data.destinationId,
    },
  });

  return city;
};

export const updateCity = async (data: UpdateCityInput) => {
  let finalSlug = data.slug;

  if (data.slug) {
    finalSlug = await checkAndReplaceSlug(data.slug);
  }

  // Check and replace slug if not unique

  const city = await prisma.city.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      slug: finalSlug,
      description: data.description,
      thumbnail: data.thumbnail,
      images: data.images,
      destinationId: data.destinationId,
    },
  });

  return city;
};

export const deleteCityService = async (id: string) => {
  await prisma.city.delete({
    where: {
      id,
    },
  });
};