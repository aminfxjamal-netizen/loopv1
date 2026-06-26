import { GoogleGenerativeAI } from "@google/generative-ai";

export const dynamic = 'force-dynamic';

function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

function isEmailDraftIntent(text: string): boolean {
  const lowerText = text.toLowerCase();
  const draftKeywords = ['draft', 'email', 'send', 'compose', 'write to', 'message to', 'mail'];
  return draftKeywords.some(keyword => lowerText.includes(keyword));
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json(
        { role: "assistant", content: "Configuration error: GEMINI_API_KEY is missing." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1].content;
    const cleanInput = lastMessage.trim();

    // ========== EMAIL DRAFT FLOW ==========
    if (isEmailDraftIntent(cleanInput)) {
      const extractedEmail = extractEmail(cleanInput);

      if (!extractedEmail) {
        return Response.json({
          role: "assistant",
          content: "I'd be happy to draft that email. What email address should I send it to?"
        });
      }

      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-pro",
        systemInstruction: `You are Loop, an elite executive assistant. Your writing style is your identity. Follow these rules strictly:

FORMATTING:
- Use proper spacing between paragraphs (blank line between each paragraph)
- Use bullet points or numbered lists with proper line breaks when listing items
- Never write "1. Item 2. Item 3. Item" in one line. Each item on its own line.
- Keep sentences short and clear. No walls of text.
- Use professional but warm tone. Not robotic. Not overly casual.

TONE:
- Confident, direct, helpful
- Never sound like a generic AI
- Never use phrases like "I hope this email finds you well" or "I am writing to inform you"
- Write like a skilled human assistant who respects the recipient's time

STRUCTURE:
- Subject line: Clear, specific, 3-7 words
- Body: Greeting, purpose, details (with proper spacing), call to action or next step, closing
- Always include a clear next step or question

WHEN USER PROVIDES THE BODY:
- Use their exact body text. Do not rewrite or add to it. Only format it with proper spacing if needed.

WHEN USER ONLY GIVES A TOPIC:
- Write the full email yourself using your best judgment. Be concise. Be human.

OUTPUT: Valid JSON only. No markdown. No code blocks. Format: {"subject": "Subject line", "body": "Email body with proper spacing and formatting"}`
      });

      const generationPrompt = `Draft an email based on this request: "${cleanInput}". The recipient email is ${extractedEmail}.`;
      const result = await model.generateContent(generationPrompt);
      const responseText = (await result.response).text().trim();

      let subject = "Update from Loop";
      let body = responseText;

      try {
        let cleanJson = responseText
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        
        const parsed = JSON.parse(cleanJson);
        if (parsed.subject) subject = parsed.subject;
        if (parsed.body) body = parsed.body;
      } catch {
        console.warn("Failed to parse AI JSON response, using raw text");
      }

      return Response.json({
        role: "assistant",
        isDraft: true,
        recipient: extractedEmail,
        sender: "Your connected Gmail",
        subject: subject,
        content: body
      });
    }

    // ========== DEFAULT CHAT FLOW ==========
    const defaultModel = genAI.getGenerativeModel({ 
      model: "gemini-2.5-pro",
      systemInstruction: `You are Loop, an elite AI collaborator inside a unified workspace. Your tone is professional, direct, and concise. 

Formatting rules:
- Use proper line breaks and spacing
- Lists should have each item on its own line
- Keep responses scannable and organized
- No walls of text
- Be helpful without being verbose`
    });

    const chatResult = await defaultModel.generateContent(cleanInput);
    const chatText = (await chatResult.response).text();
    
    return Response.json({ 
      role: "assistant", 
      content: chatText 
    });

  } catch (error: any) {
    console.error("Pipeline error:", error);
    return Response.json(
      { role: "assistant", content: `Server error: ${error.message || 'Something went wrong.'}` },
      { status: 500 }
    );
  }
}