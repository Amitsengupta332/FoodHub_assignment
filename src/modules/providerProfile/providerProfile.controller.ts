import { Request, Response } from "express";
import { providerProfileService } from "./providerProfile.service";

// const createProviderProfile = async (req: Request, res: Response) => {
//   const userId = req.user?.id;
//   const data = {
//     ...req.body,
//     userId,
//   };

//   try {
//     const result = await providerProfileService.createProviderProfile(data);

//     res.status(201).json({
//       success: true,
//       message: "Provider profile created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Provider profile creation failed. Please try again.",
//       error: error.message || error,
//     });
//   }
// };

const createProviderProfile = async (req: Request, res: Response) => {
  try {
    const { shopName, address, phone, userId } = req.body;

    if (!shopName || !address || !phone || !userId) {
      return res.status(400).json({
        success: false,
        message: "All fields including userId are required",
      });
    }

    const data = {
      shopName,
      address,
      phone,
      userId,
    };

    const result = await providerProfileService.createProviderProfile(data);

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Provider profile creation failed",
      error: error.message,
    });
  }
};

export const providerProfileController = {
  createProviderProfile,
  //   getProviderWithMenu,
  //   getAllProvider,
};
