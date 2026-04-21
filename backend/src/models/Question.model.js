import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },

  type: {
    type: String,
    enum: ["mcq", "coding"],
    default: "mcq",
  },

  // MCQ fields
  text: String,
  options: [String],
  correctAnswer: Number,

  // Coding fields
  title: String,
  description: String,
  testCases: [
    {
      input: String,
      output: String,
    },
  ],

  marks: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model("Question", questionSchema);