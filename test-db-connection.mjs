// Simple MongoDB Connection Test
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

async function testConnection() {
    console.log('\n🔍 Testing MongoDB Connection...\n');

    if (!MONGODB_URI) {
        console.error('❌ MONGODB_URI not found');
        process.exit(1);
    }

    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGODB_URI);

        console.log('✅ SUCCESS! Connected to MongoDB!\n');
        console.log('📊 Database:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('\n🎉 MongoDB is ready to use!\n');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('\n❌ CONNECTION FAILED!');
        console.error('Error:', error.message);

        if (error.message.includes('IP')) {
            console.log('\n💡 Go to MongoDB Atlas → Network Access');
            console.log('   Add IP: 0.0.0.0/0 (Allow from anywhere)');
        }

        process.exit(1);
    }
}

testConnection();
