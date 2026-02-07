import { Router } from "express";

import {
  createNote,
  updateOne,
  deleteNote,
  pageinationNotes,
  getById,
  getByContent,
  allNotesWithUserdata,
  deleteAllNotes,
  aggregation,
} from "./notes.services.js";
const noteRouter = Router();

noteRouter.post("/", createNote);
noteRouter.patch("/:noteid", updateOne);
// noteRouter.put("/replace/:noteid", replaceDoc);
// noteRouter.patch("/all", updateAllTitles);
noteRouter.delete("/:noteid", deleteNote);
noteRouter.get("/pagination-sort", pageinationNotes);
noteRouter.get("/:noteId", getById);
noteRouter.get("/note-by-content", getByContent);
noteRouter.get("/note-with-user", allNotesWithUserdata);
// // noteRouter.get('/aggregate',aggregation)
noteRouter.delete('/notes',deleteAllNotes)

export { noteRouter };
