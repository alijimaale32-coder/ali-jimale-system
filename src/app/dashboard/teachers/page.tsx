"use client"

import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Search, Edit2, Trash2, Loader2, GraduationCap, Mail, UserCheck } from 'lucide-react'
import { translations } from '@/lib/translations'

interface Teacher {
    _id?: string;
    name: string;
    email: string;
    role: string;
    createdAt?: Date;
}

export default function TeachersPage() {
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
    const [formData, setFormData] = useState<Partial<Teacher>>({
        name: '',
        email: '',
    });

    // Fetch teachers on mount
    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/teachers');
            const data = await response.json();

            if (data.success) {
                setTeachers(data.teachers);
            } else {
                console.error('Failed to fetch teachers:', data.message);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateTeacher = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingTeacher?._id) return;

        try {
            const response = await fetch('/api/teachers', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingTeacher._id, ...formData }),
            });

            const data = await response.json();

            if (data.success) {
                setTeachers(teachers.map(t => t._id === editingTeacher._id ? data.teacher : t));
                setEditingTeacher(null);
                resetForm();
                alert('Teacher updated successfully!');
            } else {
                alert(data.message || 'Failed to update teacher');
            }
        } catch (error) {
            console.error('Error updating teacher:', error);
            alert('Error updating teacher');
        }
    };

    const handleDeleteTeacher = async (id: string) => {
        if (!confirm('Are you sure you want to delete this teacher? This action cannot be undone.')) return;

        try {
            const response = await fetch(`/api/teachers?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setTeachers(teachers.filter(t => t._id !== id));
                alert('Teacher deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete teacher');
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
            alert('Error deleting teacher');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
        });
        setEditingTeacher(null);
    };

    const openEditModal = (teacher: Teacher) => {
        setEditingTeacher(teacher);
        setFormData({
            name: teacher.name,
            email: teacher.email,
        });
    };

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black">{translations.teachers}</h1>
                        <p className="text-slate-500 mt-1">{filteredTeachers.length} {translations.totalTeachers}</p>
                    </div>
                    <div className="text-sm text-slate-500">
                        <p>{translations.teachersRegisterNote}</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={translations.searchTeachers}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Teachers Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={40} />
                    </div>
                ) : filteredTeachers.length === 0 ? (
                    <div className="text-center py-20">
                        <GraduationCap className="mx-auto text-slate-300" size={64} />
                        <p className="mt-4 text-slate-500 font-bold">No teachers found</p>
                        <p className="text-sm text-slate-400 mt-2">Teachers must register at /register page</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTeachers.map((teacher) => (
                            <div key={teacher._id} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 hover:scale-105 transition-transform">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                                        {teacher.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(teacher)}
                                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={16} className="text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTeacher(teacher._id!)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} className="text-red-600" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black mb-2">{teacher.name}</h3>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Mail size={14} />
                                        <span>{teacher.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <UserCheck size={14} />
                                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                            {translations.teacher}
                                        </span>
                                    </div>
                                    {teacher.createdAt && (
                                        <div className="pt-2 border-t border-slate-100 text-xs text-slate-400">
                                            {translations.joined}: {new Date(teacher.createdAt).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {editingTeacher && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-6">{translations.editTeacher}</h2>
                                <form onSubmit={handleUpdateTeacher} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">{translations.name} *</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">{translations.email} *</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                        >
                                            {translations.update}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                        >
                                            {translations.cancel}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}

