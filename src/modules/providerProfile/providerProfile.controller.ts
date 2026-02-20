import { Request, Response } from "express";
import { providerProfileService } from "./providerProfile.service";

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await providerProfileService.getAllProvider();
    res
      .status(200)
      .json({
        success: true,
        message: "Providers fetched successfully",
        data: result,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch providers.",
        error: error.message,
      });
  }
};

const getProviderWithMenu = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await providerProfileService.getProviderWithMenu(
      id as string,
    );
 
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Provider not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Provider details fetched successfully",
        data: result,
      });
  } catch (error: any) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch provider.",
        error: error.message,
      });
  }
};

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { shopName, address, phone } = req.body;

    if (!shopName || !address || !phone) {
      return res
        .status(400)
        .json({
          success: false,
          message: "shopName, address, phone are required",
        });
    }

    const result = await providerProfileService.createProviderProfile(userId, {
      shopName,
      address,
      phone,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Provider profile created successfully",
        data: result,
      });
  } catch (error: any) {
    // duplicate profile -> better 409
    const msg = String(error.message || "");
    const status = msg.includes("already exists") ? 409 : 400;
    res
      .status(status)
      .json({
        success: false,
        message: "Provider profile creation failed",
        error: msg,
      });
  }
};

export const providerProfileController = {
  createProviderProfile,
  getProviderWithMenu,
  getAllProviders,
};
