import prisma from "@/config/db";

export const getCities = async () => {
  const city = prisma.city.findMany();

  return city;
};

export const getCityById = async (id: string) => {
  const city = prisma.city.findUnique({
    where: {
      id,
    },
  });

  if (!city) throw new Error("City not found");

  return city;
};