import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

// -------- LOGIN PAGE --------
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
        role,
      });

      const { token, user } = res.data;

      // Store in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("name", user.name);

      // Redirect based on role
      if (user.role === "Viewer") navigate("/viewer");
      else if (user.role === "Analyst") navigate("/analyst");
      else if (user.role === "Admin") navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/><br/>

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="Viewer">Viewer</option>
        <option value="Analyst">Analyst</option>
        <option value="Admin">Admin</option>
      </select><br/><br/>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}