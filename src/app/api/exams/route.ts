import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Exam from '@/models/Exam';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';
import mongoose from 'mongoose';
import { GridFSBucket } from 'mongodb';

// GET exams
export async function GET(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        await connectDB();

        let query = {};

        // Teachers only see their own uploads
        if (session.role === 'TEACHER') {
            query = { uploadedBy: session.userId };
        }
        // Admin and Managers see everything
        else if (session.role === 'ADMIN' || session.role === 'MANAGER') {
            query = {}; // All exams
        } else {
            return NextResponse.json(
                { success: false, message: 'Forbidden' },
                { status: 403 }
            );
        }

        const exams = await Exam.find(query).populate('uploadedBy', 'name').sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            exams,
        });

    } catch (error: any) {
        console.error('Get exams error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to fetch exams' },
            { status: 500 }
        );
    }
}

// POST upload exam to GridFS
export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn || session.role !== 'TEACHER') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized. Only teachers can upload exams.' },
                { status: 401 }
            );
        }

        await connectDB();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Database connection failed');

        const formData = await request.formData();
        const file = formData.get('file') as File;
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;

        if (!file || !title) {
            return NextResponse.json(
                { success: false, message: 'Missing file or title' },
                { status: 400 }
            );
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to GridFS
        const bucket = new GridFSBucket(db, { bucketName: 'exams' });
        const uploadStream = bucket.openUploadStream(file.name, {
            contentType: file.type,
            metadata: {
                uploadedBy: session.userId,
                title: title
            }
        });

        // Use a promise to handle the stream upload
        const gridFsId = await new Promise((resolve, reject) => {
            uploadStream.on('error', (err) => reject(err));
            uploadStream.on('finish', () => resolve(uploadStream.id));
            uploadStream.end(buffer);
        });

        // Create exam record in MongoDB
        const exam = await Exam.create({
            title,
            description,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            fileUrl: `/api/exams/download/${gridFsId}`,
            gridFsId: gridFsId.toString(),
            uploadedBy: session.userId,
            status: 'Pending'
        });

        return NextResponse.json({
            success: true,
            message: 'Exam uploaded successfully',
            exam,
        }, { status: 201 });

    } catch (error: any) {
        console.error('Upload exam error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to upload exam' },
            { status: 500 }
        );
    }
}

// DELETE exam record and GridFS file
export async function DELETE(request: NextRequest) {
    try {
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
                { success: false, message: 'Exam ID is required' },
                { status: 400 }
            );
        }

        await connectDB();
        const exam = await Exam.findById(id);

        if (!exam) {
            return NextResponse.json(
                { success: false, message: 'Exam not found' },
                { status: 404 }
            );
        }

        // Check permission
        if (exam.uploadedBy.toString() !== session.userId && session.role !== 'ADMIN' && session.role !== 'MANAGER') {
            return NextResponse.json(
                { success: false, message: 'Forbidden' },
                { status: 403 }
            );
        }

        // Delete from GridFS if gridFsId exists
        if (exam.gridFsId) {
            const db = mongoose.connection.db;
            if (db) {
                const bucket = new GridFSBucket(db, { bucketName: 'exams' });
                try {
                    await bucket.delete(new mongoose.Types.ObjectId(exam.gridFsId) as any);
                } catch (err) {
                    console.error('Error deleting from GridFS:', err);
                }
            }
        }

        await Exam.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Exam record deleted successfully',
        });

    } catch (error: any) {
        console.error('Delete exam error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to delete exam' },
            { status: 500 }
        );
    }
}
