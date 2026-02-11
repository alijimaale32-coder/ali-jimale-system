const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
    const apiKey = 'AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU';
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        // There is no direct listModels in the client SDK, but we can try to hit a known model
        const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
        for (const m of models) {
            try {
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent('hi');
                console.log(`Model ${m} works:`, result.response.text());
                return;
            } catch (e) {
                console.log(`Model ${m} failed:`, e.message);
            }
        }
    } catch (e) {
        console.error('Error:', e);
    }
}

listModels();
