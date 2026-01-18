import { Router } from "express";
import { allPosts, countComments, createPost, deletePost } from "./Posts.services.js";

const PostsRouter = Router();

PostsRouter.post('/',createPost)
PostsRouter.delete('/:postid',deletePost)
PostsRouter.get('/details',allPosts)
PostsRouter.get("/comment-count",countComments);

export {PostsRouter};