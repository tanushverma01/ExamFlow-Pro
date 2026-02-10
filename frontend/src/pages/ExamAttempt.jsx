import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function ExamAttempt() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get(`/student/exams/${id}/questions`).then((res) => {
      setQuestions(res.data);
    });
  }, [id]);

  const selectAnswer = (qid, selected) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.question === qid);
      if (existing) {
        return prev.map((a) =>
          a.question === qid ? { ...a, selected } : a
        );
      }
      return [...prev, { question: qid, selected }];
    });
  };

  const submitExam = async () => {
  const formatted = answers.map((a) => ({
    questionId: a.question,
    answer: a.selected,
  }));

  const res = await api.post("/student/submit", {
    examId: id,
    answers: formatted,
  });

  setResult(res.data);
};


  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        {/* RESULT VIEW */}
        {result ? (
          <div className="mt-4 rounded-2xl border border-emerald-100 bg-emerald-50/80 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold text-emerald-900">
              Exam submitted
            </h1>
            <p className="mt-2 text-sm text-emerald-800">
              Great work! Here is your score:
            </p>
            <div className="mt-4 inline-flex items-baseline gap-2 rounded-xl bg-white px-4 py-3 shadow-sm">
              <span className="text-3xl font-semibold text-emerald-600">
                {result.score}
              </span>
              <span className="text-sm text-slate-600">points</span>
            </div>
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-slate-100 bg-slate-50/70 px-4 py-3 backdrop-blur">
              <h1 className="text-xl font-semibold text-slate-900">
                Exam
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                Read each question carefully and choose the best answer.
              </p>
            </div>

            {questions.map((q, index) => (
              <div
                key={q._id}
                className="mb-5 rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-600">
                    {index + 1}
                  </div>
                  <p className="font-medium text-slate-900">
                    {q.text}
                  </p>
                </div>

                <div className="mt-4 space-y-2">
                  {q.options.map((opt, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 text-sm text-slate-700 hover:border-indigo-100 hover:bg-indigo-50/60 cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        name={q._id}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                        onChange={() => selectAnswer(q._id, idx)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="sticky bottom-0 -mx-4 border-t border-slate-100 bg-white/80 px-4 py-3 backdrop-blur">
              <div className="flex justify-end">
                <button
                  onClick={submitExam}
                  disabled={answers.length === 0}
                  className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit exam
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
