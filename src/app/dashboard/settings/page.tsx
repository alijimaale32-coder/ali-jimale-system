"use client"

import React from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import {
    Settings,
    Building2,
    Shield,
    Bot,
    Save,
    Upload,
    Mail,
    Phone,
    Globe,
    Lock,
    Users,
    Key,
    MessageSquare,
    Zap,
    CheckCircle2,
    RefreshCw
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

type TabType = 'institute' | 'security' | 'ai'

export default function SettingsPage() {
    const [activeTab, setActiveTab] = React.useState<TabType>('institute')
    const [isSaving, setIsSaving] = React.useState(false)

    const handleSave = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
            alert('Settings updated successfully!')
        }, 1200)
    }

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 font-outfit tracking-tight">System Settings</h1>
                        <p className="text-slate-500 font-medium mt-2">Configure institutional identity, security protocols, and AI behavior</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <RefreshCw size={20} className="animate-spin" />
                        ) : (
                            <Save size={20} />
                        )}
                        {isSaving ? 'Synchronizing...' : 'Save Configuration'}
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex p-1.5 bg-slate-100 rounded-[24px] w-fit">
                    <TabButton
                        active={activeTab === 'institute'}
                        onClick={() => setActiveTab('institute')}
                        icon={Building2}
                        label="Institute Profile"
                    />
                    <TabButton
                        active={activeTab === 'security'}
                        onClick={() => setActiveTab('security')}
                        icon={Shield}
                        label="Security & Access"
                    />
                    <TabButton
                        active={activeTab === 'ai'}
                        onClick={() => setActiveTab('ai')}
                        icon={Bot}
                        label="AI Assistant"
                    />
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-8 md:p-12 relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {activeTab === 'institute' && (
                            <motion.div
                                key="institute"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <SectionHeader
                                    title="Institutional Identity"
                                    description="Manage your school's official branding and contact details"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100 group">
                                            <div className="w-20 h-20 bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 group-hover:border-primary group-hover:text-primary transition-all cursor-pointer">
                                                <Upload size={24} />
                                                <span className="text-[10px] font-black mt-2 uppercase">Logo</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-slate-900 text-sm">Institute Logo</h4>
                                                <p className="text-xs text-slate-500 mt-1">Recommended size: 512x512px (PNG/SVG)</p>
                                            </div>
                                        </div>

                                        <InputField label="Institute Official Name" value="Ali Jim'ale Islamic Institute" icon={Building2} />
                                        <InputField label="Official Email" value="info@alijimale.edu.so" icon={Mail} />
                                    </div>

                                    <div className="space-y-6">
                                        <InputField label="Lead Administrator" value="Dr. Ali Jim'ale" icon={Users} />
                                        <InputField label="Contact Telephone" value="+252 61 XXX XXXX" icon={Phone} />
                                        <InputField label="Website Portfolio" value="www.alijimale.edu.so" icon={Globe} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <SectionHeader
                                    title="Security & Permissions"
                                    description="Define who can access sensitive student and financial data"
                                />

                                <div className="grid grid-cols-1 gap-6">
                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                                                <RefreshCw size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Database Auto-Sync</h4>
                                                <p className="text-xs text-slate-500 font-medium">Automatically push attendance logs to cloud every 5 mins</p>
                                            </div>
                                        </div>
                                        <Toggle active={true} />
                                    </div>

                                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
                                                <Lock size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900">Two-Factor Authentication</h4>
                                                <p className="text-xs text-slate-500 font-medium">Require mobile verification for administrator logins</p>
                                            </div>
                                        </div>
                                        <Toggle active={false} />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                        <div className="p-6 border border-slate-100 rounded-3xl hover:border-primary/20 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                                    <Users size={20} />
                                                </div>
                                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Staff Roles</h4>
                                            </div>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">Assign specific permissions to teachers, examiners, and financial officers.</p>
                                            <button className="text-xs font-black text-primary uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">Manage Access <Zap size={10} /></button>
                                        </div>

                                        <div className="p-6 border border-slate-100 rounded-3xl hover:border-primary/20 transition-all cursor-pointer group">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                                                    <Key size={20} />
                                                </div>
                                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">API Security</h4>
                                            </div>
                                            <p className="text-xs font-medium text-slate-500 leading-relaxed mb-4">Secure communication keys for AI integration and external reporting tools.</p>
                                            <button className="text-xs font-black text-secondary uppercase tracking-widest hover:translate-x-1 transition-transform inline-flex items-center gap-2">Rotate Keys <Zap size={10} /></button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'ai' && (
                            <motion.div
                                key="ai"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <SectionHeader
                                    title="AI Assistant Intelligence"
                                    description="Fine-tune how your AI co-pilot interacts with students and staff"
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-4">
                                            <h4 className="font-black text-slate-900 text-xs uppercase tracking-widest flex items-center gap-2">
                                                <MessageSquare size={14} className="text-primary" /> Assistant Personality
                                            </h4>
                                            <div className="space-y-2">
                                                <RadioOption active={true} label="Institutional & Formal" description="Focuses on efficiency and precision" />
                                                <RadioOption active={false} label="Supportive & Guiding" description="Uses friendly, conversational language" />
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">Auto-Student Registration</h4>
                                                <p className="text-[10px] text-slate-500 mt-1">Allow AI to directly add students to database</p>
                                            </div>
                                            <Toggle active={true} />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-all"></div>
                                            <div className="relative z-10">
                                                <Bot className="text-primary mb-4" size={32} />
                                                <h4 className="text-white font-black text-xl font-outfit">AI Status: Optimized</h4>
                                                <p className="text-slate-400 text-xs mt-2 font-medium leading-relaxed">System is running on Gemini High-Efficiency models. All natural language processing is local to your institution.</p>
                                                <div className="mt-6 flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                                    Neural Engine Ready
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex items-center justify-between">
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm">Analyze Attachments</h4>
                                                <p className="text-[10px] text-slate-500 mt-1">Allow AI to read uploaded report images</p>
                                            </div>
                                            <Toggle active={true} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </DashboardLayout>
    )
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean, onClick: () => void, icon: any, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all font-bold text-sm",
                active
                    ? "bg-white text-slate-900 shadow-md ring-1 ring-slate-200"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            )}
        >
            <Icon size={18} className={cn(active ? "text-primary" : "text-slate-400")} />
            {label}
        </button>
    )
}

