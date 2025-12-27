import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      `${backendUrl}/api/user/forgot-password`,
      { email }
    );

    if (res.data.success) {
      setMessage("Password reset link sent. Check your email.");
      setEmail("");
    } else {
      setMessage(res.data.message || "User not found");
    }
  } catch (error) {
    setMessage("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border p-10 rounded-lg">
        <h2 className="text-2xl font-light mb-6 text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 mb-8 text-center">
          Enter your email address and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 text-sm tracking-widest disabled:opacity-50"
          >
            {loading ? "SENDING..." : "SEND RESET LINK"}
          </button>
        </form>

        {message && (
          <p className="text-xs text-center mt-4 text-gray-600">
            {message}
          </p>
        )}

        <p className="text-xs text-gray-500 mt-6 text-center">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer hover:text-black"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
