"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export type UserRole = 'ADMIN' | 'MANAGER' | 'TEACHER' | null;

interface UserProfile {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}

interface AuthContextType {
    user: UserProfile | null;
    role: UserRole;
    loading: boolean;
    login: (email: string, password: string, role: UserRole) => Promise<{ success: boolean; message: string }>;
    register: (data: { email: string, name: string, role: UserRole, password: string }) => Promise<{ success: boolean; message: string }>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    role: null,
    loading: true,
    login: async () => ({ success: false, message: '' }),
    register: async () => ({ success: false, message: '' }),
    logout: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const response = await fetch('/api/auth/session');
            const data = await response.json();

            if (data.success && data.isLoggedIn) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error('Session check failed:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, selectedRole: UserRole): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role: selectedRole }),
            });

            const data = await response.json();

            if (data.success) {
                setUser(data.user);
                router.push('/dashboard');
                return { success: true, message: data.message || 'Login successful' };
            } else {
                return { success: false, message: data.message || 'Login failed' };
            }
        } catch (error: any) {
            console.error('Login error:', error);
            return { success: false, message: error.message || 'Network error. Please try again.' };
        }
    };

    const register = async (data: { email: string, name: string, role: UserRole, password: string }): Promise<{ success: boolean; message: string }> => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setUser(result.user);
                router.push('/dashboard');
                return { success: true, message: result.message || 'Registration successful' };
            } else {
                return { success: false, message: result.message || 'Registration failed' };
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            return { success: false, message: error.message || 'Network error. Please try again.' };
        }
    };

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
            });

            setUser(null);
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout even if API call fails
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, role: user?.role || null, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
