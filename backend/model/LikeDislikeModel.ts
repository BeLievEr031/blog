import { Schema, model } from "mongoose"
import { ILikeDislike } from "../types"

const likeDislikeSchema = new Schema<ILikeDislike>({

    blogID: {
        type: Schema.Types.ObjectId,
        ref: "BlogModel",
        index:true
    },
    
    commentID: {
        type: Schema.Types.ObjectId,
        ref: "CommentModel",
        index:true
    },

    userID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel"
    },

    like: {
        type: Number,
        default: 0,
    },
    dislike: {
        type: Number,
        default: 0,
    }

})


const LikeDislikeModel = model<ILikeDislike>("LikeDislikeModel", likeDislikeSchema, "LikeDislikes")
export default LikeDislikeModel;
