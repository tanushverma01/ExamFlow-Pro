import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import ExamAttempt from "./pages/ExamAttempt";
import MyResults from "./pages/MyResults";
import Register from "./pages/Register";
import AddQuestions from "./pages/AddQuestions";
import Home from "./pages/Home";
import About from "./pages/About";
import Phases from "./pages/Phases";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/phases" element={<Phases />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/exams/:id/questions"
          element={
            <ProtectedRoute role="admin">
              <AddQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/exam/:id"
          element={
            <ProtectedRoute role="student">
              <ExamAttempt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/results"
          element={
            <ProtectedRoute role="student">
              <MyResults />
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
