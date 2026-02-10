import { useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // DEBUG LOGS (IMPORTANT)
      console.log("LOGIN RESPONSE:", res.data);

      // FORCE SAVE TO LOCALSTORAGE
      localStorage.setItem("auth", JSON.stringify(res.data));

      console.log("AFTER SAVE:", localStorage.getItem("auth"));

      // UPDATE CONTEXT
      login(res.data);

      if (res.data.user.role === "admin") navigate("/admin");
      else navigate("/student");

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 flex flex-col">
      <PublicNavbar />
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              ExamFlow Pro
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Sign in to access your exams and results.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur shadow-xl border border-slate-100 rounded-2xl px-6 py-7 space-y-5"
          >
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 outline-none transition"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                className="block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/60 outline-none transition"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Login
            </button>

            <p className="text-center text-sm text-slate-600">
              New to ExamFlow Pro?{" "}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-700"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
