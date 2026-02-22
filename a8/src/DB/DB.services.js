import mongoose, { model } from "mongoose";

export const insertOne = async (model, data = {}, options = {}) => {
  const newUser = await new model(data);
  await newUser.save();
};

export const findOne = async (model, data = {}, options = {}) => {
  return await model.findOne(data, options);
};

export const update = async (model, id, update = {}, options = {}) => {
  return await model.findByIdAndUpdate(id, update, options);
};

export const userDelete = async (model, id) => {
  return await model.findByIdAndDelete(id);
};

export const findId = async (model, id) => {
  let note = await model.findById(id);
  return note;
};

export const updateMTitles = async (
  model,
  filter = {},
  update = {},
  options = {},
) => {
  return await model.updateMany(filter, update, options);
};

export const replace = async (model, filter = {}, update = {}) => {
  return await model.replaceOne(filter, update);
};

export const replaceTitles = async (model, filter, data, options) => {
  // return await model.updateMany(filter,data,options);
};

export const deleteNoteById = async (model, filter) => {
  return await model.deleteOne(filter);
};

export const pagination = async (model, filter, page, limit, options) => {
  return await model.find(filter, options).skip(page).limit(limit);
};

export const joinUserInfo = async (model, filter) => {
  return await model.find(filter).populate("userId", "userName email");
};

export const deleteAll = async (model, filter) => {
  return await model.deleteMany(filter);
};

export const aggregation = async (model, filter) => {
  return await model
    .aggregate([
      {
        $match: { userId, title },
      },
    ])
    .populate("userId", "userName email");
};

export const findByContent = async (model, filter, options) => {
  return await model.find(filter, options);
};
