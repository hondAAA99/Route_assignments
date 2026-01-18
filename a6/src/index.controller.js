import express from "express";
import { check_connection, check_sync } from "./DB/connection.js";
import { usersRouter } from "./modules/Users/users.controller.js";
import { PostsRouter } from "./modules/Posts/Posts.controller.js";
import { CommentRouter } from "./modules/Comments/comments.controller.js";
const app = express();
const port = 3000;

const bootstrap = async () => {
  app.use(express.json());
  await check_connection();
  await check_sync();

  app.use("/user", usersRouter);
  app.use("/post", PostsRouter);
  app.use("/comment", CommentRouter);

  app.all("/{*demo}", (req, res) => {
    res.send("Hello server!");
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}; 

export { bootstrap };
