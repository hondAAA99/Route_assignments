import { model } from "mongoose";

export const insertOne = async (model ,data = {} , options = {} )=>{
    return await model.create(data,options);
}

export const findOne = async(model ,data = {} ,options = {} )=>{
    return await model.findOne(data,options)
}

export const update = async(model,id,update={},options={})=>{
    return await model.findByIdAndUpdate(id,update, options);
}

export const userDelete = async(model,id)=>{
    return await model.findByIdAndDelete(id);
}

export const findById = async(model,id)=>{
    return await model.findById(id);
}

export const deleteMany = async(model)=>{
    return await model.deleteMany({});
}

export const insertMany = async(model,filter,body)=>{
    return await model.insertMany(filter,body);
}

export const updateMany = async (model,filter = {},body = {},options = {})=>{
    return await model.updateMany(filter,body,options)
}

export const deleteNById = async (model,id)=>{
    return await model.deleteById(id);
}

export const pageination = async (model,limit,page)=>{
    return await model.find({},{ skip : page, limit }).sort('-createdAt')
}

export const getNbyId = async(model,id)=>{
    return await model.findById(id)
}

export const getNbyContent = async(model,content)=>{
    return await model.find({
        content
    })
}

export const getNAllFiltered = async(model,id)=>{
    return await model.findById(id).select('title _id createdAt').populate('user')
}

// export const aggr1 = async (model)=>{
//     return await model.aggregate([
//         {},
//         {},
//     ]);
// }

export const findOneAndUpdate = async(model,filter,update,options)=>{
    return await model.findOneAndUpdate(filter,update,options);
}
