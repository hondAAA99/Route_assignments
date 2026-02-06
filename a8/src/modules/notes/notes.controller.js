import { Router } from "express";

import {
  createNote,
  updateNote,
  updateAll,
  updateAllTitles,
  deleteNoteById,
  pageinationNotes,
  getNoteById,
  getByContent,
  getAllFiltered,
} from "./notes.services.js";
const noteRouter = Router();

noteRouter.post("/", createNote);
noteRouter.patch('/:noteid',updateNote)
noteRouter.put('/replace/:noteid',updateAll)
noteRouter.patch('/all',updateAllTitles)
noteRouter.delete('/noteid',deleteNoteById)
noteRouter.get('/pagination-sort',pageinationNotes)
noteRouter.get('/id',getNoteById)
noteRouter.get("/note-by-content", getByContent);
noteRouter.get("/note-with-user", getAllFiltered);
// noteRouter.get('/aggregate')
// noteRouter.delete('/notes')

export {noteRouter}