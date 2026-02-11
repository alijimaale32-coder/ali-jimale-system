"use client"

import React from 'react'
import { Sidebar } from './Sidebar'
import { Search, Bell, User } from 'lucide-react'
import { AIAssistant } from './AIAssistant'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, role } = useAuth()
    const router = useRouter()

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login')
        }
    }, [user, loading, router])

    if (loading || !user) {
        return (
            <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-primary uppercase tracking-[0.3em] text-[10px]">Authenticating Suite...</p>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-background overflow-hidden text-slate-800 font-outfit">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-10 shrink-0">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-md w-full group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Universal Search..."
                                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-0.5 transition-all relative group">
                            <Bell size={20} className="text-slate-400 group-hover:text-primary transition-colors" />
                            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-secondary rounded-full border-2 border-white"></span>
                        </button>

                        <div className="h-10 w-px bg-slate-100"></div>

                        <div className="flex items-center gap-4 pl-2 group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-slate-900 leading-none mb-1 uppercase tracking-tight">{user.name}</p>
                                <div className="flex items-center justify-end gap-1.5">
                                    <div className={cn(
                                        "w-1.5 h-1.5 rounded-full",
                                        role === 'ADMIN' ? "bg-primary" : role === 'MANAGER' ? "bg-secondary" : "bg-accent"
                                    )}></div>
                                    <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{role}</p>
                                </div>
                            </div>
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transition-all group-hover:scale-110",
                                role === 'ADMIN' ? "bg-primary shadow-primary/20" : role === 'MANAGER' ? "bg-secondary shadow-secondary/20" : "bg-accent shadow-accent/20"
                            )}>
                                <User size={24} />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-slate-50/50">
                    {children}
                </main>
            </div>
            <AIAssistant />
        </div>
    )
}
