import { ProviderProfile } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createProviderProfile = async (data: ProviderProfile) => {
  return await prisma.providerProfile.create({
    data,
  });
};

export const providerProfileService = {
  createProviderProfile,
//   getProviderWithMenu,
//   getAllProvider,
};