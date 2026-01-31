import { Router } from "express";

import {
  createBookCollection,
  insertAuthorDoc,
  createBookIndex,
  createcappedCollection,
} from "./collection.services.js";

const collectionRoute = Router();

collectionRoute.post("/books", createBookCollection);
collectionRoute.post("/authors", insertAuthorDoc);
collectionRoute.post("/logs/capped", createcappedCollection);
collectionRoute.post("/index", createBookIndex);

export { collectionRoute };
