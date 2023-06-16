import { NextFunction, Request, Response } from "express";
import { IUser } from "./Auth";
export interface IRequest extends Request {
    user?: IUser
}
export interface IResponse extends Response {}
export interface INext extends NextFunction {}

export interface IPayload {
    _id: string,
    email: string
}