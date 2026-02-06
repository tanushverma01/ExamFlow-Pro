import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getPublishedExams, getExamQuestions } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/exams", protect, getPublishedExams);
router.get("/exams/:examId/questions", protect, getExamQuestions);

export default router;
