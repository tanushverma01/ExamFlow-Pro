import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";
import {
  createExam,
  addQuestion,
  publishExam,
} from "../controllers/admin.controller.js";
import { getExamResults } from "../controllers/admin.controller.js";
import Exam from "../models/Exam.model.js";
import { addMultipleQuestions } from "../controllers/admin.controller.js";


const router = express.Router();
router.get(
  "/exams",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    const exams = await Exam.find().sort({ createdAt: -1 });
    res.json(exams);
  }
);

router.post("/exams", protect, allowRoles("admin"), createExam);
router.post("/exams/:examId/questions", protect, allowRoles("admin"), addQuestion);
router.post(
  "/exams/:examId/questions/bulk",
  protect,
  allowRoles("admin"),
  addMultipleQuestions
);
router.patch("/exams/:examId/publish", protect, allowRoles("admin"), publishExam);
router.get("/exams/:examId/results", protect, allowRoles("admin"), getExamResults);

export default router;
