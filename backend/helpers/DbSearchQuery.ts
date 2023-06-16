import { Schema } from "mongoose";
import { UserModel } from "../model";

class DbSearch {
    async FindByEmail(email: string) {
        return await UserModel.findOne({ email: email }).select("+password")
    }

    async FindById(id: string) {
        return await UserModel.findById(new Schema.Types.ObjectId(id));
    }

    async FindOne(data: any) {
        return await UserModel.findOne(data);
    }

    async convertToObjectID(id: string) {
        return new Schema.Types.ObjectId(id)
    }
}

export default new DbSearch();