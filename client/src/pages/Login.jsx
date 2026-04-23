import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20">

      {/* 🔥 BudgetX Logo */}
      <h1 className="text-5xl font-bold mb-10 leading-normal bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
  BudgetX
</h1>

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}