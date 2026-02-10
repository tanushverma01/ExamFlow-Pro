import Exam from "../models/Exam.model.js";
import Question from "../models/Question.model.js";
import Result from "../models/Result.model.js";


export const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;
    const userId = req.user.id;

    if (!examId || !answers || answers.length === 0) {
      return res.status(400).json({ message: "Invalid submission" });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    let score = 0;

    for (const a of answers) {
      const question = await Question.findById(a.questionId);
      if (!question) continue;

      if (question.correctAnswer === a.answer) {
        score += question.marks;
      }
    }

    const result = await Result.create({
      student: userId,
      exam: examId,
      score,
    });

    res.json({
      score,
      resultId: result._id,
    });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: "Submission failed" });
  }
};
export const getPublishedExams = async (req, res) => {
  const exams = await Exam.find({ published: true });
  res.json(exams);
};

export const getExamQuestions = async (req, res) => {
  const { examId } = req.params;
  const questions = await Question.find({ exam: examId });
  res.json(questions);
};
export const getMyResults = async (req, res) => {
  const results = await Result.find({ student: req.user.id })
    .populate("exam");

  res.json(results);
};
