import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

export default function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/student/exams").then((res) => setExams(res.data));
  }, []);

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Welcome to your exams
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Browse available exams and start whenever you’re ready.
            </p>
          </div>

          <button
            onClick={() => navigate("/student/results")}
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition"
          >
            My Results
          </button>
        </div>

        {exams.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 text-center">
            <div className="mx-auto mb-3 h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-xl">
              🎓
            </div>
            <h2 className="text-base font-semibold text-slate-900">
              No exams available right now
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Check back later or contact your administrator for upcoming exams.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exams.map((e) => (
              <div
                key={e._id}
                onClick={() => navigate(`/student/exam/${e._id}`)}
                className="group relative cursor-pointer rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-slate-900 group-hover:text-indigo-700">
                      {e.title}
                    </h2>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-indigo-600">
                      {e.duration} min exam
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  Be sure to have a stable connection before starting this exam.
                </p>

                <button className="mt-5 inline-flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-700">
                  Start Exam
                  <span className="ml-1 transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
