import jwt from "jsonwebtoken";
import { response } from "../../common/response.js";
import {
  deleteMany,
  deleteNById,
  getNbyContent,
  getNbyId,
  insertMany,
  insertOne,
  update,
  updateMany,
} from "../../DB/DB.services.js";
import { notesModel } from "../../DB/models/notes.js";

const createNote = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];

  let payload = jwt.verify(token, "secret");
  let { title, content } = req.body;

  insertOne(notesModel, { title, content, userId: payload.data });
  response(res, 201);
};

const updateNote = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  const { title , content } = req.body;
  response(res, 201, {
    data: update(
      notesModel,
      payload.data,
      {
        title,
        content,
      },
      {
        new: true,
      },
    ),
  });
};

const updateAll = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  deleteMany(notesModel);
  response(res, 201, { data: insertMany(notesModel, req, body) });
};

const updateAllTitles = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  updateMany(notesModel, payload.data, req.body);
};

const deleteNoteById = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  deleteNById(notesModel, payload.id);
};

const pageinationNotes = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  pagination(notesModel, req.body.limit, req.body.page);
};

const getNoteById = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  getNbyId(notesModel, req.boy.id);
};

const getByContent = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  getNbyContent(notesModel, req.params.content);
};

const getAllFiltered = async (req, res, next) => {
  let authHeders = req.headers["authorization"];
  let token = authHeders.split(" ")[1];
  let payload = jwt.verify(token, "secret");
  getNAllFiltered(notesModel, id);
};

export {
  createNote,
  updateNote,
  updateAll,
  updateAllTitles,
  deleteNoteById,
  pageinationNotes,
  getNoteById,
  getByContent,
  getAllFiltered,
};
