import { GoogleGenerativeAI } from "@google/generative-ai";

// Force Next.js to read your Vercel Dashboard variables live on every request
export const dynamic = 'force-dynamic';

// Helper: Extract email from natural language
function extractEmail(text: string): string | null {
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const match = text.match(emailRegex);
  return match ? match[0] : null;
}

// Helper: Check if user wants to draft an email
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
        { 
          role: "assistant", 
          content: "Configuration error: GEMINI_API_KEY is missing from your Vercel dashboard variables." 
        },
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

      // If user wants to draft but didn't provide an email
      if (!extractedEmail) {
        return Response.json({
          role: "assistant",
          content: "I'd be happy to draft that email. What email address should I send it to?"
        });
      }

      // Generate draft with AI
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-pro",
        systemInstruction: `You are an executive assistant writing professional emails. 
Output valid JSON only. No markdown. No code blocks. Just raw JSON.
Format: {"subject": "The subject line here", "body": "The email body here"}

Rules:
- The subject should be concise and relevant to the user's request
- The body should be professional, clean, and ready to send
- Do not include placeholder text like [Your Name]
- Do not make up facts not provided by the user`
      });

      const generationPrompt = `Draft an email based on this request: "${cleanInput}". The recipient email is ${extractedEmail}.`;
      const result = await model.generateContent(generationPrompt);
      const responseText = (await result.response).text().trim();

      // Parse the AI's JSON response
      let subject = "Update from Loop";
      let body = responseText;

      try {
        // Clean up any markdown code blocks if the AI adds them
        let cleanJson = responseText
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        
        const parsed = JSON.parse(cleanJson);
        if (parsed.subject) subject = parsed.subject;
        if (parsed.body) body = parsed.body;
      } catch (parseError) {
        // If JSON parsing fails, use the raw response as the body
        console.warn("Failed to parse AI JSON response, using raw text");
      }

      return Response.json({
        role: "assistant",
        isDraft: true,
        recipient: extractedEmail,
        subject: subject,
        content: body
      });
    }

    // ========== DEFAULT CHAT FLOW ==========
    const defaultModel = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: "You are an elite, highly intelligent AI collaborator. Your tone is professional and direct. You help users manage emails, schedule meetings, and get work done. Keep responses concise."
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
      { 
        role: "assistant", 
        content: `Server error: ${error.message || 'Something went wrong. Please try again.'}` 
      },
      { status: 500 }
    );
  }
}