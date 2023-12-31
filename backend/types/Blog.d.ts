import { Document, Schema } from "mongoose";
import { IGetQuery } from "./Global";

export interface IBlog extends Document {
    title: string,
    description: string,
    type: "FREE" | "PAID",
    thumbnail: string, //Image url of Blog.
    like: number,
    dislike: number,
    share: number, //Total number of shares
    visit: number, //Total visit of blogs
    time: number, //Time required to read the Blog. Store the time in minutes
    category: Schema.Types.ObjectId,
    subcategories: Schema.Types.ObjectId[],
    summery: string,//Summery of blog.
    status: "PUBLISH" | "UNPUBLISH",
    owner: Schema.Types.ObjectId | string,
}

export interface ICategory extends Document {
    category: string
}

export interface ISubCategory extends Document {
    subcategory: string,
    category: Schema.Types.ObjectId
}

export interface IComment extends Document {
    blogID: Schema.Types.ObjectId,
    commentID: Schema.Types.ObjectId | null,
    userID: Schema.Types.ObjectId,
    comment: string,
    like: number,
    unlike: number
}

export interface ICommentGetQuery extends IGetQuery {
    blogid: string,
    commentid: string | null
}

export interface ILikeDislike {
    blogID: Schema.Types.ObjectId,
    commentID: Schema.Types.ObjectId,
    like: number,
    dislike: number,
    userID: Schema.Types.ObjectId
}

export interface ILikeDislikeQuery {
    type: "BLOG" | "COMMENT",
    action: "LIKE" | "DISLIKE"
}