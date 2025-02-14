import Category from "./category.model.js"; // Assuming this is where your Category model is
import { validationResult } from "express-validator";

// Create a new category
export const createCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: errors.array(),
            });
        }

        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: "Category with this name already exists",
            });
        }

        const newCategory = new Category({ name, description });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            category: newCategory,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error creating category",
            error: err.message,
        });
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { status: true };

        const [total, categories] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite)),
        ]);

        return res.status(200).json({
            success: true,
            total,
            categories,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching categories",
            error: err.message,
        });
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { cid } = req.params;
        const category = await Category.findById(cid);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            category,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error fetching category",
            error: err.message,
        });
    }
};

// Update category by ID
export const updateCategory = async (req, res) => {
    try {
        const { cid } = req.params;
        const data = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(cid, data, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category: updatedCategory,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error updating category",
            error: err.message,
        });
    }
};

// Delete category by ID (soft delete by setting status to false)
export const deleteCategory = async (req, res) => {
    try {
        const { cid } = req.params;

        const category = await Category.findByIdAndUpdate(cid, { status: false }, { new: true });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
            category,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: err.message,
        });
    }
};
