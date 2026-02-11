// MongoDB Connection Test with Full Error Details
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://alijimaale32_db_user:gJiZVMtAea8ZU82k@ali-jimale-cluster.nood04o.mongodb.net/ali-jimale-db?retryWrites=true&w=majority';

async function testConnection() {
    console.log('\n🔍 Testing MongoDB Connection...\n');
    console.log('📋 Using URI:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
    console.log('🔗 Attempting connection...\n');

    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log('✅ SUCCESS! Connected to MongoDB Atlas!\n');
        console.log('📊 Database Name:', mongoose.connection.name);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Ready State:', mongoose.connection.readyState);

        // Try to list collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log('\n📁 Collections:', collections.length);
        if (collections.length > 0) {
            collections.forEach(c => console.log('   -', c.name));
        } else {
            console.log('   (Empty database - this is normal for new setup)');
        }

        console.log('\n🎉 MongoDB is working perfectly!\n');

        await mongoose.disconnect();
        console.log('✅ Test completed successfully!\n');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ CONNECTION FAILED!\n');
        console.error('Error Name:', error.name);
        console.error('Error Message:', error.message);
        console.error('\nFull Error:');
        console.error(error);

        console.log('\n💡 Troubleshooting:');
        if (error.message.includes('authentication')) {
            console.log('   ⚠️  Check username and password');
        }
        if (error.message.includes('IP') || error.message.includes('network')) {
            console.log('   ⚠️  Check Network Access in MongoDB Atlas');
            console.log('   ⚠️  Make sure 0.0.0.0/0 is allowed');
        }
        if (error.message.includes('timeout')) {
            console.log('   ⚠️  Check internet connection');
            console.log('   ⚠️  Wait 2-3 minutes for network access to activate');
        }

        console.log('\n');
        process.exit(1);
    }
}

testConnection();
