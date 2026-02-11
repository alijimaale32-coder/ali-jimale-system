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
        const { email, name, role, password } = await request.json();

        // Validation
        if (!email || !name || !password) {
            return NextResponse.json(
                { success: false, message: 'All fields are required' },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Determine role (auto-promote admins)
        const privilegedEmails = ['alijimaale32@gmail.com', 'admin@apextrader.ai', 'ali@alijimale.edu'];
        const assignedRole = privilegedEmails.includes(email.toLowerCase()) ? 'ADMIN' : (role || 'TEACHER');

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = await User.create({
            email: email.toLowerCase(),
            name,
            role: assignedRole,
            password: hashedPassword,
            createdAt: new Date(),
        });

        // Create session
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
        session.userId = newUser._id.toString();
        session.email = newUser.email;
        session.role = newUser.role;
        session.displayName = newUser.name;
        session.isLoggedIn = true;
        await session.save();

        return NextResponse.json({
            success: true,
            message: 'Registration successful',
            user: {
                id: newUser._id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
            },
        }, { status: 201 });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Registration failed. Please try again.',
            },
            { status: 500 }
        );
    }
}
