// import { Router } from "express";
// import { providerProfileController } from "./providerProfile.controller";
// import auth from "../../middlewares/auth";
// import { Role } from "../../generated/prisma/enums";

// const router = Router();

// router.get("/", providerProfileController.getAllProviders);
// // router.get(
// //   "/single",
// //   auth(UserRole.PROVIDER),
// //   providerController.getSignleProvider,
// // );
// router.get("/:id", providerProfileController.getProviderWithMenu);
// router.post(
//   "/",
//   auth(Role.PROVIDER),
//   providerProfileController.createProviderProfile,
// );

 

// export const providerProfileRouter = router;



import { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";

const router = Router();

/**
 * Public routes (requirement: browse providers)
 */
router.get("/", providerProfileController.getAllProviders);
router.get("/:id", providerProfileController.getProviderWithMenu);

/**
 * Provider private routes (provider নিজের profile)
 * NOTE: /me must be BEFORE /:id (otherwise 'me' treated as id)
 */
// router.get(
//   "/me",
//   auth(Role.PROVIDER),
//   providerProfileController,
// );

// router.patch(
//   "/me",
//   auth(Role.PROVIDER),
//   providerProfileController.updateMyProviderProfile,
// );

/**
 * Provider profile create (only once)
 * If you auto-create profile at registration, you can remove this
 */
router.post(
  "/",
  auth(Role.PROVIDER),
  providerProfileController.createProviderProfile,
);

export const providerProfileRouter = router;
