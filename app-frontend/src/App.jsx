import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";

// Role Pages
import Viewer from "./Viewer";
import Analyst from "./Analyst";
import Admin from "./Admin";

// 🔐 Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token → go login
  if (!token) {
    return <Navigate to="/" />;
  }

  // If role mismatch → block access
  if (allowedRole && role !== allowedRole) {
    return <h2>⛔ Access Denied</h2>;
  }

  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Viewer */}
        <Route
          path="/viewer"
          element={
            <ProtectedRoute allowedRole="Viewer">
              <Viewer />
            </ProtectedRoute>
          }
        />

        {/* Analyst */}
        <Route
          path="/analyst"
          element={
            <ProtectedRoute allowedRole="Analyst">
              <Analyst />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Default fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}