import { Document } from "mongoose";

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    status: "ACTIVE" | "INACTIVE",
}

export interface ILoginUser {
    email: string,
    password: string
}