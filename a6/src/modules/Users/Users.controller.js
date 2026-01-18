import { Router } from "express";
import { createServer } from "mysql2";
import {
  createUser,
  findUser,
  findUserByemail,
  updateUser,
} from "./users.services.js";

const usersRouter = Router();
usersRouter.post("/signup", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.get("/by-email", findUserByemail);
usersRouter.get("/:id", findUser);

export { usersRouter };
