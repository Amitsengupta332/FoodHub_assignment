import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllCategory = async ( ) => {
  return await prisma.category.findMany();
};

const createCategory = async (data: Category) => {
  return await prisma.category.create({
    data,
  });
};

export const categoryService = {
  getAllCategory,
  createCategory,
  //   updateCategory,
  //   deleteCategory,
};
