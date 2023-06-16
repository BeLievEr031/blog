import { Schema } from "mongoose"
import { ParsedQs } from "qs";
export interface IFollower {
    userID: Schema.Types.ObjectId,
    followerID: Schema.Types.ObjectId
}

export interface IFollowing {
    userID: Schema.Types.ObjectId,
    followingID: Schema.Types.ObjectId,
}

export interface ISocialQuery  {
    type?: "FOLLOW" | "UNFOLLOW"
}