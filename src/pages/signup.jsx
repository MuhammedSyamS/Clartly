import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess(data.message);
      setTimeout(() => navigate("/login"), 1200); // redirect to login
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!error && !success) return;
    const timer = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, success]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 sm:p-12 lg:p-16">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-2 animate-fadeIn">
          Create Your Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join Cartly and start shopping instantly
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-center mb-4 animate-shake">
            {error}
          </p>
        )}
        {success && (
          <p className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-center mb-4 animate-fadeIn">
            {success}
          </p>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 active:scale-95 transition transform disabled:opacity-60"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease forwards; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.4s ease; }
      `}</style>
    </div>
  );
}
