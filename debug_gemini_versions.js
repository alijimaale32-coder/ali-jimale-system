const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testVersions() {
    const apiKey = 'AIzaSyDdWdD_3AxT1lCUJJj5-8txCdJhWnO5ZgU';
    const genAI = new GoogleGenerativeAI(apiKey);

    const configs = [
        { model: 'gemini-1.5-flash', version: 'v1' },
        { model: 'gemini-1.5-flash', version: 'v1beta' },
        { model: 'gemini-pro', version: 'v1' },
        { model: 'gemini-pro', version: 'v1beta' }
    ];

    for (const config of configs) {
        try {
            console.log(`Testing ${config.model} (${config.version})...`);
            const model = genAI.getGenerativeModel({ model: config.model }, { apiVersion: config.version });
            const result = await model.generateContent('hi');
            console.log(`✅ Success:`, result.response.text());
            return;
        } catch (e) {
            console.log(`❌ Failed:`, e.message);
        }
    }
}

testVersions();
