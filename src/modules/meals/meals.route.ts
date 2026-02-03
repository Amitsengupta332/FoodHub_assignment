import { Router } from "express";
import { mealsController } from "./meals.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();


/** Public */
router.get("/", mealsController.getAllMeals);
router.get("/:id", mealsController.getMealDetails);

/** Provider */
router.post("/", auth(Role.PROVIDER), mealsController.createMeal);
router.get("/provider/my", auth(Role.PROVIDER), mealsController.getProviderMeals);
router.patch("/:id", auth(Role.PROVIDER), mealsController.updateMeal);
router.delete("/:id", auth(Role.PROVIDER), mealsController.deleteMeal);

export const mealsRouter = router;
