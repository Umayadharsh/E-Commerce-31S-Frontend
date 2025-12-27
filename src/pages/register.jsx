import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/user/register`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );

      if (res.data.success) {
        navigate("/login"); // go to login after register
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border p-10 rounded-lg">
        <h2 className="text-2xl font-light mb-8 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="input w-full"
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-sm tracking-widest"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Already have an account?{" "}
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

export default Register;
