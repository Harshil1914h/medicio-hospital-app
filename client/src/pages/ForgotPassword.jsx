import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Password reset link has been sent to ${email}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-center mb-2">Reset Password</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Enter your email and we'll send you a link to reset your password.</p>
        
        {message && <div className="bg-green-50 text-green-600 p-3 rounded-lg mb-4 text-center text-sm">{message}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
            <input type="email" required onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-gray-100 rounded-xl px-4 py-2 focus:border-cyan-500 outline-none" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all">Send Reset Link</button>
        </form>
        
        <p className="text-center text-sm text-gray-500 mt-6">
          Back to <Link to="/login" className="font-bold text-cyan-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}