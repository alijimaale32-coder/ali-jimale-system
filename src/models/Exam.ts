import mongoose, { Schema, Document } from 'mongoose';

export interface IExam extends Document {
    title: string;
    description?: string;
    fileUrl: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    gridFsId?: string; // ID of the file in GridFS
    uploadedBy: mongoose.Types.ObjectId;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: Date;
    updatedAt: Date;
}

const ExamSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    gridFsId: { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.Exam || mongoose.model<IExam>('Exam', ExamSchema);
