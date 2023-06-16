import { UserModel } from "../model";
import { IUser } from "../types";

class AuthService {
    async register(data: IUser) {
        return await UserModel.create(data)
    }
}

export default new AuthService();