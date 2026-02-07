import jwt from "jsonwebtoken";
import { response } from "../../common/response.js";
import {
  findById,
  insertOne,
  update,
  // replaceTitles,
  deleteNoteById,
  pagination,
  findOne,
  joinUserInfo,
  aggregation,
} from "../../DB/DB.services.js";
import { notesModel } from "../../DB/models/notes.js";
import { model } from "mongoose";

function verify_token(req) {
  try {
    let authHeders = req.headers["authorization"];
    let token = authHeders.split(" ")[1];
    let payload = jwt.verify(token, "secret");

    return payload;
  } catch (error) {
    console.log(error);
  }
}

async function verfiy_user(userId, noteid) {
  let note = findById(notesModel, noteid);

  return await note
    .then((v) => {
      if (userId.toString() != v.userId.toString())
        throw { message: "you are not authorized", cause: 401 };
    })
    .catch((err) => {
      throw { message: "note not found", cause: 402 };
    });
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

// export const replaceDoc = async (req, res, next) => {
//   let payload = verify_token(req);
//   let { noteid } = req.params;
//   let { title, content } = req.body;
//   let userId = payload.data;
//   verfiy_user(userId, noteid);
//   console.log('***************');

//   let result = replace(notesModel, {id : noteid}, {
//     id :
//   }, {new : true});

//   result.then((v) => {
//     response(res, 200, v);
//   });
// };

// export const updateAllTitles = async (req, res, next) => {

//   let payload = verify_token(req);
//   let userId = payload.data;
//   let { title } = req.body;
// };

export const deleteNote = async (req, res, next) => {
  let payload = verify_token(req);

  let { noteid } = req.params;

  verfiy_user(payload.data, noteid);

  let result = deleteNoteById(notesModel, { id: noteid });

  result.then((v) => {
    response(res, 201, v);
  });
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
  verfiy_user(userId, noteId);
  let result = findOne(notesModel, { noteId });
  result.then((v) => {
    response(res, 201, v);
  });
};

export const getByContent = async (req, res, next) => {
  let payload = verify_token(req);
  let userId = payload.data;
  let { content } = req.query;
  let result = findOne(notesModel, { content });
  result.then((v) => {
    response(res, 201, v);
  });
};

export const allNotesWithUserdata = async(req,res,next)=>{  
  let payload = verify_token(req);
  let userId = payload.data;
  let result = joinUserInfo(notesModel, 'users' , {userId});

  result.then((v)=>{
    response(res,201,v)
  })
}

export const aggregation = async(req,res,next)=>{
  let payload = verify_token(req);
  let userId = payload.data;
  let title = req.query;

  let result = aggregation(model,{userId})

  result.then((v)=>{
    response(res,201,v);
  })
}

export const deleteAllNotes = async(req,res,next)=>{
  let payload = verify_token(req);
  let userId = payload.data;

  let result = deleteAll(model,{userId});

  result.then((v)=>{
    response(res, 201, v);
  })
}