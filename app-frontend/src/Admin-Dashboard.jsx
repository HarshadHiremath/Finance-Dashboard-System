import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FaWallet, FaArrowUp, FaArrowDown, FaClock,
    FaChartPie, FaCircleNotch, FaCalendarAlt
} from "react-icons/fa";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API}/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                setStats(res.data?.data);
            } catch (err) {
                console.error("Dashboard Load Error", err);
                setStats({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="h-[70vh] flex items-center justify-center">
                <FaCircleNotch className="animate-spin text-[#D4AF37] text-5xl" />
            </div>
        );
    }

    /* ✅ FIXED CHART DATA */
    const chartData = (stats?.monthlyTrends || []).map(item => ({
        name: item.month,
        income: item.income,
        expense: item.expense
    }));

    return (
        <div className="space-y-8 animate-fadeIn p-2 md:p-0">

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    title="Net Balance"
                    value={`₹${(stats?.netBalance || 0).toLocaleString()}`}
                    icon={<FaWallet />}
                    color="bg-gray-900 text-[#D4AF37]"
                    subtitle="Current Liquidity"
                />
                <StatCard
                    title="Total Income"
                    value={`+₹${(stats?.totalIncome || 0).toLocaleString()}`}
                    icon={<FaArrowUp />}
                    color="bg-white text-green-600 border border-gray-100"
                    subtitle="Cumulative Inflow"
                />
                <StatCard
                    title="Total Expenses"
                    value={`-₹${(stats?.totalExpense || 0).toLocaleString()}`}
                    icon={<FaArrowDown />}
                    color="bg-white text-red-600 border border-gray-100"
                    subtitle="Cumulative Outflow"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* CHART */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                            <FaCalendarAlt />
                        </div>
                        <h3 className="text-xl font-black text-gray-800">
                            Monthly Cashflow
                        </h3>
                    </div>

                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="income" fill="#10b981" />
                                <Bar dataKey="expense" fill="#ef4444" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CATEGORY */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-400">
                            <FaChartPie />
                        </div>
                        <h3 className="text-xl font-black text-gray-800">
                            Category Breakdown
                        </h3>
                    </div>

                    <div className="space-y-4">
                        {(stats?.categoryTotals || []).map((cat, idx) => (
                            <div key={idx} className="flex justify-between p-4 bg-gray-50 rounded-2xl">
                                <span className="font-bold capitalize">{cat.category}</span>
                                <span className="font-black">
                                    ₹{(cat.total || 0).toLocaleString()}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TRANSACTIONS */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b flex items-center gap-3">
                    <div className="p-3 bg-gray-900 text-[#D4AF37] rounded-xl">
                        <FaClock />
                    </div>
                    <h3 className="text-xl font-black">Recent Activity</h3>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <tbody>
                            {(stats?.recentTransactions || []).map((t) => (
                                <tr key={t._id}>
                                    <td className="px-8 py-5">
                                        <p className="font-bold">{t.category}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(t.date).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={t.type === "income" ? "text-green-600" : "text-red-600"}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right font-bold">
                                        {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

/* CARD */
function StatCard({ title, value, icon, color, subtitle }) {
    return (
        <div className={`p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between h-48 ${color}`}>
            <div className="flex justify-between">
                <div className="text-2xl p-4 bg-white/10 rounded-2xl">{icon}</div>
                <p className="text-xs font-bold opacity-60">{title}</p>
            </div>
            <div>
                <h4 className="text-3xl font-black">{value}</h4>
                <p className="text-xs opacity-50">{subtitle}</p>
            </div>
        </div>
    );
}