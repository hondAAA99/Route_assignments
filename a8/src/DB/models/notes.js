import mongoose, { Schema, model } from "mongoose";

const noteSchema = Schema(
  {
    title: {
      type: String,
      validator: {
        validate: (v) => {
          return (this.title = v.charAt(0).upperCase + v.splice(1).lowerCase);
        },
      },
    },
    content: {
      type: String,
    },
    title: {
      type: String,
      ref: "user",
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "user",
    },
  },
  {
    timeStamps: true,
    strictQuery: true,
  },
);

const notesModel = mongoose.models.notes || model("notes", noteSchema);

export { notesModel };
