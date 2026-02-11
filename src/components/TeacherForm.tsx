"use client"

import React from 'react'
import { X, Save, User, Phone, MapPin, Calendar, Briefcase, DollarSign, Shield } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Teacher } from '@/app/dashboard/teachers/page'

interface TeacherFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Partial<Teacher>) => void
    initialData?: Teacher | null
    loading?: boolean
}

export function TeacherForm({ isOpen, onClose, onSubmit, initialData, loading }: TeacherFormProps) {
    const [formData, setFormData] = React.useState<Partial<Teacher>>({
        employeeNumber: '',
        registrationDate: new Date().toISOString().split('T')[0],
        jobTitle: '',
        specialization: '',
        workStartDate: '',
        fullName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        gender: 'Male',
        currentAddress: '',
        whatsappNumber: '',
        phoneNumber: '',
        probationarySalary: '',
        postProbationSalary: '',
        accountNumber: '',
        guarantorName: '',
        guarantorMobile: '',
        guarantorDOB: '',
        guarantorPlaceOfBirth: '',
        guarantorAddress: '',
        relationshipToGuarantor: '',
        tribalLeader: '',
        leaderMobile: '',
        status: 'Probation',
        ...initialData
    })

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                employeeNumber: '',
                registrationDate: new Date().toISOString().split('T')[0],
                jobTitle: '',
                specialization: '',
                workStartDate: '',
                fullName: '',
                dateOfBirth: '',
                placeOfBirth: '',
                gender: 'Male',
                currentAddress: '',
                whatsappNumber: '',
                phoneNumber: '',
                probationarySalary: '',
                postProbationSalary: '',
                accountNumber: '',
                guarantorName: '',
                guarantorMobile: '',
                guarantorDOB: '',
                guarantorPlaceOfBirth: '',
                guarantorAddress: '',
                relationshipToGuarantor: '',
                tribalLeader: '',
                leaderMobile: '',
                status: 'Probation',
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
                        <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden pointer-events-auto flex flex-col">
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">
                                        {initialData ? 'Edit Teacher' : 'Register New Teacher'}
                                    </h2>
                                    <p className="text-slate-500 font-medium mt-1">Complete employment registration form</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                                {/* Header Data */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Header Information</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Employee Number</label>
                                            <input
                                                required
                                                value={formData.employeeNumber}
                                                onChange={(e) => setFormData({ ...formData, employeeNumber: e.target.value })}
                                                type="text"
                                                placeholder="EMP-001"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Registration Date</label>
                                            <input
                                                required
                                                value={formData.registrationDate}
                                                onChange={(e) => setFormData({ ...formData, registrationDate: e.target.value })}
                                                type="date"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 1: General Information */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Section 1: General Information</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Job Title Applied For</label>
                                            <input
                                                required
                                                value={formData.jobTitle}
                                                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                                type="text"
                                                placeholder="Quran Teacher"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Field of Specialization</label>
                                            <input
                                                required
                                                value={formData.specialization}
                                                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                                                type="text"
                                                placeholder="Tajweed & Qira'at"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Work Start Date</label>
                                            <input
                                                required
                                                value={formData.workStartDate}
                                                onChange={(e) => setFormData({ ...formData, workStartDate: e.target.value })}
                                                type="date"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Status</label>
                                            <select
                                                required
                                                value={formData.status}
                                                onChange={(e) => setFormData({ ...formData, status: e.target.value as Teacher['status'] })}
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            >
                                                <option value="Probation">Probation</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name (Quadruple)</label>
                                        <input
                                            required
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            type="text"
                                            placeholder="First Father Grandfather Family"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
                                            <input
                                                required
                                                value={formData.dateOfBirth}
                                                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                                                type="date"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Place of Birth</label>
                                            <input
                                                required
                                                value={formData.placeOfBirth}
                                                onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                                                type="text"
                                                placeholder="City, Country"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Gender</label>
                                        <div className="flex gap-3">
                                            {(['Male', 'Female'] as const).map((g) => (
                                                <button
                                                    key={g}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, gender: g })}
                                                    className={cn(
                                                        "flex-1 px-6 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                                        formData.gender === g
                                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                            : "text-slate-500 hover:bg-slate-100"
                                                    )}
                                                >
                                                    <User size={18} /> {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Address</label>
                                        <input
                                            required
                                            value={formData.currentAddress}
                                            onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                                            type="text"
                                            placeholder="District, City"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">WhatsApp Number</label>
                                            <input
                                                required
                                                value={formData.whatsappNumber}
                                                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                                type="tel"
                                                placeholder="0615551234"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                                            <input
                                                required
                                                value={formData.phoneNumber}
                                                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                                type="tel"
                                                placeholder="0615551234"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Probationary Salary</label>
                                            <input
                                                required
                                                value={formData.probationarySalary}
                                                onChange={(e) => setFormData({ ...formData, probationarySalary: e.target.value })}
                                                type="text"
                                                placeholder="$400"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Post-Probation Salary</label>
                                            <input
                                                required
                                                value={formData.postProbationSalary}
                                                onChange={(e) => setFormData({ ...formData, postProbationSalary: e.target.value })}
                                                type="text"
                                                placeholder="$550"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Number</label>
                                            <input
                                                required
                                                value={formData.accountNumber}
                                                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                                                type="text"
                                                placeholder="ACC-2024-001"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Guarantor Details */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 border-l-4 border-amber-500 pl-4">
                                        <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Section 2: Guarantor/Sponsor Details</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Guarantor Name</label>
                                            <input
                                                required
                                                value={formData.guarantorName}
                                                onChange={(e) => setFormData({ ...formData, guarantorName: e.target.value })}
                                                type="text"
                                                placeholder="Full name of sponsor"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Guarantor Mobile</label>
                                            <input
                                                required
                                                value={formData.guarantorMobile}
                                                onChange={(e) => setFormData({ ...formData, guarantorMobile: e.target.value })}
                                                type="tel"
                                                placeholder="0615559999"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Guarantor DOB</label>
                                            <input
                                                required
                                                value={formData.guarantorDOB}
                                                onChange={(e) => setFormData({ ...formData, guarantorDOB: e.target.value })}
                                                type="date"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Guarantor Place of Birth</label>
                                            <input
                                                required
                                                value={formData.guarantorPlaceOfBirth}
                                                onChange={(e) => setFormData({ ...formData, guarantorPlaceOfBirth: e.target.value })}
                                                type="text"
                                                placeholder="City"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Guarantor Address</label>
                                        <input
                                            required
                                            value={formData.guarantorAddress}
                                            onChange={(e) => setFormData({ ...formData, guarantorAddress: e.target.value })}
                                            type="text"
                                            placeholder="Physical location"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Relationship to Guarantor</label>
                                        <input
                                            required
                                            value={formData.relationshipToGuarantor}
                                            onChange={(e) => setFormData({ ...formData, relationshipToGuarantor: e.target.value })}
                                            type="text"
                                            placeholder="Father, Uncle, etc."
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tribal/Clan Leader</label>
                                            <input
                                                required
                                                value={formData.tribalLeader}
                                                onChange={(e) => setFormData({ ...formData, tribalLeader: e.target.value })}
                                                type="text"
                                                placeholder="Community leader name"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Leader's Mobile</label>
                                            <input
                                                required
                                                value={formData.leaderMobile}
                                                onChange={(e) => setFormData({ ...formData, leaderMobile: e.target.value })}
                                                type="tel"
                                                placeholder="0615558888"
                                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Policy Notice */}
                                <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl">
                                    <div className="flex items-start gap-3">
                                        <Shield className="text-amber-600 shrink-0 mt-1" size={20} />
                                        <div>
                                            <h4 className="font-bold text-amber-900 text-sm mb-2">Important Policy Notice</h4>
                                            <p className="text-xs text-amber-700 leading-relaxed">
                                                Employees must provide at least <strong>one month's notice</strong> before resigning.
                                                Failure to comply requires payment of a penalty equivalent to <strong>one full month's salary</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="p-8 border-t border-slate-100 flex items-center justify-end gap-4 shrink-0">
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
                                            {initialData ? 'Update Teacher' : 'Register Teacher'}
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
