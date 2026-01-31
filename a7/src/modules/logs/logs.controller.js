import { Router } from "express";
import { insertNewLog } from "./logs.services.js";

const logRouter = Router();

logRouter.post("/", insertNewLog);

export { logRouter };
