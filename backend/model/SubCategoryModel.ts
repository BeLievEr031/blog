import { Schema, model } from "mongoose"
import { ISubCategory } from "../types/Blog";

const subCategorySchema = new Schema<ISubCategory>({
    subcategory: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: [Schema.Types.ObjectId],
        ref: "CategoryModel"
    }
}, {
    timestamps: true
})

const SubCategoryModel = model<ISubCategory>("SubCategoryModel", subCategorySchema, "SubCategories")
export default SubCategoryModel;