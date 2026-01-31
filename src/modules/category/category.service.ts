import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllCategory = async () => {
  return await prisma.category.findMany();
};

const createCategory = async (data: Category) => {
  return await prisma.category.create({
    data,
  });
};

const updateCategory = async (id: string, data: Category) => {
  return await prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

const deleteCategory = async (id: string) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const categoryService = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
