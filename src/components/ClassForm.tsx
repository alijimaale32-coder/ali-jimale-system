"use client"

import React from 'react'
import { X, Save } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Class, Department } from '@/app/dashboard/classes/page'

interface ClassFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Partial<Class>) => void
    initialData?: Class | null
    loading?: boolean
    departments: Department[]
}

export function ClassForm({ isOpen, onClose, onSubmit, initialData, loading, departments }: ClassFormProps) {
    const [formData, setFormData] = React.useState<Partial<Class>>({
        departmentId: 'ibtidai',
        className: '',
        gender: 'Boys',
        teacherName: '',
        ...initialData
    })

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                departmentId: 'ibtidai',
                className: '',
                gender: 'Boys',
                teacherName: '',
            })
        }
    }, [initialData, isOpen])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
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
                        <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-2xl pointer-events-auto">
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">
                                        {initialData ? 'Edit Class' : 'Create New Class'}
                                    </h2>
                                    <p className="text-slate-500 font-medium mt-1">Assign department, gender, and teacher</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-8 space-y-6">
                                {/* Department Selection */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Department</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {departments.map((dept) => (
                                            <button
                                                key={dept.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, departmentId: dept.id })}
                                                className={cn(
                                                    "p-4 rounded-2xl border-2 transition-all text-center",
                                                    formData.departmentId === dept.id
                                                        ? cn(dept.bgColor, dept.borderColor, dept.color, "shadow-lg")
                                                        : "border-slate-200 text-slate-400 hover:bg-slate-50"
                                                )}
                                            >
                                                <p className="text-2xl font-black mb-1">{dept.nameArabic}</p>
                                                <p className="text-[9px] font-bold uppercase tracking-wider opacity-70">{dept.nameEnglish.split(' ')[0]}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Class Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Class Name</label>
                                    <input
                                        required
                                        value={formData.className}
                                        onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                                        type="text"
                                        placeholder="e.g., Class 1A, Grade 2B"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    />
                                </div>

                                {/* Gender Selection */}
                                <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Gender</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {(['Boys', 'Girls'] as const).map((g) => (
                                            <button
                                                key={g}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, gender: g })}
                                                className={cn(
                                                    "px-6 py-4 rounded-2xl font-bold text-sm transition-all border-2",
                                                    formData.gender === g
                                                        ? g === 'Boys'
                                                            ? "bg-blue-50 text-blue-700 border-blue-200 shadow-lg"
                                                            : "bg-pink-50 text-pink-700 border-pink-200 shadow-lg"
                                                        : "text-slate-500 border-slate-200 hover:bg-slate-50"
                                                )}
                                            >
                                                {g}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Teacher Name */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Assigned Teacher</label>
                                    <input
                                        required
                                        value={formData.teacherName}
                                        onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                                        type="text"
                                        placeholder="Sheikh Ahmed Mohamed"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="p-8 border-t border-slate-100 flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            {initialData ? 'Update Class' : 'Create Class'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
