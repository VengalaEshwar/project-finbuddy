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
  }
});

const User = mongoose.model("User", userSchema, "Users");

export default User;
