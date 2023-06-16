import { Schema, model } from "mongoose";
import { IUser } from "../types";
import Joi from "joi"
import createError from "http-errors"

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 25,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },
    status: {
        type: String,
        required: true,
        enum: ["ACTIVE", "INACTIVE"]
    }

}, {
    timestamps: true
})

userSchema.pre("save", function (next) {
    const validationSchema = Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } });
    const { error } = validationSchema.validate(this.email)
    if (error) {
        return next(createError(422, "Email must be valid email."))
    }
    next();
})

const UserModel = model<IUser>("UserModel", userSchema, "Users")
export default UserModel;