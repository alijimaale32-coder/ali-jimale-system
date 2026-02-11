import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        const { message, history, action } = await request.json()

        // If this is an action request (from client), just return success
        if (action) {
            return NextResponse.json({ success: true })
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error('GEMINI_API_KEY is missing from environment variables')
            return NextResponse.json({ error: 'API Key missing' }, { status: 500 })
        }

        const model = genAI.getGenerativeModel(
            { model: 'gemini-2.5-flash' },
            { apiVersion: 'v1beta' }
        )

        const systemPrompt = `You are an AI assistant for Ali Jim'ale Institute, a Somali Islamic educational institution. 

**Your Role:**
Your ONLY task is to help users register new students. Do not offer to create classes, assign students, or take attendance.

**Information to collect for registration:**
- Full Name
- Gender (Boy/Girl)
- Date of Birth (YYYY-MM-DD or partial)
- Place of Birth
- Father's Phone Number
- Mother's Phone Number
- Mother's Name
- District/Address
- Family/Clan
- Age
- Study Circle (Magaca Xalqada)
- Circle Location (Goobta Xalqada)
- Enrollment Date (YYYY-MM-DD)
- Graduation Date (YYYY-MM-DD)

**Important Instructions:**
1. Be friendly and use Islamic greetings (Assalamu Alaikum).
2. Collect information step-by-step in a conversational way.
3. When you have ALL the information mentioned above, tell the user: "I have all the information. Click the 'Register Student Now' button that will appear to complete the registration."
4. Use Somali/Islamic cultural context appropriately.
5. If the user asks for anything other than registration, politely explain that you can only help with registering students.

Current conversation:`

        const chat = model.startChat({
            history: history.slice(0, -1).map((msg: any) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            })),
            generationConfig: {
                maxOutputTokens: 800,
                temperature: 0.7,
            },
        })

        const result = await chat.sendMessage(systemPrompt + '\n\nUser: ' + message)
        const response = result.response.text()

        // Try to extract structured data if the conversation seems complete
        let extractedData = null
        const lowerResponse = response.toLowerCase()

        if (lowerResponse.includes('all the information') || lowerResponse.includes('ready to register')) {
            extractedData = await extractDataFromConversation(history, message, model)
        }

        return NextResponse.json({ response, extractedData })
    } catch (error: any) {
        console.error('AI Assistant Error:', error)
        return NextResponse.json(
            { error: 'Failed to process request', details: error.message },
            { status: 500 }
        )
    }
}

async function extractDataFromConversation(history: any[], lastMessage: string, model: any) {
    try {
        const conversation = history.map(m => `${m.role}: ${m.content}`).join('\n') + `\nuser: ${lastMessage}`

        const extractPrompt = `Based on this conversation, extract the student registration data in JSON format. Only include fields that were explicitly mentioned:

${conversation}

Return ONLY a JSON object with these fields:
{
  "type": "student",
  "name": "string",
  "gender": "Boy" | "Girl",
  "birthday": "YYYY-MM-DD",
  "placeOfBirth": "string",
  "fatherNumber": "string",
  "motherNumber": "string",
  "motherName": "string",
  "district": "string",
  "clan": "string",
  "age": "string",
  "magacaXalqada": "string",
  "goobtaXalqada": "string",
  "waqtigaBiiray": "YYYY-MM-DD",
  "waqtigaBaxay": "YYYY-MM-DD"
}

Return ONLY the JSON, no other text.`

        const result = await model.generateContent(extractPrompt)
        const jsonText = result.response.text().trim()

        const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0])
        }

        return null
    } catch (error) {
        console.error('Error extracting data:', error)
        return null
    }
}


