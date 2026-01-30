import { Request, Response } from "express";
import { userService } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
      error: e.message || e,
    });
  }
};

const updateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isActive } = req.body;

  // ✅ Validate id
  if (!id || typeof id !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid user id",
    });
  }

  try {
    const result = await userService.updateUserStatus(id, Boolean(isActive));

    res.status(200).json({
      success: true,
      message: "User status updated successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "User status update failed. Please try again.",
      error: e.message || e,
    });
  }
};

export const userController = {
  getAllUsers,
  updateUserStatus,
};
