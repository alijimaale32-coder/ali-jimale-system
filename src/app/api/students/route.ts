import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Student from '@/models/Student';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

// GET all students
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

        const students = await Student.find({}).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            students,
            count: students.length,
        });

    } catch (error: any) {
        console.error('Get students error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch students' },
            { status: 500 }
        );
    }
}

// POST create new student
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
        const { name, studentId, gender, gradeLevel, age, parentContact, address } = body;

        // Validation
        if (!name || !studentId) {
            return NextResponse.json(
                { success: false, message: 'Name and Student ID are required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if student ID already exists
        const existingStudent = await Student.findOne({ studentId });
        if (existingStudent) {
            return NextResponse.json(
                { success: false, message: 'Student ID already exists' },
                { status: 409 }
            );
        }

        // Create student
        const student = await Student.create({
            name,
            studentId,
            gender,
            gradeLevel,
            age,
            parentContact,
            address,
            enrollmentDate: new Date(),
        });

        return NextResponse.json({
            success: true,
            message: 'Student created successfully',
            student,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Create student error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to create student' },
            { status: 500 }
        );
    }
}

// PUT update student
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
                { success: false, message: 'Student ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const student = await Student.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!student) {
            return NextResponse.json(
                { success: false, message: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Student updated successfully',
            student,
        });

    } catch (error: any) {
        console.error('Update student error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update student' },
            { status: 500 }
        );
    }
}

// DELETE student
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
                { success: false, message: 'Student ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return NextResponse.json(
                { success: false, message: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Student deleted successfully',
        });

    } catch (error: any) {
        console.error('Delete student error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete student' },
            { status: 500 }
        );
    }
}
