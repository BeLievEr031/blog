import { IBlog, ICategory, IComment, IResponse, ISubCategory, IUser } from "../types";

export interface IResData {
    message: string,
    data: IUser | IBlog | ISubCategory | ICategory | IComment | IUser[] | IBlog[] | ICategory[] | ISubCategory[] | IComment[]
}

const SResponse = (res: IResponse, data: IResData) => {
    return res.status(200).json(data)
}

const FResponse = (res: IResponse, data: IResData) => {
    return res.status(409).json(data)
}

export { SResponse, FResponse };