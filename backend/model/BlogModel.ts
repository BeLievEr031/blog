import createError from 'http-errors';
import { Schema, model } from "mongoose"
import { IBlog } from "../types/Blog";

const blogSchema = new Schema<IBlog>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true,
        maxlength: 100,
        minlength: 20
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ["FREE", "PAID"],
        default: "FREE",
        required: true
    },
    thumbnail: {
        type: String,
        default: "default.png",
        required: true,
    },
    like: {
        type: Number,
        default: 0
    },
    dislike: {
        type: Number,
        default: 0
    },
    visit: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    time: {
        type: Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "CategoryModel"
    },
    subcategories: {
        type: [Schema.Types.ObjectId],
        ref: "SubCategoryModel",
        validate: [limitSubCategory(5), "Must only have 5 sub categories"]
    },
    summery: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["PUBLISH", "UNPUBLISH"],
        default: "UNPUBLISH"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    }
}, {
    timestamps: true
})

// Function for limiting the number of sub-catgories.
function limitSubCategory(limit: number) {
    return function limitFunc(value: Schema.Types.ObjectId[]): boolean {
        return value.length < limit
    }
}

blogSchema.pre("save", function (next) {
    if (this.dislike < 0) {
        return next(createError(422, "Can't be disliked."))
    }
    next();
})

const BlogModel = model<IBlog>("BlogModel", blogSchema, "Blogs")
export default BlogModel;