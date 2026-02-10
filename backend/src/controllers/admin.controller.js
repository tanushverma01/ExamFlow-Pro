import Exam from "../models/Exam.model.js";
import Question from "../models/Question.model.js";
import Result from "../models/Result.model.js";

export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create({
      ...req.body,
      createdBy: req.user.id,
    });

    res.status(201).json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addQuestion = async (req, res) => {
  try {
    const question = await Question.create({
      ...req.body,
      exam: req.params.examId,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addMultipleQuestions = async (req, res) => {
  const { examId, questions } = req.body;

  const formatted = questions.map((q) => ({
    ...q,
    exam: examId,
  }));

  await Question.insertMany(formatted);

  res.json({ message: "Questions added successfully" });
};

export const publishExam = async (req, res) => {
  try {
    const exam = await Exam.findByIdAndUpdate(
      req.params.examId,
      { published: true },
      { new: true }
    );

    res.json(exam);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getExamResults = async (req, res) => {
  const results = await Result.find({ exam: req.params.examId })
    .populate("student", "name email");

  res.json(results);
};
