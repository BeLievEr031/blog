import { ILoginUser, ISocialQuery, IUser } from "../types";
import Joi from 'joi';
class Validation {
    validateRegisterUser(data: IUser) {
        const validateSchema = Joi.object<IUser>({
            name: Joi.string().min(5).max(25).trim().required().disallow(""),
            email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).disallow(""),
            password: Joi.string().required().disallow(""),
            status: Joi.string().optional().valid("ACTIVE", "INACTIVE").default("ACTIVE"),
        });

        return validateSchema.validate(data);
    }

    validateLoginUser(data: ILoginUser) {
        const validateSchema = Joi.object<ILoginUser>({
            email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).disallow(""),
            password: Joi.string().required().disallow(""),
        })

        return validateSchema.validate(data);
    }

    validateSocial(query: ISocialQuery) {
        const validateSchema = Joi.object<ISocialQuery>({
            type: Joi.string().disallow("").trim().valid("FOLLOW", "UNFOLLOW")
        })

        return validateSchema.validate(query);
    }
}

export default new Validation();