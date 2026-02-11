import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Class from '@/models/Class';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

// GET all classes
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

        const classes = await Class.find({})
            .populate('teacherId', 'name email')
            .populate('students', 'name studentId')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            classes,
            count: classes.length,
        });

    } catch (error: any) {
        console.error('Get classes error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch classes' },
            { status: 500 }
        );
    }
}

// POST create new class
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
        const { name, subject, schedule, teacherId, students, capacity } = body;

        // Validation
        if (!name || !subject) {
            return NextResponse.json(
                { success: false, message: 'Class name and subject are required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Create class
        const classDoc = await Class.create({
            name,
            subject,
            schedule,
            teacherId: teacherId || null,
            students: students || [],
            capacity: capacity || 30,
        });

        // Populate teacher and students
        await classDoc.populate('teacherId', 'name email');
        await classDoc.populate('students', 'name studentId');

        return NextResponse.json({
            success: true,
            message: 'Class created successfully',
            class: classDoc,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create class error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to create class' },
            { status: 500 }
        );
    }
}

// PUT update class
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
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Class ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const classDoc = await Class.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        )
            .populate('teacherId', 'name email')
            .populate('students', 'name studentId');

        if (!classDoc) {
            return NextResponse.json(
                { success: false, message: 'Class not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Class updated successfully',
            class: classDoc,
        });

    } catch (error: any) {
        console.error('Update class error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update class' },
            { status: 500 }
        );
    }
}

// DELETE class
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
                { success: false, message: 'Class ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const classDoc = await Class.findByIdAndDelete(id);

        if (!classDoc) {
            return NextResponse.json(
                { success: false, message: 'Class not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Class deleted successfully',
        });

    } catch (error: any) {
        console.error('Delete class error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete class' },
            { status: 500 }
        );
    }
}
