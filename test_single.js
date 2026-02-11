const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testSingle() {
    const apiKey = 'AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU';
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' }, { apiVersion: 'v1beta' });
        const result = await model.generateContent('hi');
        console.log('Success:', result.response.text());
    } catch (e) {
        console.log('Error Type:', e.constructor.name);
        console.log('Error Status:', e.status);
        console.log('Error Message:', e.message);
    }
}

testSingle();
