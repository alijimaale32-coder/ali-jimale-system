"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, ShieldCheck, UserCog, ArrowRight, Sparkles, Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth, UserRole } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import Link from 'next/link'

export default function LoginPage() {
    const { login } = useAuth()
    const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')

    const roles = [
        {
            id: 'ADMIN',
            label: 'Administrator',
            icon: ShieldCheck,
            desc: 'Full system control',
            color: 'bg-primary'
        },
        {
            id: 'MANAGER',
            label: 'Portal Manager',
            icon: UserCog,
            desc: 'Operational access',
            color: 'bg-secondary'
        },
        {
            id: 'TEACHER',
            label: 'Class Teacher',
            icon: GraduationCap,
            desc: 'Academic management',
            color: 'bg-accent'
        }
    ]

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setIsSubmitting(true)

        const result = await login(email, password, selectedRole)

        if (!result.success) {
            setError(result.message)
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-outfit">
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-5xl bg-white rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative z-10 flex flex-col md:row-reverse md:flex-row h-[700px]"
            >
                {/* Information Side */}
                <div className="md:w-5/12 bg-primary p-12 text-white flex flex-col justify-between relative">
                    <div className="relative z-20">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                            <span className="text-primary font-black text-3xl">AJ</span>
                        </div>
                        <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
                            Ali Jim'ale <br />
                            <span className="text-accent underline decoration-4 underline-offset-8">Portal Access</span>
                        </h1>
                        <div className="space-y-4 text-white/70 text-sm font-medium">
                            <p>Enter your institutional credentials to access your workspace.</p>
                            <div className="pt-8 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                    <span>Encrypted Secure Login</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                                    <span>Activity Audit Enabled</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-20 flex items-center gap-2">
                        <Sparkles size={16} className="text-accent" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{selectedRole} MODE ACTIVE</span>
                    </div>

                    <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
                    </div>
                </div>

                {/* Login Form Side */}
                <div className="flex-1 p-12 bg-white flex flex-col justify-center overflow-y-auto custom-scrollbar">
                    <div className="mb-8">
                        <h2 className="text-2xl font-black text-primary">Identity Verification</h2>
                        <p className="text-slate-500 font-medium text-xs mt-1">Please select your role and enter your secure key.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Role Switcher */}
                        <div className="grid grid-cols-3 gap-3">
                            {roles.map((role) => (
                                <button
                                    key={role.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedRole(role.id as UserRole)
                                        setError('')
                                    }}
                                    className={cn(
                                        "p-3 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                                        selectedRole === role.id
                                            ? "border-primary bg-primary/5 text-primary"
                                            : "border-slate-50 bg-slate-50/50 text-slate-300 hover:border-slate-100"
                                    )}
                                >
                                    <role.icon size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-tighter">{role.id}</span>
                                </button>
                            ))}
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-[12px] font-bold"
                            >
                                <AlertCircle size={18} />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Institutional Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={18} />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="e.g. name@alijimale.edu"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                                    />
                                </div>
                            </div>

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
                            disabled={isSubmitting}
                            className="w-full py-5 bg-primary text-white rounded-[24px] font-black text-base shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Verify & Enter Portal
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            New instructor? <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">Register your ID</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
