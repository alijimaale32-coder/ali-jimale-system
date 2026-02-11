const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
    const apiKey = 'AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU';
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContent('Say hello in Somali.');
        console.log(result.response.text());
    } catch (e) {
        console.error('Gemini API Error:', e);
    }
}

testGemini();
