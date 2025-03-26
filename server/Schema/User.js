import { compare } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  notification:{
    type:Boolean,
    default:true
  },
  modules: {
    beginner: {
      modules: [{ type: mongoose.Types.ObjectId, ref: "Module" }],
      isLocked: { type: Boolean, default: false }, // Beginner is unlocked by default
      currentQuestion: { type: Number, default: 0 },
      isCompleted: { type: Boolean, default: false },
    },
    intermediate: {
      modules: [{ type: mongoose.Types.ObjectId, ref: "Module" }],
      isLocked: { type: Boolean, default: true }, // Locked initially
      currentQuestion: { type: Number, default: 0 },
      isCompleted: { type: Boolean, default: false },
    },
    advanced: {
      modules: [{ type: mongoose.Types.ObjectId, ref: "Module" }],
      isLocked: { type: Boolean, default: true }, // Locked initially
      currentQuestion: { type: Number, default: 0 },
      isCompleted: { type: Boolean, default: false },
    },
  },
  currentModule: {
    type: Number,
    default: 0,
  },
  isNewUser :{
    type : Boolean,
    default : true
  }
});

const User = mongoose.model("User", userSchema, "Users");

export default User;
