import createError from "http-errors";
import { INext, IRequest, IResponse } from "../types";
import { checkJWT } from "../utils";

const auth = async (req: IRequest, res: IResponse, next: INext) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(createError(422, "Invalid token"))
        }

        const payload = await checkJWT(token);
        if (!payload) {
            return next(createError(422, "Invalid token"))
        }

        next()
    } catch (error) {
        return next(error)
    }

}

export default auth;