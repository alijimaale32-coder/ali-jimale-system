import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
    _id?: string;
    email: string;
    name: string; // Changed from displayName
    role: 'ADMIN' | 'MANAGER' | 'TEACHER';
    password: string; // Will store hashed password
    firebaseUid?: string; // For migration compatibility
    createdAt?: Date;
    updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        role: {
            type: String,
            enum: ['ADMIN', 'MANAGER', 'TEACHER'],
            required: [true, 'Role is required'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
        },
        firebaseUid: {
            type: String,
            sparse: true, // Allow null values but ensure uniqueness when present
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });

const User = models.User || model<IUser>('User', UserSchema);

export default User;
