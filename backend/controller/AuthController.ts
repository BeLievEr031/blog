import createError from 'http-errors';
import { ILoginUser, INext, IPayload, IRequest, IResponse, IUser } from "../types";
import { AuthService } from '../service';
import { DbSearchQuery, Validation } from '../helpers';
import { comparePassword, hashPassword, signJWT } from '../utils';

class AuthController {
    async register(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateRegisterUser(req.body as IUser)
            if (error) {
                return next(createError(422, error.message))
            }
            const isExists = await DbSearchQuery.FindOne({ email: value.email })
            if (isExists) {
                return next(createError(409, "User already exists."))
            }
            const hashedPassword = await hashPassword(value.password)
            value.password = hashedPassword;
            const result = await AuthService.register(value);
            return res.status(200).json({
                message: "User registered successfully.",
                data: result
            })
        } catch (error) {
            return next(error)
        }
    }

    async login(req: IRequest, res: IResponse, next: INext) {
        try {
            const { error, value } = Validation.validateLoginUser(req.body as ILoginUser)
            if (error) {
                return next(createError(422, error.message))
            }

            const isExists = await DbSearchQuery.FindByEmail(value.email)
            if (!isExists) {
                return next(createError(409, "Invalid Credentials."))
            }
            const isPassword = await comparePassword(isExists.password, value.password);
            if (!isPassword) {
                return next(createError(409, "Invalid Credentials."))
            }
            const payload: IPayload = {
                _id: isExists._id,
                email: isExists.email
            }

            const jwtToken = await signJWT(payload);
            //securing password to send on client
            isExists.password = "null";
            return res.status(200).cookie("token", jwtToken, {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 1000 * 12 // valid for 12 hours
            }).json({
                message: "User logged in.",
                data: isExists,
                token: jwtToken
            })

        } catch (error) {
            return next(error)
        }
    }
}

export default new AuthController();