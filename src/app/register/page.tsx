"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, ArrowLeft, UserPlus, Mail, Lock, User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'

export default function RegisterPage() {
    const { register } = useAuth()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!name || !email || !password) {
            setError('Please complete all identification fields.')
            return
        }

        // Registering explicitly as a TEACHER role
        register({ name, email, role: 'TEACHER', password })
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-outfit">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-xl bg-white rounded-[40px] shadow-2xl shadow-slate-200/40 border border-slate-100 overflow-hidden relative z-10"
            >
                <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/5 transition-all">
                            <ArrowLeft size={18} />
                        </Link>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 leading-none">Teacher Registration</h2>
                            <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Instructor Portal Access</p>
                        </div>
                    </div>
                    <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center">
                        <GraduationCap size={24} />
                    </div>
                </div>

                <form onSubmit={handleRegister} className="p-10 space-y-6">
                    {error && (
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-[12px] font-bold flex items-center gap-3"
                        >
                            <User size={16} /> {error}
                        </motion.div>
                    )}

                    <div className="space-y-4">
                        {/* Name Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Full Identity Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Sheikh Ahmed Ali"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@alijimale.edu"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Access Key (Password)</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group mt-4"
                    >
                        Initialize Teacher ID
                        <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                    </button>

                    <p className="text-center text-[11px] font-medium text-slate-400">
                        Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Return to Login</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    )
}
