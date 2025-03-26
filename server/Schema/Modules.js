import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: { // Fixed typo
    type: String,
  },
  imageUrl: {
    type: String,
    // required: true,
  },
  course : {
    type : mongoose.Types.ObjectId,
    ref : "Course"
  },
  questions: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
});

const Module = mongoose.model("Module", ModuleSchema);
export default Module;
