import React, { useEffect, useState } from "react";
import axios from "axios";

import Viewer from "./Viewer";
import Analyst from "./Analyst";
import Admin from "./Admin";
import Login from "./Login";

export default function AuthLoader() {
    const [status, setStatus] = useState("checking");
    const [role, setRole] = useState(null);

    useEffect(() => {
        const verify = async () => {
            const token = localStorage.getItem("token");

            // ❌ No token
            if (!token) {
                setStatus("invalid");
                return;
            }

            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API}/auth/verifyToken`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const { success, data } = res.data;

                if (success) {
                    // ✅ Store fresh data
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("role", data.role);
                    localStorage.setItem("email", data.email);

                    setRole(data.role);
                    setStatus("valid");
                } else {
                    throw new Error();
                }
            } catch {
                localStorage.clear();
                setStatus("invalid");
            }
        };

        verify();
    }, []);

    /* -------- LOADER -------- */
    if (status === "checking") {
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

    /* -------- VALID (NO REDIRECT) -------- */
    if (status === "valid") {
        if (role === "viewer") return <Viewer />;
        if (role === "analyst") return <Analyst />;
        if (role === "admin") return <Admin />;
    }

    /* -------- INVALID -------- */
    return <Login />;
}