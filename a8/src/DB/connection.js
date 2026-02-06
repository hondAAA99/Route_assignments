import mongoose from "mongoose";

export async function connect(){
    return await mongoose.connect('mongodb://localhost:27017/a8',{
        serverSelectionTimeoutMS : 5000,
    })
}

connect()
.then(()=>{
    console.log('connected to database succesfully');
})
.catch((err) => {
  console.log(err);
});