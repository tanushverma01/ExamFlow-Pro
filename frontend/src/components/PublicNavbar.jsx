import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PublicNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToDashboard = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else if (user?.role === "student") {
      navigate("/student");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-sm">
            EF
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">
              ExamFlow Pro
            </p>
            <p className="text-xs text-slate-500">
              Intelligent assessment platform
            </p>
          </div>
        </button>

        <nav className="hidden items-center gap-3 text-xs font-medium text-slate-600 sm:flex">
          {!user ? (
            <>
              <button
                type="button"
                onClick={() => navigate("/")}
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
                onClick={() => navigate("/login")}
                className="rounded-full px-3 py-1 text-slate-900 hover:bg-slate-100 transition"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={goToDashboard}
                className="rounded-full px-3 py-1 text-slate-900 hover:bg-slate-100 transition"
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 shadow-sm hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

