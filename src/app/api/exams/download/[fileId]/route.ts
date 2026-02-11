import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ fileId: string }> }
) {
    try {
        const { fileId } = await params;
        await connectDB();
        const db = mongoose.connection.db;

        if (!db) {
            throw new Error('Database connection not established');
        }

        const bucket = new GridFSBucket(db as any, {
            bucketName: 'exams'
        });

        try {
            const objectId = new ObjectId(fileId);
            const files = await bucket.find({ _id: objectId }).toArray();

            if (files.length === 0) {
                return NextResponse.json({ success: false, message: 'File not found' }, { status: 404 });
            }

            const file = files[0] as any;
            const stream = bucket.openDownloadStream(objectId);

            // Create a response with the stream
            // @ts-ignore
            const response = new NextResponse(stream);

            // Set appropriate headers
            response.headers.set('Content-Type', file.contentType || 'application/octet-stream');
            response.headers.set('Content-Disposition', `attachment; filename="${file.filename}"`);

            return response;

        } catch (error) {
            return NextResponse.json({ success: false, message: 'Invalid file ID' }, { status: 400 });
        }

    } catch (error: any) {
        console.error('Download error:', error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
