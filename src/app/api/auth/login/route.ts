import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sessionOptions, SessionData } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const { email, password, role } = await request.json();

        // Validation
        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Check if role matches (if role is specified)
        if (role && user.role !== role) {
            return NextResponse.json(
                {
                    success: false,
                    message: `This account is registered as ${user.role}, not ${role}. Please select the correct role.`,
                },
                { status: 403 }
            );
        }

        // Create session
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
        session.userId = user._id.toString();
        session.email = user.email;
        session.role = user.role;
        session.displayName = user.name;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Login failed. Please try again.',
            },
            { status: 500 }
        );
    }
}
