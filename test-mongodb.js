// Test MongoDB Connection
// Run this to verify your MongoDB Atlas setup

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
    console.log('\n🔍 Testing MongoDB Connection...\n');

    if (!MONGODB_URI) {
        console.error('❌ ERROR: MONGODB_URI not found in .env.local');
        console.log('\n📝 Please add MongoDB connection string to .env.local:');
        console.log('MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname\n');
        process.exit(1);
    }

    console.log('📋 Connection URI found');
    console.log('🔗 Attempting to connect to MongoDB Atlas...\n');

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000, // 10 second timeout
        });

        console.log('✅ SUCCESS! Connected to MongoDB Atlas!\n');
        console.log('📊 Database Name:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Connection State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected');

        // List collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📁 Collections in database:', collections.length);

        if (collections.length > 0) {
            console.log('   Existing collections:');
            collections.forEach(col => console.log(`   - ${col.name}`));
        } else {
            console.log('   (Database is empty - this is normal for a new setup!)');
        }

        console.log('\n🎉 Your MongoDB setup is working perfectly!');
        console.log('✨ You can now start using MongoDB in your application!\n');

        await mongoose.disconnect();
        console.log('🔒 Disconnected from MongoDB\n');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ CONNECTION FAILED!\n');
        console.error('Error:', error.message);

        if (error.message.includes('authentication failed')) {
            console.log('\n💡 Solution: Check your username and password in the connection string');
        } else if (error.message.includes('not authorized')) {
            console.log('\n💡 Solution: Make sure your IP is whitelisted in MongoDB Atlas Network Access');
        } else if (error.message.includes('ECONNREFUSED')) {
            console.log('\n💡 Solution: Check your internet connection and MongoDB URI format');
        } else {
            console.log('\n💡 Solution: Double-check your MONGODB_URI in .env.local');
        }

        console.log('\n📚 See MONGODB_SETUP_GUIDE.md for detailed instructions\n');
        process.exit(1);
    }
}

testConnection();
