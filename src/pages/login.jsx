import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../config";
import { AuthContext } from "../context/AuthContext";
import ForgotPassword from "../components/Forgot";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${backendUrl}/api/user/login`, form);

      if (res.data.success) {
        login(res.data.user, res.data.token);
        navigate("/"); // home
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border p-10 rounded-lg">
        <h2 className="text-2xl font-light mb-8 text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-sm tracking-widest"
          >
            LOGIN
          </button>
        </form>

       {/* <span className="text-gray-500 mt-5 curser-pointer"  onClick={() => navigate("/forgot")}>Forgot password?</span>*/}

        <p className="text-xs text-gray-500 mt-6 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="underline cursor-pointer hover:text-black"
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
