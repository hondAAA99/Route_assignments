import {
  aggr1,
  aggr2,
  aggr3,
  aggr4,
  insertManyDoc,
  insertOneDoc,
  updateFuture,
  deleteBeforeYear,
  checkNorGeneres,
  checkYear,
  findGenre,
  findInDuration,
  findScippedLimittedSorted,
  findWithTitle,
} from "./books.services.js";

import { Router } from "express";

const bookRouter = Router();

bookRouter.post("/", insertOneDoc);

bookRouter.post("/batch", insertManyDoc);

bookRouter.patch("/Future", updateFuture);

bookRouter.get("/title", findWithTitle);

bookRouter.get("/year", findInDuration);

bookRouter.get("/genre", findGenre);

bookRouter.get("/skip-limit", findScippedLimittedSorted);

bookRouter.get("/year-integer", checkYear);

bookRouter.get("/exclude-genres", checkNorGeneres);

bookRouter.get("/before-year", deleteBeforeYear);

bookRouter.get("/aggregate1", aggr1);

bookRouter.get("/aggregate2", aggr2);

bookRouter.get("/aggregate3", aggr3);

bookRouter.get("/aggregate4", aggr4);

export { bookRouter };
