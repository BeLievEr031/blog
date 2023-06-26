import mongoose from "mongoose";
import { BlogModel, CommentModel, LikeDislikeModel } from "../model";
import { IBlog, IComment, ICommentGetQuery, IEditQuery, IGetQuery, ILikeDislikeQuery } from "../types";

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

    async editComment(query: IEditQuery, data?: { comment: string }) {
        if (query.action === "LIKE") {
            return await CommentModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    like: 1
                }
            })
        } else if (query.action === "UNLIKE") {
            return await CommentModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
                $inc: {
                    unlike: 1
                }
            })
        } else if (query.action === "DELETE") {
            return await CommentModel.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(query.id) })
        }

        return await CommentModel.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(query.id) }, {
            $set: data!
        })

    }

    async getComment(query: ICommentGetQuery) {
        if (query.commentid) {
            return await CommentModel.find({ $and: [{ blogID: new mongoose.Types.ObjectId(query.blogid!) }, { commentID: new mongoose.Types.ObjectId(query.commentid!) }] },
                { updatedAt: 0, __v: 0, blogID: 0 })
                .skip((query.page - 1) * query.limit)
                .limit(query.limit)
                .sort(query.sort)
        }

        return await CommentModel.find({ $and: [{ blogID: new mongoose.Types.ObjectId(query.blogid!) }, { commentID: null }] },
            { updatedAt: 0, __v: 0, blogID: 0 })
            .skip((query.page - 1) * query.limit)
            .limit(query.limit)
            .sort(query.sort)
    }

    async likeDislike(query: ILikeDislikeQuery, id: string, userID: string) {
        if (query.type === "BLOG") {
            const isExists = await LikeDislikeModel.findOne({ $and: [{ blogID: new mongoose.Types.ObjectId(id) }, { userID: new mongoose.Types.ObjectId(userID) }] })
            if (isExists) {
                if (query.action === "LIKE") {
                    isExists.dislike = 0;
                    isExists.like = 1;
                } else {
                    isExists.dislike = 1;
                    isExists.like = 0;
                }

                await isExists.save();
                return isExists;
            }

            if (query.action === "LIKE") {
                return await LikeDislikeModel.create({
                    blogID: new mongoose.Types.ObjectId(id),
                    commentID: null,
                    like: 1,
                    userID: new mongoose.Types.ObjectId(userID)
                })
            }

            return await LikeDislikeModel.create({
                blogID: new mongoose.Types.ObjectId(id),
                commentID: null,
                dislike: 1,
                userID: new mongoose.Types.ObjectId(userID)
            })
        }

        const isExists = await LikeDislikeModel.findOne({ $and: [{ commentID: new mongoose.Types.ObjectId(id) }, { userID: new mongoose.Types.ObjectId(userID) }] })
        if (isExists) {
            if (query.action === "LIKE") {
                isExists.dislike = 0;
                isExists.like = 1;
            } else {
                isExists.dislike = 1;
                isExists.like = 0;
            }

            await isExists.save();
            return isExists;
        }
        if (query.action === "LIKE") {
            return await LikeDislikeModel.create({
                commentID: new mongoose.Types.ObjectId(id),
                blogID: null,
                like: 1,
                userID: new mongoose.Types.ObjectId(userID)
            })
        }

        return await LikeDislikeModel.create({
            commentID: new mongoose.Types.ObjectId(id),
            blogID: null,
            dislike: 1,
            userID: new mongoose.Types.ObjectId(userID)
        })


    }
}

export default new BlogService();