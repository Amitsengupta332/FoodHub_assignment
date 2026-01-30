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


export const userController = {
  getAllUsers,
//   updateUserStatus,
};