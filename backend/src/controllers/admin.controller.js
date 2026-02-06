import Exam from "../models/Exam.model.js";
import Question from "../models/Question.model.js";

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
