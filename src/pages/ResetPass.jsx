import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/reset-password/${token}`,
        { newPassword: password }
      );

      if (res.data.success) {
        alert("Password reset successful. Please login.");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Reset link expired or invalid");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl p-6 sm:p-10 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-light mb-6 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-3 text-sm rounded-md outline-none focus:ring-1 focus:ring-black"
            required
          />

          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border px-4 py-3 text-sm rounded-md outline-none focus:ring-1 focus:ring-black"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-sm tracking-widest rounded-md hover:bg-gray-900 transition"
          >
            RESET PASSWORD
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
