import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.get(
  "/",
  auth(Role.ADMIN, Role.PROVIDER),
  categoryController.getAllCategory,
);

router.post("/", auth(Role.ADMIN), categoryController.createCategory);

export const categoryRouter = router;
