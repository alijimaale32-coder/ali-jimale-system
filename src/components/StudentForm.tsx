"use client"

import React from 'react'
import { X, Save, User, Phone, MapPin, Calendar, Users2, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Student } from '@/app/dashboard/students/page'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface Class {
    id: string
    className: string
    departmentId: string
    gender: 'Boys' | 'Girls'
}

interface StudentFormProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: Partial<Student>) => void
    initialData?: Student | null
    loading?: boolean
}

export function StudentForm({ isOpen, onClose, onSubmit, initialData, loading }: StudentFormProps) {
    const [classes, setClasses] = React.useState<Class[]>([])
    const [formData, setFormData] = React.useState<Partial<Student>>({
        name: '',
        fatherNumber: '',
        motherNumber: '',
        birthday: '',
        placeOfBirth: '',
        motherName: '',
        district: '',
        clan: '',
        age: '',
        gender: 'Boy',
        status: 'Active',
        magacaXalqada: '',
        goobtaXalqada: '',
        waqtigaBiiray: '',
        waqtigaBaxay: '',
        classId: '',
        ...initialData
    })

    // Fetch classes
    React.useEffect(() => {
        const fetchClasses = async () => {
            try {
                const classesSnapshot = await getDocs(collection(db, 'classes'))
                const classesList = classesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Class))
                setClasses(classesList)
            } catch (error) {
                console.error('Error fetching classes:', error)
                // Fallback to localStorage
                const savedClasses = localStorage.getItem('classes')
                if (savedClasses) {
                    setClasses(JSON.parse(savedClasses))
                }
            }
        }
        if (isOpen) {
            fetchClasses()
        }
    }, [isOpen])

    React.useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                name: '',
                fatherNumber: '',
                motherNumber: '',
                birthday: '',
                placeOfBirth: '',
                motherName: '',
                district: '',
                clan: '',
                age: '',
                gender: 'Boy',
                status: 'Active',
                magacaXalqada: '',
                goobtaXalqada: '',
                waqtigaBiiray: '',
                waqtigaBaxay: '',
            })
        }
    }, [initialData, isOpen])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-end">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="relative w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto custom-scrollbar"
                >
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 font-outfit">
                                {initialData ? 'Update Student Record' : 'Register New Student'}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">Please fill in all the required information accurately.</p>
                        </div>
                        <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors">
                            <X size={20} className="text-slate-400" />
                        </button>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            onSubmit(formData)
                        }}
                        className="p-8 space-y-8"
                    >
                        {/* Gender Selection */}
                        <div className="bg-slate-50 p-1.5 rounded-2xl flex gap-1">
                            {['Boy', 'Girl'].map((g) => (
                                <button
                                    key={g}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, gender: g as any })}
                                    className={cn(
                                        "flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2",
                                        formData.gender === g
                                            ? g === 'Boy' ? "bg-primary text-white shadow-lg" : "bg-secondary text-white shadow-lg"
                                            : "text-slate-500 hover:bg-slate-100"
                                    )}
                                >
                                    <Users2 size={18} /> {g}s
                                </button>
                            ))}
                        </div>

                        {/* Academic Info - Xalqada */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-l-4 border-emerald-500 pl-4">
                                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Academic (Xalqada) Info</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Magaca Xalqada</label>
                                    <input
                                        required
                                        value={formData.magacaXalqada}
                                        onChange={(e) => setFormData({ ...formData, magacaXalqada: e.target.value })}
                                        type="text"
                                        placeholder="Enter class name"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Goobta Xalqada</label>
                                    <input
                                        required
                                        value={formData.goobtaXalqada}
                                        onChange={(e) => setFormData({ ...formData, goobtaXalqada: e.target.value })}
                                        type="text"
                                        placeholder="Location of study"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Waqtiga uu ku biiray</label>
                                    <input
                                        required
                                        value={formData.waqtigaBiiray}
                                        onChange={(e) => setFormData({ ...formData, waqtigaBiiray: e.target.value })}
                                        type="date"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Waqtiga uu ka baxay</label>
                                    <input
                                        required
                                        value={formData.waqtigaBaxay}
                                        onChange={(e) => setFormData({ ...formData, waqtigaBaxay: e.target.value })}
                                        type="date"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            {/* Class Assignment */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <BookOpen size={14} /> Assign to Class
                                </label>
                                <select
                                    value={formData.classId || ''}
                                    onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                >
                                    <option value="">-- No Class Assigned --</option>
                                    {classes
                                        .filter(c => c.gender === (formData.gender === 'Boy' ? 'Boys' : 'Girls'))
                                        .map((cls) => (
                                            <option key={cls.id} value={cls.id}>
                                                {cls.className}
                                            </option>
                                        ))}
                                </select>
                                <p className="text-xs text-slate-500 italic">
                                    Only classes matching student's gender are shown
                                </p>
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
                                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Basic Information</h3>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            type="text"
                                            placeholder="Enter student full name"
                                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mother's Name</label>
                                        <input
                                            required
                                            value={formData.motherName}
                                            onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                                            type="text"
                                            placeholder="Mother's name"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Clan</label>
                                        <input
                                            required
                                            value={formData.clan}
                                            onChange={(e) => setFormData({ ...formData, clan: e.target.value })}
                                            type="text"
                                            placeholder="Student's clan"
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Parent Contact */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-l-4 border-secondary pl-4">
                                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Parent Contacts</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Father's Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            required
                                            value={formData.fatherNumber}
                                            onChange={(e) => setFormData({ ...formData, fatherNumber: e.target.value })}
                                            type="tel"
                                            placeholder="061XXXXXXX"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mother's Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            required
                                            value={formData.motherNumber}
                                            onChange={(e) => setFormData({ ...formData, motherNumber: e.target.value })}
                                            type="tel"
                                            placeholder="061XXXXXXX"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Birth & Location */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-l-4 border-accent pl-4">
                                <h3 className="font-bold text-slate-900 uppercase tracking-widest text-xs">Location & Birth</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2 col-span-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Birthday</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            required
                                            value={formData.birthday}
                                            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                                            type="date"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Age</label>
                                    <input
                                        required
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        type="number"
                                        placeholder="Years"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Place of Birth</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                        <input
                                            required
                                            value={formData.placeOfBirth}
                                            onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                                            type="text"
                                            placeholder="City/Region"
                                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">District</label>
                                    <input
                                        required
                                        value={formData.district}
                                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                                        type="text"
                                        placeholder="Current district"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 flex gap-4 sticky bottom-0 bg-white">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 px-6 rounded-2xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                disabled={loading}
                                type="submit"
                                className="flex-2 py-4 px-8 rounded-2xl bg-primary text-white font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Save size={20} /> {initialData ? 'Update Records' : 'Save Registration'}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
