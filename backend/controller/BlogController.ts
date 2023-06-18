import { INext, IRequest, IResponse } from "../types";

class BlogController {

    async create(req: IRequest, res: IResponse, next: INext) {
        try {

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