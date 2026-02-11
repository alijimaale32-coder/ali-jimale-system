import mongoose, { Schema, model, models } from 'mongoose';

export interface ITeacher {
    _id?: string;
    fullName: string;
    email?: string;
    phone: string;
    subject?: string;
    address?: string;
    qualification?: string;
    experience?: number;
    joiningDate: string;
    status: 'Active' | 'Inactive';
    createdAt?: Date;
    updatedAt?: Date;
}

const TeacherSchema = new Schema<ITeacher>(
    {
        fullName: {
            type: String,
            required: [true, 'Teacher name is required'],
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
        },
        subject: {
            type: String,
            trim: true,
        },
        address: {
            type: String,
            trim: true,
        },
        qualification: {
            type: String,
            trim: true,
        },
        experience: {
            type: Number,
            min: 0,
        },
        joiningDate: {
            type: String,
            required: [true, 'Joining date is required'],
        },
        status: {
            type: String,
            enum: ['Active', 'Inactive'],
            default: 'Active',
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes
TeacherSchema.index({ fullName: 1 });
TeacherSchema.index({ status: 1 });
TeacherSchema.index({ email: 1 });

const Teacher = models.Teacher || model<ITeacher>('Teacher', TeacherSchema);

export default Teacher;
