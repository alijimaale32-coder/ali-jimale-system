"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
    Users,
    GraduationCap,
    CalendarCheck,
    FileText,
    Settings,
    LayoutDashboard,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Calculator,
    Upload,
    BookOpen,
    UserCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { translations } from '@/lib/translations'

const navItems = [
    { name: translations.nav.dashboard, icon: LayoutDashboard, href: '/dashboard', roles: ['ADMIN', 'MANAGER', 'TEACHER'] },
    { name: translations.nav.classes, icon: BookOpen, href: '/dashboard/classes', roles: ['ADMIN', 'MANAGER', 'TEACHER'] },
    { name: translations.nav.students, icon: GraduationCap, href: '/dashboard/students', roles: ['ADMIN', 'MANAGER'] },
    { name: translations.nav.teachers, icon: Users, href: '/dashboard/teachers', roles: ['ADMIN', 'MANAGER'] },
    { name: translations.nav.attendance, icon: CalendarCheck, href: '/dashboard/attendance', roles: ['ADMIN', 'MANAGER', 'TEACHER'] },
    { name: translations.nav.exams, icon: Upload, href: '/dashboard/exams', roles: ['ADMIN', 'MANAGER', 'TEACHER'] },
    { name: translations.nav.financials, icon: Calculator, href: '/dashboard/financials', roles: ['ADMIN', 'MANAGER'] },
    { name: translations.nav.reports, icon: FileText, href: '/dashboard/reports', roles: ['ADMIN', 'MANAGER'] },
    { name: translations.nav.settings, icon: Settings, href: '/dashboard/settings', roles: ['ADMIN', 'MANAGER'] },
]

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { user, role, logout } = useAuth()
    const [isCollapsed, setIsCollapsed] = React.useState(false)

    // Filter items based on user role
    const filteredItems = navItems.filter(item =>
        item.roles.includes(role as string)
    )

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '280px' }}
            className="h-screen bg-primary text-white flex flex-col relative transition-all duration-300 shadow-xl"
        >
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-xl font-outfit">AJ</span>
                </div>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col"
                    >
                        <span className="font-bold text-lg font-outfit whitespace-nowrap leading-tight">ALI JIM'ALE</span>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[9px] text-accent font-black uppercase tracking-widest">{role || translations.auth.guest}</span>
                            <div className="w-1 h-1 bg-accent rounded-full"></div>
                            <span className="text-[9px] text-white/50 font-medium">بوابة</span>
                        </div>
                    </motion.div>
                )}
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                {filteredItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 p-3 rounded-xl transition-all group",
                                isActive
                                    ? "bg-secondary text-white shadow-lg shadow-secondary/20"
                                    : "hover:bg-white/10 text-white/70 hover:text-white"
                            )}
                        >
                            <item.icon size={22} className={cn("shrink-0", isActive ? "text-white" : "group-hover:scale-110 transition-transform")} />
                            {!isCollapsed && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium"
                                >
                                    {item.name}
                                </motion.span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t border-white/10 bg-black/5">
                {!isCollapsed && (
                    <div className="mb-4 px-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                            <UserCircle size={20} />
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-wider">{translations.auth.authenticatedAs}</span>
                            <span className="text-xs font-bold truncate">{user?.name || translations.auth.unknownUser}</span>
                        </div>
                    </div>
                )}
                <button
                    onClick={logout}
                    className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-white/50 hover:text-red-400 transition-all group"
                >
                    <LogOut size={22} className="group-hover:translate-x-1 transition-transform" />
                    {!isCollapsed && <span className="font-medium text-sm">{translations.nav.signOut}</span>}
                </button>
            </div>

            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute top-20 -right-4 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-white border-2 border-primary hover:bg-white hover:text-secondary transition-colors shadow-lg"
            >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
        </motion.div>
    )
}
