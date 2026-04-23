import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: ""
  });

  const fetchData = async () => {
    const res = await API.get("/transactions");
    setTransactions(res.data);
  };

  const addTransaction = async () => {
  if (!form.amount || !form.category) {
    alert("Please fill all fields");
    return;
  }

  await API.post("/transactions", form);
  setForm({ type: "expense", amount: "", category: "" });
  fetchData();
};

  useEffect(() => {
    fetchData();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expense;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        {/*  BudgetX Branding (LEFT) */}
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
          BudgetX
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Balance</h3>
          <p className="text-2xl font-bold">₹{balance}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h3 className="text-green-700">Income</h3>
          <p className="text-xl font-semibold">₹{income}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h3 className="text-red-700">Expense</h3>
          <p className="text-xl font-semibold">₹{expense}</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="mb-3 font-semibold">Add Transaction</h3>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: Number(e.target.value) })
            }
          />

          <input
            className="border p-2 rounded w-full"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          />

          <select
            className="border p-2 rounded"
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={addTransaction}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="mb-3 font-semibold">Transactions</h3>

        <ul>
  {transactions.length === 0 ? (
    <p className="text-gray-500">No transactions yet</p>
  ) : (
    transactions.map((t) => (
      <li
        key={t._id}
        className="flex justify-between border-b py-2"
      >
        <span>{t.category}</span>

        {/*  Date added here */}
        <span className="text-gray-500">
          {new Date(t.date).toLocaleDateString()}
        </span>

        <span
          className={
            t.type === "income"
              ? "text-green-600"
              : "text-red-600"
          }
        >
          ₹{t.amount}
        </span>
      </li>
    ))
  )}
</ul>
      </div>
    </div>
  );
}