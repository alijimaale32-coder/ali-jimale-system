"use client"

import React from 'react'
import { X, Upload, FileText, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '@/lib/firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

interface BulkImportProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
}

export function BulkStudentImport({ isOpen, onClose, onSuccess }: BulkImportProps) {
    const [importing, setImporting] = React.useState(false)
    const [textData, setTextData] = React.useState('')
    const [classId, setClassId] = React.useState('')
    const [classes, setClasses] = React.useState<any[]>([])

    React.useEffect(() => {
        if (isOpen) {
            // Fetch classes from Firestore
            const fetchClasses = async () => {
                try {
                    const { getDocs, collection } = await import('firebase/firestore')
                    const snapshot = await getDocs(collection(db, 'classes'))
                    const classesList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }))
                    setClasses(classesList)
                } catch (error) {
                    console.error('Error fetching classes for import:', error)
                    // Fallback to localStorage if Firestore fails
                    const savedClasses = localStorage.getItem('classes')
                    if (savedClasses) {
                        setClasses(JSON.parse(savedClasses))
                    }
                }
            }
            fetchClasses()
        }
    }, [isOpen])

    const downloadTemplate = () => {
        const template = `Full Name | Gender | Birthday | Place of Birth | Father Phone | Mother Phone | Mother Name | District | Clan | Age | Magaca Xalqada | Goobta Xalqada | Enrollment Date | Graduation Date
Hussein Mohamed Shari Jamale | Boy | 2006-01-01 | Mogadishu | 0615399851 | 0615835628 | Tahra Hussein Mohamed | Kahda | Mahmoud Hiraab | 18 | Abi Bin Ka'b | Kilo 13 | 2021-01-01 | 2022-12-31
Ismail Mohamed Shari Jamale | Boy | 2005-01-01 | Mogadishu | 0615552285 | 06105836228 | Tahra Hussein Mohamed | Kahda | Mahmoud Hiraab | 19 | Abi Bin Ka'b | Kilo 13 | 2021-01-01 | 2022-12-31`

        const blob = new Blob([template], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'student_import_template.txt'
        a.click()
    }

    const handleImport = async () => {
        if (!classId) {
            alert('Please select a class first!')
            return
        }

        setImporting(true)
        try {
            const lines = textData.trim().split('\n')
            const headers = lines[0].split('|').map(h => h.trim())

            let successCount = 0
            let errorCount = 0

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split('|').map(v => v.trim())

                if (values.length < 14) continue

                const studentData = {
                    name: values[0],
                    gender: values[1],
                    birthday: values[2],
                    placeOfBirth: values[3],
                    fatherNumber: values[4],
                    motherNumber: values[5],
                    motherName: values[6],
                    district: values[7],
                    clan: values[8],
                    age: values[9],
                    magacaXalqada: values[10],
                    goobtaXalqada: values[11],
                    waqtigaBiiray: values[12],
                    waqtigaBaxay: values[13],
                    classId: classId,
                    status: 'Active',
                    createdAt: Timestamp.now()
                }

                try {
                    await addDoc(collection(db, 'students'), studentData)
                    successCount++
                } catch (err) {
                    console.error('Error adding student:', err)
                    errorCount++
                }
            }

            alert(`Import Complete!\n✅ Success: ${successCount}\n❌ Errors: ${errorCount}`)
            setTextData('')
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Import error:', error)
            alert('Import failed! Please check your data format.')
        } finally {
            setImporting(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-4xl pointer-events-auto max-h-[90vh] overflow-hidden flex flex-col">
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 font-outfit tracking-tight">
                                        Bulk Student Import
                                    </h2>
                                    <p className="text-slate-500 font-medium mt-1">Add multiple students quickly</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6 overflow-y-auto flex-1">
                                {/* Class Selection */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                        Select Class (Required)
                                    </label>
                                    <select
                                        value={classId}
                                        onChange={(e) => setClassId(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold text-sm"
                                    >
                                        <option value="">-- Select Class --</option>
                                        {classes.map((cls) => (
                                            <option key={cls.id} value={cls.id}>
                                                {cls.className} ({cls.gender})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Instructions */}
                                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                                    <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                                        <FileText size={18} /> How to Import:
                                    </h3>
                                    <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                                        <li>Download the template below</li>
                                        <li>Fill in student data (one student per line)</li>
                                        <li>Separate fields with | (pipe symbol)</li>
                                        <li>Copy and paste the data into the box below</li>
                                        <li>Click "Import Students"</li>
                                    </ol>
                                </div>

                                {/* Download Template */}
                                <button
                                    onClick={downloadTemplate}
                                    className="w-full bg-emerald-50 border-2 border-emerald-200 text-emerald-700 px-6 py-4 rounded-2xl font-bold text-sm hover:bg-emerald-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <Download size={18} /> Download Template with Examples
                                </button>

                                {/* Text Input */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                        Paste Student Data Here
                                    </label>
                                    <textarea
                                        value={textData}
                                        onChange={(e) => setTextData(e.target.value)}
                                        placeholder="Full Name | Gender | Birthday | Place of Birth | Father Phone | Mother Phone | Mother Name | District | Clan | Age | Magaca Xalqada | Goobta Xalqada | Enrollment Date | Graduation Date&#10;Hussein Mohamed Shari Jamale | Boy | 2006-01-01 | Mogadishu | 0615399851 | 0615835628 | Tahra Hussein Mohamed | Kahda | Mahmoud Hiraab | 18 | Abi Bin Ka'b | Kilo 13 | 2021-01-01 | 2022-12-31"
                                        rows={12}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all font-mono text-xs"
                                    />
                                    <p className="text-xs text-slate-500">
                                        {textData.split('\n').filter(l => l.trim()).length - 1} students ready to import
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-8 border-t border-slate-100 flex items-center justify-end gap-4">
                                <button
                                    onClick={onClose}
                                    className="px-8 py-3 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-100 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleImport}
                                    disabled={importing || !classId || !textData.trim()}
                                    className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {importing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Importing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={18} /> Import Students
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
