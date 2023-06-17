import Express from "express"
import { CategoryController } from "../controller";

const CategoryRouter = Express.Router();

CategoryRouter.post("/", CategoryController.addCategory)
CategoryRouter.put("/", CategoryController.editCategory)
CategoryRouter.get("/", CategoryController.getCategory)

export default CategoryRouter;