import { Meal } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createMeal = async (data:Meal) => {
  return await prisma.meal.create({
    data,
  });
};
export const mealsService = {
  createMeal,
//   updatedMeal,
//   updateMealOrderStatus,
//   deleteMeal,
//   getMealDetails,
//   getAllMeals,
};