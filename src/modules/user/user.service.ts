import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isActive: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (id: string, isActive: boolean) => {
  return await prisma.user.update({
    where: { id },
    data: { isActive },
  });
};
 
export const userService = {
  getAllUsers,
  updateUserStatus,
};
