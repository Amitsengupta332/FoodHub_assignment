// import { Request, Response } from "express";
// import { ReviewService } from "./review.service";

// const createReview = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user?.id;

//     const data = {
//       ...req.body,
//       customerId: userId,
//     };

//     const result = await ReviewService.createReview(data);

//     res.status(201).json({
//       success: true,
//       message: "Review created successfully",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(400).json({
//       success: false,
//       message: error.message || "Review creation failed",
//     });
//   }
// };

// export const ReviewController = {
//   createReview,
// };

import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { mealId, rating, comment } = req.body;

    if (!mealId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "mealId, rating, comment are required",
      });
    }

    const result = await ReviewService.createReview({
      mealId,
      rating: Number(rating),
      comment,
      userId,
    });

    res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Review creation failed",
    });
  }
};

export const ReviewController = { createReview };
