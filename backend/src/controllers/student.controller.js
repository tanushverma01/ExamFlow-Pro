import Exam from "../models/Exam.model.js";
import Question from "../models/Question.model.js";
import Result from "../models/Result.model.js";

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

export const submitExam = async (req, res) => {
  try {
    const { examId, answers } = req.body;

    const existing = await Result.findOne({
      student: req.user.id,
      exam: examId,
    });

    if (existing) {
      return res.status(400).json({ message: "Exam already attempted" });
    }

    const questions = await Question.find({ exam: examId });

    let score = 0;

    const evaluatedAnswers = answers.map((a) => {
      const q = questions.find(
        (x) => x._id.toString() === a.question
      );

      if (q && q.correctAnswer === a.selected) {
        score += q.marks;
      }

      return a;
    });

    const result = await Result.create({
      student: req.user.id,
      exam: examId,
      answers: evaluatedAnswers,
      score,
    });

    res.json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMyResults = async (req, res) => {
  const results = await Result.find({ student: req.user.id }).populate("exam");
  res.json(results);
};
