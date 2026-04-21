import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import MainLayout from "../layouts/MainLayout";

export default function ExamAttempt() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
  const fetchData = async () => {
    const resQ = await api.get(`/student/exams/${id}/questions`);
    setQuestions(resQ.data);

    const resExam = await api.get(`/student/exams`);
    const exam = resExam.data.find((e) => e._id === id);

    if (exam) {
      setTimeLeft(exam.duration * 60); // seconds
    }
  };

  fetchData();
}, [id]);
useEffect(() => {
  if (timeLeft === null) return;

  if (timeLeft <= 0) {
    submitExam();
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [timeLeft]);
const formatTime = (t) => {
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};

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
              <div className="flex justify-between items-center mb-6">
  <h1 className="text-2xl font-bold">Exam</h1>

  {timeLeft !== null && (
    <div className="bg-red-100 text-red-600 px-4 py-2 rounded font-semibold">
      Time Left: {formatTime(timeLeft)}
    </div>
  )}
</div>
              <p className="mt-1 text-xs text-slate-600">
                Read each question carefully and choose the best answer.
              </p>
            </div>
{questions.map((q, index) => (
  <div key={q._id} className="mb-6 bg-white p-4 rounded shadow">
    
    {q.type === "mcq" && (
      <>
        <p>{index + 1}. {q.text}</p>

        {q.options.map((opt, idx) => (
          <label key={idx}>
            <input
              type="radio"
              name={q._id}
              onChange={() => selectAnswer(q._id, idx)}
            />
            {opt}
          </label>
        ))}
      </>
    )}

    {q.type === "coding" && (
      <>
        <h2 className="font-bold">{q.title}</h2>
        <p className="text-sm text-gray-600">{q.description}</p>

        <textarea
          placeholder="Write your code here..."
          className="border p-2 w-full mt-3 h-32"
          onChange={(e) =>
            selectAnswer(q._id, e.target.value)
          }
        />
      </>
    )}

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
