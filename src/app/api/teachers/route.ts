import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

// GET all teachers
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

        // Get only teachers (exclude password field)
        const teachers = await User.find({ role: 'TEACHER' })
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            teachers,
            count: teachers.length,
        });

    } catch (error: any) {
        console.error('Get teachers error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch teachers' },
            { status: 500 }
        );
    }
}

// PUT update teacher
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

        // Only ADMIN can update teachers
        if (session.role !== 'ADMIN' && session.role !== 'MANAGER') {
            return NextResponse.json(
                { success: false, message: 'Only admins can update teacher information' },
                { status: 403 }
            );
        }

        const body = await request.json();
        const { id, name, email } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Teacher ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const updateData: any = { updatedAt: new Date() };
        if (name) updateData.name = name;
        if (email) updateData.email = email.toLowerCase();

        const teacher = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!teacher) {
            return NextResponse.json(
                { success: false, message: 'Teacher not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Teacher updated successfully',
            teacher,
        });

    } catch (error: any) {
        console.error('Update teacher error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update teacher' },
            { status: 500 }
        );
    }
}

// DELETE teacher
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

        // Only ADMIN can delete teachers
        if (session.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: 'Only admins can delete teachers' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Teacher ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const teacher = await User.findOneAndDelete({ _id: id, role: 'TEACHER' });

        if (!teacher) {
            return NextResponse.json(
                { success: false, message: 'Teacher not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Teacher deleted successfully',
        });

    } catch (error: any) {
        console.error('Delete teacher error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete teacher' },
            { status: 500 }
        );
    }
}
