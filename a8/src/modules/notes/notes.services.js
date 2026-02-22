import jwt from "jsonwebtoken";
import { response } from "../../common/response.js";
import {
  findId,
  insertOne,
  update,
  deleteNoteById,
  pagination,
  findOne,
  joinUserInfo,
  replace,
  updateMTitles,
  findByContent,
  aggregation,
  deleteAll,
} from "../../DB/DB.services.js";
import { notesModel } from "../../DB/models/notes.js";
import { model } from "mongoose";

function verify_token(req) {
  try {
    let authHeders = req.headers.authorization;
    console.log(req.headers);
    let token = authHeders.split(" ")[1];
    
    let payload = jwt.verify(token, "secret");

    return payload;
  } catch (error) {
    console.log(error);
  }
}

async function verfiy_user(userId, noteid) {
  const note = await findId(notesModel, noteid);
  if (note.userId.toString() == userId) {
    return note;
  }
  throw new Error("you are not authorized to access this note", { cause: 301 });
}

export const createNote = async (req, res, next) => {
  let payload = verify_token(req);

  let { title, content } = req.body;
  let result = await insertOne(notesModel, {
    title,
    content,
    userId: payload.data,
  });
  response(res, 201, result);
};

export const updateOne = async (req, res, next) => {
  let payload = verify_token(req);
  let { noteid } = req.params;
  let { title, content } = req.body;
  let userId = payload.data;
  verfiy_user(userId, noteid);

  let result = update(notesModel, noteid, { title, content }, { new: true });
  result.then((v) => {
    response(res, 200, v);
  });
};

export const replaceDoc = async (req, res, next) => {
  let payload = verify_token(req);
  let { noteid } = req.params;
  let { title, content, userId } = req.body[0];
  let uId = payload.data;
  verfiy_user(uId, noteid);
  let result = replace(notesModel, { id: noteid }, { title, content, userId });

  response(res, 201, result);
};

export const updateAllNote = async (req, res) => {
  let payload = verify_token(req);
  let { title } = req.body;

  let result = updateMTitles(
    notesModel,
    { userId: payload.data },
    { title },
    { new: true },
  );
  response(res, 201, result);
};

export const deleteNote = async (req, res, next) => {
  let payload = verify_token(req);

  let { noteId } = req.params;

  await verfiy_user(payload.data, noteId);

  let result = await deleteNoteById(notesModel, { id: noteId });

  response(res, 201, result);
};

export const pageinationNotes = async (req, res, next) => {
  let payload = verify_token(req);
  let userId = payload.data;
  let { limit, page } = req.query;
  let result = pagination(notesModel, { userId }, page, limit);
  result.then((v) => {
    response(res, 201, v);
  });
};

export const getById = async (req, res, next) => {
  let payload = verify_token(req);
  let userId = payload.data;
  let { noteId } = req.params;
  await verfiy_user(userId, noteId);
  let result = await findOne(notesModel, { _id: noteId });
  response(res, 201, result);
};

export const getBycontent = async (req, res, next) => {
  let payload = verify_token(req);
  let userId = payload.data;
  let { content } = req.query;
  let result = await findByContent(notesModel, { userId, content });
  response(res, 201, result);
};

export const allNotesWithUserdata = async (req, res, next) => {
  let payload = verify_token(req);
  let userId = payload.data;
  let result = await joinUserInfo(notesModel, { userId });
  response(res, 201, result);
};

export const aggregate = async (req, res, next) => {
  let payload = verify_token(req);
  let userId = payload.data;
  let { title } = req.query;
  let note = aggregation(notesModel, { title, userId });
  verfiy_user(userId, note._id);
  response(res, 201, note);
};

export const delAllNotes = async (req, res, next) => {
  let payload = verify_token(req);
  console.log(payload);
  
  let userId = payload.data;
  let result = deleteAll(notesModel,{userId});

  response(res,201,'deleted');
};
