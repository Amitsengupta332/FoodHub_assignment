import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../../generated/prisma/enums";
import { orderController } from "./order.controller";

const router = Router();

// router.get(
//   "/",
//   auth(Role.CUSTOMER, Role.PROVIDER),
//   orderController.getUsersOrders,
// );

// router.get(
//   "/provider",
//   auth(Role.PROVIDER),
//   orderController.getProviderOrders
// );
// router.get("/all", auth(Role.ADMIN), orderController.getAllOrders);

// router.get(
//   "/:id",
//   auth(Role.CUSTOMER, Role.PROVIDER),
//   orderController.getOrderDetails,
// );

// router.get(
//   "/provider/:id",
//   auth(Role.PROVIDER),
//   orderController.getOrderForProvider,
// );

// router.post(
//   "/",
//   auth(Role.CUSTOMER, Role.PROVIDER),
//   orderController.orderCreate,
// );

// router.patch(
//   "/:id",
//   auth(Role.PROVIDER),
//   orderController.updateOrderStatus,
// );

/** Customer: my orders */
router.get("/", auth(Role.CUSTOMER), orderController.getUsersOrders);
router.post("/", auth(Role.CUSTOMER), orderController.orderCreate);
router.patch("/:id/cancel", auth(Role.CUSTOMER), orderController.cancelOrder);

/** Provider: my provider orders */
router.get("/provider", auth(Role.PROVIDER), orderController.getProviderOrders);
router.patch("/:id", auth(Role.PROVIDER), orderController.updateOrderStatus);

/** Admin: all orders */
router.get("/all", auth(Role.ADMIN), orderController.getAllOrders);

/** Details (customer/provider/admin) */
router.get("/:id", auth(Role.CUSTOMER, Role.PROVIDER, Role.ADMIN), orderController.getOrderDetails);

export const orderRoute = router;
