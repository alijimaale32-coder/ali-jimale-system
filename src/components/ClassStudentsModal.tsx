"use client"

import React from 'react'
import { X, Users, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

interface ClassStudentsModalProps {
    isOpen: boolean
    onClose: () => void
    classId: string
    className: string
}

export function ClassStudentsModal({ isOpen, onClose, classId, className }: ClassStudentsModalProps) {
    const [students, setStudents] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (isOpen && classId) {
            fetchStudents()
        }
    }, [isOpen, classId])

    const fetchStudents = async () => {
        setLoading(true)
        try {
            const studentsSnapshot = await getDocs(collection(db, 'students'))
            const studentsList = studentsSnapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter((student: any) => student.classId === classId)

            setStudents(studentsList)
        } catch (error) {
            console.error('Error fetching students:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl pointer-events-auto max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tight flex items-center gap-3">
                                        <Users className="text-primary" size={32} />
                                        {className}
                                    </h2>
                                    <p className="text-slate-500 font-medium mt-1">
                                        {students.length} student{students.length !== 1 ? 's' : ''} enrolled
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 overflow-y-auto flex-1">
                                {loading ? (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                    </div>
                                ) : students.length === 0 ? (
                                    <div className="text-center py-12">
                                        <GraduationCap size={64} className="mx-auto text-slate-300 mb-4" />
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">No Students Yet</h3>
                                        <p className="text-slate-500">
                                            Assign students to this class from the Student Directory
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid gap-4">
                                        {students.map((student, index) => (
                                            <motion.div
                                                key={student.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all"
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                                            <span className="text-primary font-black text-lg">
                                                                {student.name?.charAt(0) || '?'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-900 text-lg">
                                                                {student.name || 'Unknown'}
                                                            </h3>
                                                            <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-600">
                                                                <span>Age: {student.age || 'N/A'}</span>
                                                                <span>•</span>
                                                                <span>District: {student.district || 'N/A'}</span>
                                                                <span>•</span>
                                                                <span>Father: {student.fatherNumber || 'N/A'}</span>
                                                            </div>
                                                            <div className="mt-2 text-xs text-slate-500">
                                                                Xalqada: {student.magacaXalqada || 'N/A'} • {student.goobtaXalqada || 'N/A'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${student.status === 'Active'
                                                            ? 'bg-emerald-100 text-emerald-700'
                                                            : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {student.status || 'Active'}
                                                    </span>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-8 border-t border-slate-100 flex items-center justify-between">
                                <p className="text-sm text-slate-500">
                                    To add more students, go to Student Directory and assign them to this class
                                </p>
                                <button
                                    onClick={onClose}
                                    className="bg-slate-100 text-slate-700 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
