import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-100">
            New · ExamFlow Pro
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Intelligent assessment platform
            <span className="block text-indigo-600">
              for MCQ and coding exams
            </span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            ExamFlow Pro helps educators and teams run reliable, scalable online
            assessments. Combine multiple‑choice and coding questions with
            real-time evaluation, clean dashboards, and secure access for
            students and admins.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/phases")}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm hover:border-indigo-200 hover:text-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition"
            >
              View roadmap
            </button>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-4 text-xs text-slate-600 sm:text-sm sm:gap-6">
            <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-100">
              <dt className="font-medium text-slate-900">
                Assessment types
              </dt>
              <dd className="mt-1">
                Multiple‑choice, timed sections, coding (planned).
              </dd>
            </div>
            <div className="rounded-xl bg-white/80 p-3 shadow-sm ring-1 ring-slate-100">
              <dt className="font-medium text-slate-900">
                Built for teams
              </dt>
              <dd className="mt-1">
                Admin + student dashboards with secure JWT auth.
              </dd>
            </div>
          </dl>
        </div>

        <div className="w-full max-w-md rounded-3xl bg-white/90 p-6 shadow-xl ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Why ExamFlow Pro?
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            A focused platform for academic institutions, coding bootcamps, and
            internal training teams that need controlled, high‑integrity exams.
          </p>

          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Secure login, role‑based access, and clear permission boundaries.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Clean dashboards for managing exams and viewing results.
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-500" />
              Roadmap for advanced coding engine, analytics, and automation.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

