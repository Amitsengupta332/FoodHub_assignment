import { Router } from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

/** ✅ Public (required for browsing & filters) */
router.get("/", categoryController.getAllCategory);

/** ✅ Admin only manage categories */
router.post("/", auth(Role.ADMIN), categoryController.createCategory);
router.patch("/:id", auth(Role.ADMIN), categoryController.updateCategory);
router.delete("/:id", auth(Role.ADMIN), categoryController.deleteCategory);

export const categoryRouter = router;
