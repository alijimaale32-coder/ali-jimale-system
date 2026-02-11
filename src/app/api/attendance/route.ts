import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

// GET attendance records
export async function GET(request: NextRequest) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        const { searchParams } = new URL(request.url);
        const classId = searchParams.get('classId');
        const date = searchParams.get('date');

        let query: any = {};
        if (classId) query.classId = classId;
        if (date) {
            const targetDate = new Date(date);
            const nextDay = new Date(targetDate);
            nextDay.setDate(nextDay.getDate() + 1);
            query.date = { $gte: targetDate, $lt: nextDay };
        }

        const attendanceRecords = await Attendance.find(query)
            .populate('classId', 'name subject')
            .populate('studentId', 'name studentId')
            .populate('markedBy', 'name email')
            .sort({ date: -1, createdAt: -1 });

        return NextResponse.json({
            success: true,
            attendance: attendanceRecords,
            count: attendanceRecords.length,
        });

    } catch (error: any) {
        console.error('Get attendance error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch attendance' },
            { status: 500 }
        );
    }
}

// POST mark attendance
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { classId, studentId, status, date, notes } = body;

        // Validation
        if (!classId || !studentId || !status) {
            return NextResponse.json(
                { success: false, message: 'Class ID, Student ID, and status are required' },
                { status: 400 }
            );
        }

        await connectDB();

        const attendanceDate = date ? new Date(date) : new Date();

        // Check if attendance already exists for this student, class, and date
        const existingAttendance = await Attendance.findOne({
            classId,
            studentId,
            date: {
                $gte: new Date(attendanceDate.setHours(0, 0, 0, 0)),
                $lt: new Date(attendanceDate.setHours(23, 59, 59, 999))
            }
        });

        if (existingAttendance) {
            // Update existing attendance
            existingAttendance.status = status;
            existingAttendance.notes = notes;
            existingAttendance.markedBy = session.userId;
            await existingAttendance.save();

            await existingAttendance.populate('classId', 'name subject');
            await existingAttendance.populate('studentId', 'name studentId');
            await existingAttendance.populate('markedBy', 'name email');

            return NextResponse.json({
                success: true,
                message: 'Attendance updated successfully',
                attendance: existingAttendance,
            });
        }

        // Create new attendance record
        const attendance = await Attendance.create({
            classId,
            studentId,
            date: attendanceDate,
            status,
            notes,
            markedBy: session.userId,
        });

        await attendance.populate('classId', 'name subject');
        await attendance.populate('studentId', 'name studentId');
        await attendance.populate('markedBy', 'name email');

        return NextResponse.json({
            success: true,
            message: 'Attendance marked successfully',
            attendance,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Mark attendance error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to mark attendance' },
            { status: 500 }
        );
    }
}

// PUT update attendance
export async function PUT(request: NextRequest) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, status, notes } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Attendance ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const attendance = await Attendance.findByIdAndUpdate(
            id,
            {
                status,
                notes,
                markedBy: session.userId,
                updatedAt: new Date()
            },
            { new: true, runValidators: true }
        )
            .populate('classId', 'name subject')
            .populate('studentId', 'name studentId')
            .populate('markedBy', 'name email');

        if (!attendance) {
            return NextResponse.json(
                { success: false, message: 'Attendance record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Attendance updated successfully',
            attendance,
        });

    } catch (error: any) {
        console.error('Update attendance error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update attendance' },
            { status: 500 }
        );
    }
}

// DELETE attendance
export async function DELETE(request: NextRequest) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Attendance ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const attendance = await Attendance.findByIdAndDelete(id);

        if (!attendance) {
            return NextResponse.json(
                { success: false, message: 'Attendance record not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Attendance deleted successfully',
        });

    } catch (error: any) {
        console.error('Delete attendance error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete attendance' },
            { status: 500 }
        );
    }
}
