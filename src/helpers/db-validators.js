import Category from "../category/category.model.js"

export const categoryExists = async (id = "") => {
    const existe = await Category.findById(id);
    if (!existe) {
        throw new Error("There isn't a category with that ID")
    }
};