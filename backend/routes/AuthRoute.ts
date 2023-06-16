import Express from "express";
import { AuthController } from "../controller";

const AuthRouter = Express.Router();

AuthRouter.post("/register", AuthController.register);
AuthRouter.post("/login", AuthController.login);

export default AuthRouter;