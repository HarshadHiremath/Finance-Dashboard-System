import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/loginUser",
        { email, password, role }
      );

      const { success, data, message } = res.data;

      if (!success) {
        alert(message);
        return;
      }

      // Extract data
      const { token, role: userRole, email: userEmail } = data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", userRole);
      localStorage.setItem("email", userEmail);

      // Redirect based on role (lowercase safe)
      if (userRole === "viewer") navigate("/viewer");
      else if (userRole === "analyst") navigate("/analyst");
      else if (userRole === "admin") navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      
      <div className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-96">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-green-400">
          Finance Dashboard Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Role */}
        <select
          className="w-full p-3 mb-6 rounded-lg bg-gray-700 border border-gray-600"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="viewer">Viewer</option>
          <option value="analyst">Analyst</option>
          <option value="admin">Admin</option>
        </select>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 hover:bg-green-600 transition duration-300 p-3 rounded-lg font-semibold"
        >
          Login
        </button>
      </div>
    </div>
  );
}