export default function Phases() {
  const phases = [
    {
      title: "Phase 1 – Core Assessment",
      subtitle: "MCQ, authentication, dashboards",
      description:
        "Foundational features for running secure multiple‑choice exams with clear student and admin experiences.",
      bullets: [
        "Role‑based login with JWT‑backed authentication.",
        "Student dashboard with available exams and results.",
        "Admin dashboard to create exams and manage questions.",
        "Result storage and basic performance views.",
      ],
      tone: "current",
    },
    {
      title: "Phase 2 – Advanced Engine",
      subtitle: "Coding, Monaco editor, testcases",
      description:
        "Extend ExamFlow Pro beyond MCQs into real coding challenges with automated evaluation.",
      bullets: [
        "Integrated Monaco‑style code editor for programming questions.",
        "Language‑specific templates and starter code.",
        "Testcase definitions for automatic code evaluation.",
        "Richer feedback loop for students and reviewers.",
      ],
      tone: "upcoming",
    },
    {
      title: "Phase 3 – Enterprise Platform",
      subtitle: "Docker, Redis, analytics",
      description:
        "Harden the platform for large‑scale, enterprise‑grade deployments and advanced insight.",
      bullets: [
        "Containerized workload execution using Docker.",
        "Redis‑backed caching and queueing for performance.",
        "Advanced analytics for cohorts, topics, and trends.",
        "Operational tooling for observability and reliability.",
      ],
      tone: "future",
    },
  ];

  const toneClasses = {
    current: "border-emerald-100 bg-emerald-50/80",
    upcoming: "border-indigo-100 bg-indigo-50/80",
    future: "border-slate-100 bg-slate-50/80",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Roadmap & phases
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          ExamFlow Pro is being developed in clear phases so that each layer of
          functionality is stable, testable, and maintainable before the next
          step. Below is an overview of how the platform is evolving.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {phases.map((phase) => (
          <section
            key={phase.title}
            className={`flex flex-col rounded-2xl p-5 shadow-sm ring-1 ${
              toneClasses[phase.tone]
            }`}
          >
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              {phase.tone === "current"
                ? "In progress"
                : phase.tone === "upcoming"
                ? "Planned"
                : "Future vision"}
            </div>
            <h2 className="text-sm font-semibold text-slate-900">
              {phase.title}
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-600">
              {phase.subtitle}
            </p>
            <p className="mt-3 text-sm text-slate-700">{phase.description}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {phase.bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

