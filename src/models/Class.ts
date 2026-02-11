import mongoose, { Schema, model, models } from 'mongoose';

export interface IClass {
    _id?: string;
    className: string;
    departmentId: 'ibtidai' | 'idadi' | 'thanawi';
    gender: 'Boy' | 'Girl';
    teacherName: string;
    studentCount?: number;
    academicYear: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ClassSchema = new Schema<IClass>(
    {
        className: {
            type: String,
            required: [true, 'Class name is required'],
            trim: true,
        },
        departmentId: {
            type: String,
            enum: ['ibtidai', 'idadi', 'thanawi'],
            required: [true, 'Department is required'],
        },
        gender: {
            type: String,
            enum: ['Boy', 'Girl'],
            required: [true, 'Gender is required'],
        },
        teacherName: {
            type: String,
            required: [true, 'Teacher name is required'],
            trim: true,
        },
        studentCount: {
            type: Number,
            default: 0,
        },
        academicYear: {
            type: String,
            required: [true, 'Academic year is required'],
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes
ClassSchema.index({ departmentId: 1 });
ClassSchema.index({ gender: 1 });
ClassSchema.index({ academicYear: 1 });

const Class = models.Class || model<IClass>('Class', ClassSchema);

export default Class;
