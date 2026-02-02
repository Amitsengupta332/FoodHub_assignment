import { Request, Response } from "express";
import { orderService } from "./order.service";

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

export const orderController = {
  orderCreate,
  getAllOrders,
  getOrderForProvider,
  getUsersOrders,
  getOrderDetails,
};
