import { model } from "mongoose";

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

export const findById = async (model, id) => {
  return await model.findById(id);
};

export const updateMany = async (
  model,
  filter = {},
  update = {},
  options = {},
) => {
  return await model.Update(filter, update, options);
};

// export const replace = async (
//   model,
//   filter = {},
//   update = {},
//   options = {},
// ) => {
//   return await model.replaceOne(filter, update, options).then((v) => {
//     console.log(v);
//   });
// };

// export const replaceTitles = async (model,filter,data,options)=>{
//     // return await model.updateMany(filter,data,options);
// }

export const deleteNoteById = async (model, filter) => {
  return await model.deleteOne(filter);
};

export const pagination = async (model, filter, page, limit, options) => {
  return await model.find(filter, options).skip(page).limit(limit);
};

export const joinUserInfo = async (model, model2, filter) => {
  return await model.find(filter).populate(model2);
};

export const deleteAll = async (model, filter) => {
  return await model.deleteMany(filter);
};

export const aggregation = async (model, filter) => {
  return await model.aggregate([
    {
      $match: {
        filter,
      }
    },
  ]);
};
