"use client"

import React from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { StatCard } from '@/components/StatCard'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import {
    Users,
    GraduationCap,
    TrendingUp,
    Calendar,
    BookOpen,
    DollarSign,
    ArrowRight,
    Star,
    Quote,
    Book,
    ShieldCheck,
    FileUp,
    Upload,
    FileText
} from 'lucide-react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { translations } from '@/lib/translations'

const data = [
    { name: 'Jan', students: 400, revenue: 2400 },
    { name: 'Feb', students: 300, revenue: 1398 },
    { name: 'Mar', students: 200, revenue: 9800 },
    { name: 'Apr', students: 278, revenue: 3908 },
    { name: 'May', students: 189, revenue: 4800 },
    { name: 'Jun', students: 239, revenue: 3800 },
]

export default function DashboardPage() {
    const { role, user } = useAuth()

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-3">
                            <Star size={12} className="fill-emerald-500" /> {translations.dashboard?.bismillah}
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 font-outfit tracking-tight">
                            {translations.dashboard?.title}
                        </h1>
                        <p className="text-slate-500 mt-1 font-medium">{translations.dashboard?.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white border border-slate-100 rounded-xl flex items-center gap-3 shadow-sm">
                            <Calendar size={18} className="text-primary" />
                            <span className="text-sm font-semibold">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* Teacher Specific Quick Access */}
                {role === 'TEACHER' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                        <Link href="/dashboard/exams" className="lg:col-span-2 group">
                            <div className="bg-primary p-8 rounded-[32px] text-white shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/20 transition-all"></div>
                                <div className="relative z-10 flex items-center justify-between h-full">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                            <FileUp size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black mb-2">Examination Upload Portal</h3>
                                            <p className="text-white/70 text-sm max-w-md leading-relaxed">Upload any exam material (PDF, ZIP, DOCX). No file size limits. Admins will review your uploads for printing.</p>
                                        </div>
                                        <div className="flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-2xl w-fit group-hover:bg-accent group-hover:text-slate-900 transition-all font-black text-xs uppercase tracking-widest shadow-lg">
                                            <Upload size={16} /> Start Uploading
                                        </div>
                                    </div>
                                    <div className="hidden lg:block shrink-0">
                                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                            <FileText size={48} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <div className="bg-slate-900 p-8 rounded-[32px] border border-slate-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group">
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mb-16 blur-2xl"></div>
                            <div className="relative z-10">
                                <h4 className="font-black text-primary mb-4 uppercase text-[10px] tracking-[0.2em]">Institutional Policy</h4>
                                <p className="text-sm font-medium text-slate-400 leading-relaxed italic">"Trust but verify. All exam materials must be uploaded 48 hours before the scheduled time to ensure quality printing and distribution."</p>
                            </div>
                            <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Session User</span>
                                <span className="text-xs font-bold text-accent uppercase">{user?.name}</span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Islamic Kitab & Hadith Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Kitab 1 */}
                    <IslamicCard
                        title="Sahih Al-Bukhari"
                        subtitle="صحيح البخاري"
                        description="The most authentic book after the Quran."
                        icon={Book}
                        color="bg-blue-500"
                        pattern="pattern-1"
                    />
                    {/* Kitab 2 */}
                    <IslamicCard
                        title="Sahih Muslim"
                        subtitle="صحيح مسلم"
                        description="Collection of authentic prophetic traditions."
                        icon={BookOpen}
                        color="bg-emerald-500"
                        pattern="pattern-2"
                    />
                    {/* Featured Hadith */}
                    <div className="lg:col-span-2 bg-slate-900 rounded-[32px] p-8 relative overflow-hidden group shadow-xl shadow-slate-200">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-all"></div>
                        <div className="relative z-10 flex flex-col h-full justify-center">
                            <div className="flex items-center gap-2 mb-4">
                                <Quote className="text-primary" size={24} />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{translations.dashboard?.hadith?.title}</span>
                            </div>
                            <p className="text-xl font-arabic text-white leading-relaxed text-right lg:text-left dir-rtl italic">
                                «طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ»
                            </p>
                            <p className="text-sm font-medium text-slate-400 mt-4 leading-relaxed">
                                "Seeking knowledge is an obligation upon every Muslim."
                            </p>
                            <div className="mt-6 flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                {translations.dashboard?.hadith?.source}: Sunan Ibn Majah
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student Excellence Backdrop Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Living Background Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-2 bg-slate-100 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden h-[450px] group"
                    >
                        {/* BACKGROUND */}
                        <div className="absolute inset-0 z-0 bg-slate-200">
                            {/* Gradient Overlays for Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-transparent to-transparent"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="relative z-10 p-12 flex flex-col h-full justify-end">
                            <div className="space-y-6 bg-gradient-to-t from-slate-900/60 to-transparent p-6 -m-6 rounded-[40px]">
                                <div className="grid grid-cols-3 gap-6">
                                    {[
                                        { label: 'Hikma: Knowledge', val: 'طَلَبُ العِلْمِ فَرِيضَةٌ' },
                                        { label: 'Hikma: Excellence', val: 'مَنْ جَدَّ وَجَدَ' },
                                        { label: 'Hikma: Character', val: 'العِلْمُ زَيْنُ الفَتَى' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-3xl group/stat hover:bg-white/10 transition-all">
                                            <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                            <p className="text-sm font-arabic font-bold text-yellow-400 group-hover/stat:scale-105 transition-all">{stat.val}</p>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-yellow-400 text-xl font-arabic leading-relaxed text-right lg:text-left dir-rtl drop-shadow-lg">
                                    «العلمُ في الصِّغَرِ كالنَّقْشِ على الحَجَرِ، وطريقُ التميُّزِ يبدأُ بالتقوى»
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Institutional Insights Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-slate-900 rounded-[40px] shadow-2xl relative overflow-hidden group h-[450px] flex flex-col"
                    >
                        {/* Subtle Background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-slate-900 to-slate-900"></div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-[80px]"></div>
                        </div>

                        <div className="p-8 relative z-10 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-outfit font-black text-white flex items-center gap-3">
                                    <TrendingUp className="text-primary" size={20} /> {translations.dashboard?.insights?.title}
                                </h3>
                                <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">{translations.dashboard?.insights?.liveUpdate}</span>
                                </div>
                            </div>

                            <div className="space-y-4 flex-1 overflow-hidden">
                                {[
                                    { title: translations.dashboard?.stats?.studentEnrollment, metric: '1,248', status: translations.dashboard?.stats?.growth, icon: Users, trend: '+12% شهر' },
                                    { title: translations.dashboard?.stats?.attendanceVelocity, metric: '98.4%', status: translations.dashboard?.stats?.elite, icon: Calendar, trend: translations.dashboard?.stats?.stable },
                                    { title: translations.dashboard?.stats?.academicProgress, metric: '85%', status: translations.dashboard?.stats?.onTrack, icon: GraduationCap, trend: translations.dashboard?.stats?.evaluating },
                                    { title: translations.dashboard?.stats?.systemSecurity, metric: 'نشط', status: translations.dashboard?.stats?.secure, icon: ShieldCheck, trend: translations.dashboard?.stats?.verified },
                                ].map((insight, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all cursor-default group/item">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                                                <insight.icon size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white group-hover/item:text-primary transition-colors">{insight.title}</p>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{insight.trend}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-black text-white">{insight.metric}</p>
                                            <p className="text-[9px] font-black text-primary/70 uppercase tracking-tighter">{insight.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-6 py-4 rounded-2xl bg-white text-slate-900 text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                                {translations.dashboard?.insights?.viewFullAnalytics} <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    )
}

function IslamicCard({ title, subtitle, description, icon: Icon, color, pattern }: { title: string, subtitle: string, description: string, icon: any, color: string, pattern: string }) {
    return (
        <div className="bg-white p-7 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-default group relative overflow-hidden">
            <div className={cn("absolute top-0 right-0 w-24 h-24 opacity-[0.03] -mr-8 -mt-8 rounded-full", color)}></div>
            <div className="relative z-10">
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", color)}>
                    <Icon size={24} />
                </div>
                <div className="space-y-1">
                    <h3 className="text-lg font-black text-slate-900 font-outfit leading-tight">{title}</h3>
                    <p className="text-xs font-arabic text-primary font-bold">{subtitle}</p>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-3 leading-relaxed">
                    {description}
                </p>
            </div>
            <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={16} className="text-slate-300" />
            </div>
        </div>
    )
}
