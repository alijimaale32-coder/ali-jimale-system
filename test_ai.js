// Using native fetch

async function testRegistration() {
    console.log('Testing AI Student Registration...');
    const response = await fetch('http://localhost:3000/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            message: "Register Hussein Mohamed Shari Jamale. He is a boy, born on 2015-05-10 in Mogadishu. Father phone is 615123456, mother phone 615987654. Mother name is Maryam Ahmed. District Hodan, Clan Hawiye, Age 11. Study circle Al-Nuur in Block 4. Enrolled on 2024-01-01. I have all the information.",
            history: []
        })
    });

    const data = await response.json();
    console.log('AI Response:', data.response);
    console.log('Extracted Data:', JSON.stringify(data.extractedData, null, 2));

    if (data.extractedData) {
        console.log('\nSuccess! Data extracted. Now I will simulate the performAction logic...');
    }
}

testRegistration();
