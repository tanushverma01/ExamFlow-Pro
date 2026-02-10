import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "student") {
      navigate("/student");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-50">
      <header className="sticky top-0 z-20 border-b border-slate-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div
            onClick={goToDashboard}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
              EF
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                ExamFlow Pro
              </p>
              <p className="text-xs text-slate-500">
                Smart online exam platform
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-4 text-xs font-medium text-slate-600 sm:flex">
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => navigate("/about")}
              className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => navigate("/phases")}
              className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              Phases
            </button>
            <button
              type="button"
              onClick={() => navigate("/contact")}
              className="rounded-full px-3 py-1 hover:bg-slate-100 hover:text-slate-900 transition"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={goToDashboard}
              className="rounded-full px-3 py-1 text-slate-900 hover:bg-slate-100 transition"
            >
              Dashboard
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {user && (
              <div className="hidden sm:flex flex-col items-end mr-1">
                <span className="text-sm font-medium text-slate-900">
                  {user.name || "User"}
                </span>
                <span className="text-xs uppercase tracking-wide text-slate-500">
                  {user.role}
                </span>
              </div>
            )}
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}
