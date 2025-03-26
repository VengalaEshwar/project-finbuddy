import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    level: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficultyLevels: { type: [String], required: true },
    modules: { type: [mongoose.Types.ObjectId],ref: "Module", required: true },
});

const Course = mongoose.model("Course", CourseSchema);

export default Course;