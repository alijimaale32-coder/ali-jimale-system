"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    change?: string
    trend?: 'up' | 'down' | 'neutral'
    color?: 'primary' | 'secondary' | 'accent' | 'success'
}

export function StatCard({ title, value, icon: Icon, change, trend, color = 'primary' }: StatCardProps) {
    const colorMap = {
        primary: 'bg-primary/10 text-primary',
        secondary: 'bg-secondary/10 text-secondary',
        accent: 'bg-accent/20 text-accent',
        success: 'bg-emerald-100 text-emerald-600',
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4 relative overflow-hidden group"
        >
            <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-xl", colorMap[color])}>
                    <Icon size={24} />
                </div>
                {change && (
                    <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full",
                        trend === 'up' ? "bg-emerald-50 text-emerald-600" :
                            trend === 'down' ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-600"
                    )}>
                        {change}
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
            </div>

            <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-110 transition-transform">
                <Icon size={120} />
            </div>
        </motion.div>
    )
}
