import mongoose from "mongoose";
import { BlogModel } from "../model";
import { IBlog, IEditQuery, IGetQuery } from "../types";

class BlogService {
    async create(data: IBlog) {
        return await BlogModel.create(data);
    }

    async edit(query: IEditQuery, data?: IBlog) {

        if (query.action === "PUBLISH") {
            return await BlogModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(query.id)
            }, {
                $set: {
                    status: "PUBLISH"
                }
            })
        } else if (query.action === "UNPUBLISH") {
            return await BlogModel.findByIdAndUpdate({
                _id: new mongoose.Types.ObjectId(query.id)
            }, {
                $set: {
                    status: "UNPUBLISH"
                }
            })
        }

        return await BlogModel.findByIdAndUpdate({
            _id: new mongoose.Types.ObjectId(query.id)
        }, {
            $set: data!
        })


    }

    async get(query: IGetQuery) {
        if (query.id) {
            return await BlogModel.findById(new mongoose.Types.ObjectId(query.id))
        } else if (query.keyword) {
            return await BlogModel.find({ title: { $regex: query.keyword, $options: "i" } })
                .limit(query.limit).skip((query.page - 1) * query.limit)
                .sort({ createdAt: query.sort === "ASC" ? 1 : -1 })
        } else if (query.categoryid) {
            return await BlogModel.find({ category: new mongoose.Types.ObjectId(query.categoryid) })
                .limit(query.limit).skip((query.page - 1) * query.limit)
                .sort({ createdAt: query.sort === "ASC" ? 1 : -1 })
        }
        return await BlogModel.find({})
            .limit(query.limit).skip((query.page - 1) * query.limit)
            .sort({ createdAt: query.sort === "ASC" ? 1 : -1 })

    }

    async delete(id: string) {
        return await BlogModel.findByIdAndDelete(new mongoose.Types.ObjectId(id))
    }
}

export default new BlogService();