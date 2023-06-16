import { Validation } from "../helpers";
import { INext, IRequest, IResponse, ISocialQuery } from "../types";
import createError from "http-errors"
class SocialController {
    async follow_unfollow(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateSocial(req.query)

            if (error) {
                return next(createError(422, error.message))
            }

            
        } catch (error) {
            return next(error)
        }
    }

}

export default new SocialController();