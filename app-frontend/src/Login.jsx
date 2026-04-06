import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from "react-icons/fa";
import Logo from "./assets/logo.jpg";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Viewer");

    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    const navigate = useNavigate();

    /* ---------------- TOKEN VERIFY ---------------- */
    useEffect(() => {
        const verifyToken = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setChecking(false);
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API}/auth/verifyToken`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );

                const { success, data } = res.data;

                if (success) {
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("email", data.email);
                    localStorage.setItem("user", data.name);
                } else {
                    throw new Error();
                }
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                localStorage.removeItem("email");
            } finally {
                setChecking(false);
            }
        };
        verifyToken();
    }, []);

    /* ---------------- LOGIN ---------------- */
    const handleLogin = async () => {
        try {
            setLoading(true);

            const res = await axios.post(
                `${import.meta.env.VITE_API}/auth/loginUser`,
                { email, password, role },
            );

            const { success, data, message } = res.data;

            if (!success) {
                alert(message);
                return;
            }

            const {
                token,
                role: userRole,
                email: userEmail,
                name: userName,
            } = data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", userRole);
            localStorage.setItem("email", userEmail);
            localStorage.setItem("user", userName);
            window.location.href = "/";
        } catch (err) {
            alert(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- LOADER ---------------- */
    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0f1115]">
                <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-white mt-4 text-sm">
                        Verifying session...
                    </p>
                </div>
            </div>
        );
    }

    /* ---------------- UI (UNCHANGED) ---------------- */
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1115] px-4">
            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(212,175,55,0.1)] w-full max-w-md border-t-4 border-[#D4AF37]">
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
                                <option value="Viewer">Viewer</option>
                                <option value="Analyst">Analyst</option>
                                <option value="Admin">Admin</option>
                            </select>

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
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition 
                        ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#D4AF37] hover:bg-[#B8962E] text-white"
                        }`}
                    >
                        {loading ? "Processing..." : "Sign In to Dashboard"}
                    </button>
                </div>
            </div>

            <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm font-medium mb-4">
                    Made with ❤️ by{" "}
                    <span className="text-[#D4AF37] font-bold">
                        Harshad Hiremath
                    </span>
                </p>

                <div className="flex space-x-6 justify-center">
                    <a
                        href="https://github.com/HarshadHiremath"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37]"
                    >
                        <FaGithub size={22} />
                    </a>

                    <a
                        href="https://linkedin.com/in/HarshadHiremath"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37]"
                    >
                        <FaLinkedin size={22} />
                    </a>

                    <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37]"
                    >
                        <FaTwitter size={22} />
                    </a>

                    <a
                        href="https://Harshadhiremath.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-[#D4AF37]"
                    >
                        <FaGlobe size={22} />
                    </a>
                </div>
            </div>
        </div>
    );
}
