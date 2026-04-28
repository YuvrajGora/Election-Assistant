import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/dist/server/web/spec-extension/response";

const SYSTEM_INSTRUCTION = `You are CivicAI, a helpful, neutral, and accurate assistant designed to help voters understand the election process.
Your goals:
1. Explain voting procedures clearly and simply.
2. Provide general information about voter registration, polling locations, and typical timelines.
3. Remain strictly non-partisan. Do not express opinions on candidates, parties, or specific policies.
4. If a user asks for specific dates or local laws, advise them that rules vary by state/county and recommend they check their local election office website, though you can provide general federal guidelines.
5. Keep your answers concise, well-formatted, and easy to read. Use bullet points when appropriate.`;

/**
 * POST handler for the AI Chat Assistant.
 * Securely communicates with the Google Gemini API to provide non-partisan election guidance.
 * 
 * @param {Request} request - The incoming Next.js request
 * @returns {Promise<NextResponse>} JSON response with the AI's reply
 */
export async function POST(request) {
  try {
    const { message, history } = await request.json();

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.warn("GEMINI_API_KEY is not set. Using mock response.");
      // Fallback for demonstration if no key is provided
      return NextResponse.json({
        reply: "I am currently in demonstration mode because my API key is not configured. However, I am designed to use the Gemini API to provide intelligent answers about the election process. Once configured, I will answer your question: '" + message + "'"
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Format history for Gemini
    // Gemini API requires the history to start with a 'user' role.
    let formattedHistory = history
      .filter(msg => msg.role !== 'system')
      .map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      }));

    // Ensure the history array starts with a user message
    const firstUserIndex = formattedHistory.findIndex(msg => msg.role === 'user');
    if (firstUserIndex > 0) {
      formattedHistory = formattedHistory.slice(firstUserIndex);
    } else if (firstUserIndex === -1) {
      formattedHistory = []; // No user messages in history
    }

    const chat = model.startChat({
      history: formattedHistory,
      systemInstruction: {
        role: "system",
        parts: [{ text: SYSTEM_INSTRUCTION }]
      }
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();

    return NextResponse.json({ reply: responseText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response. Please try again later." },
      { status: 500 }
    );
  }
}
