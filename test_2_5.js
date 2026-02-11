const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModern() {
    const apiKey = 'AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU';
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }, { apiVersion: 'v1beta' });
        const result = await model.generateContent('Assalamu Alaikum, say hello back in Somali.');
        console.log('Success:', result.response.text());
    } catch (e) {
        console.log('Error:', e.message);
    }
}

testModern();
