import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
    FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, 
    FaCircleNotch, FaArrowUp, FaArrowDown, FaCalendarAlt, FaStickyNote 
} from "react-icons/fa";

export default function FinancialData() {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const [formData, setFormData] = useState({
        amount: "",
        type: "income",
        category: "",
        date: new Date().toISOString().split('T')[0],
        notes: ""
    });

    const API_BASE = `${import.meta.env.VITE_API}/transactions`;
    const getAuthHeader = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    const fetchTransactions = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/`, getAuthHeader());
            setTransactions(res.data.data || res.data || []);
        } catch (err) {
            console.error("Fetch Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchTransactions(); }, []);

    const handleAction = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditing) {
                await axios.put(`${API_BASE}/${formData._id}`, formData, getAuthHeader());
            } else {
                await axios.post(`${API_BASE}/`, formData, getAuthHeader());
            }
            setIsModalOpen(false);
            fetchTransactions();
        } catch (err) {
            alert(err.response?.data?.message || "Transaction failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Permanently delete this record?")) return;
        try {
            await axios.delete(`${API_BASE}/${id}`, getAuthHeader());
            setTransactions(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            alert("Delete failed");
        }
    };

    const openModal = (item = null) => {
        if (item) {
            // Format date for HTML input (YYYY-MM-DD)
            const formattedDate = new Date(item.date).toISOString().split('T')[0];
            setFormData({ ...item, date: formattedDate });
            setIsEditing(true);
        } else {
            setFormData({ amount: "", type: "income", category: "", date: new Date().toISOString().split('T')[0], notes: "" });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Financial Ledger</h2>
                    <p className="text-gray-400 text-sm font-medium italic">Audit-ready transaction records.</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="bg-[#D4AF37] hover:bg-black text-white px-10 py-4 rounded-2xl font-black transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-yellow-900/10"
                >
                    <FaPlus /> Log Transaction
                </button>
            </div>

            {/* Main Table */}
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
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Entry Detail</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Value</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Category</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((item) => (
                                <tr key={item._id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl border-2 ${item.type === 'income' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                                {item.type === 'income' ? <FaArrowUp /> : <FaArrowDown />}
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-gray-800 text-lg">{item.category}</p>
                                                <p className="text-[10px] text-gray-400 font-black uppercase flex items-center gap-1 tracking-tighter">
                                                    <FaCalendarAlt /> {new Date(item.date).toLocaleDateString()}
                                                </p>
                                                {item.notes && <p className="text-xs text-gray-400 italic mt-1 max-w-[200px] truncate">{item.notes}</p>}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`text-xl font-black ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                            {item.type === 'income' ? '+' : '-'} ₹{item.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <span className="px-4 py-1.5 bg-gray-900 text-[#D4AF37] rounded-xl text-[9px] font-black uppercase tracking-widest border border-gray-800 shadow-sm">
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal(item)} className="p-3 text-gray-400 hover:text-[#D4AF37] bg-white rounded-xl border border-gray-100 shadow-sm"><FaEdit /></button>
                                            <button onClick={() => handleDelete(item._id)} className="p-3 text-gray-400 hover:text-red-500 bg-white rounded-xl border border-gray-100 shadow-sm"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* TRANSACTION MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
                    <form onSubmit={handleAction} className="bg-white w-full max-w-2xl rounded-[3.5rem] shadow-2xl p-8 md:p-12 border-t-[12px] border-[#D4AF37] animate-slideUp relative">
                        <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors"><FaTimes size={24}/></button>

                        <header className="mb-8">
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">
                                {isEditing ? "Modify Record" : "Log Asset Entry"}
                            </h3>
                            <p className="text-gray-400 font-medium mt-1">Ensure all financial parameters match institutional records.</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Amount */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Value (INR)</label>
                                <input required type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none font-black text-xl" placeholder="0.00" />
                            </div>

                            {/* Type */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Flow Type</label>
                                <select value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold appearance-none cursor-pointer">
                                    <option value="income">Income (+)</option>
                                    <option value="expense">Expense (-)</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Classification</label>
                                <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" placeholder="e.g. Salary, Rent, Equity" />
                            </div>

                            {/* Date */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Record Date</label>
                                <input required type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none font-bold" />
                            </div>

                            {/* Notes */}
                            <div className="md:col-span-2 space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaStickyNote /> Memo / Notes (Optional)
                                </label>
                                <textarea 
                                    rows="3" 
                                    value={formData.notes} 
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})} 
                                    className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#D4AF37] outline-none font-medium resize-none"
                                    placeholder="Add specific details about this flow..."
                                />
                            </div>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full py-5 bg-black text-[#D4AF37] hover:bg-gray-800 rounded-[2rem] font-black text-xl shadow-2xl mt-10 transition-all flex items-center justify-center gap-3 active:scale-95">
                            {isLoading ? <FaCircleNotch className="animate-spin" /> : <><FaCheck /> {isEditing ? "Synchronize Entry" : "Post to Ledger"}</>}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}