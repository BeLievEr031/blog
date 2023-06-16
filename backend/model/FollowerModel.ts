import { Schema, model } from "mongoose"
import { IFollower } from "../types"

const followerSchema = new Schema<IFollower>({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
        index: true

    },
    
    followerID: {
        type: Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    }

}, {
    timestamps: true
})

const FollowerModel = model<IFollower>("FollowerModel", followerSchema, "Followers")
export default FollowerModel;