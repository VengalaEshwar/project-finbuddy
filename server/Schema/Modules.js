import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
  topic: {
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
    required: true,
  },
  questions: [{ type: mongoose.Types.ObjectId, ref: "Question" }],
});

const Module = mongoose.model("Module", ModuleSchema);
export default Module;
