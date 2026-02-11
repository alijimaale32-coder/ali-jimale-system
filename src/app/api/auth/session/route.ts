import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData } from '@/lib/session';

export async function GET(request: NextRequest) {
    try {
        // Get current session
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        if (!session.isLoggedIn) {
            return NextResponse.json({
                success: false,
                isLoggedIn: false,
                user: null,
            });
        }

        return NextResponse.json({
            success: true,
            isLoggedIn: true,
            user: {
                id: session.userId,
                email: session.email,
                name: session.displayName,
                role: session.role,
            },
        });

    } catch (error: any) {
        console.error('Session check error:', error);
        return NextResponse.json(
            {
                success: false,
                isLoggedIn: false,
                user: null,
            },
            { status: 500 }
        );
    }
}
