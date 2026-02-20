import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";
import { userController } from "./user.controller";

const router = Router();
router.get("/", auth(Role.ADMIN), userController.getAllUsers);
router.patch("/:id", auth(Role.ADMIN), userController.updateUserStatus);

export const userRouter = router;
 