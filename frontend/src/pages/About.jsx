export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          About ExamFlow Pro
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          ExamFlow Pro is an academic and engineering‑focused assessment
          platform designed for universities, coding bootcamps, and teams who
          care about reliable evaluation. It brings together a clean user
          experience, clear dashboards, and a roadmap for deep technical
          features.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Project purpose
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            The goal of ExamFlow Pro is to make it simple to run secure,
            repeatable assessments that feel modern for students and powerful
            for administrators. From small quizzes to full exams, the platform
            is built to handle time‑boxed MCQs today and richer coding
            workflows tomorrow.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            The design focuses on clarity, low cognitive load, and fast access
            to the information exam owners care about: who took an exam, how
            they performed, and what needs attention.
          </p>
        </section>

        <section className="rounded-2xl bg-white/90 p-5 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-sm font-semibold text-slate-900">
            Technology stack
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <span className="font-medium text-slate-900">React</span> for a
              responsive, component‑driven frontend.
            </li>
            <li>
              <span className="font-medium text-slate-900">Node.js</span> and{" "}
              <span className="font-medium text-slate-900">Express</span> for
              the backend API layer.
            </li>
            <li>
              <span className="font-medium text-slate-900">MongoDB</span> for
              flexible, document‑based storage of exams, questions, and results.
            </li>
            <li>
              <span className="font-medium text-slate-900">JWT</span> (JSON Web
              Tokens) for secure, stateless authentication and role‑based
              access.
            </li>
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-2xl bg-indigo-50/80 p-5 ring-1 ring-indigo-100">
        <h2 className="text-sm font-semibold text-slate-900">
          Academic and engineering principles
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          ExamFlow Pro is intentionally opinionated: it aims to encourage good
          assessment practices such as clear question design, reliable grading,
          and separation between roles. Under the hood, the architecture is
          structured to grow towards a more advanced engine for coding
          challenges, testcases, and analytics without sacrificing clarity in
          the current experience.
        </p>
      </section>
    </div>
  );
}

