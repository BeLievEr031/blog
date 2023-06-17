import mongoose from "mongoose";
import { CategoryModel } from "../model"
import { ICategory, IEditQuery, IGetQuery } from "../types"

class CategoryService {
    async addCategory(data: ICategory) {
        return await CategoryModel.create(data);
    }

    async editCategory(value: IEditQuery, data?: ICategory) {
        if (value.action === "EDIT") {
            return await CategoryModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(value.id)
            }, {
                $set: data
            })
        }
        return await CategoryModel.findByIdAndDelete(new mongoose.Types.ObjectId(value.id))

    }

    async getCategory(keyword: string) {
        if (keyword) {
            return await CategoryModel.find({ category: { $regex: keyword, $options: "i" } })
        }
    }


    async addSubCategory() {
    }

    async editSubCategory() {

    }

    async getSubCategory() {

    }
}

export default new CategoryService()