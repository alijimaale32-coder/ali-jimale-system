const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testAll() {
    const apiKey = 'AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU';
    const genAI = new GoogleGenerativeAI(apiKey);

    const models = [
        'gemini-1.5-flash',
        'gemini-1.5-pro',
        'gemini-pro',
        'gemini-2.0-flash-exp'
    ];

    for (const m of models) {
        for (const v of ['v1', 'v1beta']) {
            try {
                console.log(`Trying ${m} with ${v}...`);
                const model = genAI.getGenerativeModel({ model: m }, { apiVersion: v });
                const result = await model.generateContent('hi');
                console.log(`✅ SUCCESS: ${m} with ${v}`);
                console.log(`Response: ${result.response.text()}`);
                return;
            } catch (e) {
                console.log(`❌ FAILED: ${m} with ${v} - ${e.message}`);
            }
        }
    }
}

testAll();
