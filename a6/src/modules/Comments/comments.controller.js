import { Router } from 'express';
import {
  createBulk,
  updateComment,
  searchForWords,
  findOrCreate,
  newestComments,
  getComment,
} from './Comments.services.js'


const CommentRouter = Router();

CommentRouter.post('/',createBulk)
CommentRouter.patch('/:commentId',updateComment)
CommentRouter.post('/findOrCreate',findOrCreate)
CommentRouter.get('/search',searchForWords)
CommentRouter.get('/newest/:postID',newestComments)
CommentRouter.get("/details/:commentId", getComment);


export { CommentRouter }