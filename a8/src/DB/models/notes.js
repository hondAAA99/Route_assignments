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
    userId: {
      type: Schema.Types.ObjectId, 
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strictPopulate :false ,
  },
);

const notesModel = mongoose.models.notes || model("notes", noteSchema);

export { notesModel };
