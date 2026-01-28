import { Category } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createCategory = async (data: Category) => {
  return await prisma.category.create({
    data,
  });
};

export const categoryService = {
  createCategory,
  //   updateCategory,
  //   deleteCategory,
};
