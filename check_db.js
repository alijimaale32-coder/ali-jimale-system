const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function checkData() {
    try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        console.log('Checking students...');
        const sSnap = await getDocs(collection(db, 'students'));
        console.log(`Total students: ${sSnap.size}`);
        sSnap.forEach(doc => console.log(`- ${doc.data().name}`));

        console.log('\nChecking classes...');
        const cSnap = await getDocs(collection(db, 'classes'));
        console.log(`Total classes: ${cSnap.size}`);
        cSnap.forEach(doc => console.log(`- ${doc.data().className}`));
    } catch (e) {
        console.error(e);
    }
}

checkData();
