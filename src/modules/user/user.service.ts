import { prisma } from "../../lib/prisma";


const getAllUsers = async () => {
  return await prisma.user.findMany();
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