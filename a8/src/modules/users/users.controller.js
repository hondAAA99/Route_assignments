import { Router } from "express";
import {
  signup,
  login,
  updateUser,
  deleteUser,
  getUserById,
} from "./users.services.js";

export const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post('/login',login);
userRouter.patch('/',updateUser);
userRouter.delete("/", deleteUser);
userRouter.get("/", getUserById);
