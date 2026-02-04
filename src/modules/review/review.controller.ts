import { Request, Response } from "express";
import { ReviewService } from "./review.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const { mealId, rating, comment } = req.body;
    if (!mealId || rating === undefined || !comment) {
      return res.status(400).json({
        success: false,
        message: "mealId, rating, comment are required",
      });
    }

    const r = Number(rating);
    if (!Number.isFinite(r) || r < 1 || r > 5) {
      return res
        .status(400)
        .json({ success: false, message: "rating must be between 1 and 5" });
    }

    const result = await ReviewService.createReview({
      mealId,
      rating: r,
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
