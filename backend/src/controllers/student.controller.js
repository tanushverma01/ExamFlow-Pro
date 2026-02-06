import Exam from "../models/Exam.model.js";
import Question from "../models/Question.model.js";

export const getPublishedExams = async (req, res) => {
  const exams = await Exam.find({ published: true });
  res.json(exams);
};

export const getExamQuestions = async (req, res) => {
  const questions = await Question.find({ exam: req.params.examId }).select(
    "-correctAnswer"
  );

  res.json(questions);
};
