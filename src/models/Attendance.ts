import mongoose, { Schema, model, models } from 'mongoose';

export interface IAttendance {
    _id?: string;
    studentId: string;
    classId: string;
    date: string;
    morningStatus: 'present' | 'absent' | 'late' | 'excused';
    afterBreakStatus: 'present' | 'absent' | 'late' | 'excused';
    afternoonStatus: 'present' | 'absent' | 'late' | 'excused';
    createdAt?: Date;
    updatedAt?: Date;
}

const AttendanceSchema = new Schema<IAttendance>(
    {
        studentId: {
            type: String,
            required: [true, 'Student ID is required'],
            ref: 'Student',
        },
        classId: {
            type: String,
            required: [true, 'Class ID is required'],
            ref: 'Class',
        },
        date: {
            type: String,
            required: [true, 'Date is required'],
        },
        morningStatus: {
            type: String,
            enum: ['present', 'absent', 'late', 'excused'],
            default: 'absent',
        },
        afterBreakStatus: {
            type: String,
            enum: ['present', 'absent', 'late', 'excused'],
            default: 'absent',
        },
        afternoonStatus: {
            type: String,
            enum: ['present', 'absent', 'late', 'excused'],
            default: 'absent',
        },
    },
    {
        timestamps: true,
    }
);

// Create compound index for efficient queries
AttendanceSchema.index({ studentId: 1, date: 1 });
AttendanceSchema.index({ classId: 1, date: 1 });
AttendanceSchema.index({ date: 1 });

const Attendance = models.Attendance || model<IAttendance>('Attendance', AttendanceSchema);

export default Attendance;
