import { Schema, model } from "mongoose"
import { IFollowing } from "../types"

const followingSchema = new Schema<IFollowing>({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
        index: true
    },
    followingID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    }
}, {
    timestamps: true
})

const FollowingModel = model<IFollowing>("FollowingModel", followingSchema, "Followers")
export default FollowingModel;