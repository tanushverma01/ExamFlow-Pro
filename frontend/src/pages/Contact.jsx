export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Contact
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          This is a simple contact interface for ExamFlow Pro. It does not send
          data yet, but illustrates how a future feedback or support channel
          could look within the product.
        </p>
      </div>

      <div className="rounded-2xl bg-white/90 p-6 shadow-sm ring-1 ring-slate-100">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 outline-none transition"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 outline-none transition"
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Message
            </label>
            <textarea
              className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 outline-none transition"
              rows={4}
              placeholder="Share feedback, ideas, or questions about ExamFlow Pro."
            />
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition"
          >
            Submit (UI only)
          </button>
        </form>
      </div>
    </div>
  );
}

