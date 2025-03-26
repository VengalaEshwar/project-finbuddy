import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], 
        validate: [arrayLimit, "MCQ must have exactly 4 options"]
    },
    correctAnswer: {
        type: Number, // Stores index of the correct option
        required: true,
        validate: {
            validator: function(value) {
                return value >= 0 && value < this.options.length;
            },
            message: "correctAnswer index must be within options range"
        }
    },
    explanation : {
        type : String
    },
    questionType: {
        type: String,
        default: "quiz"
    },
    difficulty: { // Fixed typo
        type: String, 
        required: true
    }
});

// Custom validation to ensure exactly 4 options
function arrayLimit(val) {
    return val.length === 4;
}

const Questions = mongoose.model("Question", QuestionsSchema);
export default Questions;
