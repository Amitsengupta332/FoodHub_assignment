import { Request, Response } from "express";
import { orderService } from "./order.service";
import { OrderStatus, Role } from "../../generated/prisma/enums";
// import { prisma } from "../../lib/prisma";
// import { OrderStatus } from "../../generated/prisma/enums";

// const orderCreate = async (req: Request, res: Response) => {
//   const userId = req.user?.id;

//   const orderData = {
//     ...req.body,
//     customerId: userId,
//   };

//   try {
//     const result = await orderService.createOrders(userId as string, orderData);

//     res.status(201).json({
//       success: true,
//       message: "Order placed successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: "Order creation failed. Please try again.",
//       error: error.message || error,
//     });
//   }
// };

// const getProviderOrders = async (req: Request, res: Response) => {
//   const providerUserId = req.user?.id;

//   try {
//     // providerUserId -> ProviderProfile.id বের করে orders আনো
//     const profile = await prisma.providerProfile.findUnique({
//       where: { userId: providerUserId as string },
//     });

//     if (!profile) {
//       return res.status(404).json({
//         success: false,
//         message: "Provider profile not found",
//       });
//     }

//     const result = await orderService.getOrderForProvider(profile.id);

//     res.status(200).json({
//       success: true,
//       message: "Provider orders fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Failed to fetch provider orders",
//     });
//   }
// };

// const getUsersOrders = async (req: Request, res: Response) => {
//   const id = req.user?.id;

//   try {
//     const result = await orderService.getUsersOrders(id as string);

//     res.status(200).json({
//       success: true,
//       message: "User orders fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Failed to fetch user orders. Please try again.",
//       error: error.message || error,
//     });
//   }
// };

// const getAllOrders = async (req: Request, res: Response) => {
//   try {
//     const result = await orderService.getAllOrders();

//     res.status(200).json({
//       success: true,
//       message: " orders fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Failed to fetch orders. Please try again.",
//       error: error.message || error,
//     });
//   }
// };

// const getOrderDetails = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const result = await orderService.getOrderDetails(id as string);

//     res.status(200).json({
//       success: true,
//       message: "Order details fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(404).json({
//       success: false,
//       message: "Order not found or failed to fetch details.",
//       error: error.message || error,
//     });
//   }
// };

// const getOrderForProvider = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   try {
//     const result = await orderService.getOrderForProvider(id as string);

//     res.status(200).json({
//       success: true,
//       message: "Order  fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(404).json({
//       success: false,
//       message: "Order not found or failed to fetch .",
//       error: error.message || error,
//     });
//   }
// };

// const updateOrderStatus = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { status } = req.body;

//     if (!status) {
//       return res.status(400).json({
//         success: false,
//         message: "status is required",
//       });
//     }

//     const result = await orderService.updateOrderStatus(id as string, status as OrderStatus);

//     res.status(200).json({
//       success: true,
//       message: "Order status updated successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Failed to update order status",
//     });
//   }
// };
// export const orderController = {
//   orderCreate,
//   getAllOrders,
//   getProviderOrders,
//   getOrderForProvider,
//   getUsersOrders,
//   getOrderDetails,
//   updateOrderStatus,
// };


const orderCreate = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const result = await orderService.createOrders(userId, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Order creation failed",
      error: error.message || error,
    });
  }
};

const getUsersOrders = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const result = await orderService.getUsersOrders(userId);

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message || error,
    });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;
  if (!providerUserId) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const result = await orderService.getProviderOrders(providerUserId);

    res.status(200).json({
      success: true,
      message: "Provider orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch provider orders",
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrders();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message || error,
    });
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.role as Role;
  const { id } = req.params;

  if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const order = await orderService.getOrderDetails(id as string);
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    // ✅ Access control
    if (role === "CUSTOMER" && order.userId !== userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    if (role === "PROVIDER" && order.provider?.userId !== userId) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: order,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch order details",
      error: error.message || error,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;
  const { id } = req.params;
  const { status } = req.body;

  if (!providerUserId) return res.status(401).json({ success: false, message: "Unauthorized" });
  if (!status) return res.status(400).json({ success: false, message: "status is required" });

  try {
    const result = await orderService.updateOrderStatusByProvider(
      providerUserId,
      id as string,
      status as OrderStatus,
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to update order status",
    });
  }
};

const cancelOrder = async (req: Request, res: Response) => {
  const customerUserId = req.user?.id;
  const { id } = req.params;

  if (!customerUserId) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const result = await orderService.cancelOrderByCustomer(customerUserId, id as string);

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to cancel order",
    });
  }
};

export const orderController = {
  orderCreate,
  getUsersOrders,
  getProviderOrders,
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
  cancelOrder,
};