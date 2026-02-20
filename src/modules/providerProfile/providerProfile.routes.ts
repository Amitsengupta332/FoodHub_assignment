import { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

router.get("/", providerProfileController.getAllProviders);
router.get("/:id", providerProfileController.getProviderWithMenu);

router.post(
  "/",
  auth(Role.PROVIDER),
  providerProfileController.createProviderProfile,
);

export const providerProfileRouter = router; 