function SectionHeader({ title, description }: { title: string, description: string }) {
    return (
        <div className="border-b border-slate-100 pb-6 mb-8">
            <h2 className="text-2xl font-black text-slate-900 font-outfit tracking-tight">{title}</h2>
            <p className="text-sm font-medium text-slate-500 mt-1">{description}</p>
        </div>
    )
}

function InputField({ label, value, icon: Icon }: { label: string, value: string, icon: any }) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">{label}</label>
            <div className="relative group">
                <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-all" size={18} />
                <input
                    type="text"
                    defaultValue={value}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all outline-none"
                />
            </div>
        </div>
    )
}

function Toggle({ active }: { active: boolean }) {
    const [isOn, setIsOn] = React.useState(active)
    return (
        <button
            onClick={() => setIsOn(!isOn)}
            className={cn(
                "w-12 h-6 px-1 rounded-full transition-all flex items-center",
                isOn ? "bg-primary shadow-lg shadow-primary/20" : "bg-slate-200"
            )}
        >
            <motion.div
                animate={{ x: isOn ? 24 : 0 }}
                className="w-4 h-4 bg-white rounded-full shadow-sm"
            />
        </button>
    )
}

function RadioOption({ active, label, description }: { active: boolean, label: string, description: string }) {
    const [isSelected, setIsSelected] = React.useState(active)
    return (
        <label className={cn(
            "flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer",
            isSelected ? "bg-white border-primary border-2 shadow-sm" : "bg-white border-slate-100 hover:border-slate-200"
        )} onClick={() => setIsSelected(true)}>
            <div className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                isSelected ? "border-primary" : "border-slate-300"
            )}>
                {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
            </div>
            <div>
                <p className="font-bold text-slate-900 text-xs">{label}</p>
                <p className="text-[10px] text-slate-500 font-medium">{description}</p>
            </div>
        </label>
    )
}

