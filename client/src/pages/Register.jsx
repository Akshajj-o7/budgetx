import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully! Please login.");
    } catch (err) {
      alert("Registration failed");
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
          Register
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}