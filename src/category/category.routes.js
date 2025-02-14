import { Router } from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from "./category.controller.js";
import {
    createCategoryValidator,
    getCategoryByIdValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} from "../middlewares/category-validators.js"; 

const router = Router();

router.post("/addCategory", createCategoryValidator, createCategory);
router.get("/", getCategories);
router.get("/:cid", getCategoryByIdValidator, getCategoryById);
router.put("/updateCategory/:cid", updateCategoryValidator, updateCategory);
router.delete("/deleteCategory/:cid", deleteCategoryValidator, deleteCategory);

export default router;
