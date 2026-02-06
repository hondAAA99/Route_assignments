import mongoose, { Schema , model } from "mongoose"; 

const UserSchema = Schema(
  {
    userName: { 
      type: String,
      require: true,
      maxLength : 16,
      minLength : 5
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      minlength: 18,
      maxLength: 60,
    },
  },
  {
    strictQuery : true
  }
);

const userModel = mongoose.models.user ||  model('user',UserSchema);

export {userModel}