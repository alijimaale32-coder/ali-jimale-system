"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { GraduationCap, ShieldCheck, BarChart3, Users2, ArrowRight, ChevronRight, BookOpen, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl font-outfit shadow-lg shadow-primary/20">
              AJ
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 font-outfit leading-tight tracking-tight uppercase">Ali Jim'ale</span>
              <span className="text-[10px] text-secondary font-black uppercase tracking-[0.2em] leading-tight">Islamic Institute</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Programs</Link>
            <Link href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">About Us</Link>
            <Link href="#" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">Resources</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm font-bold text-primary hover:text-primary/80 transition-all">
              Login
            </Link>
            <Link
              href="/dashboard"
              className="bg-primary text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            >
              Access Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-slate-50 rounded-full blur-[120px] -z-10 opacity-50"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-[0.2em]">
              <Star size={12} className="text-emerald-500 fill-emerald-500" /> Bismillahi Rahmani Rahim
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-black text-slate-900 font-outfit leading-[1.1] tracking-tight">
                Unifying <span className="text-primary italic">Knowledge</span> & <span className="text-secondary">Faith</span>.
              </h1>
              {/* Arabic Calligraphy Style Text */}
              <div className="pt-2">
                <p className="text-2xl font-arabic text-primary/80 leading-loose text-right lg:text-left dir-rtl">
                  «مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ»
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">— Hadith: Sahih Muslim</p>
              </div>
            </div>

            <p className="text-xl text-slate-500 leading-relaxed font-medium max-w-xl">
              The Next-Generation Management System for Ali Jim'ale Institute. Empowering teachers, students, and administrators with advanced digital tools for Islamic excellence.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/dashboard"
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                Go to Dashboard <ArrowRight size={20} />
              </Link>
              <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-8 pt-8 border-t border-slate-100">
              <div>
                <p className="text-2xl font-black text-slate-900">1,200+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Students</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-black text-slate-900">45+</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Faculty</p>
              </div>
              <div className="w-px h-8 bg-slate-200"></div>
              <div>
                <p className="text-2xl font-black text-slate-900">98%</p>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Retention</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            {/* Main Visual: Islamic Arch with Logo & Books */}
            <div className="bg-white p-6 rounded-[48px] shadow-2xl border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>

              <div className="bg-slate-50 rounded-[40px] overflow-hidden aspect-[4/3] flex items-center justify-center relative group p-12">
                <div className="absolute inset-0 bg-primary/5 opacity-50"></div>

                {/* Islamic Arch Visualization */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Geometric Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

                  <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    {/* Logo Arch */}
                    <div className="w-48 h-60 border-[10px] border-primary rounded-t-full flex items-end justify-center pb-12 relative">
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45"></div>
                      <div className="w-24 h-32 border-8 border-secondary rounded-t-full flex items-center justify-center">
                        <div className="text-primary font-black text-5xl font-outfit">AJ</div>
                      </div>
                    </div>

                    {/* Stylized Hadith Kitabs */}
                    <div className="flex gap-3 mt-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={cn(
                          "w-10 h-14 rounded-md border-2 shadow-md transition-transform hover:-translate-y-2 cursor-pointer relative",
                          i === 1 ? "bg-primary border-primary/20 -rotate-6" :
                            i === 2 ? "bg-secondary border-secondary/20 scale-110 z-10" :
                              "bg-slate-800 border-slate-700 rotate-6"
                        )}>
                          <div className="absolute top-2 left-1.5 right-1.5 h-0.5 bg-white/20"></div>
                          <div className="absolute bottom-2 left-1.5 right-1.5 space-y-0.5">
                            <div className="h-0.5 bg-white/10 w-full"></div>
                            <div className="h-0.5 bg-white/10 w-2/3"></div>
                          </div>
                          <BookOpen size={12} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/40" />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Digital Library & Kitabs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:block animate-bounce [animation-duration:3s]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-slate-900">Secure Access</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Verified System</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hidden md:block animate-bounce [animation-duration:4s]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center rotate-12">
                  <BookOpen size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Knowledge Hub</p>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hadith & Fiqh</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-bold text-slate-900 font-outfit">Built for Institutional Excellence</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">Our modular architecture ensures every department has the tools they need to function seamlessly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Student SIS', desc: 'Complete registration and academic tracking system.', icon: GraduationCap, color: 'primary' },
              { title: 'Attendance', desc: 'Advanced student and teacher presence monitoring.', icon: Users2, color: 'secondary' },
              { title: 'Exams Portal', desc: 'Secure teacher upload and grade management system.', icon: BookOpen, color: 'accent' },
              { title: 'Financials', desc: 'Real-time revenue reports and expense tracking.', icon: BarChart3, color: 'success' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all group cursor-pointer hover:-translate-y-2">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                  i === 0 ? "bg-blue-50 text-primary" :
                    i === 1 ? "bg-red-50 text-secondary" :
                      i === 2 ? "bg-amber-50 text-accent" : "bg-emerald-50 text-emerald-600"
                )}>
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 truncate">{feature.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex items-center text-primary font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[48px] bg-primary p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>

          <h2 className="text-4xl lg:text-5xl font-black text-white font-outfit mb-8 leading-tight">
            Ready to Transform Your <br className="hidden md:block" /> Digital Infrastructure?
          </h2>
          <p className="text-white/70 text-lg font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            Join the leading Islamic institutions using our platform to modernize their operations and student experience.
          </p>
          <Link
            href="/dashboard"
            className="bg-white text-primary px-10 py-5 rounded-3xl font-bold text-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3 shadow-xl"
          >
            Get Started Now <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">© 2026 Ali Jim'ale Institute for Islamic Studies. All Rights Reserved.</p>
      </footer>
    </div>
  )
}
