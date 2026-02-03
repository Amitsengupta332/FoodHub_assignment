import { Request, Response } from "express";
import { mealsService } from "./meals.service";

// /**
//  * CREATE MEAL
//  */
// const createMeal = async (req: Request, res: Response) => {
//   const providerId = req.user?.id;

//   if (!providerId) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   try {
//     const result = await mealsService.createMeal(providerId, req.body);

//     res.status(201).json({
//       success: true,
//       message: "Meal created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Meal creation failed",
//       error: error.message,
//     });
//   }
// };

// /**
//  * GET PROVIDER MEALS
//  */
// const getProviderMeals = async (req: Request, res: Response) => {
//   const providerId = req.user?.id;

//   if (!providerId) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized",
//     });
//   }

//   const result = await mealsService.getProviderMeals(providerId);

//   res.status(200).json({
//     success: true,
//     message: "Provider meals fetched successfully",
//     data: result,
//   });
// };

// const getAllMeals = async (req: Request, res: Response) => {
//   try {
//     const { search, categoriesId, maxPrice } = req.query;

//     const payload: {
//       search?: string;
//       categoriesId?: string;
//       maxPrice?: number;
//     } = {};

//     if (typeof search === "string") payload.search = search;
//     if (typeof categoriesId === "string") payload.categoriesId = categoriesId;
//     if (typeof maxPrice === "string") payload.maxPrice = Number(maxPrice);

//     const result = await mealsService.getAllMeals(payload);

//     res.status(200).json({
//       success: true,
//       message: "Meals fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch meals",
//       error: error.message || error,
//     });
//   }
// };

// const getMealDetails = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const result = await mealsService.getMealDetails(id as string);

//     if (!result) {
//       return res.status(404).json({
//         success: false,
//         message: "Meal not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Meal details fetched successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch meal details",
//       error: error.message || error,
//     });
//   }
// };

// /**
//  * UPDATE MEAL
//  */
// const updateMeal = async (req: Request, res: Response) => {
//   const providerId = req.user?.id;
//   const { id } = req.params;

//   if (!providerId || !id) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid request",
//     });
//   }

//   const result = await mealsService.updateMeal(
//     providerId,
//     id as string,
//     req.body
//   );

//   res.status(200).json({
//     success: true,
//     message: "Meal updated successfully",
//     data: result,
//   });
// };

// /**
//  * DELETE MEAL
//  */
// const deleteMeal = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const result = await mealsService.deleteMeal(id as string);

//     res.status(200).json({
//       success: true,
//       message: "Meal deleted successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: "Meal delete failed",
//       error: error.message,
//     });
//   }
// };

// export const mealsController = {
//   createMeal,
//   getProviderMeals,
//   getAllMeals,
//   getMealDetails,
//   updateMeal,
//   deleteMeal,
// };


const createMeal = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;

  if (!providerUserId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await mealsService.createMeal(providerUserId, req.body);

    res.status(201).json({
      success: true,
      message: "Meal created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Meal creation failed",
      error: error.message,
    });
  }
};

const getProviderMeals = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;

  if (!providerUserId) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const result = await mealsService.getProviderMeals(providerUserId);

    res.status(200).json({
      success: true,
      message: "Provider meals fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Failed to fetch provider meals" });
  }
};

const getAllMeals = async (req: Request, res: Response) => {
  try {
    const { search, categoriesId, maxPrice } = req.query;

    const payload: { search?: string; categoriesId?: string; maxPrice?: number } = {};
    if (typeof search === "string") payload.search = search;
    if (typeof categoriesId === "string") payload.categoriesId = categoriesId;
    if (typeof maxPrice === "string") payload.maxPrice = Number(maxPrice);

    const result = await mealsService.getAllMeals(payload);

    res.status(200).json({
      success: true,
      message: "Meals fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meals",
      error: error.message || error,
    });
  }
};

const getMealDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await mealsService.getMealDetails(id as string);

    if (!result) {
      return res.status(404).json({ success: false, message: "Meal not found" });
    }

    res.status(200).json({
      success: true,
      message: "Meal details fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch meal details",
      error: error.message || error,
    });
  }
};

const updateMeal = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;
  const { id } = req.params;

  if (!providerUserId || !id) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  try {
    const result = await mealsService.updateMeal(providerUserId, id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Meal update failed" });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  const providerUserId = req.user?.id;
  const { id } = req.params;

  if (!providerUserId || !id) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  try {
    const result = await mealsService.deleteMeal(providerUserId, id as string);

    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Meal delete failed" });
  }
};

export const mealsController = {
  createMeal,
  getProviderMeals,
  getAllMeals,
  getMealDetails,
  updateMeal,
  deleteMeal,
};