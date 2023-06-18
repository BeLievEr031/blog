import createError from 'http-errors';
import { DbSearchQuery, SResponse, Validation } from "../helpers";
import { INext, IRequest, IResponse } from "../types";
import { BlogService } from '../service';
import { IResData } from '../helpers/Response';
import { BlogModel } from '../model';
import mongoose from 'mongoose';

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
            const result = await BlogService.get(value);
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
}

export default new BlogController();