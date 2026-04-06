import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
    FaUserPlus, FaEdit, FaTrash, FaCheck, FaTimes, 
    FaCircleNotch, FaUserShield, FaPowerOff, FaUser, FaEnvelope, FaEye, FaEyeSlash 
} from "react-icons/fa";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", role: "Viewer", password: "" });

    const API_BASE = `${import.meta.env.VITE_API}/user`;
    
    const getAuthHeader = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    // 1. Fetch Users
    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(`${API_BASE}/getAllUsers`, getAuthHeader());
            // Support both {data: [...]} and [...] response formats
            setUsers(res.data.data || res.data || []);
        } catch (err) {
            console.error("Fetch Error", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    // 2. Toggle Status (Active/Deactive)
    const toggleUserStatus = async (user) => {
        const updatedStatus = !user.isActive;
        // Optimistic Update
        setUsers(prev => prev.map(u => u._id === user._id ? { ...u, isActive: updatedStatus } : u));

        try {
            await axios.put(`${API_BASE}/${user._id}`, { isActive: updatedStatus }, getAuthHeader());
        } catch (err) {
            alert("Status update failed");
            fetchUsers(); // Rollback
        }
    };

    // 3. Delete User
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user permanently?")) return;
        try {
            await axios.delete(`${API_BASE}/${id}`, getAuthHeader());
            setUsers(prev => prev.filter(user => user._id !== id));
        } catch (err) {
            alert("Delete failed");
        }
    };

    // 4. Create/Update User
    const handleAction = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditing) {
                await axios.put(`${API_BASE}/${formData._id}`, formData, getAuthHeader());
            } else {
                await axios.post(`${API_BASE}/createUser`, formData, getAuthHeader());
            }
            setIsModalOpen(false);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || "Action failed");
        } finally {
            setIsLoading(false);
        }
    };

    const openModal = (user = null) => {
        setShowPassword(false);
        if (user) {
            setFormData({ ...user, password: "" }); // Clear password field for security on edit
            setIsEditing(true);
        } else {
            setFormData({ name: "", email: "", role: "Viewer", password: "" });
            setIsEditing(false);
        }
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-fadeIn p-4 md:p-0">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <FaUserShield className="text-[#D4AF37]" /> Identity Manager
                    </h2>
                    <p className="text-gray-400 font-medium text-sm mt-1">Control system access and user authorization levels.</p>
                </div>
                <button 
                    onClick={() => openModal()} 
                    className="bg-[#D4AF37] hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-yellow-900/10 flex items-center justify-center gap-3 active:scale-95 whitespace-nowrap"
                >
                    <FaUserPlus /> Provision User
                </button>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden relative min-h-[300px]">
                {isLoading && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                        <FaCircleNotch className="animate-spin text-[#D4AF37] text-3xl" />
                    </div>
                )}
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/80 border-b border-gray-100">
                            <tr>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Metadata</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Status</th>
                                <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.length > 0 ? users.map((user) => (
                                <tr key={user._id} className="group hover:bg-gray-50/50 transition-all">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black border-2 shadow-sm transition-all
                                                ${user.isActive ? 'bg-gray-900 text-[#D4AF37] border-gray-800' : 'bg-gray-100 text-gray-400 border-gray-200 opacity-50'}`}>
                                                {user.name ? user.name[0] : "?"}
                                            </div>
                                            <div className={!user.isActive ? 'opacity-40' : ''}>
                                                <p className="font-extrabold text-gray-800 text-base">{user.name}</p>
                                                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${user.role === 'Admin' ? 'border-yellow-200 text-yellow-600 bg-yellow-50' : 'border-gray-200 text-gray-400'}`}>
                                                    {user.role}
                                                </span>
                                                <p className="text-xs text-gray-400 font-medium mt-0.5">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    
                                    <td className="px-8 py-6 text-center">
                                        <button 
                                            onClick={() => toggleUserStatus(user)}
                                            className={`mx-auto relative w-12 h-6 rounded-full transition-all duration-300 outline-none
                                                ${user.isActive ? 'bg-green-500 shadow-md shadow-green-500/20' : 'bg-gray-300'}`}
                                        >
                                            <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm
                                                ${user.isActive ? 'translate-x-6' : 'translate-x-0'}`} 
                                            />
                                        </button>
                                    </td>

                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <button onClick={() => openModal(user)} className="p-3 bg-white text-gray-400 hover:text-[#D4AF37] rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"><FaEdit /></button>
                                            <button onClick={() => handleDelete(user._id)} className="p-3 bg-white text-gray-400 hover:text-red-500 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"><FaTrash /></button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="px-8 py-20 text-center text-gray-400 italic">No users found. Proceed to provision new accounts.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/60 overflow-y-auto">
                    <form 
                        onSubmit={handleAction}
                        className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] p-8 md:p-12 border-t-[12px] border-[#D4AF37] animate-slideUp relative"
                    >
                        <button type="button" onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors">
                            <FaTimes size={24} />
                        </button>

                        <header className="mb-10">
                            <h3 className="text-4xl font-black text-gray-900 tracking-tighter">
                                {isEditing ? "Modify Credentials" : "Account Provisioning"}
                            </h3>
                            <p className="text-gray-400 font-medium mt-1">
                                {isEditing ? `Updating security settings for ${formData.name}` : "Establish a new identity for dashboard access."}
                            </p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaUser className="text-[#D4AF37]" /> Full Name
                                </label>
                                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all font-semibold" />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <FaEnvelope className="text-[#D4AF37]" /> Email
                                </label>
                                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all font-semibold" />
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                    {isEditing ? "Security Key Reset (Leave blank to keep current)" : "Dashboard Security Key"}
                                </label>
                                <div className="relative">
                                    <input 
                                        required={!isEditing}
                                        type={showPassword ? "text" : "password"} 
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all font-semibold"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D4AF37]">
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Privilege Tier</label>
                                <select value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-[#D4AF37] outline-none transition-all font-bold cursor-pointer">
                                    <option value="Viewer">Viewer (Read-Only)</option>
                                    <option value="Analyst">Analyst (Data Entry)</option>
                                    <option value="Admin">Administrator (Full Control)</option>
                                </select>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-5 bg-[#D4AF37] hover:bg-black text-white rounded-[2rem] font-black text-xl shadow-2xl mt-10 transition-all active:scale-95 flex items-center justify-center gap-3 disabled:bg-gray-200"
                        >
                            {isLoading ? <FaCircleNotch className="animate-spin" /> : (
                                <>{isEditing ? "Sync Account" : "Finalize Registration"} <FaCheck /></>
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}