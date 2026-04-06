import React, { useState } from "react";
import {
    FaBars,
    FaUsers,
    FaDatabase,
    FaChartBar,
    FaSignOutAlt,
    FaTimes,
    FaTachometerAlt 
} from "react-icons/fa";

import AnalystFinancialData from "./Analyst-Finance";
import AdminDashboard from "./Admin-Dashboard";


export default function Analyst() {
    const [active, setActive] = useState("dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const email = localStorage.getItem("email") || "admin@wealthflow.com";

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const menuItems = [
        { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt  /> },
        { id: "financial", label: "Financial Data", icon: <FaDatabase /> },
    ];

    /* ---------------- RENDER CONTENT ---------------- */
    const renderContent = () => {
        const titleClass = "text-2xl font-bold text-gray-800 mb-4";
        switch (active) {
            case "financial":
                return <AnalystFinancialData/>;
            default:
                return <AdminDashboard/>;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans">
            
            {/* OVERLAY for Mobile Sidebar */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-[#0f1115] text-white flex flex-col transition-all duration-300 z-50 shadow-2xl
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <div className="p-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black tracking-tighter">
                            Wealth<span className="text-[#D4AF37]">Flow</span>
                        </h2>
                        <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(false)}>
                            <FaTimes size={20} />
                        </button>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold mt-1">Analyst Portal</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActive(item.id);
                                setSidebarOpen(false);
                            }}
                            className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 font-medium
                            ${active === item.id 
                                ? "bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20" 
                                : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* USER PROFILE & LOGOUT */}
                <div className="p-6 bg-white/5 border-t border-white/10">
                    <div className="mb-4">
                        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Active Session</p>
                        <p className="text-sm font-medium text-[#D4AF37] truncate">{email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white w-full py-3 rounded-xl transition-all font-bold border border-red-500/20"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* MAIN AREA */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                
                {/* TOP HEADER */}
                <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            className="md:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <FaBars size={20} />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 capitalize">
                            {active.replace("-", " ")}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block text-right">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Current Admin</p>
                            <p className="text-sm font-semibold text-gray-700">{localStorage.getItem("user") || "admin@wealthflow.com"}</p>
                        </div>
                        <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold border-2 border-white shadow-sm">
                            {(localStorage.getItem("user") || "A")[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* CONTENT BOX */}
                <div className="p-4 sm:p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-sm min-h-[70vh]">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}