"use client"

import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Plus, Search, Filter, MoreVertical, GraduationCap, Edit2, Trash2, Loader2 } from 'lucide-react'
import { translations } from '@/lib/translations'

interface Student {
    _id?: string;
    name: string;
    studentId: string;
    gender: 'MALE' | 'FEMALE';
    gradeLevel?: string;
    age?: number;
    parentContact?: string;
    address?: string;
    enrollmentDate?: Date;
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [formData, setFormData] = useState<Partial<Student>>({
        name: '',
        studentId: '',
        gender: 'MALE',
        gradeLevel: '',
        age: undefined,
        parentContact: '',
        address: '',
    });

    // Fetch students on mount
    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/students');
            const data = await response.json();

            if (data.success) {
                setStudents(data.students);
            } else {
                console.error('Failed to fetch students:', data.message);
            }
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStudents([data.student, ...students]);
                setShowAddModal(false);
                resetForm();
                alert('Student added successfully!');
            } else {
                alert(data.message || 'Failed to add student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
            alert('Error adding student');
        }
    };

    const handleUpdateStudent = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!editingStudent?._id) return;

        try {
            const response = await fetch('/api/students', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editingStudent._id, ...formData }),
            });

            const data = await response.json();

            if (data.success) {
                setStudents(students.map(s => s._id === editingStudent._id ? data.student : s));
                setEditingStudent(null);
                resetForm();
                alert('Student updated successfully!');
            } else {
                alert(data.message || 'Failed to update student');
            }
        } catch (error) {
            console.error('Error updating student:', error);
            alert('Error updating student');
        }
    };

    const handleDeleteStudent = async (id: string) => {
        if (!confirm('Are you sure you want to delete this student?')) return;

        try {
            const response = await fetch(`/api/students?id=${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                setStudents(students.filter(s => s._id !== id));
                alert('Student deleted successfully!');
            } else {
                alert(data.message || 'Failed to delete student');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            alert('Error deleting student');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            studentId: '',
            gender: 'MALE',
            gradeLevel: '',
            age: undefined,
            parentContact: '',
            address: '',
        });
        setShowAddModal(false);
        setEditingStudent(null);
    };

    const openEditModal = (student: Student) => {
        setEditingStudent(student);
        setFormData({
            name: student.name,
            studentId: student.studentId,
            gender: student.gender,
            gradeLevel: student.gradeLevel,
            age: student.age,
            parentContact: student.parentContact,
            address: student.address,
        });
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black">{translations.students}</h1>
                        <p className="text-slate-500 mt-1">{filteredStudents.length} {translations.totalStudents}</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                    >
                        <Plus size={20} />
                        {translations.addStudent}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="flex gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder={translations.searchStudents}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white border-2 border-slate-100 rounded-2xl font-bold flex items-center gap-2">
                        <Filter size={20} />
                        {translations.filter}
                    </button>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="animate-spin text-primary" size={40} />
                        </div>
                    ) : filteredStudents.length === 0 ? (
                        <div className="text-center py-20">
                            <GraduationCap className="mx-auto text-slate-300" size={64} />
                            <p className="mt-4 text-slate-500 font-bold">No students found</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b-2 border-slate-100">
                                <tr>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.studentID}</th>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.name}</th>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.gender}</th>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.gradeLevel}</th>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.age}</th>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.parentContact}</th>
                                    <th className="px-6 py-4 text-right font-black text-sm">{translations.actions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student._id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-primary">{student.studentId}</td>
                                        <td className="px-6 py-4 font-bold">{student.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.gender === 'MALE' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'
                                                }`}>
                                                {student.gender === 'MALE' ? translations.male : translations.female}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{student.gradeLevel || '-'}</td>
                                        <td className="px-6 py-4">{student.age || '-'}</td>
                                        <td className="px-6 py-4">{student.parentContact || '-'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => openEditModal(student)}
                                                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} className="text-blue-600" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteStudent(student._id!)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} className="text-red-600" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Add/Edit Modal */}
                {(showAddModal || editingStudent) && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-6">
                                    {editingStudent ? translations.editStudent : translations.addStudent}
                                </h2>
                                <form onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
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
                                            <label className="block text-sm font-bold mb-2">{translations.studentID} *</label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.studentId}
                                                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">{translations.gender} *</label>
                                            <select
                                                required
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'MALE' | 'FEMALE' })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            >
                                                <option value="MALE">{translations.male}</option>
                                                <option value="FEMALE">{translations.female}</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">{translations.age}</label>
                                            <input
                                                type="number"
                                                value={formData.age || ''}
                                                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || undefined })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">{translations.gradeLevel}</label>
                                            <input
                                                type="text"
                                                value={formData.gradeLevel}
                                                onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold mb-2">{translations.parentContact}</label>
                                            <input
                                                type="text"
                                                value={formData.parentContact}
                                                onChange={(e) => setFormData({ ...formData, parentContact: e.target.value })}
                                                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">{translations.address}</label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                        >
                                            {editingStudent ? translations.update : translations.add}
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

