import { IPayload } from "../types"
import jwt, { JwtPayload } from "jsonwebtoken"

export const signJWT = async (payload: IPayload): Promise<string> => {
    return await jwt.sign(payload, process.env.JWT_SECRET!);
}

export const checkJWT = async (token: string):Promise<string | JwtPayload> => {
    return await jwt.verify(token,process.env.JWT_SECRET!);
}