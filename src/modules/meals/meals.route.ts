import { Router } from "express";
import { mealsController } from "./meals.controller";

const router = Router();

router.post("/", mealsController.createMeals);

export const mealsRouter = router;
