"use client"

import React from 'react'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
    role: 'user' | 'assistant'
    content: string
}

export function AIAssistant() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [messages, setMessages] = React.useState<Message[]>([
        {
            role: 'assistant',
            content: "👋 Assalamu Alaikum! I'm your AI assistant. I can help you register new students quickly through conversation.\n\nJust tell me the student's name to get started!"
        }
    ])
    const [input, setInput] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [extractedData, setExtractedData] = React.useState<any>(null)
    const [performing, setPerforming] = React.useState(false)
    const messagesEndRef = React.useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    React.useEffect(() => {
        scrollToBottom()
    }, [messages])

    const performAction = async () => {
        if (!extractedData) return

        setPerforming(true)
        try {
            const { db } = await import('@/lib/firebase')
            const { collection, addDoc, Timestamp } = await import('firebase/firestore')

            // Register student
            const studentData = {
                ...extractedData,
                status: 'Active',
                createdAt: Timestamp.now()
            }
            const docRef = await addDoc(collection(db, 'students'), studentData)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `✅ Success! Student "${extractedData.name}" has been registered in the system!`
            }])

            setExtractedData(null)
        } catch (error: any) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `❌ Error: ${error.message}`
            }])
        } finally {
            setPerforming(false)
        }
    }



    const handleSend = async () => {
        if (!input.trim() || loading) return

        const userMessage = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', content: userMessage }])
        setLoading(true)

        try {
            const response = await fetch('/api/ai-assistant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history: messages })
            })

            const data = await response.json()
            setMessages(prev => [...prev, { role: 'assistant', content: data.response }])

            // If AI extracted data, store it for action button
            if (data.extractedData) {
                setExtractedData(data.extractedData)
            }
        } catch (error) {
            console.error('Error:', error)
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I encountered an error. Please make sure the Gemini API is configured correctly."
            }])
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary to-purple-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center z-50 group"
                    >
                        <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-white rounded-[32px] shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-br from-primary to-purple-600 p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-lg">AI Assistant</h3>
                                        <p className="text-xs text-white/80">Powered by Gemini</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
                            {messages.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user'
                                            ? 'bg-primary text-white'
                                            : 'bg-white border border-slate-200 text-slate-900'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                </motion.div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-slate-200 bg-white">
                            {extractedData && (
                                <div className="mb-3">
                                    <button
                                        onClick={performAction}
                                        disabled={performing}
                                        className="w-full bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {performing ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={20} />
                                                Register Student Now
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                                    disabled={loading}
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={loading || !input.trim()}
                                    className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
