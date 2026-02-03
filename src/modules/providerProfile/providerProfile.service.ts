// import { ProviderProfile } from "../../generated/prisma/client";
// import { prisma } from "../../lib/prisma";

// const getAllProvider = async () => {
//   return await prisma.providerProfile.findMany();
// };

// const getProviderWithMenu = async (id: string) => {
//   return await prisma.providerProfile.findMany({
//     where: {
//       id,
//     },
//     include: {
//       meals: true,
//     },
//   });
// };

// const createProviderProfile = async (data: ProviderProfile) => {
//   return await prisma.providerProfile.create({
//     data,
//   });
// };

// export const providerProfileService = {
//   createProviderProfile,
//   getProviderWithMenu,
//   getAllProvider,
// };

import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllProvider = async () => {
  return prisma.providerProfile.findMany({
    where: { user: { isActive: true } },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getProviderWithMenu = async (id: string) => {
  return prisma.providerProfile.findUnique({
    where: { id },
    include: {
      meals: { where: { isAvailable: true }, orderBy: { createdAt: "desc" } },
      user: { select: { id: true, name: true } },
    },
  });
};

const createProviderProfile = async (
  userId: string,
  payload: Pick<
    Prisma.ProviderProfileCreateInput,
    "shopName" | "address" | "phone"
  >,
) => {
  const existing = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    // throw your custom error / return null
    throw new Error("Provider profile already exists");
  }

  return prisma.providerProfile.create({
    data: {
      ...payload,
      user: { connect: { id: userId } },
    },
  });
};

export const providerProfileService = {
  createProviderProfile,
  getProviderWithMenu,
  getAllProvider,
};
