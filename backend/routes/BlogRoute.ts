import Express from 'express'
import { BlogController } from '../controller';
import auth from '../middlewares/Auth';

const BlogRouter = Express.Router();

BlogRouter.post("/", auth, BlogController.create);
BlogRouter.put("/", auth, BlogController.edit);
BlogRouter.get("/", auth, BlogController.get);
BlogRouter.delete("/:id", auth, BlogController.delete);

// Blog comment routes
BlogRouter.post("/comment", auth, BlogController.createComment)
BlogRouter.put("/comment", auth, BlogController.editComment)
BlogRouter.get("/comment", auth, BlogController.getComment)


// Like and dislike route fot the Blog & Comment
BlogRouter.put("/like-dislike/:id", auth, BlogController.likeDislike)

export default BlogRouter;