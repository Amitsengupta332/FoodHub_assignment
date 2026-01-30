import { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";


const router = Router();

router.post(
  "/",
 
  providerProfileController.createProviderProfile,
);

export const providerProfileRouter = router;