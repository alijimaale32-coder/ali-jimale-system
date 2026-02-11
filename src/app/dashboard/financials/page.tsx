"use client"

import React from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import {
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    CreditCard,
    FileText,
    Download,
    Filter
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export default function FinancialsPage() {
    const [expenses, setExpenses] = React.useState<{ name: string, price: number }[]>([
        { name: 'Initial Setup', price: 1200 },
        { name: 'Library Expansion', price: 450 }
    ])
    const [newName, setNewName] = React.useState('')
    const [newPrice, setNewPrice] = React.useState('')

    const addExpense = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newName || !newPrice) return
        setExpenses([...expenses, { name: newName, price: parseFloat(newPrice) }])
        setNewName('')
        setNewPrice('')
    }

    const removeExpense = (index: number) => {
        setExpenses(expenses.filter((_, i) => i !== index))
    }

    const totalExpenses = expenses.reduce((sum, item) => sum + item.price, 0)

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 font-outfit">Expense Ledger</h1>
                        <p className="text-slate-500 mt-1 font-medium">Add items and prices to track your institute's spending.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Form Column */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                                <TrendingUp size={20} className="text-secondary" /> Add New Item
                            </h3>
                            <form onSubmit={addExpense} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Item Name</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="e.g. New Textbooks"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-secondary/5 transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price ($)</label>
                                    <input
                                        type="number"
                                        value={newPrice}
                                        onChange={(e) => setNewPrice(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-secondary/5 transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-4 bg-secondary text-white rounded-2xl font-black text-sm shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    Add to Ledger
                                </button>
                            </form>
                        </div>

                        {/* Total Highlight */}
                        <div className="bg-slate-900 p-8 rounded-[32px] text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-2">Calculated Total</p>
                                <h2 className="text-4xl font-black font-outfit text-yellow-400">
                                    ${totalExpenses.toLocaleString()}
                                </h2>
                            </div>
                            <DollarSign className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-all" size={160} />
                        </div>
                    </div>

                    {/* Expense List Column */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h3 className="text-lg font-black text-slate-900 font-outfit">Live Ledger Items</h3>
                                <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500 uppercase">
                                    {expenses.length} Items Total
                                </span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                {expenses.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-300 gap-4 opacity-50">
                                        <FileText size={48} />
                                        <p className="font-bold text-sm uppercase">Ledger is Empty</p>
                                    </div>
                                ) : (
                                    expenses.map((exp, idx) => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={idx}
                                            className="flex items-center justify-between p-5 bg-slate-50 rounded-[24px] group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all border border-transparent hover:border-slate-100"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-secondary group-hover:scale-110 transition-all">
                                                    {idx + 1}
                                                </div>
                                                <span className="font-bold text-slate-900">{exp.name}</span>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <span className="font-black text-slate-900">${exp.price.toLocaleString()}</span>
                                                <button
                                                    onClick={() => removeExpense(idx)}
                                                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                                >
                                                    <Filter size={18} className="rotate-45" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

