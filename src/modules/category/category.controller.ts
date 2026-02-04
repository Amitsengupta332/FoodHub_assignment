import { Request, Response } from "express";
import { categoryService } from "./category.service";
const getAllCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoryService.getAllCategory();

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Fetch failed. Please try again.",
      error: e.message || e,
    });
  }
};

const createCategory = async (req: Request, res: Response) => {
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
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await categoryService.updateCategory(id as string, data);

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Category update failed. Please try again.",
      error: e.message || e,
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await categoryService.deleteCategory(id as string);

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: "Category delete failed. Please try again.",
      error: e.message || e,
    });
  }
};

export const categoryController = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};