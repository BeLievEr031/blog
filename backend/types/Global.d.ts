import { ParsedQs } from 'qs';
import { Query } from 'express-serve-static-core';
import { NextFunction, Request, Response } from "express";
import { IUser } from "./Auth";
export interface IRequest extends Request {
    user?: IUser
}
export interface IResponse extends Response { }
export interface INext extends NextFunction { }

export interface IPayload {
    _id: string,
    email: string
}


export interface TypedRequestQuery<T extends Query> extends Express.Request {
    query: T
}

export interface IGetQuery extends ParsedQs {
    page: number,
    limit: number,
    sort: "ASC" | "DESC",
    keyword?: string
}

export interface IEditQuery {
    id: string,
    action: string
}