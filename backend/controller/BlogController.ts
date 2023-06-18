import createError from 'http-errors';
import { Validation } from "../helpers";
import { INext, IRequest, IResponse } from "../types";

class BlogController {

    async create(req: IRequest, res: IResponse, next: INext) {
        try {
            const user = req.user!;
            const { error, value } = Validation.validateBlog(req.body);
            if (error) {
                return next(createError(422, error.message))
            }

            
        } catch (error) {
            return next(error)
        }
    }

    async edit(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)
        }
    }

    async get(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)
        }
    }

    async delete(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)
        }
    }


}

export default new BlogController();