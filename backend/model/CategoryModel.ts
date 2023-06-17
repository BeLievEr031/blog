import { Schema, model } from "mongoose"

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
        unique: true,
    }
},{
    timestamps: true
})

const CategoryModel = model("CategoryModel", categorySchema, "Categories")

export default CategoryModel;