import { IBlog, ICategory, ISubCategory, IComment, ICommentGetQuery, ILikeDislike, ILikeDislikeQuery } from './Blog.d';
import { IRequest, INext, IResponse, IPayload, IGetQuery, TypedRequestQuery, IEditQuery, IParam } from './Global.d';
import { IUser, ILoginUser } from "./Auth";
import { IFollower, IFollowing, ISocialQuery } from './Social';
export {
    IUser, ILoginUser, IRequest, INext, IResponse, IPayload, IFollower, IFollowing, ISocialQuery, IGetQuery, TypedRequestQuery
    , IBlog, ICategory, ISubCategory, IEditQuery, IParam, IComment, ICommentGetQuery,ILikeDislike,ILikeDislikeQuery
};