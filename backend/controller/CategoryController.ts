import { Validation } from "../helpers";
import { INext, IRequest, IResponse } from "../types";

class CategoryController {

    async addCategory(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)

        }
    }

    async editCategory(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)

        }
    }

    async getCategory(req: IRequest, res: IResponse, next: INext) {
        try {
            Validation.validateGetQuery(req.query)
        } catch (error) {
            return next(error)

        }
    }


    async addSubCategory(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)

        }
    }

    async editSubCategory(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)

        }
    }

    async getSubCategory(req: IRequest, res: IResponse, next: INext) {
        try {

        } catch (error) {
            return next(error)

        }
    }
}

export default new CategoryController();