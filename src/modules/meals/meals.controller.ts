import { Request, Response } from "express";
import { mealsService } from "./meals.service";

const createMeals = async (req: Request, res: Response) => {
  try {
    const meals = await mealsService.createMeal(req.body);
    res.status(201).json(meals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const mealsController = {
  createMeals,
  //   getAllMeals,
  //   updatedMeal,
  //   updateMealOrderStatus,
  //   getMealDetails,
  //   deletedMeal,
};
