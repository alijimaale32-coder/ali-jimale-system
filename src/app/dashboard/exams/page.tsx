"use client"

import React, { useEffect, useState, useRef } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import {
    Upload,
    FileUp,
    FileText,
    CheckCircle2,
    AlertCircle,
    Trash2,
    Download,
    Loader2,
    Eye,
    ShieldCheck,
    Star
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useAuth } from '@/context/AuthContext'
import { toast, Toaster } from 'react-hot-toast'
import { translations } from '@/lib/translations'

export default function ExamsPage() {
    const { user, role } = useAuth()
    const [dragActive, setDragActive] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [exams, setExams] = useState([])
    const [loading, setLoading] = useState(true)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const isAdmin = role === 'ADMIN' || role === 'MANAGER'
    const isTeacher = role === 'TEACHER'

    useEffect(() => {
        if (user) {
            fetchExams()
        }
    }, [user])

    const fetchExams = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/exams')
            const data = await res.json()
            if (data.success) {
                setExams(data.exams)
            }
        } catch (error) {
            console.error('Fetch exams error:', error)
            toast.error(translations.messages.errorLoadingData)
        } finally {
            setLoading(false)
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0])
        }
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFileUpload(e.target.files[0])
        }
    }

    const handleFileUpload = async (file: File) => {
        if (!isTeacher) {
            toast.error(translations.messages.operationFailed)
            return
        }

        setUploading(true)

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', file.name.replace(/\.[^/.]+$/, ""));
            formData.append('description', `Uploaded by ${user?.name}`);

            const res = await fetch('/api/exams', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                toast.success(translations.messages.operationSuccess)
                fetchExams()
            } else {
                toast.error(data.message || translations.messages.operationFailed)
            }
        } catch (error) {
            console.error('Upload handler error:', error)
            toast.error(translations.messages.operationFailed)
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm(translations.messages.confirmAction)) return

        try {
            const res = await fetch(`/api/exams?id=${id}`, { method: 'DELETE' })
            const data = await res.json()
            if (data.success) {
                toast.success(translations.messages.operationSuccess)
                fetchExams()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(translations.messages.operationFailed)
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    return (
        <DashboardLayout>
            <Toaster position="top-right" />
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-3">
                            <Star size={12} className="fill-primary" /> {translations.examsSection?.title || 'Examination Portal'}
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 font-outfit tracking-tight">
                            {translations.examsSection?.title || 'Examination Portal'}
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium italic">
                            {isTeacher
                                ? translations.examsSection?.subtitle || "Upload and manage your exam materials here."
                                : "Manage and review all uploaded examination materials institution-wide (Stored in MongoDB)."}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {/* Upload Area - Only for Teachers */}
                        {isTeacher && (
                            <div
                                className={cn(
                                    "relative h-[250px] rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center transition-all overflow-hidden shadow-sm",
                                    dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50/50"
                                )}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileSelect}
                                />

                                <AnimatePresence mode="wait">
                                    {uploading ? (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center w-full max-w-xs"
                                        >
                                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4 animate-pulse">
                                                <Loader2 size={32} className="animate-spin" />
                                            </div>
                                            <p className="text-slate-900 font-black mb-2 uppercase text-[10px] tracking-widest">{translations.statusWords.loading}...</p>
                                            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                                <div className="bg-primary h-full animate-progress-indefinite" />
                                            </div>
                                            <p className="text-[10px] text-primary mt-2 font-black">STREAMING TO DATABASE</p>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col items-center cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-4 transform -rotate-6 group-hover:rotate-0 transition-transform shadow-lg">
                                                <FileUp size={40} />
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 text-center uppercase tracking-tight">{translations.actions.upload} {translations.exams}</h3>
                                            <p className="text-slate-500 font-medium mb-6 text-center px-4 text-sm mt-1">{translations.searchStudents || "Drag and drop any file here, or browse"}</p>
                                            <div className="flex gap-4">
                                                <span className="text-[9px] font-black uppercase text-primary/40 tracking-[0.2em] border border-primary/10 px-2 py-1 rounded">LOCAL MONGODB STORAGE</span>
                                                <span className="text-[9px] font-black uppercase text-primary/40 tracking-[0.2em] border border-primary/10 px-2 py-1 rounded">NO EXTERNAL DEPENDENCIES</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* Exam Records Table-like View */}
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden min-h-[450px] relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between relative z-10">
                                <h3 className="font-black text-slate-900 uppercase tracking-tight text-lg">
                                    {isAdmin ? "Global Examination Repository" : translations.examsSection?.title || "Your Submissions"}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest">
                                        {exams.length} {translations.recordsToday || "FILES"}
                                    </span>
                                </div>
                            </div>

                            <div className="divide-y divide-slate-50 relative z-10">
                                {loading ? (
                                    <div className="p-20 flex flex-col items-center justify-center text-slate-400">
                                        <Loader2 size={32} className="animate-spin mb-4 text-primary" />
                                        <p className="text-xs font-black uppercase tracking-widest">{translations.statusWords.loading} {translations.exams}...</p>
                                    </div>
                                ) : exams.length === 0 ? (
                                    <div className="p-20 flex flex-col items-center justify-center text-slate-300">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                            <FileText size={32} className="opacity-40" />
                                        </div>
                                        <p className="text-xs font-black uppercase tracking-widest">{translations.messages.noData}</p>
                                    </div>
                                ) : (
                                    exams.map((exam: any) => (
                                        <div key={exam._id} className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-slate-50/50 transition-all">
                                            <div className="flex items-center gap-6">
                                                <div className="w-16 h-16 bg-white border border-slate-100 rounded-[24px] flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm overflow-hidden shrink-0">
                                                    <FileText size={28} />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="font-black text-slate-900 text-base leading-none group-hover:text-primary transition-colors">{exam.title}</p>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-[10px] font-bold text-slate-400">{new Date(exam.createdAt).toLocaleDateString()}</span>
                                                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                        <span className="text-[10px] font-black text-slate-500 uppercase">{formatFileSize(exam.fileSize)}</span>
                                                        {isAdmin && exam.uploadedBy && (
                                                            <>
                                                                <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                                                                <span className="text-[10px] font-black text-secondary uppercase tracking-tight decoration-secondary/30 underline decoration-2 underline-offset-2">BY: {exam.uploadedBy.name}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-4">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm",
                                                    exam.status === 'Approved' ? "bg-emerald-100 text-emerald-700" :
                                                        exam.status === 'Rejected' ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                                                )}>
                                                    {exam.status === 'Pending' ? translations.statusWords.pending : exam.status}
                                                </span>

                                                <div className="flex gap-2">
                                                    <a
                                                        href={exam.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-500 bg-white border border-slate-100 hover:bg-slate-900 hover:text-white transition-all shadow-sm group/btn"
                                                        title={translations.actions.view}
                                                    >
                                                        <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
                                                    </a>
                                                    <a
                                                        href={exam.fileUrl}
                                                        download={exam.fileName}
                                                        className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-500 bg-white border border-slate-100 hover:bg-primary hover:text-white transition-all shadow-sm group/btn"
                                                        title={translations.actions.download}
                                                    >
                                                        <Download size={18} className="group-hover/btn:scale-110 transition-transform" />
                                                    </a>
                                                    {(isAdmin || (isTeacher && exam.uploadedBy?._id === user?.id)) && (
                                                        <button
                                                            onClick={() => handleDelete(exam._id)}
                                                            className="w-11 h-11 rounded-2xl flex items-center justify-center text-slate-400 bg-white border border-slate-100 hover:bg-red-500 hover:text-white transition-all shadow-sm group/btn"
                                                            title={translations.actions.delete}
                                                        >
                                                            <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Guidelines */}
                    <div className="space-y-6">
                        <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-primary/30 transition-all"></div>

                            <h3 className="font-black flex items-center gap-3 mb-6 relative z-10 uppercase text-xs tracking-[0.2em] text-primary">
                                <ShieldCheck size={20} /> MongoDB GridFS Protocol
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {[
                                    { text: "Files are stored directly in the institute's MongoDB cluster.", color: "bg-primary" },
                                    { text: "GridFS splitting ensures no 16MB limit per exam paper.", color: "bg-secondary" },
                                    { text: "Privacy ensured via database-level encryption and access logs.", color: "bg-accent" }
                                ].map((step, idx) => (
                                    <div key={idx} className="flex gap-4 group/step">
                                        <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-transform group-hover/step:scale-150", step.color)}></div>
                                        <p className="text-xs text-slate-400 font-medium leading-relaxed group-hover/step:text-white transition-colors">{step.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 p-5 bg-white/5 backdrop-blur-xl rounded-[28px] border border-white/5 flex items-center gap-4 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:rotate-12 transition-transform shadow-inner">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-[0.1em] text-white">{user?.name}</p>
                                    <p className="text-[10px] text-white/40 font-black uppercase tracking-tighter">MONGODB STORAGE ACTIVE</p>
                                </div>
                            </div>
                        </div>

                        {isAdmin && (
                            <div className="bg-emerald-50 p-8 rounded-[40px] border border-emerald-100/50 shadow-sm relative overflow-hidden">
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl"></div>
                                <h4 className="font-black text-emerald-900 text-[10px] mb-3 flex items-center gap-3 uppercase tracking-widest">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    Database Administration
                                </h4>
                                <p className="text-[11px] text-emerald-800/60 font-medium leading-relaxed italic">
                                    "Exam materials are now natively hosted on institute servers. This removal of Firebase dependencies ensures full data sovereignty."
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx global>{`
                @keyframes progress-indefinite {
                    0% { left: -40%; width: 40%; }
                    50% { left: 40%; width: 60%; }
                    100% { left: 100%; width: 40%; }
                }
                .animate-progress-indefinite {
                    position: relative;
                    animation: progress-indefinite 2s infinite linear;
                }
            `}</style>
        </DashboardLayout>
    )
}
