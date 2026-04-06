import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FaCircleNotch,
    FaArrowUp,
    FaArrowDown,
    FaCalendarAlt
} from "react-icons/fa";

export default function AnalystFinancialData() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const API_BASE = `${import.meta.env.VITE_API}/transactions`;

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            setTransactions(res.data?.data || []);
        } catch (err) {
            console.error("Fetch Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="space-y-8 animate-fadeIn">

            {/* HEADER */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    Financial Ledger
                </h2>
                <p className="text-gray-400 text-sm font-medium italic">
                    Read-only transaction records.
                </p>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative min-h-[400px]">

                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-20 flex items-center justify-center">
                        <FaCircleNotch className="animate-spin text-[#D4AF37] text-4xl" />
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Entry Detail
                                </th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Value
                                </th>
                                <th className="px-8 py-5 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    Category
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-50">
                            {transactions.length > 0 ? (
                                transactions.map((item) => (
                                    <tr
                                        key={item._id}
                                        className="hover:bg-gray-50/50 transition-all"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`p-3 rounded-xl border-2 ${
                                                        item.type === "income"
                                                            ? "bg-green-50 text-green-600 border-green-100"
                                                            : "bg-red-50 text-red-600 border-red-100"
                                                    }`}
                                                >
                                                    {item.type === "income" ? (
                                                        <FaArrowUp />
                                                    ) : (
                                                        <FaArrowDown />
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="font-extrabold text-gray-800 text-lg">
                                                        {item.category}
                                                    </p>

                                                    <p className="text-[10px] text-gray-400 font-black uppercase flex items-center gap-1">
                                                        <FaCalendarAlt />
                                                        {new Date(item.date).toLocaleDateString()}
                                                    </p>

                                                    {item.notes && (
                                                        <p className="text-xs text-gray-400 italic mt-1 max-w-[200px] truncate">
                                                            {item.notes}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-6 text-center">
                                            <span
                                                className={`text-xl font-black ${
                                                    item.type === "income"
                                                        ? "text-green-600"
                                                        : "text-red-600"
                                                }`}
                                            >
                                                {item.type === "income" ? "+" : "-"} ₹
                                                {item.amount.toLocaleString()}
                                            </span>
                                        </td>

                                        <td className="px-8 py-6 text-center">
                                            <span className="px-4 py-1.5 bg-gray-900 text-[#D4AF37] rounded-xl text-[9px] font-black uppercase tracking-widest">
                                                {item.type}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="text-center py-10 text-gray-400"
                                    >
                                        No transactions available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}