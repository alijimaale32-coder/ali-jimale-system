"use client"

import React, { useEffect, useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Calendar, Check, X, Clock, Loader2, BookOpen } from 'lucide-react'
import { translations } from '@/lib/translations'


interface AttendanceRecord {
    _id?: string;
    classId: {
        _id: string;
        name: string;
        subject: string;
    } | string;
    studentId: {
        _id: string;
        name: string;
        studentId: string;
    } | string;
    date: Date;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
    notes?: string;
    markedBy?: {
        name: string;
        email: string;
    };
}

export default function AttendancePage() {
    const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
    const [classes, setClasses] = useState<any[]>([]);
    const [students, setStudents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [showMarkModal, setShowMarkModal] = useState(false);
    const [markingData, setMarkingData] = useState<{
        classId: string;
        studentId: string;
        status: string;
        notes: string;
    }>({
        classId: '',
        studentId: '',
        status: 'PRESENT',
        notes: '',
    });

    useEffect(() => {
        fetchClasses();
        fetchStudents();
    }, []);

    useEffect(() => {
        if (selectedClass || selectedDate) {
            fetchAttendance();
        }
    }, [selectedClass, selectedDate]);

    const fetchAttendance = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (selectedClass) params.append('classId', selectedClass);
            if (selectedDate) params.append('date', selectedDate);

            const response = await fetch(`/api/attendance?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setAttendanceRecords(data.attendance);
            }
        } catch (error) {
            console.error('Error fetching attendance:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await fetch('/api/classes');
            const data = await response.json();
            if (data.success) {
                setClasses(data.classes);
            }
        } catch (error) {
            console.error('Error fetching classes:', error);
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

    const handleMarkAttendance = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...markingData,
                    date: selectedDate,
                }),
            });

            const data = await response.json();

            if (data.success) {
                fetchAttendance();
                setShowMarkModal(false);
                resetMarkingForm();
                alert('Attendance marked successfully!');
            } else {
                alert(data.message || 'Failed to mark attendance');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            alert('Error marking attendance');
        }
    };

    const handleQuickMark = async (studentId: string, status: string) => {
        if (!selectedClass) {
            alert('Please select a class first');
            return;
        }

        try {
            const response = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    classId: selectedClass,
                    studentId,
                    status,
                    date: selectedDate,
                }),
            });

            const data = await response.json();

            if (data.success) {
                fetchAttendance();
            } else {
                alert(data.message || 'Failed to mark attendance');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
        }
    };

    const resetMarkingForm = () => {
        setMarkingData({
            classId: '',
            studentId: '',
            status: 'PRESENT',
            notes: '',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PRESENT':
                return 'bg-green-100 text-green-700';
            case 'ABSENT':
                return 'bg-red-100 text-red-700';
            case 'LATE':
                return 'bg-yellow-100 text-yellow-700';
            case 'EXCUSED':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-slate-100 text-slate-700';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'PRESENT':
                return <Check size={16} />;
            case 'ABSENT':
                return <X size={16} />;
            case 'LATE':
                return <Clock size={16} />;
            default:
                return <Check size={16} />;
        }
    };

    // Get students for selected class
    const classStudents = selectedClass
        ? classes.find(c => c._id === selectedClass)?.students || []
        : [];

    return (
        <DashboardLayout>
            <div className="p-8 space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black">Attendance</h1>
                        <p className="text-slate-500 mt-1">{attendanceRecords.length} records</p>
                    </div>
                    <button
                        onClick={() => setShowMarkModal(true)}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg"
                    >
                        <Check size={20} />
                        Mark Attendance
                    </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold mb-2">Select Class</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary"
                        >
                            <option value="">All Classes</option>
                            {classes.map((classItem) => (
                                <option key={classItem._id} value={classItem._id}>
                                    {classItem.name} - {classItem.subject}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-2">Select Date</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Quick Mark for Class */}
                {selectedClass && classStudents.length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6">
                        <h2 className="text-xl font-black mb-4">Quick Mark</h2>
                        <div className="space-y-2">
                            {classStudents.map((student: any) => {
                                const existingRecord = attendanceRecords.find(
                                    r => typeof r.studentId === 'object' && r.studentId._id === student._id
                                );

                                return (
                                    <div key={student._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                        <div>
                                            <p className="font-bold">{student.name}</p>
                                            <p className="text-sm text-slate-500">{student.studentId}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleQuickMark(student._id, 'PRESENT')}
                                                className={`px-4 py-2 rounded-lg font-bold transition-all ${existingRecord?.status === 'PRESENT'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    }`}
                                            >
                                                Present
                                            </button>
                                            <button
                                                onClick={() => handleQuickMark(student._id, 'ABSENT')}
                                                className={`px-4 py-2 rounded-lg font-bold transition-all ${existingRecord?.status === 'ABSENT'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                            >
                                                Absent
                                            </button>
                                            <button
                                                onClick={() => handleQuickMark(student._id, 'LATE')}
                                                className={`px-4 py-2 rounded-lg font-bold transition-all ${existingRecord?.status === 'LATE'
                                                    ? 'bg-yellow-500 text-white'
                                                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                    }`}
                                            >
                                                Late
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Attendance Records */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-black">Attendance Records</h2>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="animate-spin text-primary" size={40} />
                        </div>
                    ) : attendanceRecords.length === 0 ? (
                        <div className="text-center py-20">
                            <Calendar className="mx-auto text-slate-300" size={64} />
                            <p className="mt-4 text-slate-500 font-bold">No attendance records found</p>
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            {attendanceRecords.map((record) => (
                                <div key={record._id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <BookOpen className="text-primary" size={20} />
                                        </div>
                                        <div>
                                            <p className="font-bold">
                                                {typeof record.studentId === 'object' ? record.studentId.name : 'Unknown Student'}
                                            </p>
                                            <p className="text-sm text-slate-500">
                                                {typeof record.classId === 'object' ? record.classId.name : 'Unknown Class'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-slate-500">
                                            {new Date(record.date).toLocaleDateString()}
                                        </span>
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 ${getStatusColor(record.status)}`}>
                                            {getStatusIcon(record.status)}
                                            {record.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Mark Attendance Modal */}
                {showMarkModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
                            <div className="p-8">
                                <h2 className="text-2xl font-black mb-6">Mark Attendance</h2>
                                <form onSubmit={handleMarkAttendance} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Class *</label>
                                        <select
                                            required
                                            value={markingData.classId}
                                            onChange={(e) => setMarkingData({ ...markingData, classId: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        >
                                            <option value="">Select Class</option>
                                            {classes.map((classItem) => (
                                                <option key={classItem._id} value={classItem._id}>
                                                    {classItem.name} - {classItem.subject}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Student *</label>
                                        <select
                                            required
                                            value={markingData.studentId}
                                            onChange={(e) => setMarkingData({ ...markingData, studentId: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        >
                                            <option value="">Select Student</option>
                                            {students.map((student) => (
                                                <option key={student._id} value={student._id}>
                                                    {student.name} ({student.studentId})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Status *</label>
                                        <select
                                            required
                                            value={markingData.status}
                                            onChange={(e) => setMarkingData({ ...markingData, status: e.target.value })}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        >
                                            <option value="PRESENT">Present</option>
                                            <option value="ABSENT">Absent</option>
                                            <option value="LATE">Late</option>
                                            <option value="EXCUSED">Excused</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Notes</label>
                                        <textarea
                                            value={markingData.notes}
                                            onChange={(e) => setMarkingData({ ...markingData, notes: e.target.value })}
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform"
                                        >
                                            Mark
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowMarkModal(false);
                                                resetMarkingForm();
                                            }}
                                            className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                                        >
                                            Cancel
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

