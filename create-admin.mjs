// Create Admin User in MongoDB
// Run this once to create the admin account

const mongoose = require('mongoose');

// Define User schema inline
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    displayName: { type: String, required: true },
    role: { type: String, enum: ['ADMIN', 'MANAGER', 'TEACHER'], required: true },
    hashedPassword: { type: String },
    firebaseUid: { type: String },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

const MONGODB_URI = 'mongodb+srv://alijimaale32_db_user:gJiZVMtAea8ZU82k@ali-jimale-cluster.nood04o.mongodb.net/ali-jimale-db?retryWrites=true&w=majority';

async function createAdmin() {
    console.log('\n🔐 Creating Admin User...\n');

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'alijimaale32@gmail.com' });

        if (existingAdmin) {
            console.log('⚠️  Admin user already exists!');
            console.log('📧 Email:', existingAdmin.email);
            console.log('👤 Name:', existingAdmin.displayName);
            console.log('🔑 Role:', existingAdmin.role);
            console.log('\n✅ No action needed!\n');
        } else {
            // Create new admin user
            // Note: Password will be set through Firebase or a separate password reset
            const adminUser = await User.create({
                email: 'alijimaale32@gmail.com',
                displayName: 'Ali Jim\'ale Admin',
                role: 'ADMIN',
                // We'll add password hashing in the next step
            });

            console.log('✅ SUCCESS! Admin user created!\n');
            console.log('📧 Email:', adminUser.email);
            console.log('👤 Name:', adminUser.displayName);
            console.log('🔑 Role:', adminUser.role);
            console.log('🆔 ID:', adminUser._id);
            console.log('\n🎉 Admin account is ready!\n');
        }

        await mongoose.disconnect();
        console.log('✅ Done!\n');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Error creating admin:', error.message);
        process.exit(1);
    }
}

createAdmin();
