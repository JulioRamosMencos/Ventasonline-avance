import { body, param } from "express-validator";
import { handleErrors } from "./handle_errors.js";
import { validarCampos } from "./validate-fields.js";
import { categoryExists } from "../helpers/db-validators.js"; // Assuming you have this helper


export const createCategoryValidator = [
    body("name")
        .notEmpty().withMessage("The name of the category is required.")
        .isLength({ min: 3 }).withMessage("The category name must be at least 3 characters long."),

    body("description")
        .notEmpty().withMessage("The description of the category is required.")
        .isLength({ min: 10 }).withMessage("The category description must be at least 10 characters long."),

    validarCampos,
    handleErrors
];


export const getCategoryByIdValidator = [
    param("cid")
        .isMongoId().withMessage("Not a valid MongoDB ID"),
    param("cid")
        .custom(categoryExists).withMessage("Category with the provided ID does not exist."),

    validarCampos,
    handleErrors
];


export const updateCategoryValidator = [
    param("cid")
        .isMongoId().withMessage("Not a valid MongoDB ID"),
    param("cid")
        .custom(categoryExists).withMessage("Category with the provided ID does not exist."),
    
    body("name")
        .optional()
        .isLength({ min: 3 }).withMessage("The category name must be at least 3 characters long."),
    
    body("description")
        .optional()
        .isLength({ min: 10 }).withMessage("The category description must be at least 10 characters long."),

    validarCampos,
    handleErrors
];


export const deleteCategoryValidator = [
    param("cid")
        .isMongoId().withMessage("Not a valid MongoDB ID"),
    param("cid")
        .custom(categoryExists).withMessage("Category with the provided ID does not exist."),

    validarCampos,
    handleErrors
];
