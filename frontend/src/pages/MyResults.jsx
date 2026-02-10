import { useEffect, useState } from "react";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/student/results").then((res) => setResults(res.data));
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            My Results
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Review your performance across completed exams.
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white/70 p-8 text-center">
            <h2 className="text-base font-semibold text-slate-900">
              No results yet
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Complete an exam to see your scores and history here.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/80 shadow-sm">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50/80">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Exam
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {results.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50/70">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">
                      {r.exam?.title || "Untitled exam"}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        {r.score}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
