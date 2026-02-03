import { Request, Response } from "express";
import { orderService } from "./order.service";
import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../generated/prisma/enums";

const orderCreate = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const orderData = {
    ...req.body,
    customerId: userId,
  };

  try {
    const result = await orderService.createOrders(userId as string, orderData);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Order creation failed. Please try again.",
      error: error.message || error,
    });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;

  try {
    // providerUserId -> ProviderProfile.id বের করে orders আনো
    const profile = await prisma.providerProfile.findUnique({
      where: { userId: providerUserId as string },
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Provider profile not found",
      });
    }

    const result = await orderService.getOrderForProvider(profile.id);

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

const getUsersOrders = async (req: Request, res: Response) => {
  const id = req.user?.id;

  try {
    const result = await orderService.getUsersOrders(id as string);

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch user orders. Please try again.",
      error: error.message || error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getAllOrders();

    res.status(200).json({
      success: true,
      message: " orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch orders. Please try again.",
      error: error.message || error,
    });
  }
};

const getOrderDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await orderService.getOrderDetails(id as string);

    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Order not found or failed to fetch details.",
      error: error.message || error,
    });
  }
};

const getOrderForProvider = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await orderService.getOrderForProvider(id as string);

    res.status(200).json({
      success: true,
      message: "Order  fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "Order not found or failed to fetch .",
      error: error.message || error,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "status is required",
      });
    }

    const result = await orderService.updateOrderStatus(id as string, status as OrderStatus);

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
export const orderController = {
  orderCreate,
  getAllOrders,
  getProviderOrders,
  getOrderForProvider,
  getUsersOrders,
  getOrderDetails,
  updateOrderStatus,
};
