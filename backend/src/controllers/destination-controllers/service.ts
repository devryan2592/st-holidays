import { createSlug } from "@/helpers/slug";
import { CreateDestinationInput, UpdateDestinationInput } from "./schema";
import prisma from "@/config/db";

const checkAndReplaceSlug = async (baseSlug: string) => {
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

export const createDestination = async (data: CreateDestinationInput) => {
  //   Check if slug is given
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
      images: data.images,
    },
  });

  return destination;
};

export const updateDestination = async (data: UpdateDestinationInput) => {
  let finalSlug = data.slug;

  if (data.slug) {
    finalSlug = await checkAndReplaceSlug(data.slug);
  }

  // Check and replace slug if not unique

  const destination = await prisma.destination.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      slug: finalSlug,
      description: data.description,
      thumbnail: data.thumbnail,
      images: data.images,
    },
  });

  return destination;
};

export const deleteDestinationService = async (id: string) => {
  await prisma.destination.delete({
    where: {
      id,
    },
  });
};
