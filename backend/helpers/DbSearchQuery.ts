import mongoose from "mongoose";
import { CategoryModel, UserModel } from "../model";

class DbSearch {
    async FindByEmail(email: string) {
        return await UserModel.findOne({ email: email }).select("+password")
    }

    async FindById(id: string, type?: string) {
        if (type === "category") {
            return await CategoryModel.findById(new mongoose.Types.ObjectId(id));
        }
        return await UserModel.findById(new mongoose.Types.ObjectId(id));
    }

    async FindOne(data: any, type?: string) {
        if (type === "category") {
            return await CategoryModel.findOne(data);
        }
        return await UserModel.findOne(data);
    }

    async convertToObjectID(id: string) {
        return new mongoose.Types.ObjectId(id)
    }
}

export default new DbSearch();