import createError from 'http-errors';
import { DbSearchQuery, SResponse, Validation } from "../helpers";
import { ICommentGetQuery, IGetQuery, INext, IRequest, IResponse } from "../types";
import { BlogService } from '../service';
import { IResData } from '../helpers/Response';
import { BlogModel, CommentModel } from '../model';
import mongoose, { Schema } from 'mongoose';
import Joi from 'joi';

class BlogController {
    async create(req: IRequest, res: IResponse, next: INext) {
        try {
            const user = req.user!;
            const { error, value } = Validation.validateBlog(req.body);
            if (error) return next(createError(422, error.message))

            value.owner = user._id;
            const result = await BlogService.create(value);
            const resData = {
                message: "Blog Created successfully.",
                data: result
            }

            return SResponse(res, resData);

        } catch (error) {
            return next(error)
        }
    }

    async edit(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateEditQuery(req.query)
            if (error) return next(createError(422, error.message))

            const isExists = await DbSearchQuery.FindById(value?.id!, "blog");
            if (!isExists) return next(createError(409, "Invalid blog."))

            const query = value;
            let resData: IResData;
            if (value.action === "EDIT") {
                const { error, value } = Validation.validateBlog(req.body);
                if (error) {
                    return next(createError(422, error.message))
                }
                const result = await BlogService.edit(query!, value)
                resData = {
                    message: 'Blog updated successfully.',
                    data: result!
                }
            } else {
                const result = await BlogService.edit(value);
                resData = {
                    message: "Status changed.",
                    data: result!
                }
            }

            return SResponse(res, resData)
        } catch (error) {
            return next(error)
        }
    }

    async get(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateGetQuery(req.query)
            if (error) return next(createError(422, error.message))

            if (value.id || value.categoryid) {
                const isExists = await BlogModel.findOne({ $or: [{ _id: new mongoose.Types.ObjectId(value.id) }, { category: new mongoose.Types.ObjectId(value.categoryid) }] })
                if (!isExists) return next(createError(409, "Invalid blog"))
            }
            const result = await BlogService.get(value as IGetQuery);
            const resData = {
                message: "Blog fetched",
                data: result!
            }
            return SResponse(res, resData);
        } catch (error) {
            return next(error)
        }
    }

    async delete(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateReqParams(req.params);
            if (error) return next(createError(422, error.message));
            const isExists = await BlogModel.findById(new mongoose.Types.ObjectId(req.params.id))
            if (!isExists) return next(createError(409, "Invalid blog."));
            const result = await BlogService.delete(value.id)
            const resData = {
                message: "Blog deleted.",
                data: result!
            }
            return SResponse(res, resData);
        } catch (error) {
            return next(error)
        }
    }

    async createComment(req: IRequest, res: IResponse, next: INext) {
        try {

            const { user } = req.user!;
            let type: string;
            // Creating block scope element
            {
                const validateQuery = Joi.object<{ type: string }>({
                    type: Joi.string().required().disallow("")
                })

                const { error, value } = validateQuery.validate(req.query);
                if (error) {
                    return next(createError(422, error.message))
                }
                type = value.type;
            }

            const { error, value } = Validation.validateComment(req.body, type)
            if (error) {
                return next(createError(422, error.message))
            }

            const result = await BlogService.createComment(value)
            const resData: IResData = {
                message: "Comment created successfully."
                , data: result
            }
            return SResponse(res, resData)

        } catch (error) {
            return next(error)
        }
    }

    async editComment(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateEditQuery(req.query)
            if (error) return next(createError(422, error.message))

            const isExists = await DbSearchQuery.FindById(value?.id!, "comment");
            if (!isExists) return next(createError(409, "Invalid comment."))
            // Set query and type for the editing the comment
            const query = value;
            const type = value.type!;
            let resData: IResData;
            if (value.action === "EDIT") {
                const validateSchema = Joi.object<{ comment: string }>({
                    comment: Joi.string().trim().required().disallow("")
                })
                const { error, value } = validateSchema.validate(req.body)
                if (error) {
                    return next(createError(422, error.message))
                }
                const result = await BlogService.editComment(query, value);
                resData = {
                    message: "Comment updated.",
                    data: result!
                }
                return SResponse(res, resData);
            }

            const result = await BlogService.editComment(query);
            resData = {
                message: `Comment ${query.action.toLowerCase() + "ed"} successfully.`,
                data: result!
            }
            return SResponse(res, resData);

        } catch (error) {
            return next(error);
        }
    }

    async getComment(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateGetQuery(req.query, "comment")
            if (error) {
                return next(createError(422, error.message))
            }
            const result = await BlogService.getComment(value as ICommentGetQuery)
            const resData = {
                message: "Comment fetched.",
                data: result!
            }
            return SResponse(res, resData);
        } catch (error) {
            return next(error)
        }
    }

    async likeDislike(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateLikeDislike(req.query);
            if (error) return next(createError(422, error.message));
            if (!req.params.id) return next(createError(422, `Invalid ${value.type.toLowerCase()} id.`))
            if (value.type === "BLOG") {
                const isExists = await BlogModel.findById(new mongoose.Types.ObjectId(req.params.id))
                if (!isExists) return next(createError(422, `Invalid ${value.type.toLowerCase()} id.`));
            } else {
                const isExists = await CommentModel.findById(new mongoose.Types.ObjectId(req.params.id))
                if (!isExists) return next(createError(422, `Invalid ${value.type.toLowerCase()} id.`));
            }
            const result = await BlogService.likeDislike(value, req.params.id!, req.user?._id!)
            const resData = {
                message: `${value.type.toLocaleLowerCase()} ${value.action.toLocaleLowerCase()} successfully.`,
                data: result!
            }
            return SResponse(res, resData);
        } catch (error) {
            next(error)
        }
    }

}

export default new BlogController();