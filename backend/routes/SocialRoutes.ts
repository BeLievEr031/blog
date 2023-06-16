import Express from "express"
import { SocialController } from "../controller";
import auth from "../middlewares/Auth";
const SocialRouter = Express.Router();

SocialRouter.put("/", auth, SocialController.follow_unfollow)

export default SocialRouter;