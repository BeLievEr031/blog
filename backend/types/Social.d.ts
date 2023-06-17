import { Schema } from "mongoose"
import { Query } from 'express-serve-static-core';

export interface IFollower {
    userID: Schema.Types.ObjectId,
    followerID: Schema.Types.ObjectId
}

export interface IFollowing {
    userID: Schema.Types.ObjectId,
    followingID: Schema.Types.ObjectId,
}

export interface ISocialQuery extends Query {
    type: "FOLLOW" | "UNFOLLOW"
}