import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [loginType, setLoginType] = useState("patient");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ 
        email: formData.email, 
        password: formData.password, 
        role: loginType 
      });

      if (result && result.success) {
        if (result.role === "admin") {
          navigate("/schedule");
        } else {
          navigate("/");
        }
      } else {
        setError(result.error || "Invalid email, password, or role.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in-up">
        
        <div className="text-center pt-10 pb-6 px-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            MEDICIO<span className="text-cyan-600">.</span>
          </h1>
          <p className="text-gray-500 text-sm">Welcome back! Please login to your account.</p>
        </div>

        <div className="px-8 mb-8">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setLoginType("patient"); setError(""); setFormData({email:"", password:""})}}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                loginType === "patient" ? "bg-white text-cyan-600 shadow-sm border border-gray-200" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Patient Login
            </button>
            <button
              type="button"
              onClick={() => { setLoginType("admin"); setError(""); setFormData({email:"", password:""})}}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                loginType === "admin" ? "bg-cyan-600 text-white shadow-md shadow-cyan-500/30" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Admin Login
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-6">
          
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              {loginType === "admin" ? "Admin Email" : "Email Address"}
            </label>
            <input 
              type="email" 
              name="email"
              required 
              value={formData.email}
              onChange={handleInputChange}
              placeholder={loginType === "admin" ? "admin@medicio.com" : "you@example.com"}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all bg-gray-50 focus:bg-white" 
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700">Password</label>
              <Link to="/forgot-password" className="text-xs font-semibold text-cyan-600 hover:text-cyan-700">Forgot password?</Link>
            </div>
            <input 
              type="password" 
              name="password"
              required 
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10 transition-all bg-gray-50 focus:bg-white" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg flex justify-center items-center gap-2 ${
              loginType === "admin" ? "bg-cyan-600 hover:bg-cyan-700 text-white shadow-cyan-500/30" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/30"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Signing in..." : `Sign in as ${loginType === 'admin' ? 'Admin' : 'Patient'}`}
          </button>
          
          <div className="text-center mt-6">
            {loginType === "patient" ? (
              <p className="text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="font-bold text-cyan-600 hover:underline">Register here</Link>
              </p>
            ) : (
              <p className="text-xs text-gray-400 mt-4">
                Authorized Administrative Portal Only
              </p>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}