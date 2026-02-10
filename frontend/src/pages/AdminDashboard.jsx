import { useState, useEffect } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [title, setTitle] = useState("");
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const fetchExams = async () => {
  const res = await api.get("/admin/exams");
  console.log("ADMIN EXAMS:", res.data);
  setExams(res.data);
};


  useEffect(() => {
    fetchExams();
  }, []);

  const createExam = async () => {
    if (!title) return;

    await api.post("/admin/exams", {
      title,
      duration: 30,
    });

    setTitle("");
    fetchExams();
  };

  const publishExam = async (id) => {
    await api.patch(`/admin/exams/${id}/publish`);
    alert("Exam published");
    fetchExams();
  };

  const viewResults = async (id) => {
    const res = await api.get(`/admin/exams/${id}/results`);
    alert(JSON.stringify(res.data, null, 2));
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Create, manage and publish exams for your students.
            </p>
          </div>
        </div>

        {/* Create Exam */}
        <div className="mb-8 rounded-2xl border border-dashed border-slate-200 bg-white/80 p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                New exam title
              </label>
              <input
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 outline-none transition"
                placeholder="e.g. JavaScript Fundamentals – Midterm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <button
              onClick={createExam}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed mt-1 sm:mt-6"
              disabled={!title}
            >
              Create exam
            </button>
          </div>
        </div>

        {/* Exams */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((e) => {
            const isPublished = e.isPublished || e.status === "published";

            return (
              <div
                key={e._id}
                className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {e.title}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Duration: {e.duration} mins
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      isPublished
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                        : "bg-amber-50 text-amber-700 border border-amber-100"
                    }`}
                  >
                    {isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={() =>
                      navigate(`/admin/exams/${e._id}/questions`)
                    }
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
                  >
                    Add questions
                  </button>

                  <button
                    onClick={() => publishExam(e._id)}
                    className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition"
                  >
                    Publish
                  </button>

                  <button
                    onClick={() => viewResults(e._id)}
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    View results
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
}
