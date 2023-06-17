import createError from 'http-errors';
import { DbSearchQuery, SResponse, Validation } from "../helpers";
import { ICategory, INext, IRequest, IResponse } from "../types";
import { CategoryService } from '../service';
import { IResData } from '../helpers/Response';

class CategoryController {

    async addCategory(req: IRequest, res: IResponse, next: INext) {
        try {

            const { error, value } = Validation.validateCategory(req.body)
            if (error) {
                return next(createError(422, error.message))
            }
            const isExists = await DbSearchQuery.FindOne({ category: value.category }, "category")
            if (isExists) {
                return next(createError(409, "Category already exists."))
            }

            const result = await CategoryService.addCategory(value);
            const resData = {
                message: "Category created successfully.",
                data: result
            }
            return SResponse(res, resData);
        } catch (error) {
            return next(error)
        }
    }

    async editCategory(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateEditQuery(req.query);
            if (error) {
                return next(createError(422, error.message))
            }

            const isExists = await DbSearchQuery.FindById(value?.id!, "category");
            if (!isExists) {
                return next(createError(409, "Invalid category"))
            }
            const query = value;
            let result: ICategory;
            let resData: IResData
            if (value?.action === "DELETE") {
                console.log(value);

                result = await CategoryService.editCategory(value!) as ICategory;
                resData = {
                    message: "Category deleted Successfully.",
                    data: result
                }
            } else {
                const { error, value } = Validation.validateCategory(req.body)
                if (error) {
                    return next(createError(422, error.message))
                }

                result = await CategoryService.editCategory(query!, value) as ICategory
                resData = {
                    message: "Category deleted Successfully.",
                    data: result
                }
            }
            return SResponse(res, resData)
        } catch (error) {
            return next(error)
        }
    }

    async getCategory(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateGetQuery(req.query)
            if (error) {
                return next(createError(422, error.message))
            }

            const result = await CategoryService.getCategory(value.keyword!)
            const resData: IResData = {
                message: "Category fetched.",
                data: result!
            }

            return SResponse(res, resData)


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