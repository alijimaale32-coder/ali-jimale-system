import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { sessionOptions, SessionData, defaultSession } from '@/lib/session';

export async function POST(request: NextRequest) {
    try {
        // Get session and destroy it
        const cookieStore = await cookies();
        const session = await getIronSession<SessionData>(cookieStore, sessionOptions);

        // Reset session to default values
        Object.assign(session, defaultSession);
        await session.save();

        return NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        });

    } catch (error: any) {
        console.error('Logout error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Logout failed',
            },
            { status: 500 }
        );
    }
}
