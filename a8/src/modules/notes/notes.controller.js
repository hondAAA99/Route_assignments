import { Router } from "express";

import {
  createNote,
  updateOne,
  replaceDoc,
  updateAllNote,
  deleteNote,
  pageinationNotes,
  getById,
  getBycontent,
  allNotesWithUserdata,
} from "./notes.services.js";
const noteRouter = Router();

noteRouter.post("/", createNote);
noteRouter.delete("/deleteAll", allNotesWithUserdata);
noteRouter.patch("/all", updateAllNote);
noteRouter.get("/pagination-sort", pageinationNotes);
noteRouter.put("/replace/:noteid", replaceDoc);
noteRouter.get("/note-by-content", getBycontent);
noteRouter.get("/note-with-user", allNotesWithUserdata);
noteRouter.post("/aggr", allNotesWithUserdata);
noteRouter.patch("/:noteid", updateOne);
noteRouter.delete("/:noteId", deleteNote);
noteRouter.get("/:noteId", getById);

export { noteRouter };
