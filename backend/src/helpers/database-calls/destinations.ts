import prisma from "@/config/db";

export const getDestinations = async () => {
  const destination = prisma.destination.findMany();

  return destination;
};

export const getDestinationById = async (id: string) => {
  const destination = prisma.destination.findUnique({
    where: {
      id,
    },
  });

  if (!destination) throw new Error("Destination not found");

  return destination;
};
