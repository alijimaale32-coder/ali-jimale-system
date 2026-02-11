import mongoose, { Schema, model, models } from 'mongoose';

export interface IStudent {
    _id?: string;
    name: string;
    fatherNumber: string;
    motherNumber: string;
    birthday: string;
    placeOfBirth: string;
    motherName: string;
    district: string;
    clan: string;
    age: string;
    gender: 'Boy' | 'Girl';
    status: 'Active' | 'Pending' | 'Inactive';
    magacaXalqada: string;
    goobtaXalqada: string;
    waqtigaBiiray: string;
    waqtigaBaxay: string;
    classId?: string;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const StudentSchema = new Schema<IStudent>(
    {
        name: {
            type: String,
            required: [true, 'Student name is required'],
            trim: true,
        },
        fatherNumber: {
            type: String,
            required: [true, 'Father phone number is required'],
            trim: true,
        },
        motherNumber: {
            type: String,
            required: [true, 'Mother phone number is required'],
            trim: true,
        },
        birthday: {
            type: String,
            required: [true, 'Birthday is required'],
        },
        placeOfBirth: {
            type: String,
            required: [true, 'Place of birth is required'],
            trim: true,
        },
        motherName: {
            type: String,
            required: [true, 'Mother name is required'],
            trim: true,
        },
        district: {
            type: String,
            required: [true, 'District is required'],
            trim: true,
        },
        clan: {
            type: String,
            required: [true, 'Clan is required'],
            trim: true,
        },
        age: {
            type: String,
            required: [true, 'Age is required'],
        },
        gender: {
            type: String,
            enum: ['Boy', 'Girl'],
            required: [true, 'Gender is required'],
        },
        status: {
            type: String,
            enum: ['Active', 'Pending', 'Inactive'],
            default: 'Active',
        },
        magacaXalqada: {
            type: String,
            required: [true, 'Xalqada name is required'],
            trim: true,
        },
        goobtaXalqada: {
            type: String,
            required: [true, 'Xalqada location is required'],
            trim: true,
        },
        waqtigaBiiray: {
            type: String,
            required: [true, 'Entry date is required'],
        },
        waqtigaBaxay: {
            type: String,
            required: [true, 'Exit date is required'],
        },
        classId: {
            type: String,
            ref: 'Class',
        },
        photo: {
            type: String,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt
    }
);

// Create indexes for better query performance
StudentSchema.index({ name: 1 });
StudentSchema.index({ gender: 1 });
StudentSchema.index({ status: 1 });
StudentSchema.index({ classId: 1 });
StudentSchema.index({ clan: 1 });

const Student = models.Student || model<IStudent>('Student', StudentSchema);

export default Student;
