import { Request, Response } from "express";
import { categoryService } from "./category.service";

const createCategory =  async ( req: Request, res: Response) => {
     const data = req.body;

  try {
    const result = await categoryService.createCategory(data);

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Category creation failed. Please try again.",
      error: e.message || e,
    });
  }
}

export const categoryController = {
  createCategory,
//   updateCategory,
//   deleteCategory,
};