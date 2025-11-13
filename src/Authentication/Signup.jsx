import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return alert("Please fill in all fields.");
    }

    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-center py-6">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <section>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </section>
          <section>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="username"
            />
          </section>
          <section>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </section>

          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 rounded-md transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-800 mt-4">
          Already have an account?{" "}
          <button className="text-blue-800 underline">Login</button>
        </p>
      </section>
    </section>
  );
};

export default Signup;
