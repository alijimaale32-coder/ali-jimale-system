// Clear Browser Storage Script
// Run this in your browser console when on the app page

console.log('🧹 CLEARING ALL AUTHENTICATION DATA...\n');

// Clear localStorage
const itemsToRemove = ['aj_user', 'aj_teachers_db'];
itemsToRemove.forEach(item => {
    if (localStorage.getItem(item)) {
        console.log(`✅ Removed: ${item}`);
        localStorage.removeItem(item);
    }
});

// Clear all localStorage (thorough clean)
console.log('\n🔥 FULL STORAGE CLEAR...');
localStorage.clear();
sessionStorage.clear();

console.log('\n✅ STORAGE CLEARED!\n');
console.log('📋 NEW LOGIN CREDENTIALS:\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('👤 ADMIN ACCESS:');
console.log('   Email: alijimaale32@gmail.com');
console.log('   Password: 123456');
console.log('   Role: ADMIN');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('👥 MANAGER ACCESS:');
console.log('   Email: manager@alijimale.edu');
console.log('   Password: 123456');
console.log('   Role: MANAGER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('🔄 Please refresh the page and login with new credentials!');
