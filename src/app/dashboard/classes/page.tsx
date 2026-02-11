"use client"

import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Plus, Search, Users, Edit2, Trash2, Loader2, BookOpen } from 'lucide-react'
import { translations } from '@/lib/translations'

interface Class {
    _id?: string;
    name: string;
    subject: string;
    schedule?: string;
    teacherId?: {
        _id: string;
        name: string;
        email: string;
    } | string | null;
    students?: any[];
    capacity?: number;
}

export default function ClassesPage() {
    const [classes, setClasses] = useState<Class[]>([]);
    const [teachers, setTeachers] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingClass, setEditingClass] = useState<Class | null>(null);
    const [formData, setFormData] = useState<Partial<Class>>({
        name: '',
        subject: '',
        schedule: '',
        teacherId: null,
        students: [],
        capacity: 30,
    });

    // Fetch all data on mount
    useEffect(() => {
        fetchClasses();
        fetchTeachers();
        fetchStudents();
    }, []);

    const fetchClasses = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/classes');
            const data = await response.json();

            if (data.success) {
                setClasses(data.classes);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await fetch('/api/teachers');
            const data = await response.json();
            if (data.success) {
                setTeachers(data.teachers);
            }
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const fetchStudents = async () => {
        try {
            const response = await fetch('/api/students');
            const data = await response.json();
            if (data.success) {
                setStudents(data.students);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleAddClass = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/classes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setClasses([data.class, ...classes]);
                setShowAddModal(false);
                resetForm();
                alert('Class created successfully!');
            } else {
                alert(data.message || 'Failed to create class');
            }
        } catch (error) {
            console.error('Error creating class:', error);
            alert('Error creating class');
        }
    };

    const handleUpdateClass = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingClass?._id) return;

        try {
            const response = await fetch('/api/classes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingClass._id, ...formData }),
            });

            const data = await response.json();

            if (data.success) {
                setClasses(classes.map(c => c._id === editingClass._id ? data.class : c));
                setEditingClass(null);
                resetForm();
                alert('Class updated successfully!');
            } else {
                alert(data.message || 'Failed to update class');
            }
        } catch (error) {
            console.error('Error updating class:', error);
            alert('Error updating class');
        }
    };

    const handleDeleteClass = async (id: string) => {
        if (!confirm('Are you sure you want to delete this class?')) return;

        try {
            const response = await fetch(`/api/classes?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setClasses(classes.filter(c => c._id !== id));
                alert('Class deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete class');
            }
        } catch (error) {
            console.error('Error deleting class:', error);
            alert('Error deleting class');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            subject: '',
            schedule: '',
            teacherId: null,
            students: [],
            capacity: 30,
        });
        setShowAddModal(false);
        setEditingClass(null);
    };

    const openEditModal = (classItem: Class) => {
        setEditingClass(classItem);
        setFormData({
            name: classItem.name,
            subject: classItem.subject,
            schedule: classItem.schedule,
            teacherId: typeof classItem.teacherId === 'object' ? classItem.teacherId?._id : classItem.teacherId,
            students: classItem.students || [],
            capacity: classItem.capacity,
        });
    };

    const filteredClasses = classes.filter(classItem =>
        classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        classItem.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black">{translations.classes}</h1>
                        <p className="text-slate-500 mt-1">{filteredClasses.length} {translations.totalClasses}</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                    >
                        <Plus size={20} />
                        {translations.addClass}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={translations.searchClasses}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Classes Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={40} />
                    </div>
                ) : filteredClasses.length === 0 ? (
                    <div className="text-center py-20">
                        <BookOpen className="mx-auto text-slate-300" size={64} />
                        <p className="mt-4 text-slate-500 font-bold">No classes found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredClasses.map((classItem) => (
                            <div key={classItem._id} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 hover:scale-105 transition-transform">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                                        <BookOpen className="text-primary" size={24} />
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => openEditModal(classItem)}
                                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 size={16} className="text-blue-600" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClass(classItem._id!)}
                                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} className="text-red-600" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-black mb-2">{classItem.name}</h3>
                                <p className="text-slate-500 text-sm mb-4">{classItem.subject}</p>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">{translations.teacher}:</span>
                                        <span className="font-bold">
                                            {typeof classItem.teacherId === 'object' && classItem.teacherId
                                                ? classItem.teacherId.name
                                                : translations.notAssigned}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-500">{translations.students}:</span>
                                        <span className="font-bold flex items-center gap-1">
                                            <Users size={14} />
                                            {classItem.students?.length || 0} / {classItem.capacity || 30}
                                        </span>
                                    </div>
                                    {classItem.schedule && (
                                        <div className="pt-2 border-t border-slate-100">
                                            <p className="text-xs text-slate-500">{classItem.schedule}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add/Edit Modal */}
                {(showAddModal || editingClass) && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-6">
                                    {editingClass ? translations.editClass : translations.addClass}
                                </h2>
                                <form onSubmit={editingClass ? handleUpdateClass : handleAddClass} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-bold mb-2">{translations.className} *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">{translations.subject} *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">{translations.capacity}</label>
                                            <input
                                                type="number"
                                                value={formData.capacity || 30}
                                                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-bold mb-2">{translations.teacher}</label>
                                            <select
                                                value={formData.teacherId as string || ''}
                                                onChange={(e) => setFormData({ ...formData, teacherId: e.target.value || null })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            >
                                                <option value="">{translations.selectTeacher}</option>
                                                {teachers.map((teacher) => (
                                                    <option key={teacher._id} value={teacher._id}>
                                                        {teacher.name} ({teacher.email})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-bold mb-2">{translations.schedule}</label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Mon, Wed, Fri 9:00 AM"
                                                value={formData.schedule}
                                                onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                        >
                                            {editingClass ? translations.update : translations.add}
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

