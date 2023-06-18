import Express from 'express'
import { BlogController } from '../controller';
import auth from '../middlewares/Auth';

const BlogRouter = Express.Router();

BlogRouter.post("/", auth, BlogController.create);
BlogRouter.put("/", auth, BlogController.edit);
BlogRouter.get("/", auth, BlogController.get);
BlogRouter.delete("/:id", auth, BlogController.delete);

export default BlogRouter;