import { Schema, model } from "mongoose"
import { IComment } from "../types"

const commentSchema = new Schema<IComment>({
    blogID: {
        type: Schema.Types.ObjectId,
        ref: "BlogModel"
    },
    commentID: {
        type: Schema.Types.ObjectId,
        ref: "CommentModel",
        default: null
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    like: {
        type: Number,
        default: 0
    },
    unlike: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const CommentModel = model<IComment>("CommentModel", commentSchema, "Comments")

export default CommentModel;