import { IBlog, ICategory, IComment, ICommentGetQuery, IEditQuery, IGetQuery, ILikeDislike, ILikeDislikeQuery, ILoginUser, IParam, IRequest, ISocialQuery, IUser, TypedRequestQuery } from "../types";
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

    validateSocial(query: any) {
        const validateSchema = Joi.object<ISocialQuery>({
            type: Joi.string().disallow("").trim().valid("FOLLOW", "UNFOLLOW")
        })

        return validateSchema.validate(query);
    }

    validateCategory(catgory: ICategory) {
        const validateSchema = Joi.object<ICategory>({
            category: Joi.string().disallow("").trim().required()
        })
        return validateSchema.validate(catgory);
    }

    validateGetQuery(query: any, type?: string) {
        let validateSchema;
        if (type && type === "comment") {
            validateSchema = Joi.object<ICommentGetQuery>({
                page: Joi.number().min(1).required(),
                limit: Joi.number().min(5).max(12).required(),
                sort: Joi.string().disallow("").trim().valid("ASC", "DESC"),
                blogid: Joi.string().disallow("").required(),
                commentid: Joi.string().allow().optional(),
            })
            return validateSchema.validate(query);

        } else {
            validateSchema = Joi.object<IGetQuery>({
                page: Joi.number().min(1).required(),
                limit: Joi.number().min(5).max(12).required(),
                sort: Joi.string().disallow("").trim().valid("ASC", "DESC"),
                keyword: Joi.string().allow("").optional(),
                id: Joi.string().allow("").optional(),
                categoryid: Joi.string().allow("").optional(),
            })

            return validateSchema.validate(query);

        }

    }

    validateEditQuery(query: any) {
        const validateSchema = Joi.object<IEditQuery>({
            id: Joi.string().disallow("").trim().required(),
            action: Joi.string().disallow("").trim().required(),
            type: Joi.string().optional()
        })

        return validateSchema.validate(query);
    }

    validateBlog(data: IRequest) {
        const validateSchema = Joi.object<IBlog>({
            title: Joi.string().trim().required().disallow("").min(20).max(100),
            description: Joi.string().trim().required().disallow(""),
            type: Joi.string().trim().valid("FREE", "PAID").default("FREE"),
            thumbnail: Joi.string().optional().allow(""),
            like: Joi.number().default(0),
            dislike: Joi.number().default(0),
            visit: Joi.number().default(0),
            share: Joi.number().default(0),
            time: Joi.number().default(0),
            category: Joi.string().required().disallow(""),
            subcategories: Joi.array().items(Joi.string()),//.required(),
            summery: Joi.string().trim(),
            status: Joi.string().valid("PUBLISH", "UNPUBLISH"),
            owner: Joi.string().optional().disallow("")
        })
        return validateSchema.validate(data);
    }

    validateReqParams(param: any) {
        const validateSchema = Joi.object<IParam>({
            id: Joi.string().disallow("").trim().required()
        })
        return validateSchema.validate(param);
    }

    validateComment(data: IRequest, type: string) {
        if (type === "comment") {
            const validateSchema = Joi.object<IComment>({
                blogID: Joi.string().required().disallow(""),
                comment: Joi.string().required().disallow("").trim(),
                like: Joi.number().default(0),
                unlike: Joi.number().default(0),
            })
            return validateSchema.validate(data);
        } else {
            const validateSchema = Joi.object<IComment>({
                blogID: Joi.string().required().disallow(""),
                commentID: Joi.string().required().disallow(""),
                comment: Joi.string().required().disallow("").trim(),
                like: Joi.number().default(0),
                unlike: Joi.number().default(0),
            })
            return validateSchema.validate(data);
        }


    }

    validateLikeDislike(query: any) {
        const validateSchema = Joi.object<ILikeDislikeQuery>({
            action:Joi.string().required().disallow("").valid("LIKE","DISLIKE"),
            type:Joi.string().required().disallow("").valid("BLOG","COMMENT")
        })
        
        return validateSchema.validate(query) 
    }
}

export default new Validation();