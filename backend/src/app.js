import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import studentRoutes from "./routes/student.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ExamFlow Pro backend running" });
});
app.use("/api/student",studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth",authRoutes);

export default app;
