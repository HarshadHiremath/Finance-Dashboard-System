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

    const API_BASE = `${import.meta.env.VITE_API}/dashboard/`;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await axios.get(API_BASE, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setStats(res.data.data);
            } catch (err) {
                console.error("Dashboard Load Error", err);
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

    // Format trends for the Chart
    const chartData = stats?.monthlyTrends?.map(item => ({
        name: `${item._id.month}/${item._id.year}`,
        income: item.totalIncome,
        expense: item.totalExpense
    }));

    return (
        <div className="space-y-8 animate-fadeIn p-2 md:p-0">
            
            {/* 1. TOP STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    title="Net Balance" 
                    value={`₹${stats?.netBalance?.toLocaleString()}`} 
                    icon={<FaWallet />} 
                    color="bg-gray-900 text-[#D4AF37]" 
                    subtitle="Current Liquidity"
                />
                <StatCard 
                    title="Total Income" 
                    value={`+₹${stats?.totalIncome?.toLocaleString()}`} 
                    icon={<FaArrowUp />} 
                    color="bg-white text-green-600 border border-gray-100" 
                    subtitle="Cumulative Inflow"
                />
                <StatCard 
                    title="Total Expenses" 
                    value={`-₹${stats?.totalExpense?.toLocaleString()}`} 
                    icon={<FaArrowDown />} 
                    color="bg-white text-red-600 border border-gray-100" 
                    subtitle="Cumulative Outflow"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. MONTHLY TRENDS CHART */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><FaCalendarAlt /></div>
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">Monthly Cashflow</h3>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 700}} />
                                <Tooltip 
                                    cursor={{fill: '#f8f8f8'}} 
                                    contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} 
                                />
                                <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. CATEGORY BREAKDOWN */}
                <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-gray-50 rounded-xl text-gray-400"><FaChartPie /></div>
                        <h3 className="text-xl font-black text-gray-800 tracking-tight">Category Breakdown</h3>
                    </div>
                    <div className="space-y-4 flex-1 overflow-y-auto max-h-72 pr-2 custom-scrollbar">
                        {stats?.categoryTotals?.map((cat, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-gray-200 transition-all">
                                <span className="font-bold text-gray-600 capitalize">{cat._id || "Uncategorized"}</span>
                                <span className="font-black text-gray-900">₹{cat.total?.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. RECENT ACTIVITY */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center gap-3">
                    <div className="p-3 bg-gray-900 text-[#D4AF37] rounded-xl shadow-lg shadow-yellow-900/20"><FaClock /></div>
                    <h3 className="text-xl font-black text-gray-800">Recent Activity</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-50">
                            {stats?.recentTransactions?.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <p className="font-bold text-gray-800 group-hover:text-[#D4AF37] transition-colors">{t.category}</p>
                                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                                            {new Date(t.date).toLocaleDateString()}
                                        </p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm
                                            ${t.type === 'income' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <p className={`text-lg font-black ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {t.type === 'income' ? '+' : '-'}₹{t.amount?.toLocaleString()}
                                        </p>
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

// Reusable Card Component
function StatCard({ title, value, icon, color, subtitle }) {
    return (
        <div className={`p-8 rounded-[2.5rem] shadow-sm flex flex-col justify-between h-48 transition-transform hover:scale-[1.02] duration-300 ${color}`}>
            <div className="flex justify-between items-start">
                <div className="text-2xl p-4 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm">{icon}</div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] opacity-60 text-right">{title}</p>
            </div>
            <div>
                <h4 className="text-3xl font-black tracking-tighter mb-1">{value}</h4>
                <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{subtitle}</p>
            </div>
        </div>
    );
}