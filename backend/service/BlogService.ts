import mongoose from "mongoose";
import { BlogModel, CommentModel } from "../model";
import { IBlog, IComment, IEditQuery, IGetQuery } from "../types";

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
        } else if (query.action === "LIKE") {
            return BlogModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    like: 1
                }
            })
        } else if (query.action === "DISLIKE") {
            return BlogModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    dislike: 1
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
            return await BlogModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    visit: 1
                }
            })
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

    async createComment(data: IComment) {
        return await CommentModel.create(data)
    }

    async editComment(query: IEditQuery) {
        if (query.action === "LIKE") {
            return CommentModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    like: 1
                }
            })
        } else if (query.action === "UNLIKE") {
            return CommentModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    like: -1,
                    unlike: 1
                }
            })
        } else if (query.action === "DELETE") {

        }


    }
}

export default new BlogService();