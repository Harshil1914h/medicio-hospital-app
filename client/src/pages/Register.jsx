import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../config";

export default function Register() {
  const navigate = useNavigate();

  // Role default 'patient' rakhyo che
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient"
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      // Backend API call for registration
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration API Error:", err);
      setError("Check The Backend Server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        {/* Success Message */}
        {message && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-center text-sm font-semibold">{message}</div>}

        {/* Error Message */}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm font-semibold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-cyan-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-cyan-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-cyan-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl transition-all ${isLoading ? "opacity-70" : ""}`}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="font-bold text-cyan-600 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
}