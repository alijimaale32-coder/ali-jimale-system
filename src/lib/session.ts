import { SessionOptions } from 'iron-session';

export interface SessionData {
    userId: string;
    email: string;
    role: 'ADMIN' | 'MANAGER' | 'TEACHER';
    displayName: string;
    isLoggedIn: boolean;
}

export const sessionOptions: SessionOptions = {
    password: process.env.SESSION_SECRET || 'complex_password_at_least_32_characters_long_for_security',
    cookieName: 'aj_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
    },
};

export const defaultSession: SessionData = {
    userId: '',
    email: '',
    role: 'TEACHER',
    displayName: '',
    isLoggedIn: false,
};
