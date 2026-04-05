import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import Logo from "./assets/logo.jpg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("viewer");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API}/auth/loginUser`,
                { email, password, role },
            );

            const { success, data, message } = res.data;

            if (!success) {
                alert(message);
                return;
            }

            const { token, role: userRole, email: userEmail } = data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", userRole);
            localStorage.setItem("email", userEmail);

            if (userRole === "Viewer") navigate("/viewer");
            else if (userRole === "Analyst") navigate("/analyst");
            else if (userRole === "Admin") navigate("/admin");
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1115] px-4">
            {/* Login Card */}
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(212,175,55,0.1)] w-full max-w-md border-t-4 border-[#D4AF37]">
                {/* Logo and Tagline */}
                <div className="text-center mb-8">
                    <img
                        src={Logo}
                        alt="Finance Logo"
                        className="w-20 h-20 mx-auto mb-4 object-contain"
                    />
                    <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Wealth<span className="text-[#D4AF37]">Flow</span>
                    </h2>
                    <p className="text-gray-500 text-sm mt-1 italic">
                        Precision analytics for modern finance.
                    </p>
                </div>

                <div className="space-y-4">
                    {/* Email */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase ml-1 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="name@finance.com"
                            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-400 uppercase ml-1 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] transition-all text-gray-800"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Role */}
                    {/* Role Selection */}
                    <div className="relative">
                        <label className="block text-xs font-semibold text-gray-400 uppercase ml-1 mb-1">
                            Access Level
                        </label>
                        <div className="relative">
                            <select
                                className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent transition-all text-gray-700 appearance-none cursor-pointer pr-10 font-medium"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option value="Viewer">
                                    Viewer
                                </option>
                                <option value="Analyst">
                                    Analyst
                                </option>
                                <option value="Admin">
                                    Admin
                                </option>
                            </select>

                            {/* Custom Chevron Icon */}
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-400">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-yellow-900/20 transform transition active:scale-[0.98] mt-4"
                    >
                        Sign In to Dashboard
                    </button>
                </div>
            </div>

            {/* Footer / Credits Section */}
            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm font-medium mb-4">
                    Made with ❤️ by{" "}
                    <span className="text-[#D4AF37] font-bold">
                        Harshad Hiremath
                    </span>
                </p>

                {/* Social Handles */}
                <div className="flex space-x-6 justify-center">
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                    >
                        <FaGithub size={22} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                    >
                        <FaLinkedin size={22} />
                    </a>
                    <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                    >
                        <FaTwitter size={22} />
                    </a>
                    <a
                        href="https://yourportfolio.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37] transition-colors"
                    >
                        <FaGlobe size={22} />
                    </a>
                </div>
            </div>
        </div>
    );
}
